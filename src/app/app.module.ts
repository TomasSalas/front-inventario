import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewSalidasComponent } from './view-salidas/view-salidas.component';
import { SalidaComponent } from './salida/salida.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'view-salidas', component: ViewSalidasComponent },
  { path: 'salida', component: SalidaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SalidaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxSelectModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
