export class Cart {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public category: string,
    public isAvailable?: boolean,
    public qty?: number
  ) {
    this.id = id || null;
    this.isAvailable = isAvailable || true;
    this.qty = qty || 1;
  }
}


