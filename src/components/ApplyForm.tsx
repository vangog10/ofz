import B24Form from "./B24Form";
import TeamPhoto from "./TeamPhoto";

export default function ApplyForm() {
  return (
    <section id="apply" className="relative overflow-x-clip bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Фото команды — слева от формы, как было в прежней анкете. */}
        <TeamPhoto className="w-full" />

        {/* Обёртка формы: те же скругления, что у фото, тонкая рамка и мягкая
            тень; overflow-hidden подрезает углы содержимого по этому радиусу. */}
        <div className="overflow-hidden rounded-[2rem] border border-neutral-200 shadow-[0_1px_2px_rgba(11,13,12,0.06),0_12px_32px_-16px_rgba(11,13,12,0.18)]">
          <B24Form />
        </div>
      </div>
    </section>
  );
}
