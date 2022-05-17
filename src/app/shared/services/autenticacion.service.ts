import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { ViewEmploye } from '../models/viewEmploye';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  
  private currentUserSubject: BehaviorSubject<ViewEmploye>;
  public currentUser: Observable<ViewEmploye>;
  public currentProfile: Observable<ViewEmploye>;
  private empleadoLogeado = new BehaviorSubject<ViewEmploye>(null);
  private checknewTime = new BehaviorSubject<any>(null);
  empleadoLog$ = this.empleadoLogeado.asObservable();
  newTime$ = this.checknewTime.asObservable()

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<ViewEmploye>(JSON.parse(localStorage.getItem('currentUserSessionReglas')));
    this.currentUser = this.currentUserSubject.asObservable();
    //this.currentProfileSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('perfilEmpleado')));
    //this.currentProfile = this.currentProfileSubject.asObservable();
  }

  public get currentUserValue(): ViewEmploye {
    return this.currentUserSubject.value;
  }

 /* public get currentProfileValue(): any {
    return this.currentProfileSubject.value;
  }*/

  getEmpleadoLogeado(idUser) {
    return this.http.get(`${environment.apiURL}/dashboard/getEmployeById/${idUser}`).subscribe(
      (empleado: ViewEmploye) => {
        // console.log(empleado);
        this.empleadoLogeado.next(empleado);
        this.checknewTime.next(Date.now())
      }, 
      (error) => console.log(error) 
    );
  }

  getUser(idUser) {
    return this.http.get(`${environment.apiURL}/dashboard/getEmployeById/${idUser}`);
  }

  loginUser(user) {
    const headerss = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.apiURL}/dashboard/autenticacion`, JSON.stringify(user), { headers: headerss })
      .pipe(map( user => {
        // this.currentUserSubject.next(user.idEmpleado);
        // this.currentProfileSubject.next(user.perfil);
        return user;
      }));
  }

  isLogin(user) {
    console.log(user);
    this.currentUserSubject.next(user.idEmpleado);
    //this.currentProfileSubject.next(user.perfil);
  }

  restoreUser(user) {
    const headerss = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.apiURL}/dashboard/restoreEmploye`, JSON.stringify(user), { headers: headerss })
  }

  updatePassword(user) {
    const headerss = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${environment.apiURL}/dashboard/changePassword`, JSON.stringify(user), { headers: headerss })
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUserSessionReglas');
    //localStorage.removeItem('perfilEmpleado');
    this.currentUserSubject.next(null);
    //this.currentProfileSubject.next(null);
  }

  userAuthenticated(idPerfil: any, idOpcion: number) {
    return this.http.get(`${environment.apiURL}/config/isAuthenticated/${idPerfil}/${idOpcion}`);
  }

}

