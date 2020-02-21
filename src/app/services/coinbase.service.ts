import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class CoinbaseService {
  constructor(private http: HttpClient) {}

  public postFundRequest(data: IFundRequest): Observable<any> {
    return this.http.post("/api/funds/request", data);
  }
}

export interface IFundRequest {
  email: string;
  amount: string;
  currency: string;
}
