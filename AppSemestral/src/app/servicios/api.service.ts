import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes/"

  constructor(private http:HttpClient) { }

  solicitud():Observable<any>{
    return this.http.get(this.apiURL);
  }
}
