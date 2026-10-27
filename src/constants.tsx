import type Partner from "./interfaces/partner.interface";
import yandex from "./assets/logos/yandex.png";
import rosatom from "./assets/logos/rosatom.png";
import tbank from "./assets/logos/tbank.png";
import gazprom from "./assets/logos/gasprom.png";
import sibur from "./assets/logos/sibur.png";
import rubius from "./assets/logos/rubius.png";

const PARTNERS: Partner[] = [
  { 
    name: "Яндекс", 
    node: <img src={yandex} alt="Яндекс" className="h-10 w-auto" draggable={false} loading="lazy" /> 
  },
  { 
    name: "Росатом", 
    node: <img src={rosatom} alt="Росатом" className="h-10 w-auto" draggable={false} loading="lazy" /> 
  },
  { 
    name: "Т-Банк", 
    node: <img src={tbank} alt="Т-банк" className="h-10 w-auto" draggable={false} loading="lazy" />
  },
  { 
    name: "Газпром", 
    node: <img src={gazprom} alt="Газпром" className="h-10 w-auto" draggable={false} loading="lazy" />
  },
  { 
    name: "Rubius", 
    node: <img src={rubius} alt="Рубиус" className="h-10 w-auto" draggable={false} loading="lazy" /> 
  },
  { 
    name: "Сибур", 
    node: <img src={sibur} alt="Сибур" className="h-10 w-auto" draggable={false} loading="lazy" /> 
  },
];

export { PARTNERS }