// /sanity/sanity.config.ts
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'sunlineNetworkCMS',
  title: 'Sunline Network CMS',

  projectId: 'your_project_id_here',
  dataset: 'production',

  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
