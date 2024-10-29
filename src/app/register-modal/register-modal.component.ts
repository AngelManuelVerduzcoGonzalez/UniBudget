import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegistroModalComponent {
  nombre: string = '';
  username: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  correo: string = '';

  constructor(private modalCtrl: ModalController, private alertController: AlertController) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  registrarUsuario() {
    if (this.nombre !== '' && this.username !== '' && this.contrasena !== '' && this.confirmarContrasena !== '' && this.correo !== '') {
      if (this.contrasena !== this.confirmarContrasena) {
        this.alert('Error', 'Las contraseñas no coinciden');
        return;
      }

      const datosUsuario = {
        nombre: this.nombre,
        username: this.username,
        contrasena: this.contrasena,
        correo: this.correo,
      };

      this.alert('Exito', 'Usuario creado con exito');

      // Cerrar el modal y enviar los datos
      this.modalCtrl.dismiss(datosUsuario);
    } else {
      this.alert('Error', 'Uno o más campos estan vacíos');
    }
  }

  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
