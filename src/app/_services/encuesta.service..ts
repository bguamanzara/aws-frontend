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

  mensajeRegistro = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  obtenerCatalogoProblemas() {
    return this.httpClient.get<Encuesta[]>(`${this.urlEncuesta}`);
  }

  obtenerFeedBacksPropios(page: number, size: number) {
    return this.httpClient.get<Encuesta[]>(`${this.urlEncuesta}?page=${page}&size=${size}`);
  }

  guardarFeedBack(encuesta: Encuesta) {
    return this.httpClient.post(`${this.urlEncuesta}`, encuesta);
  }

  eliminarFeedBack(id: number) {
    return this.httpClient.delete(`${this.urlEncuesta}/${id}`);
  }
}
