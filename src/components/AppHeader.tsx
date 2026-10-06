import SimpleButton from "./SimpleButton"

function AppHeader() {
    return (
        <div className="w-full h-24 px-16 py-5 bg-white shadow-[0px_15px_18px_1px_rgba(0,0,0,0.07)] flex justify-between items-center">
            <div className="size- flex justify-start items-center gap-3">
                <img src="../src/assets/TPU.logo.svg" />
            </div>
            <div className="h-14 flex justify-start items-center gap-8">
                <div className="size- inline-flex flex-col justify-start items-end">
                    <div className="justify-start text-black text-xl font-bold font-['ALS_Sirius'] leading-6 tracking-wide">+7 (3822) 701-777</div>
                    <div className="justify-start text-black/40 text-xs font-normal font-['ALS_Sirius'] leading-5 tracking-wide">tpu@tpu.ru</div>
                </div>
                <a href="#form">
                    <SimpleButton>Отправить заявку</SimpleButton>
                </a>
            </div>
        </div>
    )
}

export default AppHeader