import { Bus, Instagram, Facebook, MessageCircle, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Destinos', href: '#destinos' },
  { label: 'Excursões', href: '#excursões' },
  { label: 'Fretamento', href: '#categorias' },
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Contato', href: '#contato' },
];

const WHATSAPP_LINK = 'https://api.whatsapp.com/send?phone=5511932332410&text=Olá! Gostaria de mais informações sobre as viagens da Lekinhos TUR.';

export function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 96;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-lekinhos-blue-dark pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo + About */}
          <div>
            <a href="#" className="flex items-center mb-4">
              <img src="/logo-footer.png" alt="Lekinhos TUR" className="h-16 w-auto object-contain" />
            </a>
            <p className="text-white/70 text-sm leading-relaxed">
              Sua agência de viagens especialista em excursões pelo Brasil.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent text-xs font-bold uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/70 text-sm hover:text-accent transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent text-xs font-bold uppercase tracking-wider mb-4">Fale Conosco</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-white/70 text-sm">(11) 93233-2410</li>
              <li className="text-white/70 text-sm">lekinhostur.agencia@gmail.com</li>
              <li className="text-white/70 text-sm">São Paulo - SP</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-accent text-xs font-bold uppercase tracking-wider mb-4">Siga-nos</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/lekinhostur/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-lekinhos-gray-dark transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1BBUh35Eb8/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-lekinhos-gray-dark transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-lekinhos-gray-dark transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © 2026 Lekinhos TUR. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/50 text-xs hover:text-white/80 transition-colors">Política de Privacidade</a>
            <a href="#" className="text-white/50 text-xs hover:text-white/80 transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
