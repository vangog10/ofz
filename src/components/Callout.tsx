import type { CalloutProps } from "../interfaces/callout.interface"
import ShevronRight from "./icons/ShevronRight"

function Callout({ title, children }: CalloutProps) {
 return (
    <div className="w-full self-stretch p-6 bg-white rounded-lg shadow-[0px_4px_10px_0px_rgba(0,0,0,0.07)] inline-flex justify-start items-start gap-3 overflow-hidden">
    <div className="flex-1 flex justify-between items-center">
        <div className="flex-1 justify-start text-black/80 text-2xl font-bold font-['ALS_Sirius'] leading-7">{title}</div>
        <div>
            <ShevronRight size={32} color="#28be46"/>
        </div>
    </div>
    <div className="hidden">{children}</div>
</div>
 )
}

export default Callout