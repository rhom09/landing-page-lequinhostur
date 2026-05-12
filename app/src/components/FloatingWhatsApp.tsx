import { MessageCircle } from 'lucide-react';

import { WHATSAPP_LINK } from '../constants/contacts';

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:flex fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 items-center justify-center animate-bounce"
      aria-label="Falar conosco no WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      {/* Pulse effect */}
      <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-50 animate-ping" />
    </a>
  );
}
