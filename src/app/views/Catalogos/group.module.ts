import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

import { GroupRoutes } from "./group.routing";
import { GroupComponent } from './group/group.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgxEchartsModule,
    SharedPipesModule,
    RouterModule.forChild(GroupRoutes)
  ],
  declarations: [GroupComponent],
  exports: []
})
export class GroupModule {

}
