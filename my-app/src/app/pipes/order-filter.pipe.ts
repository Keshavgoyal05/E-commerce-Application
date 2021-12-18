import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(value: any, orderFilterCreteria:any):any {
    return value;
  }

}
