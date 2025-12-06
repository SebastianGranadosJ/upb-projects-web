import News from "./News";

export interface PaginatedResult {
  results: News[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}
