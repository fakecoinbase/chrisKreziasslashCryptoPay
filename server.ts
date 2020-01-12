import { Keys } from "./keys";
/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import "zone.js/dist/zone-node";

import * as express from "express";
import * as compression from "compression";
import * as coinbase from "coinbase";
import * as request from "request";
import { join } from "path";

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), "dist/browser");

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
  ngExpressEngine,
  provideModuleMap
} = require("./dist/server/main");

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set("view engine", "html");
app.set("views", DIST_FOLDER);

const clientId = Keys.clientId;
const clientSecret = Keys.clientSecret;
const callbackRoute = "api/oauth/callback/:email/:amount/:currency";

app.get("/api/oauth/authorize/:email/:amount/:currency", (req, res) => {
  res.redirect(
    // tslint:disable-next-line: max-line-length
    `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${getRedirectUrl(
      req
    )}&scope=wallet:user:read,wallet:accounts:read`
  );
});

app.get(callbackRoute, (req, res) => {
  const code = req.query.code;
  request.post(
    // tslint:disable-next-line: max-line-length
    `https://api.coinbase.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${getRedirectUrl(
      req
    )}`,
    (err, httpResponse, body) => {
      const argsData = {
        email: req.params.email,
        amount: req.params.amount,
        currency: req.params.currency
      };
      return getToken(err, httpResponse, body, argsData);
    }
  );
});

function getToken(err, httpResponse, body, argsData) {
  if (err) {
    return console.error("Authorization failed:", err);
  }
  const accessToken = httpResponse.access_token;
  const refreshToken = httpResponse.refresh_token;
  const client = new coinbase.Client({
    accessToken,
    refreshToken
  });
  client.getAccount("primary", (error, account) => {
    if (error) {
      return console.error("Get account failed:", error);
    }
    return getAccount(account, argsData);
  });
}

function getAccount(account, argsData) {
  const args = {
    to: argsData.email,
    amount: argsData.amount,
    currency: argsData.currency,
    description: "Sample transaction for you"
  };
  account.sendMoney(args, sendMoneyCallback);
}

function sendMoneyCallback(err, tx) {
  if (err) {
    return console.error("Send money failed:", err);
  }
}

function getRedirectUrl(req) {
  return callbackRoute
    .replace(":email", req.params.email)
    .replace(":amount", req.params.amount)
    .replace(":currency", req.params.currency);
}

// Serve static files from /browser
app.get(
  "*.*",
  compression(),
  express.static(DIST_FOLDER, {
    maxAge: "1y"
  })
);

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.render("index", { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

app.get("/api/get-accounts/", (req, res) => {});
