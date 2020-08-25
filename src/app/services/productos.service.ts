import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterfase } from '../interfaces/producto-interfase';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  cargando = true;
  ListaProductos: ProductoInterfase[];
  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http
      .get('https://flutter-varios-11491.firebaseio.com/producto_idx.json')
      .subscribe((resp: ProductoInterfase[]) => {
        this.ListaProductos = resp;
        this.cargando = false;
      });
  }
}
