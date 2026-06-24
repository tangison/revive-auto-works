import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.reviveautoworks.cc';

  // Explicitly allow all major AI search engine crawlers for GEO visibility
  const aiBots = [
    'GPTBot',           // OpenAI / ChatGPT
    'ChatGPT-User',     // ChatGPT with browsing
    'OAI-SearchBot',    // OpenAI Search
    'ClaudeBot',        // Anthropic / Claude
    'anthropic-ai',     // Anthropic alt
    'Claude-Web',       // Claude web
    'PerplexityBot',    // Perplexity
    'Perplexity-User',  // Perplexity user-initiated
    'Google-Extended',  // Google Gemini / AI training
    'Bingbot',          // Microsoft Copilot / Bing
    'CCBot',            // Common Crawl (used by many AI engines)
    'Bytespider',       // ByteDance AI
    'Applebot',         // Apple Intelligence / Siri
    'Applebot-Extended',// Apple AI training
    'cohere-ai',        // Cohere
    'meta-externalagent', // Meta AI
    'Amazonbot',        // Amazon Alexa AI
  ];

  const allBots = [
    // Standard search engines
    { userAgent: '*', allow: '/' },
    { userAgent: 'Googlebot', allow: '/' },
    { userAgent: 'Googlebot-Image', allow: '/' },
    { userAgent: 'Bingbot', allow: '/' },
    { userAgent: 'Bingbot-Image', allow: '/' },
    { userAgent: 'DuckDuckBot', allow: '/' },
    { userAgent: 'YandexBot', allow: '/' },
    { userAgent: 'Baiduspider', allow: '/' },
    { userAgent: 'Slurp', allow: '/' }, // Yahoo
    { userAgent: 'facebookexternalhit', allow: '/' },
    { userAgent: 'Twitterbot', allow: '/' },
    { userAgent: 'LinkedInBot', allow: '/' },
    // AI search engines — explicitly allowed for GEO
    ...aiBots.map(bot => ({ userAgent: bot, allow: '/' })),
  ];

  return {
    rules: allBots,
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
