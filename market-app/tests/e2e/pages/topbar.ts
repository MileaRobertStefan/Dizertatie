import { Page, Locator } from '@playwright/test';

export class TopBar {
    private topBar: Locator;
    private loginButton: Locator;
    private homeButton: Locator;
    private postOfferButton: Locator;
    private seeAllOffersButton: Locator;
    private seeMyOffersButton: Locator;
    private registerButton: Locator;

    constructor(private page: Page) {
        this.topBar = page.locator('div mat-card');
        this.loginButton = this.topBar.locator('button:has-text("Login")');
        this.homeButton = this.topBar.locator('button:has-text("Home")');
        this.postOfferButton = this.topBar.locator('button:has-text("Create new offer")');
        this.seeAllOffersButton = this.topBar.locator('button:has-text("See All Offers")');
        this.seeMyOffersButton = this.topBar.locator('button:has-text("See My Offers")');
        this.registerButton = this.topBar.locator('button:has-text("Registration")');
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    public async clickHomeButton(): Promise<void> {
        await this.homeButton.click();
    }

    public async clickPostOfferButton(): Promise<void> {
        await this.postOfferButton.click();
    }

    public async clickSeeAllOffersButton(): Promise<void> {
        await this.seeAllOffersButton.click();
    }

    public async clickSeeMyOffersButton(): Promise<void> {
        await this.seeMyOffersButton.click();
    }

    public async clickRegisterButton(): Promise<void> {
        await this.registerButton.click();
    }

    public async getTitleText(): Promise<string> {
        const titleElement = await this.topBar.locator('mat-card-title').first();
        return await titleElement.innerText();
    }

    public async getSubtitleText(): Promise<string> {
        const subtitleElement = await this.topBar.locator('mat-card-subtitle').first();
        return await subtitleElement.innerText();
    }
}