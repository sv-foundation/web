import { API } from "./index";

export type GetCheckCountryResponse = { country: string; language: string };

const getCheckCountry = async () => {
  try {
    console.log('getCheckCountry')
    const res = await fetch(`${API}/check_country/`);
    const data = (await res.json()) as GetCheckCountryResponse;
    return {
      data,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export default getCheckCountry;
