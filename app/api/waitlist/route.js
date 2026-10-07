// POST /api/waitlist — inscription à la liste de lancement DEENTAG.
//
// Les inscriptions sont transmises à un webhook configurable via la variable
// d'environnement WAITLIST_WEBHOOK_URL (Vercel > Project > Settings >
// Environment Variables). Compatible avec Formspree, Make, Zapier, un Google
// Apps Script, etc. : le webhook reçoit un JSON { email, model, locale, date, source }.
//
// Si la variable n'est pas définie, la route répond 501 et le front bascule
// automatiquement sur un mailto pré-rempli (rien n'est perdu).

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot anti-spam : un bot remplit ce champ caché, on fait semblant de réussir.
  if (data && data.website) return Response.json({ ok: true });

  const email = String((data && data.email) || '').trim().slice(0, 254);
  if (!EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  const model = data.model === 'f' ? 'F' : 'H';
  const locale = String(data.locale || 'fr').slice(0, 5);

  const hook = process.env.WAITLIST_WEBHOOK_URL;
  if (!hook) {
    return Response.json({ ok: false, error: 'not_configured' }, { status: 501 });
  }

  try {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email,
        model,
        locale,
        date: new Date().toISOString(),
        source: 'shop',
      }),
    });
    if (!res.ok) throw new Error('webhook ' + res.status);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'upstream' }, { status: 502 });
  }
}
