import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }
  GetCartData():Observable<any>{
    return this.httpClient.get("https://api.jsonbin.io/v3/b/67ebf2238561e97a50f6c35e");
  }
}
