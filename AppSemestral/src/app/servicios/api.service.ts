import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = "https://api.adviceslip.com/advice";

  constructor(private http:HttpClient, private storage: Storage) { }

  solicitud(): Observable<any> {
    return this.http.get(this.apiURL).pipe(
      catchError(error => {
        console.error("Error en la solicitud API:", error);
        // Si ocurre un error, devolver null o un observable vacío
        return of(null);
      })
    );
  }

  async guardarConsejoLocal(data: string) {
    await this.storage.set('consejo', data);
  }

  async obtenerConsejoLocal(): Promise<string> {
    return await this.storage.get('consejo');
  }
}
