import { Page, Locator } from '@playwright/test';

export class CartItemPage {
  private cartItem: Locator;

  constructor(private page: Page, cartItem: Locator) {
    this.cartItem = cartItem;
  }

  public async getTitle(): Promise<string> {
    const titleElement = await this.cartItem.locator('mat-card-title').first();
    return titleElement.innerText();
  }

  public async getPrice(): Promise<string> {
    const priceElement = await this.cartItem.locator('.item-details p:first-child').first();
    return priceElement.innerText();
  }

  public async getQuantity(): Promise<number> {
    const quantityInput = await this.cartItem.locator('input[type="number"]').first();
    const quantityValue = quantityInput.getAttribute('value') ?? '0';
    return +quantityValue;
  }

  public async updateQuantity(quantity: number): Promise<void> {
    const quantityInput = await this.cartItem.locator('input[type="number"]').first();
    await quantityInput.fill(`${quantity}`);
  }

  public async removeFromCart(): Promise<void> {
    const removeButton = await this.cartItem.locator('button[color="warn"]').first();
    await removeButton.click();
  }
}
