import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
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
export class AnalisisPage implements OnInit {
  // Datos y opciones para los gráficos
  public gastoPorCategoriaChartData: ChartDataset[] = [];
  public ingresoPorCategoriaChartData: ChartDataset[] = [];
  public ingresoVsGastoChartData: ChartDataset[] = [];
  public chartLabels: string[] = [];
  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Variables para los datos de ingresos y gastos
  presupuesto: any[] = [];
  categoria: any[] = [];
  gasto: any[] = [];
  gastoTotal: number = 0;
  gastoPorCat: any[] = [];
  gastoPorMes: any[] = [];
  gastoPorAno: any[] = [];
  ingreso: any[] = [];
  ingresoTotal: number = 0;
  ingresoPorCat: any[] = [];
  ingresoPorMes: any[] = [];
  ingresoPorAno: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private presupuestos: PresupuestoService,
    private categorias: CategoriaService,
    private gastos: GastoService,
    private ingresos: IngresoService,
  ) {}

  ngOnInit() {
    const userId = Number(localStorage.getItem('uid'));
    this.obtenerDatos(userId);
  }

  obtenerDatos(userId: number) {
    this.presupuestos.getPresupuestos(userId).subscribe((res) => {
      this.presupuesto = res;
    });

    this.categorias.getCategorias(userId).subscribe((res) => {
      this.categoria = res;
    });

    this.gastos.getGastoPorCategoria(userId).subscribe((res) => {
      this.gastoPorCat = res;
      this.crearGastoPorCategoriaChart();
    });

    this.ingresos.getIngresosPorCategoria(userId).subscribe((res) => {
      this.ingresoPorCat = res;
      this.crearIngresoPorCategoriaChart();
    });

    this.ingresos.getTotalIngresos(userId).subscribe((res) => {
      this.ingresoTotal = res;
      this.gastos.getTotalGasto(userId).subscribe((gastoRes) => {
        this.gastoTotal = gastoRes;
        this.crearIngresoVsGastoChart();
      });
    });
  }

  crearGastoPorCategoriaChart() {
    this.chartLabels = this.gastoPorCat.map(g => this.getCategoriaNombre(g.categoriaId));
    this.gastoPorCategoriaChartData = [{
      data: this.gastoPorCat.map(g => g.total),
      label: 'Gastos',
      backgroundColor: '#FF6384',
    }];
  }

  crearIngresoPorCategoriaChart() {
    this.chartLabels = this.ingresoPorCat.map(i => this.getCategoriaNombre(i.categoriaId));
    this.ingresoPorCategoriaChartData = [{
      data: this.ingresoPorCat.map(i => i.total),
      label: 'Ingresos',
      backgroundColor: '#36A2EB',
    }];
  }

  crearIngresoVsGastoChart() {
    this.ingresoVsGastoChartData = [{
      data: [this.ingresoTotal, this.gastoTotal],
      label: 'Comparación Ingresos vs Gastos',
      backgroundColor: ['#36A2EB', '#FF6384'],
    }];
  }

  getCategoriaNombre(categoriaId: number): string {
    const categoria = this.categoria.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Desconocido';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
