import { useState, useEffect } from 'react';
import { MessageCircle, Calendar, MapPin } from 'lucide-react';
import { client, urlFor } from '@/lib/sanity';

import { WHATSAPP_LINK } from '../constants/contacts';
import { OptimizedImage } from '@/components/common/OptimizedImage';

import type { ProximaSaida } from '@/types/sanity';

const PROXIMAS_SAIDAS_FALLBACK: FormattedSaida[] = [
  { data: '15 JAN', destino: 'Porto de Galinhas', img: '/destino-porto-de-galinhas.webp' },
  { data: '22 FEV', destino: 'Campos do Jordão', img: '/destino-campos-do-jordao.webp' },
  { data: '08 MAR', destino: 'Aparecida do Norte', img: '/destino-aparecida.webp' },
];

interface FormattedSaida {
  data: string;
  destino: string;
  img: string;
}

export function HeroSection() {
  const [proximasSaidas, setProximasSaidas] = useState<FormattedSaida[]>(PROXIMAS_SAIDAS_FALLBACK);

  useEffect(() => {
    async function fetchProximasSaidas() {
      try {
        const query = '*[_type == "proximaSaida"] | order(order asc)[0...3]';
        const data: ProximaSaida[] = await client.fetch(query);
        if (data && data.length > 0) {
          const formattedData: FormattedSaida[] = data.map((item) => ({
            data: item.data,
            destino: item.titulo,
            img: item.img ? urlFor(item.img).width(200).url() : '/onibus-frota.webp',
          }));
          setProximasSaidas(formattedData);
        }
      } catch (error) {
        console.error("Erro ao buscar proximas saídas no Sanity, usando fallback:", error);
      }
    }
    fetchProximasSaidas();
  }, []);

  return (
    <section id="hero" className="relative flex flex-col overflow-hidden">
      {/* Background Image + Overlay Content */}
      <div className="relative min-h-[70vh] lg:min-h-[100vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/Hero-Mobile-Desktop.png"
            alt="Ônibus de turismo em estrada cênica"
            className="w-full h-full object-cover object-center"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center pt-[0px] lg:pt-[0px] pb-8 lg:pb-[140px]">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-shadow-lg leading-tight mb-6">
            Sua próxima viagem começa{' '}
            <span className="text-accent">aqui.</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#excursões"
              className="flex items-center gap-2 bg-accent text-lekinhos-gray-dark px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-accent-hover transition-all duration-200 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              Ver agenda 2026
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-lekinhos-blue px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-lekinhos-gray-light transition-all duration-200 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Floating Banner — Desktop only (absolute) */}
        <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-48px)] max-w-[900px]">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent text-lekinhos-gray-dark text-xs font-bold px-3 py-1 rounded-lg">
                PRÓXIMAS SAÍDAS CONFIRMADAS
              </span>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {proximasSaidas.map((saida, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 group/item cursor-default"
                  title={saida.destino}
                >
                  <div className="relative flex-shrink-0">
                    <OptimizedImage
                      src={saida.img}
                      alt={saida.destino}
                      className="w-11 h-11 rounded-full object-cover shadow-sm group-hover/item:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-accent/0 group-hover/item:border-accent/50 transition-colors duration-300" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-bold text-accent uppercase tracking-wider mb-0.5">{saida.data}</p>
                    <div className="flex items-start gap-1">
                      <MapPin className="w-3 h-3 text-lekinhos-blue flex-shrink-0 mt-1 group-hover/item:animate-bounce" />
                      <p className="text-sm text-lekinhos-gray-dark font-semibold leading-snug line-clamp-2 group-hover/item:text-lekinhos-blue transition-colors duration-200">
                        {saida.destino}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Banner — normal flow, below the hero image */}
      <div className="lg:hidden relative z-20 -mt-10 mx-4 mb-4">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-accent text-lekinhos-gray-dark text-xs font-bold px-3 py-1 rounded-lg">
              PRÓXIMAS SAÍDAS CONFIRMADAS
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {proximasSaidas.map((saida, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 cursor-default"
                title={saida.destino}
              >
                <div className="relative flex-shrink-0">
                  <OptimizedImage
                    src={saida.img}
                    alt={saida.destino}
                    className="w-11 h-11 rounded-full object-cover shadow-sm"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-0.5">{saida.data}</p>
                  <div className="flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-lekinhos-blue flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-lekinhos-gray-dark font-semibold leading-snug">
                      {saida.destino}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
