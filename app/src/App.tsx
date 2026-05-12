import { Suspense, lazy } from 'react';
import { Navbar } from '@/sections/Navbar';
import { HeroSection } from '@/sections/HeroSection';
import { GridViagens } from '@/sections/GridViagens';
import { CategoriasAventura } from '@/sections/CategoriasAventura';
import { QuemSomos } from '@/sections/QuemSomos';
import { LeadCapture } from '@/sections/LeadCapture';
import { Footer } from '@/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { BottomNav } from '@/sections/BottomNav';

// Lazy loading heavy sections
const CalendarioExcursoes = lazy(() => import('@/sections/CalendarioExcursoes').then(module => ({ default: module.CalendarioExcursoes })));
const SocialProof = lazy(() => import('@/sections/SocialProof').then(module => ({ default: module.SocialProof })));

function SectionFallback() {
  return <div className="py-20 animate-pulse bg-gray-50 flex items-center justify-center text-gray-300">Carregando...</div>;
}

function App() {
  return (
    <div className="min-h-screen bg-white font-body pb-[80px] lg:pb-0">
      <Navbar />
      <main>
        <HeroSection />
        <GridViagens />
        <CategoriasAventura />
        <Suspense fallback={<SectionFallback />}>
          <CalendarioExcursoes />
          <SocialProof />
        </Suspense>
        <QuemSomos />
        <LeadCapture />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BottomNav />
    </div>
  );
}

export default App;
