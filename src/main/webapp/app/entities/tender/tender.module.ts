import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TenderFlowSharedModule } from 'app/shared';
import {
    TenderComponent,
    TenderDetailComponent,
    TenderUpdateComponent,
    TenderDeletePopupComponent,
    TenderDeleteDialogComponent,
    tenderRoute,
    tenderPopupRoute
} from './';
import { CustPipe } from './tender.cust';

const ENTITY_STATES = [...tenderRoute, ...tenderPopupRoute];

@NgModule({
    imports: [TenderFlowSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TenderComponent, TenderDetailComponent, TenderUpdateComponent, TenderDeleteDialogComponent, TenderDeletePopupComponent, CustPipe],
    entryComponents: [TenderComponent, TenderUpdateComponent, TenderDeleteDialogComponent, TenderDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TenderFlowTenderModule {}
