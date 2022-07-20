import { Tag, API } from "./index";

export type GetPaymentSystemFondyArguments = {
  locale: string;
};

export type GetPaymentSystemFondyResponse = {
  name: string;
  currencies: { name: string }[];
};

const getPaymentSystemFondy = async ({
  locale,
}: GetPaymentSystemFondyArguments) => {
  try {
    const res = await fetch(`${API}/payment_systems/FONDY`, {
      headers: {
        "Accept-Language": locale,
      },
    });
    const data = (await res.json()) as GetPaymentSystemFondyResponse;
    return {
      data,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export default getPaymentSystemFondy;
