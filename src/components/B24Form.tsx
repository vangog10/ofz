import { useEffect, useRef } from "react";

/** Тип встройки и адрес загрузчика корпоративной формы Битрикс24. */
const B24_FORM = "inline/13/1y640n";
const B24_LOADER = "https://crm-office.tpu.ru/upload/crm/form/loader_13_1y640n.js";

type Props = {
  className?: string;
};

/**
 * Встраивает корпоративную форму Битрикс24 внутрь React-дерева.
 *
 * Загрузчик Битрикса рисует форму рядом со своим `<script data-b24-form>`.
 * Поэтому маркер-скрипт создаётся внутри контейнера-хоста (а не в index.html),
 * иначе форма встаёт после `#root` — то есть под футером.
 */
export default function B24Form({ className }: Props) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    // StrictMode в dev запускает эффект дважды — второй раз форму не дублируем.
    if (!el || el.dataset.mounted === "1") return;
    el.dataset.mounted = "1";

    const script = document.createElement("script");
    script.setAttribute("data-b24-form", B24_FORM);
    script.setAttribute("data-skip-moving", "true");
    script.textContent = `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'${B24_LOADER}');`;
    el.appendChild(script);
  }, []);

  return <div ref={host} className={className} />;
}
