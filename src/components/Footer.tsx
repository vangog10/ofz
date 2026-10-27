import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import Reveal from "./Reveal";
import tpuBlackLogo from "../assets/logos/TPU_black.logo.png";
import FooterLink from "./FooterLink";
import FooterRow from "./FooterRow";
import { FOOTER_COLUMN_TITLE_CLS } from "../constants";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#101210] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-500/15 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-16 sm:px-8 sm:pt-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1.35fr_0.9fr_0.9fr] lg:items-stretch lg:gap-16">
          {/* Логотип — на десктопе по высоте колонок */}
          <Reveal direction="none" className="lg:h-full">
            <a
              href="https://tpu.ru/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Томский политехнический университет — перейти на tpu.ru"
              className="inline-block max-w-full w-3/4 lg:h-full lg:w-auto"
            >
              <img
                src={tpuBlackLogo}
                alt="Томский политехнический университет"
                width={232}
                height={212}
                className="block h-auto w-full object-contain lg:h-full lg:w-auto"
              />
            </a>
          </Reveal>

          {/* Контакты */}
          <Reveal delay={120} direction="none">
            <div>
              <h3 className={FOOTER_COLUMN_TITLE_CLS}>Контакты</h3>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <FooterLink icon={<Phone className="h-5 w-5" />} label="+7 (3822) 701-777" href="tel:+73822701777" />
                </li>
                <li>
                  <FooterLink icon={<Mail className="h-5 w-5" />} label="tpu@tpu.ru" href="mailto:tpu@tpu.ru" />
                </li>
                <li>
                  <FooterRow icon={<MapPin className="h-5 w-5" />} label="г. Томск, ул. Ленина, 30" />
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Социальные сети */}
          <Reveal delay={200} direction="none">
            <div>
              <h3 className={FOOTER_COLUMN_TITLE_CLS}>Социальные сети</h3>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <FooterLink icon={<Send className="h-5 w-5" />} label="Telegram" href="#" />
                </li>
                <li>
                  <FooterLink icon={<MessageCircle className="h-5 w-5" />} label="VKontakte" href="#" />
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-xs font-medium text-neutral-500 sm:mt-16">
          © 2026 Национальный исследовательский Томский политехнический университет
        </div>
      </div>
    </footer>
  );
}
