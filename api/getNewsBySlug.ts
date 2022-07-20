import { Tag, API } from "./index";

export type GetNewsBySlugArguments = {
  slug: string;
  locale: string;
};

export type GetNewsBySlugResponse = {
  id: number;
  title: string;
  publication_date: string;
  annotation: string;
  preview_photo: string;
  content: string;
  tags: Tag[];
};

const getNewsBySlug = async ({ slug, locale }: GetNewsBySlugArguments) => {
  try {
    const res = await fetch(`${API}/news/${slug}`, {
      headers: {
        "Accept-Language": locale,
      },
    });
    const data = (await res.json()) as GetNewsBySlugResponse;

    return {
      data,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export default getNewsBySlug;
