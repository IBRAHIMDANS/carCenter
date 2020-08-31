import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  constructor(private httpClient: HttpClient) {
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({ long: resp.coords.longitude, lat: resp.coords.latitude });
        },
        err => {
          reject(err);
        });
    });

  }

  getMeteo(param: { lat: number; long: number }): Observable<any> {
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${param.lat}&lon=${param.long}&%20exclude=hourly,daily&units=metric&lang=fr&appid=${environment.apiWeatherKey}`).pipe(
      map(res => res),
      catchError(err => throwError(err))
    );
  }
}
