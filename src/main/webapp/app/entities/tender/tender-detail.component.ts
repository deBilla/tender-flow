import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';
import { filter, map } from 'rxjs/operators';
import { ITender } from 'app/shared/model/tender.model';
import { SupplierService } from '../supplier/supplier.service';
import { ISupplier } from 'app/shared/model/supplier.model';
import { JhiAlertService} from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
@Component({
    selector: 'jhi-tender-detail',
    templateUrl: './tender-detail.component.html'
})
export class TenderDetailComponent implements OnInit {
    tender: ITender;
    suppliers: ISupplier[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected activatedRoute: ActivatedRoute,
        protected supplierService: SupplierService,
        protected jhiAlertService: JhiAlertService,
        ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tender }) => {
            this.tender = tender;
        });
        this.supplierService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISupplier[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISupplier[]>) => response.body)
            )
            .subscribe((res: ISupplier[]) => (this.suppliers = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackId(index: number, item: ISupplier) {
        return item.supplierResponse;
    }
}
