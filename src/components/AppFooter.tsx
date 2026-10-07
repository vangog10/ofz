import tpuLogo from "../assets/TPU_black.logo.png"

function AppFooter() {
    return (
        <div className="flex flex-col gap-6 p-16 bg-[#1e1e1e]">
            <div className="flex justify-between">
                <img src={tpuLogo} alt="Томский политехнический университет" />
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="justify-start text-white text-xl font-bold font-['ALS_Sirius'] leading-6 tracking-wide">Контакты</div>
                        <div className="justify-start text-white/60 text-base font-normal font-['ALS_Sirius'] leading-5 tracking-tight">+7 (3822) 701-777</div>
                        <div className="justify-start text-white/60 text-base font-normal font-['ALS_Sirius'] leading-5 tracking-tight">tpu@tpu.ru</div>
                        <div className="w-56 justify-start text-white/60 text-base font-normal font-['ALS_Sirius'] leading-5 tracking-tight">г.Томск, ул. Ленина, 30</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="justify-start text-white text-xl font-bold font-['ALS_Sirius'] leading-6 tracking-wide">Социальные сети</div>
                        <div className="justify-start text-white/60 text-base font-normal font-['ALS_Sirius'] leading-5 tracking-tight">Telegram</div>
                        <div className="justify-start text-white/60 text-base font-normal font-['ALS_Sirius'] leading-5 tracking-tight">VKontakte</div>
                    </div>
                </div>
            </div>
            <div className="self-stretch h-px bg-white/60" />
            <div className="self-stretch justify-start text-white/60 text-xs font-normal font-['ALS_Sirius'] leading-5 tracking-wide">
                © 2026 Национальный исследовательский Томский политехнический университет
            </div>
        </div>
    )
}

export default AppFooter