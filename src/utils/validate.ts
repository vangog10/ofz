import type { Errors } from "../interfaces/primitives.types";
import type FormState from "../interfaces/formState.interface";
import { EMAIL_RE, PHONE_RE } from "../constants";

/** Возвращает ошибки валидации формы; пустой объект — форма валидна. */
export function validate(form: FormState): Errors {
  const e: Errors = {};
  if (!form.name.trim()) e.name = "Укажите имя";
  else if (form.name.trim().length < 2) e.name = "Слишком короткое имя";
  if (!form.email.trim()) e.email = "Укажите e-mail";
  else if (!EMAIL_RE.test(form.email.trim())) e.email = "Похоже, в адресе ошибка";
  if (form.phone.trim() && !PHONE_RE.test(form.phone.trim())) e.phone = "Проверьте номер телефона";
  if (!form.task.trim()) e.task = "Опишите задачу";
  else if (form.task.trim().length < 10) e.task = "Добавьте чуть больше деталей";
  if (!form.consent) e.consent = "Нужно согласие на обработку данных";
  return e;
}
