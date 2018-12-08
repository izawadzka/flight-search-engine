import { NgModule } from '@angular/core';
import { SharedSearchModuleModule } from '../shared/shared-search-module.module';
import { MainPanelComponent } from './main-panel.component';

@NgModule({
  declarations: [
    MainPanelComponent
  ],
  imports: [
    SharedSearchModuleModule
  ],
  exports: [
    MainPanelComponent
  ]
})
export class MainPanelModule { }
