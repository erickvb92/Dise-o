import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

import {  AdministracionRoutes } from "./administracion.routing";
import {  AdministracionComponent } from './Administracion/administracion.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgxEchartsModule,
    SharedPipesModule,
    RouterModule.forChild(AdministracionRoutes)
  ],
  declarations: [AdministracionComponent],
  exports: []
})
export class AdministracionModule {

}
