import { IUser } from 'app/core/user/user.model';
import { ITender } from 'app/shared/model/tender.model';

export interface ISupplier {
    id?: number;
    name?: string;
    company?: string;
    suppRespContentType?: string;
    suppResp?: any;
    login?: IUser;
    supplierResponse?: ITender;
}

export class Supplier implements ISupplier {
    constructor(
        public id?: number,
        public name?: string,
        public company?: string,
        public suppRespContentType?: string,
        public suppResp?: any,
        public login?: IUser,
        public supplierResponse?: ITender
    ) {}
}
