import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { GastoService } from '../gasto/gasto.service';
import { IngresoService } from '../ingreso/ingreso.service';
import { CategoriaService } from '../categoria/categoria.service';
import { PresupuestoService } from '../presupuesto/presupuesto.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CopiaSeguridadService {

  private backUpPath: string = "";

  constructor(
    private gastoService: GastoService,
    private ingresoService: IngresoService,
    private categoriaService: CategoriaService,
    private presupuestoService: PresupuestoService
  ) {}

  async createBackup(): Promise<void> {
    try {
      const userId = localStorage.getItem('uid');

     // Obtener todos los datos en paralelo
    const [gastos, ingresos, categorias, presupuestos] = await Promise.all([
      firstValueFrom(this.gastoService.getGasto(userId)).catch(() => []), // Si falla, devuelve un array vacío
      firstValueFrom(this.ingresoService.getIngresos(userId)).catch(() => []),
      firstValueFrom(this.categoriaService.getCategorias(userId)).catch(() => []),
      firstValueFrom(this.presupuestoService.getPresupuestos(userId)).catch(() => [])
    ]);

    // Crear JSON de los datos
    const backUp = {
      gastos: gastos || [],
      ingresos: ingresos || [],
      categorias: categorias || [],
      presupuestos: presupuestos || []
    };

      // Guarda el archivo de respaldo
      const backupPath = `backup-${new Date().toISOString()}.json`;
      await Filesystem.writeFile({
        path: backupPath,
        data: JSON.stringify(backUp),
        directory: Directory.External,
        encoding: Encoding.UTF8,
      });

      alert('Copia de seguridad creada y compartida exitosamente');
    } catch (error) {
      console.error('Error al crear la copia de seguridad:', error);
      alert('Error al crear la copia de seguridad: ' + JSON.stringify(error));
    }
  }
}
