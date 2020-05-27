import {NgModule} from '@angular/core';
import {AddTasksComponent} from './add-tasks/add-tasks.component';
import {ShowTasksComponent} from './show-tasks/show-tasks.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginCompComponent} from './login-comp/login-comp.component';
import {ProductUpdateComponent} from './product-update/product-update.component';

const routes: Routes = [
  {path: '', component: LoginCompComponent},
  {path: 'addtasks', component: AddTasksComponent},
  {path: 'mytasks', component: ShowTasksComponent},
  {path: 'product', component: ProductUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouterModule {}
