import { Pipe, PipeTransform } from '@angular/core';
import { County } from '../models/county';
import { Product } from '../models/product';

@Pipe({
  name: 'countyPipe'
})
export class CountyPipePipe implements PipeTransform {

  transform(value: Product[], county:County ): Product[] {
    if(county === null){
      return value;
    }
    else{
      return value.filter((p:Product) => p.countyId == county.countyId)
    }
  };

}
