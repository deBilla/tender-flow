import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'tender',
                loadChildren: './tender/tender.module#TenderFlowTenderModule'
            },
            {
                path: 'supplier',
                loadChildren: './supplier/supplier.module#TenderFlowSupplierModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TenderFlowEntityModule {}
