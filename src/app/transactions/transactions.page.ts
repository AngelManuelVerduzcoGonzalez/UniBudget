import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { GastoService } from '../services/gasto/gasto.service';
import { IngresoService } from '../services/ingreso/ingreso.service';
import { CategoriaService } from '../services/categoria/categoria.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})

export class TransactionsPage implements OnInit
{
  cats: any[] = [];

  cantidadGasto: number = 0;
  categoriaGasto: any;
  descripcionGasto: string = '';

  cantidadIngreso: number = 0;
  categoriaIngreso: any;
  descripcionIngreso: string = '';

  gastos2: any[] = [];
  ingresos2: any[] = [];


  constructor(private router:Router ,private authService:AuthService, private gastos: GastoService, private ingresos: IngresoService, private categorias: CategoriaService) { }

  ngOnInit()
  {
    const userId = Number(localStorage.getItem('uid'));
    this.categorias.getCategorias(userId).subscribe((categorias) =>
      {
        this.cats = categorias;
    });

    this.gastos.getGasto(Number(localStorage.getItem('uid'))).subscribe((data: any) =>
      {
        this.gastos2 = data;
        for (let i = 0; i < data.length; i++)
        {
          for (let j = 0; j < this.cats.length; j++)
          {
            if (this.gastos2[i].categoriaId == this.cats[j].id)
            {
              this.gastos2[i].cat = this.cats[j].nombre;
              break;
            }
          }
        }
      });
      this.ingresos.getIngresos(Number(localStorage.getItem('uid'))).subscribe((data: any) =>
        {
          this.ingresos2 = data;
          for (let i = 0; i < data.length; i++)
          {
            for (let j = 0; j < this.cats.length; j++)
            {
              if (this.ingresos2[i].categoriaId == this.cats[j].id)
              {
                this.ingresos2[i].cat = this.cats[j].nombre;
                break;
              }
            }
          }
        });
  }

  getCurDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegura dos dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Asegura dos dígitos
    return `${year}-${month}-${day}`;
  };
  
  agregarGasto()
  {
    if (this.categoriaGasto !== null)
    {
      const gasto =
      {
        "cantidad": this.cantidadGasto,
        "categoriaId": this.categoriaGasto.id,
        "descripcion": this.descripcionGasto,
        "fecha": this.getCurDate(),
        "userId": Number(localStorage.getItem('uid'))
      };
      console.log(gasto);
      this.gastos.createGasto(gasto).subscribe(() =>
        {
        console.log(gasto);
      });;
    }
    window.location.reload();
  }

  agregarIngreso()
  {
    if (this.categoriaIngreso !== null)
      {
        const ingreso =
        {
          "cantidad": this.cantidadIngreso,
          "categoriaId": this.categoriaIngreso.id,
          "descripcion": this.descripcionIngreso,
          "fecha": this.getCurDate(),
          "userId": Number(localStorage.getItem('uid'))
        };
        console.log(ingreso);
        this.ingresos.createIngreso(ingreso).subscribe(() =>
          {
          console.log(ingreso);
        });;
      }
      window.location.reload();
    }
  
  editarGasto(id: any) {
    if (this.categoriaGasto !== null)
      {
        const gasto =
        {
          "cantidad": this.cantidadGasto,
          "categoriaId": this.categoriaGasto.id,
          "descripcion": this.descripcionGasto,
          "fecha": this.getCurDate(),
          "userId": Number(localStorage.getItem('uid'))
      };
        console.log(gasto);
        this.gastos.updateGasto(id, gasto).subscribe(() => {
          console.log(gasto);
        });;
      }
      window.location.reload();
    }
  
  delGasto(id: any)
  {
    this.gastos.deleteGasto(id).subscribe(() =>
    {
      console.log("Gasto eliminado correctamente");
    });;
    window.location.reload();
  }

  editarIngreso(id: any) {
    if (this.categoriaIngreso !== null)
      {
        const ingreso =
        {
          "cantidad": this.cantidadIngreso,
          "categoriaId": this.categoriaIngreso.id,
          "descripcion": this.descripcionIngreso,
          "fecha": this.getCurDate(),
          "userId": Number(localStorage.getItem('uid'))
      };
        console.log(ingreso);
        this.ingresos.updateIngreso(id, ingreso).subscribe(() => {
          console.log(ingreso);
        });;
      }
      window.location.reload();
    }
  
  delIngreso(id: any) {
    this.ingresos.deleteIngreso(id).subscribe(() =>
      {
        console.log("Ingreso eliminado correctamente");
      });;
      window.location.reload();
    }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
