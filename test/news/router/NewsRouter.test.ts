// test/news/NewsRouter.integration.test.ts

import { mockNewsData } from "../../../src/__mocks__/news.mock";

jest.mock("../../../database/news.json", () => ({
  __esModule: true,
  default: mockNewsData,
}));


import request from "supertest";
import NewsModel from "../../../src/news/model/NewsModel";
import NewsView from "../../../src/news/view/NewsView";
import NewsRouter from "../../../src/news/router/NewsRouter";
import ErrorRouter from "../../../src/error/router/ErrorRouter";
import ErrorView from "../../../src/error/view/ErrorView";
import Server from "../../../src";



function buildTestApp() {

  const model = new NewsModel();
  const view = new NewsView(model);
  const newsRouter = new NewsRouter(view);
  const errorRouter = new ErrorRouter(new ErrorView());
  const server = new Server(newsRouter, errorRouter);

  return (server as any).app;
}

describe("Integración completa: NewsRouter con Server", () => {
  let app: any;

  beforeEach(() => {
    app = buildTestApp();
  });

  test("GET /news/v1.0/main devuelve 200 y renderiza el panel", async () => {
    const res = await request(app).get("/news/v1.0/main");

    expect(res.status).toBe(200);
    expect(res.text).toContain("Noticias Jornada de Proyectos UPB");
    expect(res.text).toContain(mockNewsData[0]!.projectName);
  });


  test("GET /news/api/search devuelve JSON con resultados", async () => {
    const res = await request(app)
      .get("/news/api/search")
      .query({ q: "Vizla", page: 1 });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("results");
    expect(Array.isArray(res.body.results)).toBe(true);

    const hasVizla = res.body.results.some((n: any) =>
      n.title.includes("Vizla")
    );
    expect(hasVizla).toBe(true);
  });

  test("GET /news/v1.0/news/:title devuelve detalle de noticia existente", async () => {
    const title = encodeURIComponent(mockNewsData[0]!.title);
    const res = await request(app).get(`/news/v1.0/news/${title}`);

    expect(res.status).toBe(200);
    expect(res.text).toContain(mockNewsData[0]!.projectName);
    expect(res.text).toContain("Volver");
  });

  test("GET /news/v1.0/news/:title inexistente responde 500", async () => {
    const res = await request(app).get("/news/v1.0/news/NoExisteXD");

    expect(res.status).toBe(500);
  });
});
