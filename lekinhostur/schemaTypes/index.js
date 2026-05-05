import { defineField, defineType } from 'sanity';

const excursaoType = defineType({
    name: 'excursao',
    title: 'Excursão',
    type: 'document',
    fields: [
        defineField({
            name: 'titulo',
            title: 'Título da Excursão',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'img',
            title: 'Imagem da Excursão',
            type: 'image',
            validation: (Rule) => Rule.required(),
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Texto Alternativo',
                    type: 'string',
                }),
            ],
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Vagas Abertas', value: 'vagas-abertas' },
                    { title: 'Últimas Vagas', value: 'ultimas-vagas' },
                    { title: 'Esgotado', value: 'esgotado' },
                    { title: 'Em Andamento', value: 'em-andamento' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'data',
            title: 'Data',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Ordem',
            type: 'number',
            initialValue: 0,
        }),
    ],
});

const destinoType = defineType({
  name: 'destino',
  title: 'Destinos Populares',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título do Destino',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'img',
      title: 'Imagem do Destino',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      initialValue: 0,
    }),
  ],
});

export const schemaTypes = [excursaoType, destinoType]
