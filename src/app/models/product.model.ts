export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public isAvailable?: boolean
  ) {
    this.id = id || null;
    this.isAvailable = isAvailable || true;
  }
}
