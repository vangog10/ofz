import Header from "./components/Header";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Benefits from "./components/Benefits";
import Steps from "./components/Steps";
import Faq from "./components/Faq";
import ApplyForm from "./components/ApplyForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    // Колонка на весь экран: main забирает свободное место, футер всегда
    // прижат к низу — под ним не остаётся белой полосы.
    <div className="flex min-h-dvh flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Partners />
        <Benefits />
        <Steps />
        <Faq />
        <ApplyForm />
      </main>
      <Footer />
    </div>
  );
}
