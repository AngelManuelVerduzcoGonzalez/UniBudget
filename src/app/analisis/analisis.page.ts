import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { PresupuestoService } from '../services/presupuesto/presupuesto.service';
import { CategoriaService } from '../services/categoria/categoria.service';
import { GastoService } from '../services/gasto/gasto.service';
import { IngresoService } from '../services/ingreso/ingreso.service';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.page.html',
  styleUrls: ['./analisis.page.scss'],
})
export class AnalisisPage implements OnInit
{
  presupuesto: any[] = [];
  categoria: any[] = [];
  gasto: any[] = [];
  gastoTotal: number = 0;
  gastoPorCat: any[] = [];
  gastoPorMes: any[] = [];
  gastoPorAno: any[] = []; // Mmm, ano
  ingreso: any[] = [];
  ingresoTotal: number = 0;
  ingresoPorCat: any[] = [];
  ingresoPorMes: any[] = [];
  ingresoPorAno: any[] = [];

  constructor(private router:Router,
    private authService:AuthService,
    private presupuestos:PresupuestoService,
    private categorias:CategoriaService,
    private gastos:GastoService,
    private ingresos:IngresoService,
  ) { }

  ngOnInit()
  {
    const userId = Number(localStorage.getItem('uid'));
    this.presupuestos.getPresupuestos(userId).subscribe((res) =>
      {
        this.presupuesto = res;
    });
    this.categorias.getCategorias(userId).subscribe((res) =>
      {
        this.categoria = res;
    });
    this.gastos.getGasto(userId).subscribe((res) =>
      {
        this.gasto = res;
    });
    this.gastos.getTotalGasto(userId).subscribe((res) =>
      {
        this.gastoTotal = res;
    });
    this.gastos.getGastoPorMes(userId).subscribe((res) =>
      {
        this.gastoPorMes = res;
    });
    this.gastos.getGastoPorAno(userId).subscribe((res) =>
      {
        this.gastoPorAno = res;
    });
    this.gastos.getGastoPorCategoria(userId).subscribe((res) =>
      {
        this.gastoPorCat = res;
    });
    this.ingresos.getIngresos(userId).subscribe((res) =>
      {
        this.ingreso = res;
    });
    this.ingresos.getTotalIngresos(userId).subscribe((res) =>
      {
        this.ingresoTotal = res;
    });
    this.ingresos.getIngresosPorMes(userId).subscribe((res) =>
      {
        this.ingresoPorMes = res;
    });
    this.ingresos.getIngresosPorAno(userId).subscribe((res) =>
      {
        this.ingresoPorAno = res;
    });
    this.ingresos.getIngresosPorCategoria(userId).subscribe((res) =>
      {
        this.ingresoPorCat = res;
    });
  }
  
  getCategoriaNombre(categoriaId: number): string {
    const categoria = this.categoria.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Desconocido';
  }

  getGastoPorMes(categoriaId: number, mes: string): number {
    const gasto = this.gastoPorMes.find(g => g.categoriaId === categoriaId && g.mes === mes);
    return gasto ? gasto.total : 0;
  }

  getGastoPorAno(categoriaId: number, ano: string): number {
    const gasto = this.gastoPorAno.find(g => g.categoriaId === categoriaId && g.ano === ano);
    return gasto ? gasto.total : 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
