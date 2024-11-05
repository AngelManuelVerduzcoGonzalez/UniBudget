import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categoria/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit
{
  nom: string = '';
  cats: any[] = [];


  constructor(private router:Router ,private authService:AuthService, private cacategorias: CategoriaService) { }

  ngOnInit()
  {
    this.load();
  }
  
  add() {
    if (this.nom !== null)
      {
        const cat =
        {
          "nombre": this.nom,
          "transaccion": "Gasto",
          "userId": Number(localStorage.getItem('uid'))
      };
        console.log(cat);
        this.cacategorias.createCategoria(cat).subscribe(() => {
          console.log(cat);
        });;
      }
      window.location.reload();
    }
  
  upd(id: any) {
    if (this.nom !== null)
      {
        const cat =
        {
          "nombre": this.nom,
          "transaccion": "Gasto",
          "userId": Number(localStorage.getItem('uid'))
      };
        console.log(cat);
        this.cacategorias.updateCategoria(id, cat).subscribe(() => {
          console.log(cat);
        });;
      }
      window.location.reload();
    }
  
  del(id: any) {
    this.cacategorias.deleteCategoria(id).subscribe(() => {
      console.log("Categoría eliminada exitosamente");
    });;
    window.location.reload();
  }

  load()
  {
    this.cacategorias.getCategorias(Number(localStorage.getItem('uid'))).subscribe((data: any) =>
    {
      this.cats = data;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
