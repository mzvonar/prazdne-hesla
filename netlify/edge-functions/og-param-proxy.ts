import type { Context } from "@netlify/functions";

const urlParameterToImageName = (urlParam: string) => {
  return urlParam.split('-').join('.');
}

export default async (request: any, context: Context) => {
  const BASE_URL = Netlify.env.get("VITE_IMAGE_CDN_URL");

  const url = new URL(request.url);
  
  console.log('url: ', url);

  const response = await context.next()
  const page = await response.text();

  const imageParam = url.pathname.split('/').pop();

  if(!imageParam) {
    return new Response(page, response);
  }

  const imageName = urlParameterToImageName(imageParam);
  const imageUrl = `${BASE_URL}${imageName}`;

  // const search = '<!-- OG_TAGS -->';
  const search = new RegExp('<!-- OG_TAGS_START -->[\\s\\S]*<!-- OG_TAGS_END -->', 'gm');
  const replace = `<meta property="og:image" content="${imageUrl}" />`;

  return new Response(page.replaceAll(search, replace), response);
}