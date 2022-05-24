import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ViewEmploye } from '../models/viewEmploye';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // private usuario = new BehaviorSubject<Usuario[]>([]);
  private usuario: ViewEmploye;
  private usuariosubject = new BehaviorSubject<ViewEmploye>(null);

  constructor(
    private http: HttpClient,
  ) { }

  getUsuarios(): Observable<ViewEmploye[]>  {
    return this.http.get<ViewEmploye[]>(`${environment.apiURL}/user/getUsuarios`); 
  }

  getDataUsuario(): Observable<ViewEmploye> {
    return this.usuariosubject.asObservable();
  }

  private refresh() {
    this.usuariosubject.next(this.usuario);
  }

  getUsuarioObservable(id:number){
    let viewEmploye: ViewEmploye ={idEmpleado:1,nombre:"n827743",idPerfil:1,perfilName:"supervisor"}
    this.usuario = viewEmploye;
    this.refresh();
  }

}
