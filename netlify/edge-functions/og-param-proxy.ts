import type { Context } from "@netlify/functions";

export default async (request: any, context: Context) => {
  const BASE_URL = Netlify.env.get("VITE_IMAGE_CDN_URL");

  const url = new URL(request.url);
  
  const response = await context.next()
  const page = await response.text();

  const imageParam = url.pathname.split('/').pop();

  if(!imageParam) {
    return new Response(page, response);
  }

  const imageUrl = `${BASE_URL}${imageName}.jpg`;

  // const search = '<!-- OG_TAGS -->';
  const search = new RegExp('<!-- OG_TAGS_START -->[\\s\\S]*<!-- OG_TAGS_END -->', 'gm');
  const replace = `<meta property="og:image" content="${imageUrl}" />`;

  return new Response(page.replaceAll(search, replace), response);
}