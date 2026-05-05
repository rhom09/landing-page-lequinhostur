export default {
  name: 'excursao',
  type: 'document',
  title: 'Calendário de Excursões',
  fields: [
    {
      name: 'titulo',
      type: 'string',
      title: 'Título (ex: Porto de Galinhas - 5 dias)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'data',
      type: 'string',
      title: 'Data Completa (ex: 15 JAN 2026)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status das vagas',
      options: {
        list: [
          { title: 'Vagas abertas', value: 'abertas' },
          { title: 'Últimas vagas', value: 'ultimas' },
          { title: 'Esgotado', value: 'esgotado' }
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'img',
      type: 'image',
      title: 'Imagem',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      type: 'date',
      title: 'Data de ordenação',
      description: 'Usado para ordenar as excursões cronologicamente',
      validation: (Rule: any) => Rule.required(),
    }
  ],
  orderings: [
    {
      title: 'Data Cronológica',
      name: 'dateOrder',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
};
