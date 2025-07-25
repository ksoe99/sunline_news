// src/app/api/preview/route.ts
import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET || 'letmein';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const brand = searchParams.get('brand');

  if (secret !== PREVIEW_SECRET || !slug || !brand) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  draftMode().enable();

  const redirectUrl = `/${brand}/articles/${slug}`;
  return NextResponse.redirect(new URL(redirectUrl, req.url));
}
