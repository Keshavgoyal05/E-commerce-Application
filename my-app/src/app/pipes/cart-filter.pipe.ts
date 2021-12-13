import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartFilter',
  pure: false
})
export class CartFilterPipe implements PipeTransform {

  transform(value: any[]): number {
    return value.reduce((sum, item) => sum + (item.price*item.quantity), 0);;
  }

}
