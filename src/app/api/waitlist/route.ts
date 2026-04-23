import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Body = {
  to_email?: string;
  name?: string;
  country?: string;
};

export async function POST(req: Request) {
  const base = process.env.WAITLIST_API_BASE_URL;
  if (!base) {
    return NextResponse.json({ error: 'WAITLIST_API_BASE_URL not configured' }, { status: 500 });
  }

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { to_email, name, country } = body;
  if (!to_email || !name || !country) {
    return NextResponse.json(
      { error: 'to_email, name and country are required' },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${base.replace(/\/$/, '')}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to_email, name, country }),
    });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'Upstream request failed', detail }, { status: 502 });
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
