import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { client, urlFor } from '@/lib/sanity';

const DESTINOS = [
  { nome: 'Porto de Galinhas', img: '/destino-porto-de-galinhas.jpg', data: '15 JAN' },
  { nome: 'Campos do Jordão', img: '/destino-campos-do-jordao.jpg', data: '22 FEV' },
  { nome: 'Aparecida do Norte', img: '/destino-aparecida.jpg', data: '08 MAR' },
  { nome: 'Serra Gaúcha', img: '/destino-serra-gaucha.jpg', data: '05 ABR' },
  { nome: 'Beto Carrero', img: '/destino-beto-carrero.jpg', data: '12 MAI' },
  { nome: 'Natal', img: '/destino-natal.jpg', data: '20 JUN' },
  { nome: 'Gramado', img: '/destino-gramado.jpg', data: '10 JUL' },
  { nome: 'Fretamento', img: '/onibus-frota.jpg', data: 'SOB DEMANDA' },
];

function ViagemCard({ destino, index }: { destino: any; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1);

  const imgSrc = typeof destino.img === 'string' 
    ? destino.img 
    : destino.img ? urlFor(destino.img).width(800).url() : '/onibus-frota.jpg';

  // Tenta pegar 'titulo' (Sanity) ou 'nome' (Fallback)
  const nome = destino.titulo || destino.nome || "Destino sem nome";
  const dataViagem = destino.data || "Confira";

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
      {/* Gradient overlay - escurecido na base para destacar o nome branco */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Date badge */}
      <div className="absolute top-4 right-4 bg-accent text-lekinhos-gray-dark text-xs font-bold px-3 py-1.5 rounded-lg z-10">
        {dataViagem}
      </div>

      {/* Title & Button Container */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
        <div className="flex-1">
          <h3 className="font-display text-2xl sm:text-3xl text-white text-shadow-lg leading-none uppercase">
            {nome}
          </h3>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 ml-2 shadow-lg transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="w-5 h-5 text-lekinhos-blue" />
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
    <section id="destinos" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={headerRef}
          className={`text-center mb-12 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-lekinhos-gray-dark mb-4">
            Destinos mais procurados
          </h2>
          <p className="text-lekinhos-gray-medium text-base sm:text-lg max-w-xl mx-auto">
            Escolha seu próximo destino e embarque em uma experiência única
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinos.map((destino, index) => (
            <ViagemCard key={destino._id || destino.nome} destino={destino} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
