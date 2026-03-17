const BOT_UA =
  /bot|crawl|spider|slurp|archiver|wget|curl\/|python-requests|scrapy|httpclient|go-http|java\/|libwww|perl|ruby|php\/|ahrefsbot|semrushbot|mj12bot|dotbot|baiduspider|yandexbot|sogou|bytespider|petalbot|gptbot|claudebot|ccbot/i;

const SOCIAL_PREVIEW_UA =
  /twitterbot|facebookexternalhit|linkedinbot|slackbot|telegrambot|whatsapp|discordbot|redditbot/i;

const SOCIAL_PREVIEW_PATHS = new Set(['/api/story', '/api/og-story']);

const PUBLIC_API_PATHS = new Set(['/api/version', '/api/health']);

const SOCIAL_IMAGE_UA =
  /Slack-ImgProxy|Slackbot|twitterbot|facebookexternalhit|linkedinbot|telegrambot|whatsapp|discordbot|redditbot/i;

const VERITAS_OG = {
  title: 'Veritas Global Intelligence Terminal',
  description: 'Real-time global intelligence terminal with live incident monitoring, risk analysis, and strategic intelligence for LATAM, MENA, and Sub-Saharan Africa.',
  image: 'https://intel.veritasglobal.co/favico/og-image.png',
  url: 'https://intel.veritasglobal.co/',
};


export default function middleware(request: Request) {
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') ?? '';
  const path = url.pathname;

  // Social bot OG response for root page
  if (path === '/' && SOCIAL_PREVIEW_UA.test(ua)) {
    const html = `<!DOCTYPE html><html><head>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${VERITAS_OG.title}"/>
<meta property="og:description" content="${VERITAS_OG.description}"/>
<meta property="og:image" content="${VERITAS_OG.image}"/>
<meta property="og:url" content="${VERITAS_OG.url}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${VERITAS_OG.title}"/>
<meta name="twitter:description" content="${VERITAS_OG.description}"/>
<meta name="twitter:image" content="${VERITAS_OG.image}"/>
<title>${VERITAS_OG.title}</title>
</head><body></body></html>`;
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Vary': 'User-Agent, Host',
      },
    });
  }

  // Only apply bot filtering to /api/* and /favico/* paths
  if (!path.startsWith('/api/') && !path.startsWith('/favico/')) {
    return;
  }

  // Allow social preview/image bots on OG image assets
  if (path.startsWith('/favico/') || path.endsWith('.png')) {
    if (SOCIAL_IMAGE_UA.test(ua)) {
      return;
    }
  }

  // Allow social preview bots on exact OG routes only
  if (SOCIAL_PREVIEW_UA.test(ua) && SOCIAL_PREVIEW_PATHS.has(path)) {
    return;
  }

  // Public endpoints bypass all bot filtering
  if (PUBLIC_API_PATHS.has(path)) {
    return;
  }

  // Block bots from all API routes
  if (BOT_UA.test(ua)) {
    return new Response('{"error":"Forbidden"}', {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // No user-agent or suspiciously short — likely a script
  if (!ua || ua.length < 10) {
    return new Response('{"error":"Forbidden"}', {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  matcher: ['/', '/api/:path*', '/favico/:path*'],
};
