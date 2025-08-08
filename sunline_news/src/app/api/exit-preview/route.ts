// src/app/api/exit-preview/route.ts
import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const draft = await draftMode(); // ✅ Await
  draft.disable();

  const redirectUrl = req.headers.get('referer') || '/';
  return NextResponse.redirect(redirectUrl);
}
