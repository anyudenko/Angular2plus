export function AutoUnsubscribe(subName: string = 'sub', maxAmount: number = 5) {
  return function (constructor) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      const sub = this[subName];

      if (sub) {
        sub.unsubscribe();
      }

      for (let i = 1; i <= maxAmount; i++) {
        if (this['sub' + i]) {
          this['sub' + i].unsubscribe();
        }
      }

      if (original && (typeof original === 'function')) {
        original.apply(this, arguments);
      }

      console.log(`Unsubscribe decorator is called. Subscription name is: ${subName}.`);
    };
  };
}
