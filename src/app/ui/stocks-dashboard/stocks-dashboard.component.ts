import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { ArticleService } from 'src/app/services/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stocks-dashboard',
  templateUrl: './stocks-dashboard.component.html',
  styleUrls: ['./stocks-dashboard.component.scss'],
})
export class StocksDashboardComponent implements OnInit, OnDestroy {
  OHLCSub: Subscription;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    rangeSelector: {
      selected: 2,
    },

    title: {
      text: 'AAPL Stock Price',
    },
    series: [],
  };
  constructor(
    private service: ArticleService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.OHLCSub = this.service.requestOHLCV().subscribe(
      response => {
        this.chartOptions.series[0] = {
          type: 'ohlc',
          name: 'AAPL Stock Price',
          data: response,
          dataGrouping: {
            units: [['week', [1]], ['month', [1, 2, 3, 4, 6]]],
          },
        };
      },
      error => {
        console.error(error);
      },
      () => {
        this.ref.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    this.OHLCSub.unsubscribe();
  }
}
