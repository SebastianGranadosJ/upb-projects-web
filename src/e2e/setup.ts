// test/e2e/setup.ts
import puppeteer, { Browser, Page } from "puppeteer";

export let browser: Browser;
export let page: Page;

// AJUSTA ESTE PUERTO a tu server real.
export const BASE_URL = "http://localhost:1888";

export async function setupBrowser(): Promise<void> {
  browser = await puppeteer.launch({
    headless: true, 
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
}

export async function teardownBrowser(): Promise<void> {
  // Cerramos en orden. Esto evita el warning final de Jest "did not exit..."
  if (page && !page.isClosed()) {
    await page.close();
  }
  if (browser && browser.process() !== null) {
    await browser.close();
  }
}
