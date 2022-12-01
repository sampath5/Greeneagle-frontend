export class Product {

  constructor(
    public productId: number,
    public productName: string,
    public category: string,
    public brand: string,
    public model: string,
    public quantity: number,
    public active: boolean,
    public description: string,
    public price: number,
    public primaryImage: any) { }
}