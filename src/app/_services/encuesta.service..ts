import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST_BACKEND, TOKEN_NAME } from '../_shared/constants';
import { Subject } from 'rxjs';
import { Encuesta } from '../_model/Encuesta';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {

  urlEncuesta: string = `${HOST_BACKEND}/api/encuestas`;

  mensajeCambio = new Subject<string>();
  encuestaChange = new Subject<Encuesta[]>();

  constructor(private httpClient: HttpClient) { }

  obtenerCatalogoEncuestas() {
    return this.httpClient.get<Encuesta[]>(`${this.urlEncuesta}`);
  }

  obtenerEncuestasPropios(page: number, size: number) {
    return this.httpClient.get<Encuesta[]>(`${this.urlEncuesta}?page=${page}&size=${size}`);
  }

  guardarEncuesta(encuesta: Encuesta) {
    return this.httpClient.post(`${this.urlEncuesta}`, encuesta);
  }

  eliminarEncuesta(id: number) {
    return this.httpClient.delete(`${this.urlEncuesta}/${id}`);
  }

  obtenerEncuesta(id: number) {
    return this.httpClient.get<Encuesta>(`${this.urlEncuesta}/${id}`);
  }

  modificar(encuesta: Encuesta) {
    return this.httpClient.put(`${this.urlEncuesta}`, encuesta);
  }
}
