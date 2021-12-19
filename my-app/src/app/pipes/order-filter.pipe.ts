import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(value: any, orderFilterCreteria:any):any {
    if(orderFilterCreteria=="Active")
      return value = value.filter((x: { order_status: string; }) =>(x.order_status=="ordered"));
    if(orderFilterCreteria=="Past")
      return value = value.filter((x: { order_status: string; }) =>(x.order_status=="delivered"));
    if(orderFilterCreteria=="Canceled")
      return value = value.filter((x: { order_status: string; }) =>(x.order_status=="canceled"));
    return value;
  }

}
