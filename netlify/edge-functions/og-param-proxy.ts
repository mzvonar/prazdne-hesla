import type { Context } from "@netlify/functions";

export default async (request: any, context: Context) => {
  const BASE_URL = Netlify.env.get("VITE_IMAGE_CDN_URL");
  const VITE_IMAGE_CDN_FOLDER = Netlify.env.get("VITE_IMAGE_CDN_FOLDER") || 'prod';

  const url = new URL(request.url);
  
  const response = await context.next()
  const page = await response.text();

  const imageName = url.pathname.split('/').pop();

  if(!imageName) {
    return Response.redirect("/");
  }

  const imageUrl = `${BASE_URL}/${VITE_IMAGE_CDN_FOLDER}/${imageName}.jpg`;

  // const search = '<!-- OG_TAGS -->';
  const search = new RegExp('<!-- OG_TAGS_START -->[\\s\\S]*<!-- OG_TAGS_END -->', 'gm');
  const replace = `<meta property="og:image" content="${imageUrl}" />`;

  return new Response(page.replaceAll(search, replace), response);
}