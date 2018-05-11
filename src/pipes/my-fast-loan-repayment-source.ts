import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the MyFastLoanRepaymentSourcePipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'myFastLoanRepaymentSourcePipe'
})
@Injectable()
export class MyFastLoanRepaymentSourcePipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    if (value) {
      value = this.transformValue(value);
    }
    return value;
  }

  transformValue(value: string) {
    if (value === 'P') {
      return 'POS流水还款';
    } else if (value === 'T') {
      return '通联支付';
    } else if (value === 'O') {
      return '线下还款';
    } else if (value === 'S') {
      return '系统产生';
    } else if (value === 'W') {
      return '通联钱包';
    }
  }
}
