import { useState, useEffect } from 'react';
import { Star, Users, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { client } from '@/lib/sanity';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import type { Estatistica } from '@/types/sanity';

const DEPOIMENTOS = [
  {
    texto: 'A viagem para Porto de Galinhas foi incrível! O ônibus super confortável, motorista experiente e a organização impecável. Já estou planejando a próxima!',
    autor: 'Maria Silva',
    destino: 'Porto de Galinhas',
    avatar: '/destino-porto-de-galinhas.webp',
  },
  {
    texto: 'Levei minha família para Campos do Jordão e foi uma experiência memorável. A Lekinhos cuidou de cada detalhe, desde a hospedagem até os passeios. Recomendo!',
    autor: 'João Pereira',
    destino: 'Campos do Jordão',
    avatar: '/destino-campos-do-jordao.webp',
  },
  {
    texto: 'Fretamento para o evento da empresa foi perfeito. Pontualidade, segurança e atendimento de primeira. A Lekinhos é nossa parceira oficial de viagens.',
    autor: 'Ana Costa',
    destino: 'Fretamento Corporativo',
    avatar: '/onibus-frota.webp',
  },
];

const ESTATISTICAS_FALLBACK = [
  { icone: 'users', valor: '+22.429', label: 'passageiros felizes' },
  { icone: 'map-pin', valor: '54+', label: 'destinos pelo Brasil' },
  { icone: 'calendar', valor: '12+', label: 'anos de experiência' },
  { icone: 'check-circle', valor: '100%', label: 'viagens realizadas' },
];

interface Depoimento {
  _id: string;
  texto: string;
  autor: string;
  destino: string;
  avatar: any;
}

const getIconComponent = (name: string) => {
  switch (name) {
    case 'users': return Users;
    case 'map-pin': return MapPin;
    case 'calendar': return Calendar;
    case 'check-circle': return CheckCircle;
    default: return Users;
  }
};

function DepoimentoCard({ depoimento, index }: { depoimento: any; index: number }) {
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
        <OptimizedImage
          src={depoimento.avatar || depoimento.avatar_fallback}
          alt={depoimento.autor}
          width={48}
          height={48}
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
  const [estatisticas, setEstatisticas] = useState<Estatistica[]>(ESTATISTICAS_FALLBACK);
  const [depoimentos, setDepoimentos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const queryEst = '*[_type == "estatistica"] | order(order asc)[0...4]';
        const queryDep = '*[_type == "depoimento"] | order(order asc)[0...3] { _id, texto, autor, destino, "avatar": avatar.asset->url }';

        const [dataEst, dataDep] = await Promise.all([
          client.fetch(queryEst),
          client.fetch(queryDep)
        ]);

        if (dataEst && dataEst.length > 0) setEstatisticas(dataEst);
        if (dataDep && dataDep.length > 0) setDepoimentos(dataDep);
      } catch (error) {
        console.error("Erro ao buscar dados do Sanity:", error);
      }
    }
    fetchData();
  }, []);

  const renderedDepoimentos = depoimentos.length > 0
    ? depoimentos.map(d => ({ ...d, avatar_fallback: d.avatar }))
    : DEPOIMENTOS.map(d => ({ ...d, avatar_fallback: d.avatar }));

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
          {renderedDepoimentos.map((depoimento, index) => (
            <DepoimentoCard
              key={depoimento._id || depoimento.autor}
              depoimento={depoimento}
              index={index}
            />
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
