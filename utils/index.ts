export const convertImgUrl = (selectedfile: Blob) => {
    const blob = new Blob([selectedfile]);
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };
