// login.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { RegistroModalComponent } from '../register-modal/register-modal.component';
import { AuthService } from '../services/auth/auth.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  async onLogin() {
    if (this.usuario !== '' && this.contrasena !== '') {
      try {
        const success = await this.authService.login(this.usuario, this.contrasena);
        console.log(success);
        if (success) {
          // Redirigir a la página principal si el login es exitoso
          this.router.navigate(['/home']);
        } else {
          this.alert('Error', 'Usuario o contraseña incorrectos');
        }
      } catch (error) {
        this.alert('Error', 'Hubo un problema con la autenticación');
      }
    } else {
      this.alert('Error', 'Alguno de los campos está vacío');
    }
  }

  async abrirModalRegistro() {
    const modal = await this.modalCtrl.create({
      component: RegistroModalComponent,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log('Usuario registrado:', data.data);
        this.usuarioService.createUser(data.data).subscribe();
      }
    });

    return await modal.present();
  }

  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
