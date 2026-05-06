import { useEffect, useState } from 'react';
import { Bus, MessageCircle } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Destinos', href: '#destinos' },
  { label: 'Excursões', href: '#excursões' },
  { label: 'Fretamento', href: '#categorias' },
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Contato', href: '#contato' },
];

const WHATSAPP_LINK = 'https://api.whatsapp.com/send?phone=5511932332410&text=Olá! Gostaria de mais informações sobre as viagens da Lekinhos TUR.';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-lekinhos-blue/95 backdrop-blur-md shadow-lg' : 'bg-lekinhos-blue'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/logo.png" alt="Lekinhos TUR" className="h-14 w-auto object-contain" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white/90 hover:text-accent text-sm font-medium transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 bg-white text-lekinhos-blue px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-accent hover:text-lekinhos-gray-dark transition-all duration-200"
        >
          <MessageCircle className="w-4 h-4" />
          Falar no WhatsApp
        </a>
      </div>
    </nav>
  );
}
