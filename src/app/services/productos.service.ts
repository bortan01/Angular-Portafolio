import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterfase } from '../interfaces/producto-interfase';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  cargando = true;
  ListaProductos: ProductoInterfase[] = [];
  productoFiltrad: ProductoInterfase[] = [];
  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get('https://flutter-varios-11491.firebaseio.com/producto_idx.json')
        .subscribe((resp: ProductoInterfase[]) => {
          this.ListaProductos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProducto(id: String) {
    return this.http.get(
      `https://flutter-varios-11491.firebaseio.com/productoX/${id}.json`
    );
  }

  buscarPrducto(termino: string) {
    if (this.ListaProductos) {
      //cargar productos
      this.cargarProductos().then(() => {
        ///despues de tener los productos, aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      ///cargar el filtro
      this.filtrarProductos(termino);
    }
    this.productoFiltrad = this.ListaProductos.filter((producto) => {
      return true;
    });
  }
  private filtrarProductos(termino: string) {
    this.productoFiltrad = [];
    this.ListaProductos.forEach((prod) => {
      if (prod.categoria.indexOf(termino) >= 0) {
        this.productoFiltrad.push(prod);
      }
    });
  }
}
