// 将base64转化成Blob 二进制大对象，一般用来存储图像、音频、视频等各种类型的数据
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',');
  const typeItem = arr[0]
  const mime = typeItem.match(/:(.*?);/)![1]; // image/png
  const bstr = window.atob(arr[1]);

  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    // 第n位字符的Unicode码
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

// url转base64
export function urlToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>;
    const ctx = canvas!.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      canvas!.height = img.height;
      canvas!.width = img.width;
      ctx!.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png')
      canvas = null
      resolve(dataURL)
    }

    img.src = url;
  })
}