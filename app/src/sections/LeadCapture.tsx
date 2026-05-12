import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

import { WHATSAPP_LINK } from '../constants/contacts';
const EMAIL_LINK = 'mailto:lekinhostur.agencia@gmail.com';

export function LeadCapture() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="contato" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #4A67AB 0, #4A67AB 1px, transparent 0, transparent 50%)`,
        backgroundSize: '20px 20px'
      }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {/* Left - Contact Text */}
          <div>
            <h2 className="font-display text-4xl sm:text-5xl text-lekinhos-gray-dark mb-6 leading-tight">
              Solicite seu orçamento <span className="text-lekinhos-blue">direto pelo WhatsApp</span>
            </h2>
            <p className="text-lekinhos-gray-medium text-lg mb-8 max-w-md">
              Nossa equipe está pronta para te atender com agilidade e humanização. Clique no botão ao lado para iniciar sua próxima aventura!
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-lekinhos-blue-light flex items-center justify-center transition-transform group-hover:scale-110">
                  <MapPin className="w-6 h-6 text-lekinhos-blue" />
                </div>
                <div>
                  <p className="text-xs text-lekinhos-gray-medium uppercase font-bold tracking-wider">Sede Física</p>
                  <p className="text-lekinhos-gray-dark font-semibold text-lg">São Paulo - SP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Cards */}
          <div className="grid grid-cols-1 gap-4">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-lekinhos-off-white hover:bg-white p-8 rounded-3xl border-2 border-transparent hover:border-accent shadow-card transition-all group flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              <div className="text-center sm:text-left flex-grow">
                <p className="text-xs text-[#25D366] font-bold uppercase mb-1">Resposta Imediata</p>
                <h3 className="text-xl font-bold text-lekinhos-gray-dark mb-1">(11) 93233-2410</h3>
                <p className="text-lekinhos-gray-medium text-sm">Chamar no WhatsApp</p>
              </div>
              <div className="bg-accent text-lekinhos-gray-dark px-6 py-2 rounded-full font-bold text-sm group-hover:bg-accent-hover transition-colors shadow-sm whitespace-nowrap">
                Falar agora
              </div>
            </a>

            <a 
              href={EMAIL_LINK}
              className="bg-lekinhos-off-white hover:bg-white p-8 rounded-3xl border-2 border-transparent hover:border-lekinhos-blue/20 shadow-card transition-all group flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-lekinhos-blue/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-lekinhos-blue" />
              </div>
              <div className="text-center sm:text-left flex-grow">
                <p className="text-xs text-lekinhos-blue font-bold uppercase mb-1">E-mail Corporativo</p>
                <h3 className="text-xl font-bold text-lekinhos-gray-dark mb-1">lekinhostur.agencia@gmail.com</h3>
                <p className="text-lekinhos-gray-medium text-sm">Enviar mensagem por e-mail</p>
              </div>
              <div className="bg-lekinhos-blue text-white px-6 py-2 rounded-full font-bold text-sm group-hover:bg-lekinhos-blue-dark transition-colors shadow-sm whitespace-nowrap">
                Enviar e-mail
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
