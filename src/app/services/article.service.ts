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
    const formattedDate = this.util.formatDate(new Date());
    // tslint:disable-next-line: max-line-length
    return this.http.get(
      `https://newsapi.org/v2/top-headlines?q=bitcoin&from=${formattedDate}&sortBy=publishedAt&apiKey=${this.newsApiKey}`
    );
  }

  requestCloseData(period: Periods = Periods.Day): Observable<number[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-CoinAPI-Key': this.coinApiKey })
    };
    return this.http
      .get(
        `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest?period_id=${period}`,
        httpOptions
      )
      .pipe(
        map((response: any) => {
          const temp: OHLCVResponse[] = response as OHLCVResponse[];
          return temp
            .map((record: OHLCVResponse) => [
              new Date(record.time_period_end).getTime(),
              record.price_close
            ])
            .sort((a, b) => {
              if (a[0] > b[0]) {
                return -1;
              } else if (a[0] < b[0]) {
                return 1;
              } else {
                return 0;
              }
            })
            .map((record: number[]) => {
              return record[1];
            });
        })
      );
  }
}

interface OHLCVResponse {
  time_period_end: string;
  price_close: number;
}
