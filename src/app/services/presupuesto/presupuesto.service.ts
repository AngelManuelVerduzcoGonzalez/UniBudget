import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  private apiUrl = 'http://localhost:3000/api/presupuestos'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getPresupuestos(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Actualizar producto por ID
  createPresupuesto(presupuesto: any): Observable<any> {
    return this.http.post(this.apiUrl, presupuesto);
  }

  updatePresupuesto(id: any ,presupuesto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, presupuesto);
  }

  // Eliminar producto por ID
  deletePresupuesto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
