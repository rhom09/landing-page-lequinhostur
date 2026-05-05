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
      name: 'categoria',
      title: 'Categoria (Texto Colorido)',
      type: 'string',
      description: 'Ex: "CIRCUITO DAS ÁGUAS", "PARQUES & PRAIA"',
    }),
    defineField({
      name: 'duracao',
      title: 'Duração',
      type: 'string',
      description: 'Ex: "Bate-volta · 1 dia" ou "4 dias · 3 noites"',
    }),
    defineField({
      name: 'tag',
      title: 'Etiqueta Opcional',
      type: 'string',
      description: 'Ex: "MAIS PROCURADA"',
    }),
    defineField({
      name: 'badge_mes',
      title: 'Mês (Badge)',
      type: 'string',
      description: 'Ex: "MAI", "JUN"',
    }),
    defineField({
      name: 'badge_dia',
      title: 'Dia (Badge)',
      type: 'string',
      description: 'Ex: "30", "12"',
    }),
    defineField({
      name: 'badge_semana',
      title: 'Dia da Semana (Badge)',
      type: 'string',
      description: 'Ex: "SÁB", "SEX"',
    }),
    defineField({
      name: 'data',
      title: 'Data Completa (Fallback)',
      type: 'string',
      description: 'Ex: "22 FEV" ou "SOB DEMANDA"',
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
