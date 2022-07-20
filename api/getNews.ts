import { Tag, API } from "./index";

export type GetNewsArguments = {
  locale: string;
  limit: number;
  offset: number;
  tags__name?: string;
};

export type GetNewsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    slug: string,
    title: string;
    publication_date: string;
    annotation: string;
    preview_photo: string;
  }[];
};

const getNews = async ({
  locale,
  limit,
  offset,
  tags__name,
}: GetNewsArguments) => {
  try {
    const res = await fetch(
      `${API}/news?limit=${limit}&offset=${offset}${
        tags__name ? `&tags__name=${tags__name}` : ""
      }`,
      {
        headers: {
          "Accept-Language": locale,
        },
      }
    );
    const data = (await res.json()) as GetNewsResponse;
    return {
      data,
    };
  } catch (error) {
    return {
      error,
    };
  }
};


export default getNews