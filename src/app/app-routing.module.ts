import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  {path:'',redirectTo:'welcome',pathMatch:'full'}, // default path
  {path:'welcome',component:WelcomeComponent}, // path to welcome component
  {path:'question',component:QuestionComponent}, // path to question component

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
