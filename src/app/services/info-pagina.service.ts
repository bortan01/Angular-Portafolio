import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root',
})
export class InfoPaginaService {
  info: InfoPagina = {};
  equipo: any[] = [];
  cargada = false;

  constructor(private http: HttpClient) {
    console.log('info pagina cargada');
    this.cargarInfo();
    this.cargarEquicpo();
  }
  private cargarInfo() {
    //LEER ARCHIVO JSON
    this.http
      .get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        console.log(resp);
        //SI QUEREMOS UN ELEMENTO EN ESPECIFICO HACEMOS LO SIGUIETN
        console.log(resp.twitter);
      });
  }
  private cargarEquicpo() {
    ///facer una peticio a firebase
    this.http
      .get('https://flutter-varios-11491.firebaseio.com/equipo.json')
      .subscribe((resp: any[]) => {
        this.equipo = resp;
      });
  }
}
