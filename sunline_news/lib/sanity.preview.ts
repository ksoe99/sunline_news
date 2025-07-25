// lib/sanity.preview.ts
import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from './sanity.client';

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});
