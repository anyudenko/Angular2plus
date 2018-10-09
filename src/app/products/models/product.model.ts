export class Product {
  constructor(
    public id: number = null,
    public name: string = '',
    public description: string = '',
    public price: number = 0,
    public category: string = '',
    public isAvailable?: boolean
  ) {
    this.isAvailable = isAvailable || true;
  }
}
