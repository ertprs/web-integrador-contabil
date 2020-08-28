import { NgModule } from '@angular/core';
import { BreadcrumbFilterComponent } from './breadcrumb-filter.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbInputFilterModule } from './breadcrumb-input-filter/breadcrumb-input-filter.module';

@NgModule({
  declarations: [BreadcrumbFilterComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbInputFilterModule
  ],
  exports: [BreadcrumbFilterComponent]
})
export class BreadcrumbFilterModule {
}
