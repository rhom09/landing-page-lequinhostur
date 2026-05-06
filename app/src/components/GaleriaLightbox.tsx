import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface GaleriaLightboxProps {
  images: string[];
  initialIndex?: number;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function GaleriaLightbox({
  images,
  initialIndex = 0,
  title,
  isOpen,
  onClose,
}: GaleriaLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchDeltaX = useRef(0);
  const isSwiping = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      setIsZoomed(false);
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimatingIn(true));
      });
    } else {
      setIsAnimatingIn(false);
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;
    const preloadIndexes = [
      (activeIndex + 1) % images.length,
      (activeIndex - 1 + images.length) % images.length,
    ];
    preloadIndexes.forEach((i) => {
      const img = new Image();
      img.src = images[i];
    });
  }, [activeIndex, images, isOpen]);

  // Scroll thumbnail into view
  useEffect(() => {
    if (!thumbnailsRef.current) return;
    const thumb = thumbnailsRef.current.children[activeIndex] as HTMLElement;
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  const goTo = useCallback(
    (index: number) => {
      setIsZoomed(false);
      setActiveIndex(((index % images.length) + images.length) % images.length);
    },
    [images.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const handleClose = useCallback(() => {
    setIsAnimatingIn(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowRight':
          goNext();
          break;
        case 'ArrowLeft':
          goPrev();
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, goNext, goPrev, handleClose]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchDeltaX.current = 0;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isZoomed) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    if (!isSwiping.current && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isSwiping.current = true;
    }

    if (isSwiping.current) {
      e.preventDefault();
      touchDeltaX.current = deltaX;
    }
  };

  const handleTouchEnd = () => {
    if (isZoomed) return;
    const threshold = 50;
    if (Math.abs(touchDeltaX.current) > threshold) {
      if (touchDeltaX.current > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    touchDeltaX.current = 0;
    isSwiping.current = false;
  };

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      handleClose();
    }
  };

  if (!isVisible || images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Galeria de fotos: ${title}` : 'Galeria de fotos'}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-300 ${
        isAnimatingIn ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white/60 text-sm font-medium tabular-nums">
            {activeIndex + 1} / {images.length}
          </span>
          {title && (
            <span className="text-white/80 text-sm font-medium truncate hidden sm:inline">
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {/* Zoom toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            aria-label={isZoomed ? 'Reduzir zoom' : 'Ampliar zoom'}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          {/* Close */}
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            aria-label="Fechar galeria"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div
        className="relative z-10 flex-1 w-full flex items-center justify-center px-2 sm:px-16 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation arrows (desktop) */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goNext}
              className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            key={activeIndex}
            src={images[activeIndex]}
            alt={title ? `${title} — Foto ${activeIndex + 1}` : `Foto ${activeIndex + 1}`}
            className={`max-w-full max-h-full rounded-xl shadow-2xl select-none transition-all duration-500 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            style={{ objectFit: 'contain' }}
            onClick={() => setIsZoomed(!isZoomed)}
            draggable={false}
            loading="lazy"
          />
        </div>
      </div>

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="relative z-10 flex items-center justify-center gap-1.5 py-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Ir para foto ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          ref={thumbnailsRef}
          className="relative z-10 flex items-center gap-2 px-4 pb-4 sm:pb-6 overflow-x-auto scrollbar-hide max-w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                i === activeIndex
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-black/90 opacity-100 scale-105'
                  : 'opacity-50 hover:opacity-80'
              }`}
              aria-label={`Miniatura foto ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}

      {/* Mobile swipe hint (only shown briefly on first open) */}
      {images.length > 1 && (
        <MobileSwipeHint />
      )}
    </div>
  );
}

function MobileSwipeHint() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="sm:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-20 bg-white/15 backdrop-blur-md text-white/80 text-xs font-medium px-4 py-2 rounded-full animate-pulse pointer-events-none">
      ← Deslize para navegar →
    </div>
  );
}
