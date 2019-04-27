import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISupplier } from 'app/shared/model/supplier.model';
import { SupplierService } from './supplier.service';
import { IUser, UserService, AccountService } from 'app/core';
import { ITender } from 'app/shared/model/tender.model';
import { TenderService } from 'app/entities/tender';

@Component({
    selector: 'jhi-supplier-update',
    templateUrl: './supplier-update.component.html'
})
export class SupplierUpdateComponent implements OnInit {
    supplier: ISupplier;
    isSaving: boolean;
    account: Account;
    users: IUser[];

    tenders: ITender[];

    constructor(
        private accountService: AccountService,
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected supplierService: SupplierService,
        protected userService: UserService,
        protected tenderService: TenderService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ supplier }) => {
            this.supplier = supplier;
        });
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.tenderService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITender[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITender[]>) => response.body)
            )
            .subscribe((res: ITender[]) => (this.tenders = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.supplier.id !== undefined) {
            this.subscribeToSaveResponse(this.supplierService.update(this.supplier));
        } else {
            this.subscribeToSaveResponse(this.supplierService.create(this.supplier));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplier>>) {
        result.subscribe((res: HttpResponse<ISupplier>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackTenderById(index: number, item: ITender) {
        return item.id;
    }
}
