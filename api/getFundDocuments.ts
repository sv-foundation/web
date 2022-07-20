import { Tag, API } from "./index";

export type GetFundsDocumentsArguments = {
  locale: string;
};

export type GetFundsDocumentsResponse = { name: string; file: string }[];

const getFundDocuments = async ({ locale }: GetFundsDocumentsArguments) => {
  try {
    const res = await fetch(`${API}/fund_documents`, {
      headers: {
        "Accept-Language": locale,
      },
    });
    const data = (await res.json()) as GetFundsDocumentsResponse;
    return {
      data,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export default getFundDocuments;
