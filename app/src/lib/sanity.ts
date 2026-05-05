import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// TODO: O usuário precisará atualizar o projectId após rodar o 'npm create sanity@latest'
export const client = createClient({
  projectId: 'SEU_PROJECT_ID_AQUI', // Ex: '1abc2def'
  dataset: 'production',
  useCdn: true, // Use CDN para respostas mais rápidas, mas dados 'velhos' (em cache)
  apiVersion: '2024-05-05', // Use a data de hoje para usar a versão mais recente da API
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
