
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',');
  const typeItem = arr[0]
  const mime = typeItem.match(/:(.*?);/)![1]; // image/png
  console.log('mime', mime);
  
  const bstr = window.atob(arr[1]);
  console.log('bstr', bstr);

  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  console.log('a-->', new Blob([u8arr], { type: mime }));
  
  

  return new Blob([u8arr], { type: mime });
}