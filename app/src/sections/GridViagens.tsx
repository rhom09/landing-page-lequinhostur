import { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { client } from '@/lib/sanity';
import type { Destino } from '@/types/sanity';

const DESTINOS = [
  { nome: 'Porto de Galinhas', img: '/destino-porto-de-galinhas.webp', data: '15 JAN', badge_mes: 'JAN', badge_dia: '15', badge_semana: 'SEG', tag: '🔥 ÚLTIMAS VAGAS', isUrgent: true },
  { nome: 'Campos do Jordão', img: '/destino-campos-do-jordao.webp', data: '22 FEV', badge_mes: 'FEV', badge_dia: '22', badge_semana: 'QUI', tag: '🚌 SAÍDA CONFIRMADA' },
  { nome: 'Aparecida do Norte', img: '/destino-aparecida.webp', data: '08 MAR', badge_mes: 'MAR', badge_dia: '08', badge_semana: 'DOM' },
  { nome: 'Serra Gaúcha', img: '/destino-serra-gaucha.webp', data: '05 ABR', badge_mes: 'ABR', badge_dia: '05', badge_semana: 'DOM' },
  { nome: 'Beto Carrero', img: '/destino-beto-carrero.webp', data: '12 MAI', badge_mes: 'MAI', badge_dia: '12', badge_semana: 'TER' },
  { nome: 'Natal', img: '/destino-natal.webp', data: '20 JUN', badge_mes: 'JUN', badge_dia: '20', badge_semana: 'SÁB' },
  { nome: 'Gramado', img: '/destino-gramado.webp', data: '10 JUL', badge_mes: 'JUL', badge_dia: '10', badge_semana: 'SEX' },
  { nome: 'Fretamento', img: '/onibus-frota.webp', data: 'SOB DEMANDA', tag: 'SOB DEMANDA' },
];

import { OptimizedImage } from '@/components/common/OptimizedImage';

function ViagemCard({ destino, index }: { destino: Destino; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>(0.1);

  // Tenta pegar 'titulo' (Sanity) ou 'nome' (Fallback)
  const nome = destino.titulo || destino.nome || "Destino sem nome";
  const duracao = destino.duracao || destino.data || "Consulte opções";

  return (
    <a
      href="#excursões"
      ref={ref}
      className={`block group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-card-hover ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <OptimizedImage
        src={destino.img || '/onibus-frota.webp'}
        alt={nome}
        width={600}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gradient overlay - mais alto para garantir leitura do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128]/90 via-[#0a1128]/30 to-transparent" />

      {/* Date badge (Top Left) */}
      {(destino.badge_mes || destino.badge_dia) && (
        <div className="absolute top-4 left-4 bg-white rounded-lg overflow-hidden flex flex-col shadow-lg z-10 min-w-[3.5rem] text-center transition-transform duration-300 group-hover:-translate-y-1">
          <div className="bg-[#1e3a8a] text-white text-[10px] font-bold py-1 px-2 uppercase tracking-widest">
            {destino.badge_mes || 'MÊS'}
          </div>
          <div className="py-1.5 px-2 flex flex-col items-center">
            <span className="text-xl font-serif font-bold text-gray-900 leading-none mb-0.5">
              {destino.badge_dia || '--'}
            </span>
            <span className="text-[9px] font-bold text-gray-500 uppercase">
              {destino.badge_semana || ''}
            </span>
          </div>
        </div>
      )}

      {/* Optional Tag (Top Right) */}
      {destino.tag && (
        <div className={`absolute top-4 right-4 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg z-10 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 ${
          destino.isUrgent || destino.tag.includes('ÚLTIMAS') ? 'bg-[#EF4444] text-white animate-pulse' : 
          destino.tag.includes('CONFIRMADA') ? 'bg-[#10B981] text-white' : 'bg-accent text-lekinhos-gray-dark'
        }`}>
          {destino.tag}
        </div>
      )}

      {/* Title & Info Container (Bottom - Glassmorphism) */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 transform transition-all duration-300 group-hover:bg-black/50 group-hover:-translate-y-1">
          <div className="flex-1">
            {destino.categoria && (
              <div className="text-accent text-xs font-bold uppercase tracking-wider mb-1.5 drop-shadow-md">
                {destino.categoria}
              </div>
            )}
            <h3 className="font-display text-2xl sm:text-[26px] text-white text-shadow-lg leading-tight mb-2.5 transition-colors duration-300 group-hover:text-accent">
              {nome}
            </h3>
            <div className="flex items-center text-gray-200 text-sm font-medium">
              <CalendarDays className="w-4 h-4 mr-1.5 opacity-90" />
              <span>{duracao}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export function GridViagens() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const [destinos, setDestinos] = useState<Destino[]>(DESTINOS);
  
  useEffect(() => {
    async function fetchDestinos() {
      try {
        const query = '*[_type == "destino"] | order(order asc)';
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setDestinos(data);
        }
      } catch (error) {
        console.error("Erro ao buscar destinos no Sanity, usando fallback:", error);
      }
    }
    fetchDestinos();
  }, []);

  return (
    <section id="destinos" className="py-20 bg-slate-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={headerRef}
          className={`text-center mb-16 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-lekinhos-gray-dark mb-4">
            Destinos mais procurados
          </h2>
          <p className="text-lekinhos-gray-medium text-base sm:text-lg max-w-xl mx-auto">
            Escolha seu próximo destino e embarque em uma experiência única
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinos.map((destino, index) => (
            <ViagemCard key={destino._id || destino.nome} destino={destino} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
