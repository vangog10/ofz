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
    <div className="min-h-screen bg-white">
      <Header />
      <main>
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
