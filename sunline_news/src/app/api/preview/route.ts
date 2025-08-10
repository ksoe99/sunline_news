import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const draft = await draftMode();
draft.disable();

  const redirectUrl = req.headers.get('referer') || '/';
  return NextResponse.redirect(redirectUrl);
}
