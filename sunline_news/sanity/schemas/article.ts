export default {
  name: 'article',
  type: 'document',
  title: 'Article',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'brand', type: 'reference', to: [{ type: 'brand' }] },
    { name: 'publishedAt', type: 'datetime', title: 'Published At' },
    { name: 'body', type: 'array', title: 'Content', of: [{ type: 'block' }] },
  ],
};
