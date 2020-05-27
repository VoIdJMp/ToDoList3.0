import {NgModule} from '@angular/core';
import {ShowTasksComponent} from './show-tasks.component';
import {TaskTableComponent} from './task-table/task-table.component';
import {CommonModule} from '@angular/common';
import {AppRouterModule} from '../app.router.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MaterialModule} from '../material.module';

@NgModule({
  declarations: [
    TaskTableComponent
  ],
  imports: [
    CommonModule,
    AppRouterModule,
    NgxMaterialTimepickerModule,
    MaterialModule
  ],
  exports: [
    TaskTableComponent
  ],
  bootstrap: [ShowTasksComponent]
})

export class ShowTasksModule {}
