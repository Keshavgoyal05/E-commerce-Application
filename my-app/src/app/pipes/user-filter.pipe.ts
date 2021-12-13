import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter',
  pure: false
})
export class UserFilterPipe implements PipeTransform {

  transform(value: any, name:any):any {
    if(name == '')
      {
        value.sort(function(a: { user_id: number; }, b: { user_id: number; }) { 
          return a.user_id - b.user_id;
        });;
      }
    return value.filter( (users:any) => 
      ((String(users.user_id).startsWith(name)) || (users.firstName.toLowerCase().startsWith(name.toLowerCase()))) 
    );
    
  }

}
