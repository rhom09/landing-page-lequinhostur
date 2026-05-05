import { useState, useEffect } from 'react';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { client, urlFor } from '@/lib/sanity';

const DESTINOS = [
  { nome: 'Porto de Galinhas', img: '/destino-porto-de-galinhas.jpg', data: '15 JAN', badge_mes: 'JAN', badge_dia: '15', badge_semana: 'SEG' },
  { nome: 'Campos do Jordão', img: '/destino-campos-do-jordao.jpg', data: '22 FEV', badge_mes: 'FEV', badge_dia: '22', badge_semana: 'QUI' },
  { nome: 'Aparecida do Norte', img: '/destino-aparecida.jpg', data: '08 MAR', badge_mes: 'MAR', badge_dia: '08', badge_semana: 'DOM' },
  { nome: 'Serra Gaúcha', img: '/destino-serra-gaucha.jpg', data: '05 ABR', badge_mes: 'ABR', badge_dia: '05', badge_semana: 'DOM' },
  { nome: 'Beto Carrero', img: '/destino-beto-carrero.jpg', data: '12 MAI', badge_mes: 'MAI', badge_dia: '12', badge_semana: 'TER' },
  { nome: 'Natal', img: '/destino-natal.jpg', data: '20 JUN', badge_mes: 'JUN', badge_dia: '20', badge_semana: 'SÁB' },
  { nome: 'Gramado', img: '/destino-gramado.jpg', data: '10 JUL', badge_mes: 'JUL', badge_dia: '10', badge_semana: 'SEX' },
  { nome: 'Fretamento', img: '/onibus-frota.jpg', data: 'SOB DEMANDA', tag: 'SOB DEMANDA' },
];

function ViagemCard({ destino, index }: { destino: any; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1);

  const imgSrc = typeof destino.img === 'string' 
    ? destino.img 
    : destino.img ? urlFor(destino.img).width(800).url() : '/onibus-frota.jpg';

  // Tenta pegar 'titulo' (Sanity) ou 'nome' (Fallback)
  const nome = destino.titulo || destino.nome || "Destino sem nome";
  const duracao = destino.duracao || destino.data || "Consulte opções";

  return (
    <div
      ref={ref}
      className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-card-hover ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <img
        src={imgSrc}
        alt={nome}
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
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md z-10 transition-transform duration-300 group-hover:-translate-y-1">
          {destino.tag}
        </div>
      )}

      {/* Title & Info Container (Bottom) */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
        <div className="flex-1 pr-4">
          {destino.categoria && (
            <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1.5 drop-shadow-md">
              {destino.categoria}
            </div>
          )}
          <h3 className="font-serif text-2xl sm:text-[28px] text-white text-shadow-lg leading-tight mb-2.5">
            {nome}
          </h3>
          <div className="flex items-center text-gray-200 text-sm font-medium">
            <CalendarDays className="w-4 h-4 mr-1.5 opacity-90" />
            <span>{duracao}</span>
          </div>
        </div>
        
        {/* Arrow Button */}
        <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
          <ArrowUpRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-45" />
        </div>
      </div>
    </div>
  );
}

export function GridViagens() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const [destinos, setDestinos] = useState<any[]>(DESTINOS);
  
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
    <section id="destinos" className="py-20 bg-gray-50">
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
