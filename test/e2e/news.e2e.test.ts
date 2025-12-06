import {
  page,
  BASE_URL,
  setupBrowser,
  teardownBrowser,
} from "../../src/e2e/setup";

jest.setTimeout(60000);

describe("FISI UPB News - Flujo E2E", () => {
  beforeEach(async () => {
    await setupBrowser();
  });

  afterEach(async () => {
    await teardownBrowser();
  });

  test("debe mostrar la lista de noticias y al menos una card", async () => {
    // Navegar al main
    await page.goto(`${BASE_URL}/news/v1.0/main`, {
      waitUntil: "networkidle0",
    });

    // Esperar que al menos una noticia se renderice en #news-container
    await page.waitForSelector("#news-container .news-item", {
      timeout: 15000,
    });

    // Contar cuántas noticias hay
    const cardsCount = await page.$$eval(
      "#news-container .news-item",
      (cards) => cards.length
    );
    expect(cardsCount).toBeGreaterThan(0);

    // Verificar el título principal de la sección "Noticias Jornada de Proyectos UPB"
    const headerText = await page.$eval(
      "main h2.text-center.fw-bold.text-uppercase.text-danger",
      (el) => el.textContent?.trim()
    );
    expect(headerText).toContain("Noticias Jornada de Proyectos UPB");

    // Verificar que la sección de Últimas Noticias también tenga al menos una noticia
    const latestNewsCount = await page.$$eval(
      "section.latest-news-panel .main-news",
      (items) => items.length
    );
    expect(latestNewsCount).toBeGreaterThan(0);
  });

  test("debe permitir buscar por texto y mostrar resultados dinámicamente", async () => {
    await page.goto(`${BASE_URL}/news/v1.0/main`, {
      waitUntil: "networkidle0",
    });

    // Esperar que el formulario exista
    await page.waitForSelector("#searchForm", { timeout: 15000 });
    await page.waitForSelector("#searchInput", { timeout: 15000 });

    // Escribir el texto de búsqueda
    await page.type("#searchInput", "machine");

    // Enviar el formulario
    await page.$eval("#searchForm", (el) => {
      const form = el as HTMLFormElement;
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    });

    // Esperar que el fetch y render dinámico termine
    await page.waitForFunction(
      () => {
        const container = document.querySelector("#news-container");
        return container && container.querySelectorAll(".news-item").length > 0;
      },
      { timeout: 20000 }
    );

    // Contar los items renderizados
    const cardsCount = await page.$$eval(
      "#news-container .news-item",
      (cards) => cards.length
    );

    if (cardsCount === 0) {
      // Verificamos el mensaje vacío si no hay resultados
      const emptyStateText = await page.$eval(
        "body",
        (el) => el.textContent || ""
      );
      expect(emptyStateText).toMatch(/Aún no hay noticias publicadas/i);
    } else {
      expect(cardsCount).toBeGreaterThan(0);
    }
  });

  test("debe abrir el detalle de la primera noticia y mostrar el título y contenido", async () => {
    // Ir al listado de noticias
    await page.goto(`${BASE_URL}/news/v1.0/main`, {
      waitUntil: "networkidle0",
    });

    // Esperar que al menos una noticia se renderice
    await page.waitForSelector("#news-container .news-item", {
      timeout: 15000,
    });

    // Tomar el href del primer enlace de noticia
    const detailHref = await page.$eval(
      "#news-container .news-item a",
      (el) => (el as HTMLAnchorElement).getAttribute("href") || ""
    );

    expect(detailHref).toMatch(/\/news\/v1\.0\/news\//);

    // Ir a la página de detalle
    await page.goto(`${BASE_URL}${detailHref}`, { waitUntil: "networkidle0" });

    // Esperar que el título principal exista
    await page.waitForSelector("h1.news-title", { timeout: 15000 });

    const detailTitle = await page.$eval("h1.news-title", (el) =>
      el.textContent?.trim()
    );
    expect(detailTitle).toBeTruthy();

    // Confirmar que hay contenido en la noticia
    const hasContent = await page.$eval(".news-content p", (el) =>
      el.textContent?.trim()
    );
    expect(hasContent).toBeTruthy();

    // Opcional: verificar que exista la imagen principal
    const imgSrc = await page.$eval("figure.news-image img", (img) =>
      (img as HTMLImageElement).getAttribute("src")
    );
    expect(imgSrc).toBeTruthy();
  });

  test("desde el detalle se puede volver al listado con el botón Volver", async () => {
    // Ir al listado
    await page.goto(`${BASE_URL}/news/v1.0/main`, {
      waitUntil: "networkidle0",
    });

    // Esperar al menos una noticia
    await page.waitForSelector("#news-container .news-item", {
      timeout: 15000,
    });

    // Tomar href del primer detalle
    const detailHref = await page.$eval(
      "#news-container .news-item a",
      (el) => (el as HTMLAnchorElement).getAttribute("href") || ""
    );

    await page.goto(`${BASE_URL}${detailHref}`, { waitUntil: "networkidle0" });

    // Esperar el botón "Volver"
    await page.waitForSelector("button.btn.btn-outline-danger", {
      timeout: 15000,
    });

    // Hacer click en el botón "Volver"
    await page.click("button.btn.btn-outline-danger");

    // Esperar que la URL cambie al listado (history.back() debería funcionar)
    await page.waitForSelector("#news-container .news-item", {
      timeout: 15000,
    });

    const currentUrl = page.url();
    expect(currentUrl).toContain("/news/v1.0/main"); // o /list según tu route
  });
});
