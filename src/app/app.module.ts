import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ShowTasksComponent } from './show-tasks/show-tasks.component';

import { AppRouterModule } from './app.router.module';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LoginCompComponent } from './login-comp/login-comp.component';
import {ShowTasksModule} from './show-tasks/show-tasks.module';
import { ProductUpdateComponent } from './product-update/product-update.component';


@NgModule({
  declarations: [
    AppComponent,
    AddTasksComponent,
    ShowTasksComponent,
    LoginCompComponent,
    ProductUpdateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    AppRouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShowTasksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
