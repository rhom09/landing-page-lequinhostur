import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'LekinhosTUR',

  projectId: 'zv6ynzi7',
  dataset: 'production',

  plugins: [structureTool({
    structure: (S) =>
      S.list()
        .title('Conteúdo')
        .items([
          S.documentTypeListItem('excursao').title('Excursões'),
          S.documentTypeListItem('destino').title('Destinos'),
          S.documentTypeListItem('proximaSaida').title('Próximas Saídas'),
          S.documentTypeListItem('estatistica').title('Estatísticas'),
          S.documentTypeListItem('depoimento').title('Depoimentos'),
        ]),
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
