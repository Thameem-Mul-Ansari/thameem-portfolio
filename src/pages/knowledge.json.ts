import type { APIRoute } from 'astro';
import { buildKnowledge, systemPrompt } from '../lib/knowledge';

// Built once at build time into /knowledge.json. The chat fetches it only when opened.
export const GET: APIRoute = async () => {
  const prompt = systemPrompt(await buildKnowledge());
  return new Response(JSON.stringify({ prompt }), { headers: { 'Content-Type': 'application/json' } });
};
