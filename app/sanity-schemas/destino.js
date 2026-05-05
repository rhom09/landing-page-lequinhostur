export default {
  name: 'destino',
  type: 'document',
  title: 'Destinos mais procurados',
  fields: [
    {
      name: 'nome',
      type: 'string',
      title: 'Nome do Destino',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'data',
      type: 'string',
      title: 'Data (ex: 15 JAN)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'img',
      type: 'image',
      title: 'Imagem do Destino',
      options: {
        hotspot: true, // Permite ajustar o foco da imagem
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      type: 'number',
      title: 'Ordem de exibição',
      description: 'Número menor aparece primeiro (ex: 1, 2, 3...)',
      validation: (Rule: any) => Rule.required(),
    }
  ],
  orderings: [
    {
      title: 'Ordem Manual',
      name: 'manualOrder',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
};
