export const imageNameToUrlParameter = (imageName: string) => {
  return imageName.split('.').join('-');
};

export const urlParameterToImageName = (urlParam: string) => {
  return urlParam.split('-').join('.');
}