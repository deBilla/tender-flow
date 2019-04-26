import { Pipe, PipeTransform } from '@angular/core';
import { ISupplier } from 'app/shared/model/supplier.model';

@Pipe({ name: 'custpipe' })
export class CustPipe implements PipeTransform {
  transform(data: ISupplier[], tenderId: number) {  // replace the any with your interface for data.
    return data.filter(home => (home.supplierResponse.id === tenderId));
  }
}
