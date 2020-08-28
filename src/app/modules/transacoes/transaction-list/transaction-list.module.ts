import { NgModule } from '@angular/core';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionDetailModule } from '../transaction-detail/transaction-detail.module';
import { CommonModule } from '@angular/common';
import { InfoModule } from '@shared/components/info/info.module';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';
import { FilterModule } from '@shared/components/filter/filter.module';
import { TransactionRoutingModule } from '../transaction.routing';

@NgModule({
    declarations: [TransactionListComponent],
    imports: [
        CommonModule,
        TransactionRoutingModule,
        TransactionDetailModule,
        FilterModule,
        InfoModule,
        NormalizedLayoutModule
    ]
})
export class TransactionListModule { }
