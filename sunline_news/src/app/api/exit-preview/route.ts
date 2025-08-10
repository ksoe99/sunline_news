import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const brand = searchParams.get('brand');
  const slug = searchParams.get('slug');

  if (!brand || !slug) {
    return new Response('Missing brand or slug', { status: 400 });
  }

  const draft = await draftMode();
draft.enable();

  const redirectUrl = `/${brand}/articles/${slug}`;
  return NextResponse.redirect(new URL(redirectUrl, req.url));
}
