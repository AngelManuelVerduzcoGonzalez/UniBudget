import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage /*implements OnInit*/ {
  cantidadIngreso: number = 0; 
  categoriasIngreso: string[] = ["Transporte", "Videojuegos", "Comida", "Servicios"];
  descripcionIngreso: string = '';
  fechaIngreso: string = '';

  cantidadGasto: number = 0; 
  categoriasGasto: string[] = ["Transporte", "Videojuegos", "Comida", "Servicios"];
  descripcionGasto: string = '';
  fechaGasto: string = '';


  constructor(private router:Router ,private authService:AuthService) { }

  /*ngOnInit() {
  }*/
  
  agregarGasto() {

  }

  agregarIngreso() {

  }

  editarGasto() {

  }

  editarIngreso() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
