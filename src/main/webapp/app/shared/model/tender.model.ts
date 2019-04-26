import { ISupplier } from 'app/shared/model/supplier.model';

export interface ITender {
    id?: number;
    title?: string;
    description?: string;
    itemInfoContentType?: string;
    itemInfo?: any;
    tenderResponses?: ISupplier[];
}

export class Tender implements ITender {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public itemInfoContentType?: string,
        public itemInfo?: any,
        public tenderResponses?: ISupplier[]
    ) {}
}
