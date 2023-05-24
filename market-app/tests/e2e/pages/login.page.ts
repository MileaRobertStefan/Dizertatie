import { Page, Locator } from '@playwright/test';
import { TopBar } from './topbar.page';

export class LoginPage {
    public topBar: TopBar;
    private createForm: Locator;
    private loginHeader: Locator;
    private emailField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;

    constructor(private page: Page) {
        this.createForm = page.locator('form[ngForm="ngForm"]');
        this.loginHeader = page.locator('mat-label h2');
        this.emailField = page.locator('input[name="email"][ngModel][type="email"]');
        this.passwordField = page.locator('input[name="password"][ngModel][type="password"]');
        this.loginButton = page.locator('button[type="button"][color="accent"][mat-raised-button]');
        this.topBar = new TopBar(page);
    }

    public async setEmail(email: string): Promise<void> {
        await this.emailField.fill(email);
    }

    public async setPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    public async getLoginHeaderText(): Promise<string> {
        return await this.loginHeader.innerText();
    }
}