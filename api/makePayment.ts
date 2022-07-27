import { API } from "./index";

export type MakePaymentArguments = {
  locale: string;
  amount: string;
  currency: string;
};

export type MakePaymentResponse =
  | {
      checkout_url: string;
    }
  | {
      amount?: string[];
      currency?: string[];
    };

const makePayment = async ({
  locale,
  amount,
  currency,
}: MakePaymentArguments) => {
  try {
    const formdata = new FormData();

    formdata.append("amount", amount);
    formdata.append("currency", currency);

    const res = await fetch(`${API}/make_fondy_payment/`, {
      method: "post",
      body: formdata,
      headers: {
        "Accept-Language": locale,
      },
    });
    const data = (await res.json()) as MakePaymentResponse;

    return {
      data,
    };
  } catch (error) {
    return {
      error: error as Error,
    };
  }
};

export default makePayment;
