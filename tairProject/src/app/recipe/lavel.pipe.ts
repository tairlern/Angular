import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lavel',
  standalone: true
})
export class LavelPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 1) {
      return '';
    }

    return '*'.repeat(value);
  }

}
