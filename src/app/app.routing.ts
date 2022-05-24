import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { GroupComponent } from './views/Catalogos/group/group.component';
import { AdministracionComponent } from './views/Configuracion/Administracion/administracion.component';

export const rootRouterConfig: Routes = [
  { 
    path: '', 
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'dashboard', 
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule), 
        data: { title: 'Dashboards', breadcrumb: 'DASHBOARD'}
      }
    ]
  },
  {
    path: '', 
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'sessions', 
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session'} 
      }
    ]
  },
  {
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'dialogs/grupos', 
        loadChildren: () => import('./views/Catalogos/group.module').then(m => m.GroupModule),
        data: { title: 'dialogs'} 
      }
    ]
  },
  {
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'component/buttons', 
        loadChildren: () => import('./views/Configuracion/administracion.module').then(m => m.AdministracionModule),
        data: { title: 'adminitracion'} 
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'sessions/404'
  }
];

