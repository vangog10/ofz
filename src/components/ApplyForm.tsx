import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, FormEvent, RefObject } from "react";
import type { Errors, SubmitStatus } from "../interfaces/primitives.types";
import type FormState from "../interfaces/formState.interface";
import type UploadItem from "../interfaces/uploadItem.interface";
import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import { Check, FilePlus } from "lucide-react";
import Reveal from "./Reveal";
import PrimaryButton from "./PrimaryButton";
import Field from "./Field";
import FieldError from "./FieldError";
import ButtonLabel from "./ButtonLabel";
import TeamPhoto from "./TeamPhoto";
import FileItem from "./FileItem";
import SuccessBanner from "./SuccessBanner";
import { cn } from "../utils/cn";
import { validate } from "../utils/validate";
import { formatSize, plural } from "../utils/format";
import { EMPTY_FORM, MAX_FILES, MAX_FILE_KB, TYPE_LABELS } from "../constants";

export default function ApplyForm() {
  const reduce = useReducedMotion() === true;
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<UploadItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [notice, setNotice] = useState<string | null>(null);
  const nextId = useRef(100);
  const inputRef = useRef<HTMLInputElement>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const taskRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const fieldRefs: Record<string, RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    name: nameRef,
    email: emailRef,
    phone: phoneRef,
    task: taskRef,
    consent: consentRef,
  };

  const drag = useSpring({
    scale: dragging ? 1.01 : 1,
    config: { mass: 1, tension: 400, friction: 26 },
    immediate: reduce,
  });

  const setValue =
    (field: "name" | "org" | "email" | "phone" | "task") =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      // Живая перевалидация поля, в котором уже была ошибка.
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        const err = validate({ ...form, [field]: value })[field];
        if (err) next[field] = err;
        else delete next[field];
        return next;
      });
    };

  const onBlurField = (field: keyof FormState) => () => {
    setErrors((prev) => {
      const next = { ...prev };
      const err = validate(form)[field];
      if (err) next[field] = err;
      else delete next[field];
      return next;
    });
  };

  const onConsent = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setForm((prev) => ({ ...prev, consent: checked }));
    setErrors((prev) => {
      const next = { ...prev };
      if (checked) delete next.consent;
      return next;
    });
  };

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const room = MAX_FILES - files.length;
    if (room <= 0) {
      setNotice(`Можно загрузить не больше ${MAX_FILES} файлов`);
      return;
    }
    const picked = Array.from(list).slice(0, room);
    if (picked.length < list.length) setNotice(`Добавлено максимум: ${MAX_FILES} файлов`);
    else setNotice(null);

    const items: UploadItem[] = picked.map((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      const sizeKb = f.size / 1024;
      const tooBig = sizeKb > MAX_FILE_KB;
      return {
        id: nextId.current++,
        name: f.name,
        type: TYPE_LABELS[ext] ?? "Файл",
        sizeKb,
        status: tooBig ? "error" : "loading",
        error: tooBig ? "Слишком большой" : undefined,
        retryable: tooBig ? false : true,
        file: tooBig ? undefined : f,
      };
    });
    setFiles((prev) => [...prev, ...items]);

    // Имитация загрузки: небольшой шанс ошибки, чтобы кнопка «повторить» была живой.
    items
      .filter((it) => it.status === "loading")
      .forEach((it) => {
        window.setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === it.id
                ? Math.random() < 0.12
                  ? { ...f, status: "error", error: "Не удалось загрузить", retryable: true }
                  : { ...f, status: "done", retryable: false }
                : f
            )
          );
        }, 900 + Math.random() * 1200);
      });
  };

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const remove = (id: number) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const retry = (id: number) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "loading", error: undefined } : f)));
    window.setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "done", retryable: false } : f))
      );
    }, 1600);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;

    const errs = validate(form);
    const loading = files.some((f) => f.status === "loading");
    const broken = files.some((f) => f.status === "error");

    setErrors(errs);

    if (loading) {
      setNotice("Дождитесь окончания загрузки файлов");
      return;
    }
    if (broken) {
      setNotice("Удалите или перезагрузите файлы с ошибкой");
      return;
    }
    if (Object.keys(errs).length > 0) {
      setNotice(null);
      const first = (["name", "email", "phone", "task", "consent"] as (keyof FormState)[]).find((k) => errs[k]);
      if (first) fieldRefs[first]?.current?.focus();
      return;
    }

    setNotice(null);
    setStatus("sending");

    // Здесь данные уходят на сервер: FormData уже собран и готов к fetch().
    const payload = new FormData();
    payload.append("name", form.name.trim());
    payload.append("org", form.org.trim());
    payload.append("email", form.email.trim());
    payload.append("phone", form.phone.trim());
    payload.append("task", form.task.trim());
    files.forEach((f) => f.file && payload.append("files", f.file));

    // Имитация запроса; замените на реальный вызов API.
    window.setTimeout(() => {
      setStatus("success");
      setForm(EMPTY_FORM);
      setFiles([]);
      setErrors({});
      window.setTimeout(() => setStatus("idle"), 5000);
    }, 1400);
  };

  const totalKb = files.reduce((s, f) => s + f.sizeKb, 0);
  const failed = files.filter((f) => f.status === "error").length;
  const fieldErrorCls = (err?: string) =>
    cn("field", err && "border-red-400 focus:border-red-500 focus:ring-red-500/15");

  return (
    <section id="apply" className="relative overflow-x-clip bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-100/70 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-brand-100/60 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Кикер — выше и заголовка, и формы */}
        <Reveal>
          <p className="eyebrow">Онлайн-анкета</p>
        </Reveal>

        <div className="mt-5 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Левая колонка: заголовок и фото */}
          <div className="flex flex-col">
            <Reveal>
              <h2 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                Заполните анкету
              </h2>
              <p className="mt-4 max-w-md text-base font-medium text-neutral-500 sm:text-lg">
                Ответим в течение 2 рабочих дней. Приложите ТЗ или примеры — так мы быстрее соберём команду.
              </p>
            </Reveal>

            {/* Фото забирает только оставшуюся высоту колонки: нижний край
                карточки встаёт ровно по нижнему краю формы. */}
            <Reveal
              delay={150}
              direction="zoom"
              className="mt-14 lg:mt-20 lg:flex lg:min-h-64 lg:flex-1 lg:justify-start"
            >
              <TeamPhoto className="lg:h-full lg:w-auto" />
            </Reveal>
          </div>

          {/* Правая колонка: форма */}
          <Reveal delay={200} direction="left">
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative rounded-[2rem] mt-10 bg-white p-6 shadow-[0_1px_2px_rgba(11,13,12,0.04),0_24px_64px_-24px_rgba(11,13,12,0.18)] ring-1 ring-black/5 sm:p-10"
          >
            {/* Градиентный волосок — свет, падающий на верхнюю грань карточки */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent"
            />
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <Field label="Как вас зовут?" error={errors.name}>
                <input
                  ref={nameRef}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  autoCapitalize="words"
                  placeholder="Иванов Иван"
                  value={form.name}
                  onChange={setValue("name")}
                  onBlur={onBlurField("name")}
                  aria-invalid={Boolean(errors.name)}
                  className={fieldErrorCls(errors.name)}
                />
              </Field>
              <Field label="Название организации">
                <input
                  name="org"
                  type="text"
                  autoComplete="organization"
                  autoCapitalize="words"
                  placeholder={'ООО "Ромашка"'}
                  value={form.org}
                  onChange={setValue("org")}
                  className="field"
                />
              </Field>
              <Field label="E-mail" error={errors.email}>
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="ivanov_ivan@mail.ru"
                  value={form.email}
                  onChange={setValue("email")}
                  onBlur={onBlurField("email")}
                  aria-invalid={Boolean(errors.email)}
                  className={fieldErrorCls(errors.email)}
                />
              </Field>
              <Field label="Телефон" error={errors.phone}>
                <input
                  ref={phoneRef}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 (999) 000-00-00"
                  value={form.phone}
                  onChange={setValue("phone")}
                  onBlur={onBlurField("phone")}
                  aria-invalid={Boolean(errors.phone)}
                  className={fieldErrorCls(errors.phone)}
                />
              </Field>
              <Field label="Описание задачи" error={errors.task} className="sm:col-span-2">
                <textarea
                  ref={taskRef}
                  name="task"
                  required
                  rows={4}
                  placeholder="Опишите задачу..."
                  value={form.task}
                  onChange={setValue("task")}
                  onBlur={onBlurField("task")}
                  aria-invalid={Boolean(errors.task)}
                  className={cn(fieldErrorCls(errors.task), "min-h-32 resize-y")}
                />
              </Field>
            </div>

            {/* Загрузка файлов */}
            <div className="mt-6">
              <animated.label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                style={{ scale: drag.scale }}
                className={cn(
                  "group flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed px-5 py-4 transition-[border-color,background-color] duration-200",
                  dragging
                    ? "border-brand-500 bg-brand-50"
                    : "border-neutral-300 bg-neutral-50 hover:border-brand-400 hover:bg-brand-50/60"
                )}
              >
                <input ref={inputRef} type="file" multiple className="sr-only" onChange={onPick} />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-neutral-500 shadow-sm transition-[color,background-color] duration-200 group-hover:text-brand-600">
                  <FilePlus className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-[15px] font-bold">Перетащите файлы сюда</span>
                  <span className="block text-xs font-medium text-neutral-500">Максимальный размер: 1.2 MB</span>
                </span>
              </animated.label>

              <ul className="mt-3 divide-y divide-neutral-100">
                {files.map((f) => (
                  <FileItem key={f.id} file={f} onRetry={() => retry(f.id)} onRemove={() => remove(f.id)} />
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-between px-3 text-[11px] font-semibold">
                <span className="text-neutral-500">
                  {files.length} из {MAX_FILES} файлов · {formatSize(totalKb)}
                </span>
                {failed > 0 && (
                  <span className="text-red-500">
                    {failed === 1
                      ? "1 файл не добавлен"
                      : `${failed} ${plural(failed, "файл", "файла", "файлов")} не добавлено`}
                  </span>
                )}
              </div>

              {notice && (
                <p role="status" className="mt-2 px-3 text-xs font-semibold text-amber-600">
                  {notice}
                </p>
              )}
            </div>

            {/* Согласие и отправка */}
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <label className="group flex cursor-pointer items-center gap-3 text-sm font-semibold text-neutral-700">
                  <span className="relative flex h-5 w-5 shrink-0">
                    <input
                      ref={consentRef}
                      type="checkbox"
                      checked={form.consent}
                      onChange={onConsent}
                      aria-invalid={Boolean(errors.consent)}
                      className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-md border-2 border-neutral-400 bg-white transition-[border-color,background-color] duration-200 checked:border-brand-500 checked:bg-brand-500 group-hover:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                    />
                    <Check className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 scale-50 text-white opacity-0 transition-[opacity,scale] duration-200 peer-checked:scale-100 peer-checked:opacity-100" strokeWidth={3} />
                  </span>
                  Я согласен на обработку персональных данных
                </label>
                {errors.consent && <FieldError message={errors.consent} />}
              </div>

              <PrimaryButton type="submit" disabled={status === "sending"} className="px-8 py-3.5 text-base sm:min-w-44">
                <ButtonLabel key={status} status={status} />
              </PrimaryButton>
            </div>

            {status === "success" && <SuccessBanner />}
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
