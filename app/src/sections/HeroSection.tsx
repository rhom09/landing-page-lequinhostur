import { MessageCircle, Calendar, MapPin } from 'lucide-react';

const WHATSAPP_LINK = 'https://api.whatsapp.com/send?phone=5511932332410&text=Olá! Gostaria de mais informações sobre as viagens da Lekinhos TUR.';

const PROXIMAS_SAIDAS = [
  { data: '15 JAN', destino: 'Porto de Galinhas', img: '/destino-porto-de-galinhas.jpg' },
  { data: '22 FEV', destino: 'Campos do Jordão', img: '/destino-campos-do-jordao.jpg' },
  { data: '08 MAR', destino: 'Aparecida do Norte', img: '/destino-aparecida.jpg' },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bus.jpg"
          alt="Ônibus de turismo em estrada cênica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center pt-[72px]">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-shadow-lg leading-tight mb-6">
          Sua próxima viagem começa{' '}
          <span className="text-accent">aqui.</span>
        </h1>
        <p className="text-white/90 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto font-body">
          +22.429 passageiros felizes · 54+ destinos pelo Brasil
        </p>
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

      {/* Floating Banner */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-48px)] max-w-[900px]">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-accent text-lekinhos-gray-dark text-xs font-bold px-3 py-1 rounded-lg">
              PRÓXIMAS SAÍDAS CONFIRMADAS
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PROXIMAS_SAIDAS.map((saida, index) => (
              <div key={index} className="flex items-center gap-3">
                <img
                  src={saida.img}
                  alt={saida.destino}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-accent">{saida.data}</p>
                  <p className="text-sm text-lekinhos-gray-dark font-medium truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-lekinhos-blue flex-shrink-0" />
                    {saida.destino}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
