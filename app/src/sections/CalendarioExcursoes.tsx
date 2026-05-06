import { useState, useEffect } from 'react';
import { CalendarDays, ArrowRight, Clock, Images } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { client, urlFor } from '@/lib/sanity';
import { GaleriaLightbox } from '@/components/GaleriaLightbox';

const EXCURSOES = [
  {
    img: '/destino-porto-de-galinhas.jpg',
    data: '15 JAN 2026',
    titulo: 'Porto de Galinhas - 5 dias',
    status: 'Vagas abertas',
    statusColor: 'bg-green-100 text-green-700',
    galeria: [
      '/destino-porto-de-galinhas.jpg',
      '/destino-natal.jpg',
      '/destino-gramado.jpg',
    ],
  },
  {
    img: '/destino-campos-do-jordao.jpg',
    data: '22 FEV 2026',
    titulo: 'Campos do Jordão - 3 dias',
    status: 'Últimas vagas',
    statusColor: 'bg-accent/20 text-lekinhos-gray-dark',
    galeria: [
      '/destino-campos-do-jordao.jpg',
      '/destino-serra-gaucha.jpg',
      '/destino-gramado.jpg',
    ],
  },
  {
    img: '/destino-aparecida.jpg',
    data: '08 MAR 2026',
    titulo: 'Aparecida do Norte - 2 dias',
    status: 'Vagas abertas',
    statusColor: 'bg-green-100 text-green-700',
    galeria: [
      '/destino-aparecida.jpg',
      '/destino-campos-do-jordao.jpg',
      '/destino-serra-gaucha.jpg',
    ],
  },
  {
    img: '/destino-gramado.jpg',
    data: '10 JUL 2026',
    titulo: 'Gramado e Canela - 4 dias',
    status: 'Vagas abertas',
    statusColor: 'bg-green-100 text-green-700',
    galeria: [
      '/destino-gramado.jpg',
      '/destino-serra-gaucha.jpg',
      '/destino-campos-do-jordao.jpg',
    ],
  },
  {
    img: '/destino-natal.jpg',
    data: '20 JUN 2026',
    titulo: 'Natal e Pipa - 5 dias',
    status: 'Últimas vagas',
    statusColor: 'bg-accent/20 text-lekinhos-gray-dark',
    galeria: [
      '/destino-natal.jpg',
      '/destino-porto-de-galinhas.jpg',
      '/destino-beto-carrero.jpg',
    ],
  },
];

const WHATSAPP_BASE = 'https://api.whatsapp.com/send?phone=5511932332410&text=';

function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case 'abertas':
    case 'vagas-abertas':
    case 'vagas abertas':
      return 'bg-green-100 text-green-700';
    case 'ultimas':
    case 'ultimas-vagas':
    case 'últimas vagas':
      return 'bg-accent/20 text-lekinhos-gray-dark';
    case 'esgotado':
      return 'bg-red-100 text-red-700';
    case 'em-andamento':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function formatStatus(status: string) {
  switch (status?.toLowerCase()) {
    case 'abertas':
    case 'vagas-abertas':
      return 'Vagas abertas';
    case 'ultimas':
    case 'ultimas-vagas':
      return 'Últimas vagas';
    case 'esgotado':
      return 'Esgotado';
    case 'em-andamento':
      return 'Em andamento';
    default:
      return status;
  }
}

function buildGalleryUrls(excursao: any): string[] {
  // Sanity data with galeria field
  if (excursao.galeria && Array.isArray(excursao.galeria) && excursao.galeria.length > 0) {
    const mainImg = typeof excursao.img === 'string'
      ? excursao.img
      : excursao.img ? urlFor(excursao.img).width(1200).url() : '';

    const galeriaUrls = excursao.galeria.map((item: any) =>
      typeof item === 'string' ? item : urlFor(item).width(1200).url()
    );

    // Include main image at the start if not already in the gallery
    if (mainImg && !galeriaUrls.includes(mainImg)) {
      return [mainImg, ...galeriaUrls];
    }
    return galeriaUrls;
  }

  // Fallback: use main image only
  const mainImg = typeof excursao.img === 'string'
    ? excursao.img
    : excursao.img ? urlFor(excursao.img).width(1200).url() : '';

  return mainImg ? [mainImg] : [];
}

function ExcursaoItem({
  excursao,
  index,
  onOpenGallery,
}: {
  excursao: any;
  index: number;
  onOpenGallery: (images: string[], title: string) => void;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);

  const imgSrc = typeof excursao.img === 'string'
    ? excursao.img
    : excursao.img ? urlFor(excursao.img).width(300).url() : '/destino-porto-de-galinhas.jpg';

  const statusColor = excursao.statusColor || getStatusColor(excursao.status);
  const statusText = excursao.statusColor ? excursao.status : formatStatus(excursao.status);
  const galleryImages = buildGalleryUrls(excursao);
  const hasGallery = galleryImages.length > 0;

  const handleImageClick = () => {
    if (hasGallery) {
      onOpenGallery(galleryImages, excursao.titulo);
    }
  };

  return (
    <div
      ref={ref}
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl border border-lekinhos-gray-light transition-all duration-300 hover:shadow-card hover:border-lekinhos-blue/20 group ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Clickable image with gallery indicator */}
      <div
        className="relative w-full sm:w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        aria-label={`Ver fotos de ${excursao.titulo}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleImageClick(); } }}
      >
        <img
          src={imgSrc}
          alt={excursao.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gallery overlay hint */}
        {hasGallery && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-full">
              <Images className="w-3 h-3" />
              <span>{galleryImages.length}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays className="w-4 h-4 text-accent" />
          <span className="text-sm font-bold text-accent">{excursao.data}</span>
        </div>
        <h3 className="font-display text-lg text-lekinhos-gray-dark">{excursao.titulo}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Clock className="w-3.5 h-3.5 text-lekinhos-gray-medium" />
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor}`}>
            {statusText}
          </span>
        </div>
      </div>
      <a
        href={`${WHATSAPP_BASE}Olá! Gostaria de reservar vaga para ${encodeURIComponent(excursao.titulo)}.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-lekinhos-blue text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-lekinhos-blue-dark transition-all duration-200 flex-shrink-0 w-full sm:w-auto justify-center"
      >
        Reservar vaga
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

export function CalendarioExcursoes() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [excursoes, setExcursoes] = useState<any[]>(EXCURSOES);

  // Gallery lightbox state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryTitle, setGalleryTitle] = useState('');

  const handleOpenGallery = (images: string[], title: string) => {
    setGalleryImages(images);
    setGalleryTitle(title);
    setGalleryOpen(true);
  };

  useEffect(() => {
    async function fetchExcursoes() {
      try {
        const query = '*[_type == "excursao"] | order(order asc)';
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setExcursoes(data);
        }
      } catch (error) {
        console.error("Erro ao buscar excursões no Sanity, usando fallback:", error);
      }
    }
    fetchExcursoes();
  }, []);

  return (
    <>
      <section id="excursões" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            ref={ref}
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-lekinhos-gray-dark">
              Calendário de excursões 2026
            </h2>
            <span className="bg-accent text-lekinhos-gray-dark text-xs font-bold px-3 py-1 rounded-lg">
              NOVO
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {excursoes.map((excursao, index) => (
              <ExcursaoItem
                key={excursao._id || excursao.titulo}
                excursao={excursao}
                index={index}
                onOpenGallery={handleOpenGallery}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Lightbox */}
      <GaleriaLightbox
        images={galleryImages}
        title={galleryTitle}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </>
  );
}
