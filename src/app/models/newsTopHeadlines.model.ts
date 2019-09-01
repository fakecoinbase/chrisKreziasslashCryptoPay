export interface ArticlesModel {
  source: { id: any; name: string };
  author: string;
  title: string;
  description: string;
  url: any;
  urlToImage: any;
  publishedAt: Date;
  content: any;
}

export interface NewsTopHeadlinesModel {
  status: string;
  totalResults: number;
  articles: ArticlesModel[];
}
