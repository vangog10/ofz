
/** Поля анкеты, которые заполняет пользователь */
type FormValues = {
    name: string,
    organization: string,
    email: string,
    phone: string,
    task: string
};

/** Имя поля анкеты: по нему форма раскладывает значения и ошибки */
type FormField = keyof FormValues;

/** Файл заявки, переведённый в base64 */
interface FormAttachment {
    /** Имя файла, как его выбрал пользователь */
    name: string,
    /** MIME-тип файла */
    type: string,
    /** Размер в байтах */
    size: number,
    /** Содержимое файла в base64 без префикса data URL */
    content: string
}

/** Тело POST-запроса: анкета, согласие и файлы массивом — даже если файл один */
interface FormPayload extends FormValues {
    /** Согласие на обработку персональных данных */
    consent: boolean,
    /** Вложения заявки; пустой массив, если файлов не прикладывали */
    files: FormAttachment[]
}

export type { FormValues, FormField, FormAttachment, FormPayload };
