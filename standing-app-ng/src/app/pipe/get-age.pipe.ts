import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAge'
})
export class GetAgePipe implements PipeTransform {

  transform(value: Date): number {
    const startDate: Date = new Date(value);
    const endDate: Date = new Date();
    let age: number = 0;

    if(endDate.getMonth() < startDate.getMonth()) {
      age = endDate.getFullYear() - startDate.getFullYear() - 1;
    } else if(endDate.getMonth() == startDate.getMonth() && endDate.getDate() < startDate.getDate()) {
      age = endDate.getFullYear() - startDate.getFullYear() - 1;
    } else {
      age = endDate.getFullYear() - startDate.getFullYear();
    }
    
    return age;
  }

}
