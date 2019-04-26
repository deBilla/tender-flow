import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { ITender } from 'app/shared/model/tender.model';
import { TenderService } from './tender.service';

@Component({
    selector: 'jhi-tender-update',
    templateUrl: './tender-update.component.html'
})
export class TenderUpdateComponent implements OnInit {
    tender: ITender;
    isSaving: boolean;

    constructor(protected dataUtils: JhiDataUtils, protected tenderService: TenderService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tender }) => {
            this.tender = tender;
        });
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
        if (this.tender.id !== undefined) {
            this.subscribeToSaveResponse(this.tenderService.update(this.tender));
        } else {
            this.subscribeToSaveResponse(this.tenderService.create(this.tender));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITender>>) {
        result.subscribe((res: HttpResponse<ITender>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
