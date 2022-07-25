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
  main_photo: string;
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

    if (res.status !== 200 && res.status !== 201) {
      throw Error();
    }

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
