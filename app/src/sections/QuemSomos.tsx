import { Bus, ShieldCheck, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function QuemSomos() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="quem-somos" className="py-20 bg-lekinhos-off-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {/* Image */}
          <div className="relative">
            <img
              src="/onibus-frota.jpg"
              alt="Ônibus da frota Lekinhos TUR"
              className="w-full rounded-2xl shadow-lg object-cover aspect-video"
            />
          </div>

          {/* Content */}
          <div>
            <span className="text-accent text-sm font-bold tracking-wider uppercase mb-3 block">
              Quem Somos
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-lekinhos-gray-dark mb-6 leading-tight">
              Viajar é nossa paixão e sua segurança é nossa missão
            </h2>
            <p className="text-lekinhos-gray-medium text-base leading-relaxed mb-8">
              Há mais de 12 anos, a Lekinhos TUR leva milhares de passageiros para conhecer os mais lindos
              destinos do Brasil. Com uma frota moderna e equipe especializada, garantimos conforto,
              segurança e momentos inesquecíveis em cada viagem. Cada roteiro é cuidadosamente planejado
              para oferecer a melhor experiência possível, com hotéis selecionados, guias experientes e
              um atendimento que faz a diferença.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-xs">
                <div className="w-10 h-10 rounded-full bg-lekinhos-blue-light flex items-center justify-center flex-shrink-0">
                  <Bus className="w-5 h-5 text-lekinhos-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-lekinhos-gray-dark text-sm">Frota Moderna</h4>
                  <p className="text-lekinhos-gray-medium text-xs mt-0.5">Ônibus executivos com ar, Wi-Fi e poltronas reclináveis</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-xs">
                <div className="w-10 h-10 rounded-full bg-lekinhos-blue-light flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-lekinhos-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-lekinhos-gray-dark text-sm">Viagem Segura</h4>
                  <p className="text-lekinhos-gray-medium text-xs mt-0.5">Motoristas experientes e seguro viagem incluso</p>
                </div>
              </div>
            </div>

            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-lekinhos-blue text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-lekinhos-blue-dark transition-all duration-200"
            >
              Conheça nossa frota
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
