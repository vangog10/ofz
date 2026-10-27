import type { ReactNode } from "react";
import Reveal from "./Reveal";
import TpuLogo from "./TpuLogo";
import { MailIcon, MapPinIcon, PhoneIcon, TelegramIcon, VkIcon } from "./Icons";

function IconChip({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-brand-400 transition-colors duration-200 group-hover:border-brand-500/50 group-hover:bg-brand-500/10">
      {children}
    </span>
  );
}

function FooterLink({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3.5 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:text-white"
    >
      <IconChip>{icon}</IconChip>
      {label}
    </a>
  );
}

function RowStatic({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3.5 text-sm font-medium text-neutral-300">
      <IconChip>{icon}</IconChip>
      {label}
    </div>
  );
}

const columnTitleCls = "text-xs font-extrabold uppercase tracking-[0.22em] text-neutral-500";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#101210] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-500/15 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.9fr_0.9fr] lg:gap-16">
          {/* Логотип и описание */}
          <Reveal direction="right">
            <div>
              <TpuLogo variant="dark" size="lg" />
              <p className="mt-6 max-w-sm text-sm font-medium leading-relaxed text-neutral-400">
                Национальный исследовательский Томский политехнический университет. Соберём команду
                студентов и учёных под вашу задачу.
              </p>
            </div>
          </Reveal>

          {/* Контакты */}
          <Reveal delay={120}>
            <div>
              <h3 className={columnTitleCls}>Контакты</h3>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <FooterLink icon={<PhoneIcon className="h-5 w-5" />} label="+7 (3822) 701-777" href="tel:+73822701777" />
                </li>
                <li>
                  <FooterLink icon={<MailIcon className="h-5 w-5" />} label="tpu@tpu.ru" href="mailto:tpu@tpu.ru" />
                </li>
                <li>
                  <RowStatic icon={<MapPinIcon className="h-5 w-5" />} label="г. Томск, ул. Ленина, 30" />
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Социальные сети */}
          <Reveal delay={200}>
            <div>
              <h3 className={columnTitleCls}>Социальные сети</h3>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <FooterLink icon={<TelegramIcon className="h-5 w-5" />} label="Telegram" href="#" />
                </li>
                <li>
                  <FooterLink icon={<VkIcon className="h-5 w-5" />} label="VKontakte" href="#" />
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
