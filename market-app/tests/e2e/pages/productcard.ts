import { Page, Locator } from '@playwright/test';
import { TopBar } from './topbar';

export class ProductCard {
    public topBar: TopBar;
    private productCard: Locator;
    private productImage: Locator;
    private productTitle: Locator;
    private productPrice: Locator;
    private productCategory: Locator;
    private productBrand: Locator;
    private productCondition: Locator;
    private productDescriptionPanel: Locator;
    // private productDescriptionButton: Locator;
    private productPhotos: Locator[] = [];

    constructor(private page: Page, productCard: Locator) {
        this.productCard = productCard;
        this.productImage = this.productCard.locator('.product-image img');
        this.productTitle = this.productCard.locator('.product-details mat-card-title');
        this.productPrice = this.productCard.locator('.product-details .product-info-list p:has-text("Price:")');
        this.productCategory = this.productCard.locator('.product-details .product-info-list p:has-text("Category:")');
        this.productBrand = this.productCard.locator('.product-details .product-info-list p:has-text("Brand:")');
        this.productCondition = this.productCard.locator('.product-details .product-info-list p:has-text("Condition:")');
        this.productDescriptionPanel = this.productCard.locator('[data-testid="product-description"]');
     
        this.setProductPhotos();
        this.topBar = new TopBar(page);


    }

    public async clickDescription() {
        await this.productDescriptionPanel.click();
    }

    private async setProductPhotos(): Promise<void> {
        const photoElements = await this.productCard.locator('.product-details mat-expansion-panel-header:has-text("Photos:") + mat-expansion-panel .product-image-container img').all();
        this.productPhotos = photoElements.map((element: any) => this.page.locator(element));
    }

    public async getProductTitle(): Promise<string> {
        return await this.productTitle.innerText();
    }

    public async getProductPrice(): Promise<string> {
        return await this.productPrice.innerText();
    }

    public async getProductCategory(): Promise<string> {
        return await this.productCategory.innerText();
    }

    public async getProductBrand(): Promise<string> {
        return await this.productBrand.innerText();
    }

    public async getProductCondition(): Promise<string> {
        return await this.productCondition.innerText();
    }

    public async getProductDescription(): Promise<string> {
        await this.clickDescription();
        let descriptionText = this.productCard.locator('[data-testid="product-description-text"]');
        let text = await descriptionText.textContent()
        if (text) return text;
        return "";
      }

    public async getProductPhotos(): Promise<(string | null)[]> {
        const photoSrcs: (string | null)[] = [];
        for (const photo of this.productPhotos) {
            photoSrcs.push(await photo.getAttribute('src'));
        }
        return photoSrcs;
    }
}
