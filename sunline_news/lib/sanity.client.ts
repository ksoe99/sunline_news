// lib/sanity.client.ts
import { createClient } from 'next-sanity';

export const projectId = 'your_project_id_here';
export const dataset = 'production';
export const apiVersion = '2023-07-25';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
