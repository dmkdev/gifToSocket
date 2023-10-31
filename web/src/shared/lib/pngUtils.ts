export const toUint32 = (chunkName: string) => {
  return new DataView((new TextEncoder()).encode(chunkName).buffer).getUint32(0);
};

export const chunksGet = (pngData: ArrayBuffer, chunkNameUint32: number): DataView[] => {
  const dataView = new DataView(pngData, 8); // 8 byte - png signature

  const chunks = [];

  let chunkPosition = 0;
  let chunkUint = dataView.getUint32(4);
  let chunkLength;
  while (chunkUint !== 1229278788) { // last chunk 'IEND'
    chunkLength = dataView.getUint32(chunkPosition);
    if (chunkUint === chunkNameUint32) {
      chunks.push(new DataView(pngData, chunkPosition + 16, chunkLength));
    }
    chunkPosition = chunkPosition + 12 + chunkLength;
    chunkUint = dataView.getUint32(chunkPosition + 4);
  }
  return chunks;
};

export const checkSignature = (sig: Uint8Array) => {
  //The length of PNG's Signature is 8 bytes, 1Byte = 8bit
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  for (let i = 0; i < signature.length; i++) {
    const v = sig[i];
    if (v !== signature[i])
      throw new Error('It is not PNG file !');
  }
  return true;
};