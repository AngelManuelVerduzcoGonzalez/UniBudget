import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { PresupuestoService } from '../services/presupuesto/presupuesto.service';
import { CategoriaService } from '../services/categoria/categoria.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.page.html',
  styleUrls: ['./presupuestos.page.scss'],
})
export class PresupuestosPage implements OnInit
{
  cats: any[] = [];
  pres: any[] = [];

  cantPres: number = 0;
  catPres: any;


  constructor(private router:Router ,private authService:AuthService, private presupuestos: PresupuestoService, private categorias: CategoriaService) { }

  ngOnInit()
  {
    const userId = Number(localStorage.getItem('uid'));
    this.categorias.getCategoriasByTransaccion('Gasto', userId).subscribe((categorias) =>
      {
        this.cats = categorias;
    });

    this.presupuestos.getPresupuestos(Number(localStorage.getItem('uid'))).subscribe((data: any) =>
      {
        this.pres = data;
        console.log(this.pres);
        for (let i = 0; i < data.length; i++)
          {
            for (let j = 0; j < this.cats.length; j++)
            {
              if (this.pres[i].categoriaId == this.cats[j].id)
              {
                this.pres[i].cat = this.cats[j].nombre;
                break;
              }
            }
          }
      });
  }
  
  add()
  {
    if (this.catPres !== null)
      {
        const presupuesto =
        {
          "cantidad": this.cantPres,
          "categoriaId": this.catPres.id,
          "userId": Number(localStorage.getItem('uid'))
      };
        this.presupuestos.createPresupuesto(presupuesto).subscribe(() => {
          console.log(presupuesto);
        });;
      }
      window.location.reload();
    }
  
  upd(id: any) {
    if (this.catPres !== null)
      {
        const presupuesto =
        {
          "cantidad": this.cantPres,
          "categoriaId": this.catPres.id,
          "userId": Number(localStorage.getItem('uid'))
      };
        this.presupuestos.updatePresupuesto(id, presupuesto).subscribe(() => {
          console.log(presupuesto);
        });;
      }
      window.location.reload();
    }
  
  del(id: any)
  {
    this.presupuestos.deletePresupuesto(Number(localStorage.getItem('uid')), id).subscribe(() =>
    {
      console.log("Presupuesto eliminado correctamente");
    });;
    window.location.reload();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
