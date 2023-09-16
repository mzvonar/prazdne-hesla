export const canShare = (shareData?: ShareData) => {
  try {
    return navigator.canShare?.(shareData);
  }
  catch(e) {
    return false;
  }
};