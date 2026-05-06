import { MapPin, CalendarDays, Bus, MessageCircle, HeartHandshake } from 'lucide-react';

const WHATSAPP_LINK = 'https://api.whatsapp.com/send?phone=5511932332410&text=Olá! Gostaria de mais informações sobre as viagens da Lekinhos TUR.';

export function BottomNav() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-lekinhos-gray-light z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-end h-[72px] px-2 pb-2">
        <a 
          href="#destinos" 
          onClick={(e) => handleNavClick(e, '#destinos')}
          className="flex flex-col items-center gap-1 w-[60px] text-lekinhos-gray-medium hover:text-lekinhos-blue transition-colors"
        >
          <MapPin className="w-6 h-6" />
          <span className="text-[10px] font-semibold">Destinos</span>
        </a>
        
        <a 
          href="#excursões" 
          onClick={(e) => handleNavClick(e, '#excursões')}
          className="flex flex-col items-center gap-1 w-[60px] text-lekinhos-gray-medium hover:text-lekinhos-blue transition-colors"
        >
          <CalendarDays className="w-6 h-6" />
          <span className="text-[10px] font-semibold">Excursões</span>
        </a>

        {/* FAB Contato */}
        <a 
          href={WHATSAPP_LINK} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative -top-5 flex flex-col items-center group w-[60px]"
        >
          <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg text-lekinhos-gray-dark group-hover:scale-110 group-hover:bg-accent-hover transition-all animate-bounce">
            <MessageCircle className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-bold mt-1 text-lekinhos-gray-dark absolute -bottom-5">Contato</span>
        </a>

        <a 
          href="#categorias" 
          onClick={(e) => handleNavClick(e, '#categorias')}
          className="flex flex-col items-center gap-1 w-[60px] text-lekinhos-gray-medium hover:text-lekinhos-blue transition-colors"
        >
          <Bus className="w-6 h-6" />
          <span className="text-[10px] font-semibold">Fretamento</span>
        </a>

        <a 
          href="#quem-somos" 
          onClick={(e) => handleNavClick(e, '#quem-somos')}
          className="flex flex-col items-center gap-1 w-[60px] text-lekinhos-gray-medium hover:text-lekinhos-blue transition-colors"
        >
          <HeartHandshake className="w-6 h-6" />
          <span className="text-[10px] font-semibold">Sobre</span>
        </a>
      </div>
    </nav>
  );
}
