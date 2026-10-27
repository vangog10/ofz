import { useEffect, useState } from "react";

/**
 * True, когда основное устройство ввода умеет ховер (мышь/трекпад).
 * Capability-запрос, а не сниффинг устройства: тач-ноутбуки и планшеты
 * с мышью получают ховеры корректно.
 */
export function useHoverCapable() {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCapable(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return capable;
}
