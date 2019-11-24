import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';


  constructor(private httpClient: HttpClient) { }

  public getWeatherByZip(zip: number) {
    return this.httpClient.get(`${this.apiURL}${zip},us&appid=a31774d3e93c4909b35198c9c1226e37`);
  }
}
