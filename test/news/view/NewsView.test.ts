
import NewsView from "../../../src/news/view/NewsView";
import NewsModel from "../../../src/news/model/NewsModel";
import { Request, Response } from "express";
import { mockNewsData } from "../../../src/__mocks__/news.mock";
import { PaginatedResult } from "../../../src/news/types/PaginatedResult";

// 🔧 Helper para crear mocks de req y res
const createMockReqRes = (reqOverrides: any = {}, resOverrides: any = {}) => {
  const req = {
    query: {},
    params: {},
    body: {},
    ...reqOverrides,
  } as unknown as Request;

  const res = {
    status: jest.fn().mockReturnThis(),
    render: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    ...resOverrides,
  } as unknown as Response;

  return { req, res };
};

describe("NewsView (controller layer)", () => {
  let mockModel: jest.Mocked<NewsModel>;
  let view: NewsView;

  beforeEach(() => {
    mockModel = {
      fetchLatestNews: jest.fn(),
      searchNews: jest.fn(),
      getByTitle: jest.fn(),
    } as unknown as jest.Mocked<NewsModel>;

    view = new NewsView(mockModel);

    jest.clearAllMocks();
  });

  test("getNewsPanel: debería llamar a fetchLatestNews y searchNews, y renderizar la vista correctamente", async () => {
    const mockLatest = mockNewsData.slice(0, 2);
    const mockSearchResult: PaginatedResult = {
      results: mockNewsData.slice(2, 4),
      currentPage: 2,
      totalPages: 5,
      totalResults: mockNewsData.length,
    };

    mockModel.fetchLatestNews.mockResolvedValueOnce(mockLatest);
    mockModel.searchNews.mockResolvedValueOnce(mockSearchResult);

    const { req, res } = createMockReqRes({
      query: { q: "eco", page: "2" },
    });

    await view.getNewsPanel(req, res);

    expect(mockModel.fetchLatestNews).toHaveBeenCalledTimes(1);
    expect(mockModel.searchNews).toHaveBeenCalledWith("eco", 2, 6);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.render).toHaveBeenCalledWith("newsPanel", {
      news: mockSearchResult.results,
      currentPage: 2,
      totalPages: 5,
      query: "eco",
      latestNews: mockLatest,
    });
  });

  test("searchNewsApi: debería devolver resultados como JSON", async () => {
    const mockSearchResult = {
      results: mockNewsData,
      currentPage: 1,
      totalPages: 1,
      totalResults: 1,
    };

    mockModel.searchNews.mockResolvedValueOnce(mockSearchResult);

    const { req, res } = createMockReqRes({
      query: { q: "study", page: "1" },
    });

    await view.searchNewsApi(req, res);

    expect(mockModel.searchNews).toHaveBeenCalledWith("study", 1, 6);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockSearchResult);
  });


  test("getNewsByTitle: debería renderizar detalle de la noticia correcta", async () => {

    const mockNews = mockNewsData[0]; 


    mockModel.getByTitle.mockResolvedValueOnce(mockNews!);


    const { req, res } = createMockReqRes({
      params: { title: mockNews!.title },
    });


    await view.getNewsByTitle(req, res);


    expect(mockModel.getByTitle).toHaveBeenCalledWith(mockNews!.title);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.render).toHaveBeenCalledWith("newsDetail", { news: mockNews });
  });

  test("getNewsByTitle: debería lanzar error si falta el parámetro 'title'", async () => {

    const { req, res } = createMockReqRes({ params: {} });

    await expect(view.getNewsByTitle(req, res)).rejects.toThrow(
      "Title parameter is missing"
    );
  });
});
