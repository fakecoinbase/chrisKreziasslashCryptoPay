import {
  HttpRequestsService,
  CloseData
} from 'src/app/services/article.service';
import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-stocks-dashboard',
  templateUrl: './stocks-dashboard.component.html',
  styleUrls: ['./stocks-dashboard.component.scss']
})
export class StocksDashboardComponent implements AfterViewInit, OnDestroy {
  public chart: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {
    title: {
      text: 'BTC to USD'
    },
    yAxis: {
      title: {
        text: 'Close Price'
      }
    },
    series: [
      {
        name: 'BTC to USD',
        data: [],
        type: 'line'
      }
    ]
  };
  public updateFlag: boolean = false;
  private subscriptions: Subscription[] = [];
  constructor(
    private http: HttpRequestsService,
    private util: UtilitiesService
  ) {}

  ngAfterViewInit(): void {
    const dataSub: Subscription = this.setData();
    this.subscriptions.push(dataSub);
  }

  ngOnDestroy(): void {
    this.util.unsubscribe(this.subscriptions);
  }

  private setData(): Subscription {
    return this.http.requestOHLCData().subscribe(
      (data: CloseData) => {
        this.chartOptions.xAxis = {
          categories: data.timePeriodEnd
        };
        this.chartOptions.series = [
          {
            name: 'BTC to USD',
            data: data.priceClose,
            type: 'line'
          }
        ];
        this.updateFlag = true;
      },
      error => {
        console.error(error);
      }
    );
  }
}
