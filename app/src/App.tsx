import { Navbar } from '@/sections/Navbar';
import { HeroSection } from '@/sections/HeroSection';
import { GridViagens } from '@/sections/GridViagens';
import { CategoriasAventura } from '@/sections/CategoriasAventura';
import { CalendarioExcursoes } from '@/sections/CalendarioExcursoes';
import { SocialProof } from '@/sections/SocialProof';
import { QuemSomos } from '@/sections/QuemSomos';
import { LeadCapture } from '@/sections/LeadCapture';
import { Footer } from '@/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

function App() {
  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />
      <main>
        <HeroSection />
        <GridViagens />
        <CategoriasAventura />
        <CalendarioExcursoes />
        <SocialProof />
        <QuemSomos />
        <LeadCapture />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
