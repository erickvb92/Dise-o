import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { IMenuItem } from './../models/i-menu-item';

interface Permisos {
  id: string;
  idPerfil: string;
  nombrePerfil: string;
  idModulo: string;
  autorizado: boolean;
}

@Injectable()
export class NavigationService {
  
  iconMenu: IMenuItem[] = [];
 
  constructor(
    private http: HttpClient
  ) {}

  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  
  // // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  
  getMenu(id) {
    return this.plainMenu;
  }

 
  
   plainMenu: IMenuItem[] = [
     {
       id: 1,
       name: "Principal",
       type: "link",
       tooltip: "Dashboard",
       icon: "dashboard",
       state: "dashboard"
     },
     {
       id: 6,
       name: "Catalogo",
       type: "dropDown",
       tooltip: "Catalogos",
       icon: "filter_none",
       state: "dialogs",
       sub: [
         { id:"61", name: "Catalogos de puestos", state: "confirm" },
         { id:"61", name: "Perfiles", state: "confirm" },
         { id:"61", name: "Centro de Costos", state: "confirm" },
         { id:"61", name: "Parametros", state: "confirm" },
       ]
     },
     {
       id: 7,
       name: "Configuracion Reglas",
       type: "dropDown",
       icon: "settings",
       state: "component",
       sub: [
         {id:"71",  name: "Administracion de reglas", state: "buttons" },
       ]
     },
     {
      id: 8,
      name: "Modulo Autorizacion",
      type: "dropDown",
      tooltip: "Modulo de autorizacion",
      icon: "playlist_add_check",
      state: "forms",
      sub: [
        {id:"81", name: "Operaciones Pendientes", state: "basic" },
        {id:"82", name: "Reporte de Operaciones", state: "editor" },
      ]
    },
     {
       id: 9,
       name: "Modulo de Operaciones",
       type: "dropDown",
       tooltip: "Modulo de Operaciones",
       icon: "memory",
       state: "forms",
       sub: [
         {id:"81", name: "Consulta de Operaciones Pendientes", state: "basic" },
         {id:"82", name: "Reporte de Operaciones 390", state: "editor" },
       ]
     }
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = "";

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case "separator-menu":
        // this.menuItems.next(this.separatorMenu);
        break;
      case "icon-menu":
        this.menuItems.next(this.iconMenu);
        break;
      default:
        // this.menuItems.next(this.plainMenu);
    }
  }
}
