import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BarChartComponentComponent } from './bar-chart-component/bar-chart-component.component';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  // { path: 'app-bar-chart-component', component: BarChartComponentComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports :[RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
