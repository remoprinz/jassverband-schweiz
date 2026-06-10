/**
 * Welcome-Email-Templates für Stripe-Webhook.
 *
 * Drei Tier-Varianten:
 *   - Pionier:        Jasser-Lizenz, 1 Saison
 *   - Lifetime:       Lebenslange Mitgliedschaft
 *   - Ehrenmitglied:  Ehrenmitgliedschaft mit Diplom
 *
 * Plus internal-Notification an info@jassverband.ch bei Ehrenmitglied,
 * damit das Diplom-Versenden nicht durchrutscht.
 */

type BaseProps = {
  firstName: string;
  memberNumber: number;
  resetLink: string;
};

type PionierProps = BaseProps & { validUntil: string };

type RenderedEmail = { subject: string; html: string };

// ----------------------------------------------------------------------------
// Style-Bausteine (inline, weil Email-Clients style-Tags oft strippen)
// ----------------------------------------------------------------------------
const STYLES = {
  wrapper:
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.55;',
  h1: 'color: #000; font-size: 24px; margin: 0 0 16px;',
  p: 'margin: 0 0 14px;',
  buttonWrap: 'text-align: center; margin: 32px 0;',
  button:
    'background-color: #ff0000; color: #fff; padding: 14px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold; display: inline-block;',
  infoBox:
    'background: #f5f5f4; padding: 14px 18px; border-radius: 8px; margin: 16px 0;',
  hr: 'border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;',
  footer: 'color: #6b6b6b; font-size: 14px; margin: 0 0 6px;',
  copyright: 'color: #9ca3af; font-size: 12px; margin: 0;',
};

// ----------------------------------------------------------------------------
// Templates
// ----------------------------------------------------------------------------

export function pionierWelcomeEmail(p: PionierProps): RenderedEmail {
  return {
    subject: 'Willkommen beim Jassverband Schweiz',
    html: `
<div style="${STYLES.wrapper}">
  <h1 style="${STYLES.h1}">Willkommen beim Jassverband Schweiz</h1>
  <p style="${STYLES.p}">Hallo ${p.firstName}</p>
  <p style="${STYLES.p}">danke für deinen Beitritt! Du bist offiziell Mitglied beim Jassverband Schweiz.</p>
  <div style="${STYLES.infoBox}">
    <strong>Mitgliedsnummer:</strong> #${p.memberNumber}<br/>
    <strong>Gültig bis:</strong> ${p.validUntil}
  </div>
  <p style="${STYLES.p}">Setze hier dein Passwort, dann kannst du dich auf <a href="https://jassguru.ch">jassguru.ch</a> einloggen und JassGuru Pro nutzen: eigene Gruppen gründen, Turniere spielen, persönliche Statistik.</p>
  <p style="${STYLES.buttonWrap}">
    <a href="${p.resetLink}" style="${STYLES.button}">Passwort setzen</a>
  </p>
  <p style="${STYLES.footer}">Falls du Fragen hast, melde dich: <a href="mailto:info@jassverband.ch">info@jassverband.ch</a>.</p>
  <hr style="${STYLES.hr}" />
  <p style="${STYLES.footer}">Herzlichen Gruss<br/>Jassverband Schweiz</p>
  <p style="${STYLES.copyright}">jassverband.ch</p>
</div>
    `.trim(),
  };
}

export function lifetimeWelcomeEmail(p: BaseProps): RenderedEmail {
  return {
    subject: `Willkommen, ${p.firstName}`,
    html: `
<div style="${STYLES.wrapper}">
  <h1 style="${STYLES.h1}">Willkommen beim Jassverband Schweiz</h1>
  <p style="${STYLES.p}">Hallo ${p.firstName}</p>
  <p style="${STYLES.p}">danke dir! Du bist neu Lebenslang-Mitglied beim Jassverband Schweiz. Das heisst: einmal angemeldet, gilt für immer.</p>
  <div style="${STYLES.infoBox}">
    <strong>Mitgliedsnummer:</strong> #${p.memberNumber}
  </div>
  <p style="${STYLES.p}">Solche Mitgliedschaften wie deine sind für uns als jungen Verein eine grosse Hilfe. Wir wissen das zu schätzen.</p>
  <p style="${STYLES.p}">Setze hier dein Passwort, dann kannst du dich auf <a href="https://jassguru.ch">jassguru.ch</a> einloggen und JassGuru Pro nutzen: eigene Gruppen, Turniere, persönliche Statistik.</p>
  <p style="${STYLES.buttonWrap}">
    <a href="${p.resetLink}" style="${STYLES.button}">Passwort setzen</a>
  </p>
  <p style="${STYLES.footer}">Bei Fragen oder Anliegen einfach Mail an <a href="mailto:info@jassverband.ch">info@jassverband.ch</a>.</p>
  <hr style="${STYLES.hr}" />
  <p style="${STYLES.footer}">Herzlichen Gruss<br/>Jassverband Schweiz</p>
  <p style="${STYLES.copyright}">jassverband.ch</p>
</div>
    `.trim(),
  };
}

export function ehrenmitgliedWelcomeEmail(p: BaseProps): RenderedEmail {
  return {
    subject: 'Willkommen als Ehrenmitglied',
    html: `
<div style="${STYLES.wrapper}">
  <h1 style="${STYLES.h1}">Willkommen als Ehrenmitglied</h1>
  <p style="${STYLES.p}">Liebe/r ${p.firstName}</p>
  <p style="${STYLES.p}">vielen Dank für deine Ehrenmitgliedschaft! Für unseren noch jungen Verein ist das ein bedeutender Schritt.</p>
  <div style="${STYLES.infoBox}">
    <strong>Mitgliedsnummer:</strong> #${p.memberNumber}<br/>
    <strong>Status:</strong> Ehrenmitglied auf Lebenszeit
  </div>
  <p style="${STYLES.p}">Wir schicken dir das Ehrenmitglied-Diplom in den nächsten Wochen gedruckt per Post. Vorher melden wir uns persönlich bei dir.</p>
  <p style="${STYLES.p}">In der Zwischenzeit kannst du schon JassGuru Pro nutzen. Setze hier dein Passwort:</p>
  <p style="${STYLES.buttonWrap}">
    <a href="${p.resetLink}" style="${STYLES.button}">Passwort setzen</a>
  </p>
  <p style="${STYLES.footer}">Bei Fragen, Ideen oder Anliegen schreib uns gerne: <a href="mailto:info@jassverband.ch">info@jassverband.ch</a>.</p>
  <hr style="${STYLES.hr}" />
  <p style="${STYLES.footer}">Herzlichen Gruss<br/>Jassverband Schweiz</p>
  <p style="${STYLES.copyright}">jassverband.ch</p>
</div>
    `.trim(),
  };
}

// ----------------------------------------------------------------------------
// Internal-Notification an info@jassverband.ch bei neuem Ehrenmitglied
// ----------------------------------------------------------------------------

export function ehrenmitgliedInternalNotification(p: {
  firstName: string;
  lastName: string;
  email: string;
  memberNumber: number;
  amountChf: number;
}): RenderedEmail {
  return {
    subject: `Neues Ehrenmitglied #${p.memberNumber}: ${p.firstName} ${p.lastName}`,
    html: `
<div style="${STYLES.wrapper}">
  <h1 style="${STYLES.h1}">Neues Ehrenmitglied</h1>
  <div style="${STYLES.infoBox}">
    <strong>Mitgliedsnummer:</strong> #${p.memberNumber}<br/>
    <strong>Name:</strong> ${p.firstName} ${p.lastName}<br/>
    <strong>E-Mail:</strong> ${p.email}<br/>
    <strong>Beitrag:</strong> CHF ${p.amountChf.toFixed(2)}
  </div>
  <p style="${STYLES.p}"><strong>Nächste Schritte:</strong></p>
  <ul>
    <li>Persönlich melden (vorgängig zur Diplom-Sendung).</li>
    <li>Gedrucktes Diplom vorbereiten und per Post versenden.</li>
  </ul>
</div>
    `.trim(),
  };
}

// ----------------------------------------------------------------------------
// Tier-Resolver: einheitlicher Einstieg vom Webhook
// ----------------------------------------------------------------------------

export type WelcomeTier = 'pionier' | 'lifetime' | 'ehrenmitglied';

export function renderWelcomeEmail(
  tier: WelcomeTier,
  props: PionierProps,
): RenderedEmail {
  switch (tier) {
    case 'lifetime':
      return lifetimeWelcomeEmail(props);
    case 'ehrenmitglied':
      return ehrenmitgliedWelcomeEmail(props);
    case 'pionier':
    default:
      return pionierWelcomeEmail(props);
  }
}
