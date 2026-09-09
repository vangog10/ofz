function App() {
  return (
    <div className="min-h-screen bg-globe px-8 py-10">
      <div className="bg-island rounded-2xl max-w-3xl mx-auto p-8">
        {/* Заголовки: размер из шкалы, жирность — базовым правилом */}
        <h1 className="text-6xl">Заголовок первого уровня</h1>
        <h2 className="text-4xl">Заголовок второго уровня</h2>
        <h3 className="text-3xl">Заголовок третьего уровня</h3>
        <h4 className="text-2xl">Заголовок четвёртого уровня</h4>
        <h5 className="text-xl tracking-[0.02em]">Заголовок пятого уровня</h5>

        {/* Текст */}
        <p className="text-base">
          Обычный абзац. Шрифт ALS Sirius подставляется сам через --default-font-family.
        </p>
        <p className="text-xl">Крупный текст — как раньше p .lg / a .lg.</p>
        <p className="text-xs">Подпись-капшен — как раньше p .sm / a .sm.</p>

        {/* Кнопки */}
        <button className="mt-6 mr-3 rounded-lg bg-green px-5 py-3 text-base text-white leading-6 tracking-[0.04em] hover:bg-primary-hover active:bg-primary-active">
          Основная кнопка
        </button>
        <button className="rounded-lg bg-yellow px-5 py-3 text-base leading-6 tracking-[0.04em] hover:bg-accent-hover active:bg-accent-active">
          Акцентная кнопка
        </button>

        {/* Effect styles: Drop shadow — medium/small × default/hover (переменные в @theme) */}
        <p className="mt-8 text-xl">Effect styles — Drop shadow:</p>
        <div className="mt-4 flex flex-wrap gap-6">
          <div className="w-40 rounded-2xl bg-white p-4 text-base drop-shadow-medium-default">
            medium default
          </div>
          <div className="w-40 rounded-2xl bg-white p-4 text-base drop-shadow-medium-hover">
            medium hover
          </div>
          <div className="w-40 rounded-2xl bg-white p-4 text-base drop-shadow-small-default">
            small default
          </div>
          <div className="w-40 rounded-2xl bg-white p-4 text-base drop-shadow-small-hover">
            small hover
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
