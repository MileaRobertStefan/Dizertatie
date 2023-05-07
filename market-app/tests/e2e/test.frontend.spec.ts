import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/loginpage';
import { ProductList } from './pages/productlist';
import { C } from 'src/app/types/const';




test.describe('Front end test', () => {
  let loginPage: LoginPage;
  let productList: ProductList;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productList = new ProductList(page);
    await page.goto('http://localhost:4200/login');
  });

  test('should display login header', async ({ page }) => {
    const headerText = await loginPage.getLoginHeaderText();
    expect(headerText).toEqual('Login');
  });

  test('should allow user to login', async ({ page }) => {
    await login(page);
    expect(await loginPage.topBar.getSubtitleText()).toBe("Smith Jon");
  });

  test('should see photos', async ({ page }) => {
    await login(page);

    const productCards = await productList.getProductCards();

    for (let i = 0; i < 3; i++) {
      expect(await productCards[i].getProductTitle()).toEqual(C.products[i].title);
      expect(await productCards[i].getProductPrice()).toContain(C.products[i].price.toString());
      expect(await productCards[i].getProductCategory()).toContain(C.products[i].category);
      expect(await productCards[i].getProductBrand()).toContain(C.products[i].brand);
      expect(await productCards[i].getProductCondition()).toContain(C.products[i].condition);
      expect(await productCards[i].getProductDescription()).toContain(C.products[i].description);
    }
  });

  async function login(page: Page) {
    const email = 'rixoga6067@raotus.com';
    const password = 'test';
    await loginPage.setEmail(email);
    await loginPage.setPassword(password);
    await loginPage.clickLoginButton();
    await page.waitForTimeout(300);
  }
});
