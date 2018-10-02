import { Pipe, PipeTransform } from '@angular/core';

import { Cart } from '../../models/cart.model';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {
  transform(array:[Cart], sortBy:string, sortOrder:boolean) {

    console.log(array, sortBy, sortOrder);

    array.sort((a: any, b: any) => {
      if (a[sortBy] < b[sortBy]) {
        return sortOrder ? 1 : -1;
      } else if (a[sortBy] > b[sortBy]) {
        return sortOrder ? -1 : 1;
      } else {
        return 0;
      }
    });

    return array;
  }
}
