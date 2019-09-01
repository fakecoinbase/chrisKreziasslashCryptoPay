import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIkeys } from '../data/keys';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private newsApiKey: string = APIkeys.NewsAPI;
  private currentDate: Date = new Date();

  constructor(public http: HttpClient) {}

  requestArticle(): Observable<any> {
    const formattedDate = this.formatDate(this.currentDate);
    return this.http.get(
      `https://newsapi.org/v2/top-headlines?q=bitcoin&from=${formattedDate}&sortBy=publishedAt&apiKey=${this.newsApiKey}`
    );
  }

  formatDate(date: Date): string {
    const month =
      date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
    const day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay();
    return `${date.getFullYear()}-${month}-${day}`;
  }
}
