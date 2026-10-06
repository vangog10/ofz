import type { Card } from "../interfaces/card.interface"

function CardItem({icon, title, text}: Card) {
    return (
        <div className="w-77.5 h-64 size-lf-stretch px-6 py-8 bg-white rounded-lg shadow-[0px_15px_18px_1px_rgba(0,0,0,0.07)] flex flex-col layout-l gap-8">
            <div data-property-1="XL" className="size-12 overflow-hidden">
                    {icon}
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-black text-2xl font-bold font-['ALS_Sirius'] leading-7">{title}</div>
                <div className="self-stretch justify-start text-black/80 text-xl font-normal font-['ALS_Sirius'] leading-6">{text}</div>
            </div>
        </div>
    )
}

export default CardItem