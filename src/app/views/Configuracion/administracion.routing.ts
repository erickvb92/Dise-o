import { Routes } from "@angular/router";

import { AdministracionComponent } from "./Administracion/administracion.component";

export const  AdministracionRoutes: Routes = [
  {
    path: "",
    component:  AdministracionComponent,
    data: { title: " Administracion", breadcrumb: " Administracion" }
  },
];
