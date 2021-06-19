import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get("https://www.mocky.io/v2/5eda4003330000740079ea60")
    .pipe(map((res:any) => res)) //already contains json
  }

}
