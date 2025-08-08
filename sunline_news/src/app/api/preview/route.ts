// src/app/api/preview/route.ts
import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET || 'letmein';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const brand = searchParams.get('brand');

  if (!slug || !brand) {
    return new Response('Missing slug or brand', { status: 400 });
  }

  const draft = await draftMode(); // ✅ Await before calling enable
  draft.enable();

  const redirectUrl = `/${brand}/articles/${slug}`;
  return NextResponse.redirect(new URL(redirectUrl, req.url));
}
