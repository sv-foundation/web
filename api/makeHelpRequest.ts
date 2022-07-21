import { Tag, API } from "./index";

export type MakeHelpRequestArguments = {
  locale: string;
  file: File[];
  full_name: string;
  organization_name: string;
  email: string;
  phone_number: string;
  message: string;
};

export type MakeHelpRequestResponse =
  | {
      id: number;
    }
  | {
      file?: string[];
      full_name?: string[];
      organization_name?: string[];
      email?: string[];
      phone_number?: string[];
      message?: string[];
    };

const makeHelpRequest = async ({
  locale,
  file,
  full_name,
  organization_name,
  email,
  phone_number,
  message,
}: MakeHelpRequestArguments) => {
  try {
    const formdata = new FormData();
    file.map((file) => formdata.append("file", file));
    formdata.append("full_name", full_name);
    formdata.append("organization_name", organization_name);
    formdata.append("email", email);
    formdata.append("phone_number", phone_number);
    formdata.append("message", message);

    const res = await fetch(`${API}/help_requests/`, {
      method: "post",
      body: formdata,
      headers: {
        "Accept-Language": locale,
      },
    });
    const data = (await res.json()) as MakeHelpRequestResponse;

    return {
      data,
    };
  } catch (error) {
    return {
      error: error as Error,
    };
  }
};

export default makeHelpRequest;
