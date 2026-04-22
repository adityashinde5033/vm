export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const base = process.env.WAITLIST_API_BASE_URL;
  if (!base) {
    return res.status(500).json({ error: 'WAITLIST_API_BASE_URL not configured' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const { to_email, name, country } = body;

  if (!to_email || !name || !country) {
    return res.status(400).json({ error: 'to_email, name and country are required' });
  }

  try {
    const upstream = await fetch(base.replace(/\/$/, '') + '/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to_email, name, country }),
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    return res.send(text);
  } catch (err) {
    return res.status(502).json({ error: 'Upstream request failed', detail: String(err && err.message || err) });
  }
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
