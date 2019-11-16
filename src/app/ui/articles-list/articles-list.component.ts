import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpRequestsService } from '../../services/article.service';
import { Subscription } from 'rxjs';
import {
  NewsTopHeadlinesModel,
  ArticlesModel
} from 'src/app/models/newsTopHeadlines.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  articleSub: Subscription;
  articlesList: ArticlesModel[] = [];
  constructor(
    private ref: ChangeDetectorRef,
    public http: HttpRequestsService
  ) {}

  ngOnInit() {
    this.articleSub = this.http.requestArticle().subscribe(
      (resp: NewsTopHeadlinesModel) => {
        this.articlesList = this.getDisplayedArticles(resp);
      },
      error => {
        console.error(error);
      },
      () => {
        this.ref.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe();
  }

  private getDisplayedArticles(resp: NewsTopHeadlinesModel): ArticlesModel[] {
    let articleTitles = resp.articles.map(article => article.title);
    articleTitles = [...new Set(articleTitles)];
    const articlesList: ArticlesModel[] = [];
    articleTitles.forEach(title => {
      const foundArticle = resp.articles.find(
        article => article.title === title
      );
      articlesList.push(foundArticle);
    });
    return articlesList.splice(1, 3);
  }
}
