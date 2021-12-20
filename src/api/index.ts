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
  try {
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
  } catch (err) {
    console.log(err);
  }
};

export const getGiftStatusAPI = async ({
  giftCode,
  headersConfig,
}: {
  giftCode: number;
  headersConfig: Headers;
}): Promise<any> => {
  try {
    const { data } = await axios.get(
      `${process.env.REST_API}/gifts/getBy/giftCode/${giftCode}`,
      {
        headers: {
          ...headersConfig,
        },
      },
    );

    return data;
  } catch (err) {
    console.log(err);
    return err.response.data || 'Произошла ошибка';
  }
};
