import { Router } from "express";
import NewsView from "../view/NewsView";

export default class NewsRouter {
  router: Router;

  constructor(private readonly view: NewsView) {
    this.router = Router();
    this.routes();
  }

  readonly routes = (): void => {

    this.router.get("/v1.0/news/:title", this.view.getNewsByTitle);
    this.router.get("/api/search", this.view.searchNewsApi);

    this.router.get("/v1.0/main", this.view.getNewsPanel);
  };
}
