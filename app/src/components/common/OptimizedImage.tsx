import React from 'react';
import { urlFor } from '@/lib/sanity';
import type { SanityImage } from '@/types/sanity';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | SanityImage;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  className?: string;
}

/**
 * Componente de imagem otimizado que lida com:
 * 1. Conversão automática para WebP (via Sanity ou ativos locais)
 * 2. Lazy loading por padrão (exceto se priority for true)
 * 3. Fetchpriority high para LCP (se priority for true)
 * 4. Resolução de URLs do Sanity
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  ...props
}) => {
  let finalSrc = '';
  
  // Resolve a URL baseada no tipo de src
  if (typeof src === 'string') {
    // Se for um link estático e estivermos em produção/build,
    // podemos assumir que o .webp existe (graças ao optimize-images.py)
    if (src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg')) {
      finalSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
    } else {
      finalSrc = src;
    }
  } else if (src && (src as SanityImage).asset) {
    // Se for uma imagem do Sanity, forçamos o formato WebP
    let builder = urlFor(src).format('webp');
    
    // Se largura ou altura forem fornecidas numericamente, passamos para o Sanity
    if (typeof width === 'number') builder = builder.width(width);
    if (typeof height === 'number') builder = builder.height(height);
    
    finalSrc = builder.url();
  }

  return (
    <img
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      // @ts-expect-error - fetchpriority ainda não está no tipo padrão do React mas é suportado
      fetchpriority={priority ? 'high' : 'auto'}
      className={className}
      {...props}
    />
  );
};
