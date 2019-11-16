import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIkeys } from '../data/keys';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { map } from 'rxjs/internal/operators/map';

export enum Periods {
  Hour = '1HRS',
  Day = '1DAY',
  Month = '1MTH',
  Year = '1YRS'
}
@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  private newsApiKey: string = APIkeys.NewsAPI;
  private coinApiKey: string = APIkeys.CoinAPI;

  constructor(private http: HttpClient, private util: UtilitiesService) {}

  requestArticle(): Observable<any> {
    const curDate: Date = new Date();
    const today = this.util.formatDate(curDate);
    const oneWeekAgo = this.util.formatDate(
      new Date(curDate.setDate(curDate.getDate() - 7))
    );
    // tslint:disable-next-line: max-line-length
    return this.http.get(
      `https://newsapi.org/v2/everything?q=crypto&from=${oneWeekAgo}&to=${today}&sortBy=publishedAt&apiKey=${this.newsApiKey}`
    );
  }

  requestOHLCData(period: Periods = Periods.Day): Observable<CloseData> {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-CoinAPI-Key': this.coinApiKey })
    };
    return this.http
      .get(
        `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest?period_id=${period}`,
        httpOptions
      )
      .pipe(
        map((response: OHLCVResponse[]) => {
          response = response.reverse();
          const priceClose: number[] = response.map(
            record => record.price_close
          );
          const timePeriodEnd: string[] = response.map(record =>
            this.util.formatDate(new Date(record.time_period_end))
          );
          return { priceClose, timePeriodEnd };
        })
      );
  }

  requestCoinDetails(
    assetIdBase: string,
    assetIdQuote: string
  ): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-CoinAPI-Key': this.coinApiKey })
    };
    return this.http
      .get(
        `https://rest.coinapi.io/v1/exchangerate/${assetIdBase}`,
        httpOptions
      )
      .pipe(
        map((response: EchangeRate) => {
          return response.rates
            .find((record: RateItem) => record.asset_id_quote === assetIdQuote)
            .rate.toFixed(2);
        })
      );
  }

  requestCoinIcons(assetId: string, iconSize: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-CoinAPI-Key': this.coinApiKey })
    };
    return this.http
      .get(`https://rest.coinapi.io/v1/assets/icons/${iconSize}`, httpOptions)
      .pipe(
        map((response: AssetIcon[]) => {
          return response.find((icon: AssetIcon) => icon.asset_id === assetId)
            .url;
        })
      );
  }
}

interface OHLCVResponse {
  time_period_end: string;
  price_close: number;
}

interface EchangeRate {
  asset_id_base: string;
  rates: RateItem[];
}

interface RateItem {
  time: string;
  asset_id_quote: string;
  rate: number;
}

interface AssetIcon {
  asset_id: string;
  url: string;
}

export interface CloseData {
  priceClose: number[];
  timePeriodEnd: string[];
}
