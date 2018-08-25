import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { XlsxToJsonService } from './xlsx-to-json-service';
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
// import { GanttModule } from 'ng2-gantt';
import { DoughnutChartComponent, PieChartComponent, BarChartComponent } from 'angular-d3-charts';
import { AppRoutingModule } from './/app-routing.module';

const APP_PROVIDERS = [AppState];
type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void, 
  disposeOldHosts: () => void
};
@NgModule({
  declarations: [
    AppComponent,
    DoughnutChartComponent, 
    PieChartComponent, 
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
    // GanttModule
  ],
  providers: [XlsxToJsonService , APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
