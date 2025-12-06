import { Request, Response } from "express";
import NewsModel from "../model/NewsModel";

export default class NewsView {
  constructor(private readonly newsModel: NewsModel) {}

  readonly getNewsPanel = async (req: Request, res: Response) => {
    const latestNews = await this.newsModel.fetchLatestNews();
    const page = Number(req.query["page"]) || 1;
    const query = (req.query["q"] as string) || "";

    const result = await this.newsModel.searchNews(query, page, 6);

    res.status(200).render("newsPanel", {
      news: result.results,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      query,
      latestNews,
    });
  };

readonly searchNewsApi = async (req: Request, res: Response) => {
  const page = Number(req.query["page"]) || 1;
  const query = (req.query["q"] as string) || "";

  const result = await this.newsModel.searchNews(query, page, 6);

  res.status(200).json(result);
};


  readonly getNewsByTitle = async (req: Request, res: Response) => {
    const { title } = req.params;
    if (!title) {
      throw new Error("Title parameter is missing");
    }
    const news = await this.newsModel.getByTitle(title);

    res.status(200).render("newsDetail", { news });
  };
}
