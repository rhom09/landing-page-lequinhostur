export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface ProximaSaida {
  _id?: string;
  data: string;
  titulo: string;
  img: SanityImage | string;
  order?: number;
}

export interface Estatistica {
  _id?: string;
  icone: string;
  valor: string;
  rotulo?: string;
  label?: string; // local fallback usage
  order?: number;
}

export interface Excursao {
  _id?: string;
  titulo: string;
  data: string;
  status: string;
  statusColor?: string;
  img: SanityImage | string;
  galeria?: (SanityImage | string)[];
  order?: number;
}

export interface Destino {
  _id?: string;
  nome?: string;
  titulo?: string;
  data?: string;
  duracao?: string;
  img: SanityImage | string;
  badge_mes?: string;
  badge_dia?: string;
  badge_semana?: string;
  tag?: string;
  categoria?: string;
  order?: number;
}
