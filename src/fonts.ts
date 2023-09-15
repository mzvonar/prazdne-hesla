export interface FontDef {
  loadId?: string,
  name: string;
}

export const montserratFont: FontDef = {
  loadId: 'Montserrat:900',
  name: 'Montserrat',
};

export const impactFont: FontDef = {
  name: 'Impact',
};

export const openSansFont: FontDef = {
  loadId: 'Open+Sans:700,800',
  name: 'Open Sans',
};

export const alataFont: FontDef = {
  loadId: 'Alata',
  name: 'Alata',
};

const fonts = [
  montserratFont,
  impactFont,
  openSansFont,
  alataFont,
];

export const loadFonts = () => {
  return new Promise<void>((resolve) => {
    const fontsToLoad = fonts.filter((font) => font.loadId).map((font) => font.loadId);

    if(fontsToLoad.length === 0) {
      return resolve();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    WebFont.load({
      google: {
        families: fontsToLoad,
      },
      active: function() {
        resolve();
      }
    });
  })
};


export default fonts;