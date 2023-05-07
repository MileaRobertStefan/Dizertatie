import { Page, Locator } from '@playwright/test';
import { ProductCard } from './productcard';


export class ProductList {
  private productList: Locator;
  private productCards: ProductCard[];

  constructor(private page: Page) {
    this.productList = page.locator('app-products')
    this.productCards = [];
  }

  public async getProductCards(): Promise<ProductCard[]> {
    const productCards: ProductCard[] = [];
    const cardElements = await this.productList.locator('.product-card').all();
    for (const cardElement of cardElements) {
      const card = new ProductCard(this.page, cardElement);
      productCards.push(card);
    }
    return productCards;
  }
  
}
