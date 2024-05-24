import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerHand'
})
export class PlayerHandPipe implements PipeTransform {

  transform(value: string): string {
    let handed: string = '';
    switch (value) {
      case 'r':
        handed = 'Right';
        break; 
      case 'l':
        handed = 'Left';
        break; 
      case 's':
        handed = 'Both';
        break; 
    }

    return handed;
  }

}
