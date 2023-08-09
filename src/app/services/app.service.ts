import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BodyAddEquipo } from 'src/model/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  dominioApi:string = 'https://wo-fifa.azurewebsites.net/';

  constructor( private http:HttpClient ) { }

  controlApi( url:string, type: 'GET' | 'POST' | 'DELETE' | 'PUT', data?:Object ){
    switch (type) {
      case 'GET':
        return this.http.get(this.dominioApi + url);
        break;
      case 'POST':
        return this.http.post(this.dominioApi + url, data);
        break;
      case 'DELETE':
        return this.http.delete(this.dominioApi + url);
        break;
      case 'PUT':
        return this.http.put(this.dominioApi + url, data);
        break;

    }
  }

  login() {
    return this.controlApi('login', 'POST', { text: ''})
  }

  getEquipos(pagina:number){
    return this.controlApi(`equipos/listar/${pagina}/50`, 'GET')
  }

  addEquipo( data:BodyAddEquipo ){
    return this.controlApi('equipos/crear', 'POST', data)
  }

  actualizarEquipo( data:BodyAddEquipo, id:number ){
    return this.controlApi(`equipos/actualizar/${id}`, 'PUT', data)
  }

  deleteEquipo( id:number ){
    return this.controlApi(`equipos/eliminar/${id}`, 'DELETE')
  }

  consultarEquiposFecha( fechaInicio:string, fechaFin:string ){
    return this.controlApi(`equipos/consultar/${fechaInicio}/${fechaFin}/`, 'GET')
  }

  consultarID( id:number ){
    return this.controlApi(`equipos/consultar/${id}`, 'GET')
  }
}
