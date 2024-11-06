import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { GastoService } from '../services/gasto/gasto.service';
import { IngresoService } from '../services/ingreso/ingreso.service';
import { CategoriaService } from '../services/categoria/categoria.service';
import { PresupuestoService } from '../services/presupuesto/presupuesto.service';
import { AlertController } from '@ionic/angular';
import { TokenType } from '@angular/compiler';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionsPage implements OnInit
{
  catsGastos: any[] = [];
  catsIngresos: any[] = [];
  pres: any[] = [];

  cantidadGasto: number = 0;
  categoriaGasto: any = null;
  descripcionGasto: string = '';

  cantidadIngreso: number = 0;
  categoriaIngreso: any = null;
  descripcionIngreso: string = '';

  gastos2: any[] = [];
  ingresos2: any[] = [];

  total: number = 0;

  constructor(private router:Router ,private authService:AuthService, private gastos: GastoService, private ingresos: IngresoService, private categorias: CategoriaService, private presupuestos: PresupuestoService, private alertController: AlertController, private cd: ChangeDetectorRef) { }

  ngOnInit()
  {
    this.load();
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
      this.gastos.createGasto(gasto).subscribe(() =>
        {
        this.load();
        this.comprobarPresupuestos();
      });
    } else {
      this.alert('Error', 'Selecciona una categoría antes de hacer clic en Agregar');  
    }
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
        this.ingresos.createIngreso(ingreso).subscribe(() =>
        {
          this.load();
        });
    } else {
      this.alert('Error', 'Selecciona una categoría antes de hacer clic en Agregar');  
    }
  }
  
  editarGasto(id: any) {
    if (this.categoriaGasto !== null)
      {
        console.log(this.categoriaGasto.id)
        const gasto =
        {
          "cantidad": this.cantidadGasto,
          "categoriaId": this.categoriaGasto.id,
          "descripcion": this.descripcionGasto,
          "fecha": this.getCurDate(),
          "userId": Number(localStorage.getItem('uid'))
      };
        this.gastos.updateGasto(id, gasto).subscribe(() => {
          this.load();
          this.comprobarPresupuestos();
        });
    } else {
      this.alert('Error', 'Selecciona una categoría antes de hacer clic en Editar');  
    }
    }
  
  delGasto(id: any)
  {
    this.gastos.deleteGasto(id).subscribe(() =>
    {
      this.load();
      this.alert('Exito', 'Gasto eliminado correctamente');
    });
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
      this.ingresos.updateIngreso(id, ingreso).subscribe(() => {
        this.load();
        });
    } else {
      this.alert('Error', 'Elige una categoría antes de hacer clic en Editar')  
    }
  }
  
  delIngreso(id: any) {
    this.ingresos.deleteIngreso(id).subscribe(() =>
    {
      this.load();
      this.alert('Exito', 'Ingreso eliminado correctamente');
      });
  }
  
  comprobarPresupuestos() {
    const userId = Number(localStorage.getItem('uid'));
    for (let pres of this.pres) {
      for (let cat of this.catsGastos) {
        if (pres.categoriaId == cat.id) {
          this.gastos.getGastoPorCategoria(userId).subscribe((res) => {
            console.log(res)
            this.total = res.filter((category: any) => category.categoriaId == cat.id);
          })
          if (pres.cantidad > this.total) {
            this.alert('Cuidado', `Has sobrepasado tu límite de presupuesto de la categoría ${cat.nombre}`)
          }
        }
      }
    }
  }

  load() {

    const userId = Number(localStorage.getItem('uid'));

    this.presupuestos.getPresupuestos(userId).subscribe((presupuestos) =>
    {
      this.pres = presupuestos;
    })

    this.categorias.getCategoriasByTransaccion("Gasto",userId).subscribe((categorias) =>
      {
      this.catsGastos = categorias;
      this.cd.detectChanges();
    });

    this.categorias.getCategoriasByTransaccion("Ingreso",userId).subscribe((categorias) =>
      {
      this.catsIngresos = categorias;
      this.cd.detectChanges();
    });

    this.gastos.getGasto(Number(localStorage.getItem('uid'))).subscribe((data: any) =>
      {
        this.gastos2 = data;
        for (let i = 0; i < data.length; i++)
        {
          for (let j = 0; j < this.catsGastos.length; j++)
          {
            if (this.gastos2[i].categoriaId == this.catsGastos[j].id)
            {
              this.gastos2[i].cat = this.catsGastos[j].nombre;
              break;
            }
          }
        }
      this.cd.detectChanges();
      });
      this.ingresos.getIngresos(Number(localStorage.getItem('uid'))).subscribe((data: any) =>
        {
          this.ingresos2 = data;
          for (let i = 0; i < data.length; i++)
          {
            for (let j = 0; j < this.catsIngresos.length; j++)
            {
              if (this.ingresos2[i].categoriaId == this.catsIngresos[j].id)
              {
                this.ingresos2[i].cat = this.catsIngresos[j].nombre;
                break;
              }
            }
          }
        this.cd.detectChanges();
        });
  }
  
  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
