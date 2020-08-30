import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private httpOptions;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'text',
      }),
    };
  }

  public getCarUser(): Observable<any> {
    return this.httpClient.get<Car[]>(`${environment.api}/car/u/${Number(localStorage.getItem('userId'))}`, this.httpOptions).pipe(
      map(res => res),
      catchError(err => throwError(err)));
  }

  public save(car: Car): Observable<Car> {
    console.log(car);
    return this.httpClient.post<Car>(`${environment.api}/car`, {
      name: car.name,
      color: car.color,
      state: car.state,
      registration: car.registration,
      purchaseDate: car.purchaseDate,
      brand: car.brand,
      userId: localStorage.getItem('userId')
    }).pipe(tap(e => console.log(e)), map(res => res), catchError(err => throwError(err)));
  }
}
