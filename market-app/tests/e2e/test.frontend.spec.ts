import { test, expect, Page, Browser } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { ProductList } from './pages/productlist.page';
import { C } from 'src/app/types/const';
import { TopBar } from './pages/topbar.page';
import { CartPage } from './pages/cart.page';
import { defineConfig } from '@playwright/test';
import { CreateOfferPage } from './pages/createitem.page';
;

export default defineConfig({
  use: {
    video: 'on-first-retry',
    browserName: 'chromium',
  },
});

test.describe('Front end test', () => {
  let page: Page;
  let loginPage: LoginPage;
  let productList: ProductList;
  let topBar: TopBar;
  let cartPage: CartPage;
  let createOfferPage: CreateOfferPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:4200/');
    loginPage = new LoginPage(page);
    topBar = new TopBar(page);
    productList = new ProductList(page);
    cartPage = new CartPage(page);
    createOfferPage = new CreateOfferPage(page);
    await login();
    await page.waitForTimeout(1000);
  });

  test.beforeEach(async () => {
    await page.reload();
    await page.waitForTimeout(100);
  });

  test('should display login header', async () => {
    await topBar.clickLoginButton();
    const headerText = await loginPage.getLoginHeaderText();
    expect(headerText).toEqual('Login');
  });

  test('should allow user to login', async () => {
    expect(await topBar.getSubtitleText()).toBe('Smith Jon');
  });

  test('should see photos', async () => {
    await topBar.clickHomeButton();
    await page.waitForSelector('.product-card');

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

  test('should add and remove items from the cart', async () => {
    await topBar.clickHomeButton();
    const productCards = await productList.getProductCards();

    await page.waitForSelector('.product-card');
    expect(productCards.length).toBeGreaterThanOrEqual(3);

    await productCards[0].clickAddToCard();
    await productCards[1].clickAddToCard();
    await productCards[2].clickAddToCard();

    await topBar.clickCart();
    const cartItems = await cartPage.getCartItems();

    expect(await cartPage.getTotal()).toContain(
      (C.products[0].price + C.products[1].price + C.products[2].price).toString(),
    );
    await cartItems[0].removeFromCart();

    expect(await cartPage.getTotal()).toContain(
      (C.products[1].price + C.products[2].price).toFixed(2),
    );
    await cartPage.clearCart();

    expect(await cartPage.areButtonsDisabled()).toBe(true);
    expect(await cartPage.isCartEmpty()).toBe(true);
  });

  test("create and delete item", async () => {

    const testItem = {
      title: 'Dummy Offer Title',
      description: 'This is a dummy offer description',
      price: 100,
      currency: 'USD',
      category: 'Dummy Category',
      brand: 'Dummy Brand',
      condition: 'New',
      photo: 'https://i.ytimg.com/vi/32vI8IWCBOw/maxresdefault.jpg'
    };
    await topBar.clickPostOfferButton();
    // Set up the test object
    await createOfferPage.setTitle(testItem.title);
    await createOfferPage.setDescription(testItem.description);
    await createOfferPage.setPrice(testItem.price);
    await createOfferPage.selectCurrency(testItem.currency);
    await createOfferPage.setCategory(testItem.category);
    await createOfferPage.setBrand(testItem.brand);
    await createOfferPage.selectCondition(testItem.condition);
    await createOfferPage.setPhoto(testItem.photo);
    await createOfferPage.clickCreateButton();

    // Check that the test object was created
    await topBar.clickHomeButton();
    await page.reload();
    await page.waitForSelector('.product-card');
    const productCards = await productList.getProductCards();
    const item = productCards[productCards.length - 1];

    // Assert that the values on the product card match the values set on the create offer page
    expect(await item.getProductTitle()).toBe(testItem.title);
    expect(await item.getProductDescription()).toContain(testItem.description);
    expect(await item.getProductPrice()).toContain(testItem.price.toString());
    expect(await item.getProductPrice()).toContain(testItem.currency);
    expect(await item.getProductCategory()).toContain(testItem.category);
    expect(await item.getProductBrand()).toContain(testItem.brand);
    expect(await item.getProductCondition()).toContain(testItem.condition);
    // expect(await item.getProductPhotos()).toContain(testItem.photo);
    const title = await item.getProductTitle()

    await item.clickDelete();
    await page.waitForTimeout(300);

    const productCards2 = await productList.getProductCards();

    for(let item2 of productCards2){
      expect(await item2.getProductTitle()).not.toBe(title);
    }
  });

  async function login() {
    await topBar.clickLoginButton();
    const email = 'rixoga6067@raotus.com';
    const password = 'test';
    await loginPage.setEmail(email);
    await loginPage.setPassword(password);
    await loginPage.clickLoginButton();
  }
});
