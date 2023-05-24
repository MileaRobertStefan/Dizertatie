import { Page, Locator } from '@playwright/test';

export class CreateOfferPage {
  private titleInput: Locator;
  private descriptionInput: Locator;
  private priceInput: Locator;
  private currencySelect: Locator;
  private categoryInput: Locator;
  private brandInput: Locator;
  private conditionSelect: Locator;
  private photoInput: Locator;
  private createButton: Locator;
  private page: Page;
  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.locator('input[name=title]');
    this.descriptionInput = page.locator('textarea[name=description]');
    this.priceInput = page.locator('input[name=price]');
    this.currencySelect = page.getByText('Product CurrencyCurrency *');
    this.categoryInput = page.locator('input[name=category]');
    this.brandInput = page.locator('input[name=brand]');
    this.conditionSelect = page.getByText('Product ConditionCondition *')
    this.photoInput = page.locator('input[name=photo_link]');
    this.createButton = page.locator('button[type=submit]');
  }

  public async setTitle(title: string) {
    await this.titleInput.fill(title);
  }

  public async setDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  public async setPrice(price: number) {
    await this.priceInput.fill(price.toString());
  }

  async selectCurrency(currency: string) {
    await this.currencySelect.click();
    await this.page.locator(`mat-option >> text=${currency}`).click();
  }

  public async setCategory(category: string) {
    await this.categoryInput.fill(category);
  }

  public async setBrand(brand: string) {
    await this.brandInput.fill(brand);
  }

  public async selectCondition(condition: string) {
    await this.conditionSelect.click();
    await this.page.locator(`mat-option >> text=${condition}`).click();
  }

  public async setPhoto(photoPath: string) {
    await this.photoInput.fill(photoPath);
    await this.photoInput.press("Tab");
  }

  public async clickCreateButton() {
    await this.createButton.click();
  }
}
