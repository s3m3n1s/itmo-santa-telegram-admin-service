import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { getGiftStatusAPI, updateGiftStatusAPI } from 'api';
import { generateHeaders, translateDeliverStatus } from 'utils';
import { TelegrafException } from 'nestjs-telegraf';

@Injectable()
export class GiftsService {
  async getUserGifts(tgId: string) {
    const res = await axios.get(
      `${process.env.REST_API}/gifts/getBy/tg_id/${tgId}`,
    );

    return res.data;
  }

  async takeGift(giftCode: number, id: string) {
    const status = 'DELIVERED';
    const headersConfig = generateHeaders(id);

    try {
      const res = await updateGiftStatusAPI({
        giftCode,
        status,
        headersConfig,
      });

      if (res.data.giftCode) {
        return `Подарок #${
          res.data.giftCode
        } обновлён.\nНовый статус: ${translateDeliverStatus(res.data.status)}`;
      } else {
        return 'Такого подарка нет. Проверьте правильность введенного кода.';
      }
    } catch (err) {
      throw new TelegrafException('Произошла ошибка на стороне сервера.');
    }
  }

  async giveGift(giftCode: number, id: string) {
    const status = 'RECEIVED';
    const headersConfig = generateHeaders(id);

    try {
      const res = await updateGiftStatusAPI({
        giftCode,
        status,
        headersConfig,
      });

      if (res.data.giftCode) {
        return `Подарок #${
          res.data.giftCode
        } обновлён.\nНовый статус: ${translateDeliverStatus(res.data.status)}`;
      } else {
        return 'Такого подарка нет. Проверьте правильность введенного кода.';
      }
    } catch (err) {
      console.log(err);
      throw new TelegrafException('Произошла ошибка на стороне сервера.');
    }
  }

  async checkGift(giftCode: number, id: string) {
    const headersConfig = generateHeaders(id);

    try {
      const res = await getGiftStatusAPI({
        giftCode,
        headersConfig,
      });

      const gift = res;

      if (gift?.giftCode) {
        return `Подарок #${
          gift.giftCode
        }.\nТекущий статус: ${translateDeliverStatus(gift.status)}`;
      } else {
        return 'Такого подарка нет. Проверьте правильность введенного кода.';
      }
    } catch (err) {
      throw new TelegrafException('Произошла ошибка на стороне сервера.');
    }
  }
}
