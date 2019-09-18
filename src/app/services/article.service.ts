import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIkeys } from '../data/keys';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private newsApiKey: string = APIkeys.NewsAPI;

  constructor(private http: HttpClient, private util: UtilitiesService) {}

  requestArticle(): Observable<any> {
    const formattedDate = this.util.formatDate(new Date());
    // tslint:disable-next-line: max-line-length
    return this.http.get(`https://newsapi.org/v2/top-headlines?q=bitcoin&from=${formattedDate}&sortBy=publishedAt&apiKey=${this.newsApiKey}`);
  }
}
