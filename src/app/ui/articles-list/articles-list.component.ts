import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Subscription } from 'rxjs';
import {
  NewsTopHeadlinesModel,
  ArticlesModel,
} from 'src/app/models/newsTopHeadlines.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  articleSub: Subscription;
  articlesList: ArticlesModel[];
  constructor(
    private ref: ChangeDetectorRef,
    public articleService: ArticleService
  ) {}

  ngOnInit() {
    this.articleSub = this.articleService.requestArticle().subscribe(
      (resp: NewsTopHeadlinesModel) => {
        this.articlesList = [
          resp.articles[1],
          resp.articles[2],
          resp.articles[3],
        ];
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
}
