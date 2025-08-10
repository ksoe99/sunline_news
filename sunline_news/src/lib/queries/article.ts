// src/lib/queries/article.ts

import groq from 'groq';

// GROQ query to fetch article data by slug and brand
export default groq`
  *[_type == "article" && slug.current == $slug && brand == $brand][0]{
    _id,
    title,
    slug,
    brand,
    publishedAt,
    author->{
      name,
      image
    },
    mainImage,
    body
  }
`;
