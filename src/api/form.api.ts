import { FORM_SUBMIT_URL } from '../constants';
import type { FormPayload } from '../interfaces/form.interface';


async function sendApplication(payload: FormPayload): Promise<void> {
  let response: Response;

  try {
    response = await fetch(FORM_SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Сеть недоступна или запрос заблокирован: системный текст браузера не показываем
    throw new Error('Не удалось связаться с сервисом. Проверьте соединение и попробуйте ещё раз');
  }

  if (!response.ok) {
    throw new Error(`Сервис ответил ошибкой ${response.status}. Попробуйте отправить заявку ещё раз`);
  }
}

export { sendApplication };
