import { NgModule } from '@angular/core';
import { SharedSearchModuleModule } from '../shared/shared-search-module.module';
import { MainPanelComponent } from './main-panel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainPanelComponent
  ],
  imports: [
    SharedSearchModuleModule,
    RouterModule.forChild([
      { path: 'home', component: MainPanelComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full'}
    ])
  ],
  exports: [
    MainPanelComponent
  ]
})
export class MainPanelModule { }
