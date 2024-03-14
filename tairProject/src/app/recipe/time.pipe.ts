import { Pipe, PipeTransform } from '@angular/core';
// import "primeicons/primeicons.css";

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;

    const paddedMinutes = (minutes < 10) ? '0' + minutes : minutes.toString();
    const paddedSeconds = (seconds < 10) ? '0' + seconds : seconds.toString();

    return `${paddedMinutes}:${paddedSeconds}`;
  }

}
