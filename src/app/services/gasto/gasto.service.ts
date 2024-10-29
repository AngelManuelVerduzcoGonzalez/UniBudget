import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private apiUrl = 'http://localhost:3000/api/gastos'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getIngresos(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Crear un nuevo producto
  createIngreso(gasto: any): Observable<any> {
    return this.http.post(this.apiUrl, gasto);
  }

  // Actualizar producto por ID
  updateIngreso(id: number, gasto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, gasto);
  }

  // Eliminar producto por ID
  deleteIngreso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
