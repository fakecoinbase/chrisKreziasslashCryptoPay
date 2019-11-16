import { Subscription } from 'rxjs';
import { HttpRequestsService } from 'src/app/services/article.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit, OnDestroy {
  @Input() coin: string;
  @Input() compareCoin: string;

  public coinDetails: { rate: string; iconUrl: string };

  private subscription: Subscription;

  constructor(private http: HttpRequestsService) {}

  ngOnInit() {
    this.subscription = combineLatest(
      this.http.requestCoinDetails(this.coin, this.compareCoin),
      this.http.requestCoinIcons(this.coin, '32')
    ).subscribe(
      (response: string[]) => {
        this.coinDetails = {
          rate: response[0],
          iconUrl: response[1]
        };
      },
      error => console.error(error)
    );
  }

  ngOnDestroy() {
    // tslint:disable-next-line: no-unused-expression
    this.subscription && this.subscription.unsubscribe();
  }
}
