import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clothesFilter'
})
export class ClothesFilterPipe implements PipeTransform {

  transform(value: any[],isapply : boolean, selectedSubCategory : string , priceRange : number, sortType : string): any[] {
    if(isapply){
      console.log("selected sub cartegory is :  " + selectedSubCategory);
      if(selectedSubCategory!="select"){
        value = value.filter(x =>(x.subcategory==selectedSubCategory) && (x.price<=priceRange));
        if(sortType=="ascSort"){
          value = value.sort((a, b) => (a.price) - (b.price));
        }
        else if(sortType=="descSort"){
          value = value.sort((a, b) => (b.price) - (a.price));
        }
      }
      else{
        value = value.filter(x =>(x.price<=priceRange));
        if(sortType=="ascSort"){
          value = value.sort((a, b) => (a.price) - (b.price));
        }
        else if(sortType=="descSort"){
          value = value.sort((a, b) => (b.price) - (a.price));
        }
      }
      
    }
    return value;
  }


}
