import newsData from "../../../database/news.json";
import News from "../types/News";
import { PaginatedResult } from "../types/PaginatedResult";

export default class NewsModel {
  constructor() {}

  readonly fetchNews = async (): Promise<News[]> => {
    const data = (newsData as any[]).map((item) => ({
      ...item,
      date: new Date(item.date),
    })) as News[];

    if (!data) {
      throw new Error("No news found");
    }

    return data;
  };

  readonly fetchLatestNews = async (): Promise<News[]> => {
    const allNews = await this.fetchNews();

    const sorted = allNews.sort((a, b) => b.date.getTime() - a.date.getTime());

    return sorted.slice(0, 5);
  };

  readonly getByTitle = async (title: string): Promise<News> => {
    const allNews = await this.fetchNews();
    const found = allNews.find(
      (n) => n.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (!found) {
      throw new Error(`News with title "${title}" not found`);
    }

    return found;
  };

  readonly searchNews = async (
    query: string,
    page: number = 1,
    pageSize: number = 9
  ): Promise<PaginatedResult> => {
    const allNews = await this.fetchNews();

    const filtered = allNews.filter((news) => {
      const q = query.toLowerCase();
      return (
        news.title.toLowerCase().includes(q) ||
        news.projectName.toLowerCase().includes(q) ||
        news.subject.toLowerCase().includes(q) ||
        news.shortDescription.toLowerCase().includes(q) ||
        news.content.toLowerCase().includes(q)
      );
    });

    const sorted = filtered.sort((a, b) => b.date.getTime() - a.date.getTime());

    const totalResults = sorted.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const results = sorted.slice(startIndex, endIndex);

    return {
      results,
      currentPage,
      totalPages,
      totalResults,
    };
  };
}
