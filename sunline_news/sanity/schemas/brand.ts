export default {
  name: 'brand',
  type: 'document',
  title: 'Brand',
  fields: [
    { name: 'name', type: 'string', title: 'Brand Name' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name' } },
    { name: 'description', type: 'text', title: 'Description' },
  ],
};
