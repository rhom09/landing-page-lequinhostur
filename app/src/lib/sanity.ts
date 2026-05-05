import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// O usuário precisará atualizar o projectId após rodar o 'npm create sanity@latest'
// Você pode colocar o ID direto aqui ou configurar no Vercel como VITE_SANITY_PROJECT_ID
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'id-do-projeto';

export const client = createClient({
  projectId: projectId,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-05-05',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
