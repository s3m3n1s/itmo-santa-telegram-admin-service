import axios from 'axios';

type Headers = {
  Authorization: string;
};

export const updateGiftStatusAPI = async ({
  giftCode,
  status,
  headersConfig,
}: {
  giftCode: number;
  status: string;
  headersConfig: Headers;
}): Promise<any> => {
  const data = await axios.patch(
    `${process.env.REST_API}/gifts/updateByCode/${giftCode}/${status}`,
    {},
    {
      headers: {
        ...headersConfig,
      },
    },
  );

  return data;
};

export const getGiftStatusAPI = async ({
  giftCode,
  headersConfig,
}: {
  giftCode: number;
  headersConfig: Headers;
}): Promise<any> => {
  const data = await axios.get(
    `${process.env.REST_API}/gifts/getBy/giftCode/${giftCode}`,
    {
      headers: {
        ...headersConfig,
      },
    },
  );

  return data;
};
