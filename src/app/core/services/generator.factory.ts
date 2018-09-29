import { InjectionToken } from '@angular/core';

export const Generator = new InjectionToken<staring>('Generator');
const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function GeneratorNFactory(length: number) {
  return function() {
    var result = '';
    for (var i = 0; i < length; i++)
      result += symbols.charAt(Math.floor(Math.random() * symbols.length));
    return result;
  }
}
