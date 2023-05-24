import { Page, Locator } from '@playwright/test';
import { CartItem } from 'src/app/types/types';
import { CartItemPage } from './cartitem.page';

export class CartPage {
  private cartPage: Locator;

  constructor(private page: Page) {
    this.cartPage = page.locator('.cart-card');
  }

  public async getCartItems(): Promise<CartItemPage[]> {
    const cartItems: CartItemPage[] = [];
    const itemElements = await this.cartPage.locator('.cart-item').all();
    for (const itemElement of itemElements) {
      cartItems.push(new CartItemPage(this.page, itemElement));
    }
    return cartItems;
  }

  public async getTotal(): Promise<string> {
    const totalElement = await this.cartPage.locator('.cart-summary h3').first();
    return totalElement.innerText();
  }

  public async placeOrder(): Promise<void> {
    const placeOrderButton = await this.cartPage.locator('.cart-summary button[color="primary"]').first();
    await placeOrderButton.click();
  }

  public async clearCart(): Promise<void> {
    const clearCartButton = await this.cartPage.locator('.cart-summary button[color="accent"]').first();
    await clearCartButton.click();
  }

  public async areButtonsDisabled(): Promise<boolean> {
    const placeOrderButton = await this.cartPage.locator('.cart-summary button[color="primary"]').first();
    const clearCartButton = await this.cartPage.locator('.cart-summary button[color="accent"]').first();
    const placeOrderDisabled = await placeOrderButton.getAttribute('disabled') === 'true';
    const clearCartDisabled = await clearCartButton.getAttribute('disabled') === 'true';
    return placeOrderDisabled === clearCartDisabled && clearCartDisabled === true;
  }

  public async isCartEmpty(): Promise<boolean> {
    const emptyCartMessage = await this.cartPage.locator('p').first();
    if (emptyCartMessage) {
      return await emptyCartMessage.innerText() === 'Your cart is empty.';
    }
    return false;
  }
}
