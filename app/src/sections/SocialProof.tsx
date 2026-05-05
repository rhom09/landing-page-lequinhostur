import { useState, useEffect } from 'react';
import { Star, Users, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { client } from '@/lib/sanity';

const DEPOIMENTOS = [
  {
    texto: 'A viagem para Porto de Galinhas foi incrível! O ônibus super confortável, motorista experiente e a organização impecável. Já estou planejando a próxima!',
    autor: 'Maria Silva',
    destino: 'Porto de Galinhas',
    avatar: '/destino-porto-de-galinhas.jpg',
  },
  {
    texto: 'Levei minha família para Campos do Jordão e foi uma experiência memorável. A Lekinhos cuidou de cada detalhe, desde a hospedagem até os passeios. Recomendo!',
    autor: 'João Pereira',
    destino: 'Campos do Jordão',
    avatar: '/destino-campos-do-jordao.jpg',
  },
  {
    texto: 'Fretamento para o evento da empresa foi perfeito. Pontualidade, segurança e atendimento de primeira. A Lekinhos é nossa parceira oficial de viagens.',
    autor: 'Ana Costa',
    destino: 'Fretamento Corporativo',
    avatar: '/onibus-frota.jpg',
  },
];

const ESTATISTICAS_FALLBACK = [
  { icone: 'users', valor: '+22.429', label: 'passageiros felizes' },
  { icone: 'map-pin', valor: '54+', label: 'destinos pelo Brasil' },
  { icone: 'calendar', valor: '12+', label: 'anos de experiência' },
  { icone: 'check-circle', valor: '100%', label: 'viagens realizadas' },
];

const getIconComponent = (name: string) => {
  switch (name) {
    case 'users': return Users;
    case 'map-pin': return MapPin;
    case 'calendar': return Calendar;
    case 'check-circle': return CheckCircle;
    default: return Users;
  }
};

function DepoimentoCard({ depoimento, index }: { depoimento: typeof DEPOIMENTOS[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-6 shadow-card ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
        ))}
      </div>
      <p className="text-lekinhos-gray-dark text-sm sm:text-base italic mb-6 leading-relaxed">
        "{depoimento.texto}"
      </p>
      <div className="flex items-center gap-3">
        <img
          src={depoimento.avatar}
          alt={depoimento.autor}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-lekinhos-gray-dark text-sm">{depoimento.autor}</p>
          <p className="text-lekinhos-gray-medium text-xs">{depoimento.destino}</p>
        </div>
      </div>
    </div>
  );
}

export function SocialProof() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.1);
  const [estatisticas, setEstatisticas] = useState<any[]>(ESTATISTICAS_FALLBACK);

  useEffect(() => {
    async function fetchEstatisticas() {
      try {
        const query = '*[_type == "estatistica"] | order(order asc)[0...4]';
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setEstatisticas(data);
        }
      } catch (error) {
        console.error("Erro ao buscar estatísticas no Sanity, usando fallback:", error);
      }
    }
    fetchEstatisticas();
  }, []);

  return (
    <section className="py-20 bg-lekinhos-blue">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={headerRef}
          className={`text-center mb-12 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            O que nossos passageiros dizem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {DEPOIMENTOS.map((depoimento, index) => (
            <DepoimentoCard key={depoimento.autor} depoimento={depoimento} index={index} />
          ))}
        </div>

        <div
          ref={statsRef}
          className={`grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/20 pt-12 ${statsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {estatisticas.map((stat, index) => {
            const Icon = getIconComponent(stat.icone);
            return (
              <div key={index} className="text-center">
                <Icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="font-display text-2xl sm:text-3xl text-accent mb-1">{stat.valor}</p>
                <p className="text-white/80 text-xs sm:text-sm">{stat.rotulo || stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
