import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import {
  ArticlesModel,
  NewsTopHeadlinesModel,
} from 'src/app/models/newsTopHeadlines.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  newsArticleSub: Subscription;
  latestArticle: ArticlesModel;

  constructor(
    public articleService: ArticleService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.newsArticleSub = this.articleService.requestArticle().subscribe(
      (resp: NewsTopHeadlinesModel) => {
        this.latestArticle = resp.articles[0];
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
    this.newsArticleSub.unsubscribe();
  }
}
