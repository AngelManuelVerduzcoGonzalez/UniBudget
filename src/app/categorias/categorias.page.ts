import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categoria/categoria.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriasPage implements OnInit
{
  nom: string = '';
  catsIngreso: any[] = [];
  catsGasto: any[] = [];

  constructor(private router:Router ,private authService:AuthService, private cacategorias: CategoriaService, private alertController: AlertController, private cd: ChangeDetectorRef) { }

  ngOnInit()
  {
    this.load();
  }
  
  addGasto() {
    if (this.nom !== '')
      {
        const cat =
        {
          "nombre": this.nom,
          "transaccion": "Gasto",
          "userId": Number(localStorage.getItem('uid'))
        };
        this.cacategorias.createCategoria(cat).subscribe(() => {
          this.load();
        });
      } else {
        this.alert('Error', 'Coloca el nuevo nombre de la categoría antes de hacer clic en Agregar')
      }
  }
  
  addIngreso() {
    if (this.nom !== '')
      {
        const cat =
        {
          "nombre": this.nom,
          "transaccion": "Ingreso",
          "userId": Number(localStorage.getItem('uid'))
      };
        this.cacategorias.createCategoria(cat).subscribe(() => {
          this.load();
        });
      this.cd.detectChanges();
      } else {
        this.alert('Error', 'Coloca el nuevo nombre de la categoría antes de hacer clic en Agregar')
      }
    }
  
  updGasto(id: any) {
    if (this.nom !== '')
      {
        const cat =
        {
          "nombre": this.nom,
          "transaccion": "Gasto",
          "userId": Number(localStorage.getItem('uid'))
      };
        this.cacategorias.updateCategoria(id, cat).subscribe(() => {
          this.load();
        });
      this.cd.detectChanges();
    } else {
      this.alert('Error', 'Coloca el nuevo nombre de la categoría antes de hacer clic en Editar')
    }
  }

  updIngreso(id: any) {
    if (this.nom !== '')
      {
        const cat =
        {
          "nombre": this.nom,
          "transaccion": "Ingreso",
          "userId": Number(localStorage.getItem('uid'))
      };
        this.cacategorias.updateCategoria(id, cat).subscribe(() => {
          this.load();
        });
      this.cd.detectChanges();
      } else {
        this.alert('Error', 'Coloca el nuevo nombre de la categoría antes de hacer clic en Editar')
      }
  }
  
  del(id: any) {
    this.cacategorias.deleteCategoria(id).subscribe((res) => {
      this.load();
      console.log("Categoría eliminada exitosamente");
    });
  }

  load()
  {
    this.cacategorias.getCategoriasByTransaccion("Gasto", Number(localStorage.getItem('uid'))).subscribe((data: any) =>
    {
      this.catsGasto = data;
      this.cd.detectChanges();
    });

    this.cacategorias.getCategoriasByTransaccion("Ingreso", Number(localStorage.getItem('uid'))).subscribe((data: any) =>
    {
      this.catsIngreso = data;
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
