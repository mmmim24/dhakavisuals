import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
export default function Home() {
  return (
    <div className="min-h-100 max-w-full mx-auto py-8 flex flex-col justify-center">
      <Hero />
      <Clients />
      <Services />
      <Portfolio />
      <Testimonial />
      <Contact />
    </div>
  );
}
