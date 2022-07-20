import { Tag, API } from "./index";

export type GetTagsArguments = {
  locale: string;
};

export type GetTagsResponse = Tag[];

const getTags = async ({ locale }: GetTagsArguments) => {
  try {
    const res = await fetch(`${API}/tags`, {
      headers: {
        "Accept-Language": locale,
      },
    });
    const data = (await res.json()) as GetTagsResponse;

    return {
      data,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export default getTags;
