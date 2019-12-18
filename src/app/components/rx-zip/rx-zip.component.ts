import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


// const data$ = fromFetch('http://api.openweathermap.org/data/2.5/weather?zip=92501,us&appid=a31774d3e93c4909b35198c9c1226e37').pipe(


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=92501,us&appid=a31774d3e93c4909b35198c9c1226e37';

@Component({
  selector: 'app-rx-zip',
  templateUrl: './rx-zip.component.html',
  styleUrls: ['./rx-zip.component.scss']
})
export class RxZipComponent implements OnInit {

  data: any[] = [];

  constructor(private http: HttpClient) {

    this.getProducts()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
      }, err => {
        console.log(err);
      });

  }



  ngOnInit() {

  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl)
      .pipe(
        tap(product => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<any>(`getProduct id=${id}`))
    );
  }

}
