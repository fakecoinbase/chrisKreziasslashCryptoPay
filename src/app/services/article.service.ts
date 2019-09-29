import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIkeys } from '../data/keys';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private newsApiKey: string = APIkeys.NewsAPI;
  private coinApiKey: string = APIkeys.CoinAPI;

  constructor(private http: HttpClient, private util: UtilitiesService) {}

  requestArticle(): Observable<any> {
    const formattedDate = this.util.formatDate(new Date());
    // tslint:disable-next-line: max-line-length
    return this.http.get(
      `https://newsapi.org/v2/top-headlines?q=bitcoin&from=${formattedDate}&sortBy=publishedAt&apiKey=${this.newsApiKey}`
    );
  }

  requestOHLCV(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-CoinAPI-Key': this.coinApiKey }),
    };
    return this.http
      .get(
        'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest?period_id=1MIN',
        httpOptions
      )
      .pipe(
        map((response: any) =>
          response.map(record => [
            new Date(record.time_period_end).getTime(),
            record.price_open,
            record.price_high,
            record.price_low,
            record.price_close,
          ])
        )
      );
  }
}
