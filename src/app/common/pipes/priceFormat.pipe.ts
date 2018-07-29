import {Pipe,PipeTransform } from '@angular/core';

@Pipe({
    'name':'priceFormat'
})
export class priceFormatPipe implements PipeTransform{

    transform(input:any){
        let index = input.toString(10).indexOf('.');
        return input.toString(10).slice(0,index+3);
    }

}