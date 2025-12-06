
import { mockNewsData } from "../../../src/__mocks__/news.mock";
import { PaginatedResult } from "../../../src/news/types/PaginatedResult";


// Remplazar la importación del archivo JSON con datos simulados
jest.mock("../../../database/news.json", () => ({
  __esModule: true,
  default: mockNewsData,
}));

import NewsModel from "../../../src/news/model/NewsModel";

describe("NewsModel Unit Tests", () => {
  let newsModel: NewsModel;

  beforeEach(() => {
    newsModel = new NewsModel();
  });

  // -------------------------------
  // fetchNews()
  // -------------------------------
  describe("fetchNews()", () => {
    it("debería devolver todas las noticias con fechas convertidas correctamente", async () => {
      const result = await newsModel.fetchNews();

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(mockNewsData.length);

      result.forEach((item) => {
        expect(item.date).toBeInstanceOf(Date);
      });
    });

    it("debería lanzar un error si no hay datos de noticias", async () => {
      const temp = (newsModel as any).fetchNews;
      (newsModel as any).fetchNews = async () => {
        throw new Error("No news found");
      };

      await expect(newsModel.fetchNews()).rejects.toThrow("No news found");

      (newsModel as any).fetchNews = temp;
    });
  });

  // -------------------------------
  // fetchLatestNews()
  // -------------------------------
  describe("fetchLatestNews()", () => {
    it("debería devolver las noticias ordenadas de más reciente a más antigua", async () => {
      jest.spyOn(newsModel, "fetchNews").mockResolvedValueOnce(mockNewsData);

      const result = await newsModel.fetchLatestNews();
      expect(result.length).toBeLessThanOrEqual(5);

      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]!.date.getTime()).toBeGreaterThanOrEqual(
          result[i + 1]!.date.getTime()
        );
      }
    });
  });

  // -------------------------------
  // getByTitle()
  // -------------------------------
  describe("getByTitle()", () => {
    it("debería devolver la noticia correspondiente al título (case insensitive)", async () => {
      jest.spyOn(newsModel, "fetchNews").mockResolvedValueOnce(mockNewsData);

      const targetTitle = mockNewsData[0]!.title.toUpperCase();
      const result = await newsModel.getByTitle(targetTitle);

      expect(result.title).toBe(mockNewsData[0]!.title);
    });

    it("debería lanzar error si no se encuentra una noticia con el título indicado", async () => {
      jest.spyOn(newsModel, "fetchNews").mockResolvedValueOnce(mockNewsData);

      await expect(newsModel.getByTitle("Título inexistente")).rejects.toThrow(
        'News with title "Título inexistente" not found'
      );
    });
  });

  // -------------------------------
  // searchNews()
  // -------------------------------
  describe("searchNews()", () => {
    beforeEach(() => {
      jest.spyOn(newsModel, "fetchNews").mockResolvedValue(mockNewsData);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("debería devolver resultados que coincidan con el título", async () => {
      const query = "Vizla";
      const { results, totalResults } = await newsModel.searchNews(query);

      expect(totalResults).toBeGreaterThan(0);
      expect(
        results.some((r) => r.title.toLowerCase().includes(query.toLowerCase()))
      ).toBe(true);
    });

    it("debería devolver resultados que coincidan con el nombre del proyecto", async () => {
      const query = "Blesshealth24/7";
      const { results, totalResults } = await newsModel.searchNews(query);

      expect(totalResults).toBeGreaterThan(0);
      expect(
        results.some((r) =>
          r.projectName.toLowerCase().includes(query.toLowerCase())
        )
      ).toBe(true);
    });

    it("debería devolver resultados que coincidan con la materia", async () => {
      const query = "Sistemas Distribuidos";
      const { results, totalResults } = await newsModel.searchNews(query);

      expect(totalResults).toBeGreaterThan(0);
      expect(
        results.some((r) =>
          r.subject.toLowerCase().includes(query.toLowerCase())
        )
      ).toBe(true);
    });

    it("debería devolver resultados que coincidan con la descripción corta", async () => {
      const query = "arquitectura distribuida";
      const { results, totalResults } = await newsModel.searchNews(query);

      expect(totalResults).toBeGreaterThan(0);
      expect(
        results.some((r) =>
          r.shortDescription.toLowerCase().includes(query.toLowerCase())
        )
      ).toBe(true);
    });

    it("debería devolver resultados que coincidan con el contenido", async () => {
      const query = "gestión de historias clínicas";
      const { results, totalResults } = await newsModel.searchNews(query);

      expect(totalResults).toBeGreaterThan(0);
      expect(
        results.some((r) =>
          r.content.toLowerCase().includes(query.toLowerCase())
        )
      ).toBe(true);
    });

    it("debería paginar correctamente los resultados", async () => {
      const pageSize = 2;

      const page1: PaginatedResult = await newsModel.searchNews(
        "",
        1,
        pageSize
      );
      const page2: PaginatedResult = await newsModel.searchNews(
        "",
        2,
        pageSize
      );
      const page3: PaginatedResult = await newsModel.searchNews(
        "",
        3,
        pageSize
      );

      expect(page1.totalResults).toBe(mockNewsData.length);
      expect(page1.totalPages).toBe(3);
      expect(page1.results.length).toBe(2);
      expect(page2.results.length).toBe(2);
      expect(page3.results.length).toBe(1);
      expect(page3.currentPage).toBe(3);
    });
  });
});
