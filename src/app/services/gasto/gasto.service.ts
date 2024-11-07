import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private apiUrl = 'https://bqf7b9hj-3000.euw.devtunnels.ms/api/gastos'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los gastos
  getGasto(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  getTotalGasto(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/consulta/total/${userId}`)
  }

  getGastoPorCategoria(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/consulta/porCategoria/${userId}`)
  }

  getGastoPorDia(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/consulta/porDia/${userId}`)
  }

  getGastoPorMes(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/consulta/porMes/${userId}`)
  }

  getGastoPorAno(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/consulta/porAno/${userId}`) // Ñam, ano
  }

  // Crear un nuevo gasto
  createGasto(gasto: any): Observable<any> {
    return this.http.post(this.apiUrl, gasto);
  }

  // Actualizar gasto por ID
  updateGasto(id: number, gasto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, gasto);
  }

  // Eliminar gasto por ID
  deleteGasto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
