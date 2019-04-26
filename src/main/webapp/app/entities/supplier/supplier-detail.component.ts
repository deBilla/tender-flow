import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISupplier } from 'app/shared/model/supplier.model';

@Component({
    selector: 'jhi-supplier-detail',
    templateUrl: './supplier-detail.component.html'
})
export class SupplierDetailComponent implements OnInit {
    supplier: ISupplier;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ supplier }) => {
            this.supplier = supplier;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
