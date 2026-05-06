import { Church, Waves, Mountain, FerrisWheel, BusFront, Route } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CATEGORIAS = [
  { icone: Church, titulo: 'Religiosas', descricao: 'Viagens espirituais aos principais santuários do Brasil' },
  { icone: Waves, titulo: 'Praia', descricao: 'Sol, mar e areia nos paraísos litorâneos brasileiros' },
  { icone: Mountain, titulo: 'Serra', descricao: 'Paisagens de tirar o fôlego nas montanhas' },
  { icone: FerrisWheel, titulo: 'Parques', descricao: 'Diversão garantida nos melhores parques temáticos' },
  { icone: BusFront, titulo: 'Bate-volta', descricao: 'Roteiros rápidos para quem não pode esperar' },
  { icone: Route, titulo: 'Fretamento', descricao: 'Transporte exclusivo para grupos e eventos' },
];

function CategoriaItem({ cat, index }: { cat: typeof CATEGORIAS[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1);
  const Icon = cat.icone;

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center group cursor-default transition-all duration-300 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-16 h-16 rounded-full bg-lekinhos-blue-light flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-lekinhos-blue group-hover:scale-110">
        <Icon className="w-7 h-7 text-lekinhos-blue transition-colors duration-300 group-hover:text-white" />
      </div>
      <h3 className="font-display text-lg text-lekinhos-gray-dark mb-1">{cat.titulo}</h3>
      <p className="text-sm text-lekinhos-gray-medium leading-snug">{cat.descricao}</p>
    </div>
  );
}

export function CategoriasAventura() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="categorias" className="py-20 bg-lekinhos-off-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-lekinhos-gray-dark mb-4">
            Escolha seu tipo de aventura
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIAS.map((cat, index) => (
            <CategoriaItem key={cat.titulo} cat={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
