import { Tag, API } from "./index";

export type GetPaymentDetailsArguments = {
  locale: string;
};

export type GetPaymentDetailsResponse = {
  currency_code: string;
  fields: { name: string; value: string }[];
}[];

const getPaymentDetails = async ({ locale }: GetPaymentDetailsArguments) => {
  try {
    const res = await fetch(`${API}/payment_details`, {
      headers: {
        "Accept-Language": locale,
      },
    });
    const data = (await res.json()) as GetPaymentDetailsResponse;
    return {
      data,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export default getPaymentDetails;
