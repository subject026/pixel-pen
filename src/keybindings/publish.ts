import Jimp from 'jimp/es';
import { store } from '../store';

export const publish = (): void => {
  const { cells, currentBackgroundColor } = store.getState();
  const canvas = document.createElement('canvas');
  const boo = Object.keys(cells).reduce(
    (acc, key) => {
      const { x, y } = cells[key];
      if (!acc.lowestX) {
        acc.lowestX = x;
      } else {
        if (x < acc.lowestX) acc.lowestX = x;
      }

      if (!acc.lowestY) {
        acc.lowestY = y;
      } else {
        if (y < acc.lowestY) acc.lowestY = y;
      }

      if (!acc.highestX) {
        acc.highestX = x;
      } else {
        if (x > acc.highestX) acc.highestX = x;
      }

      if (!acc.highestY) {
        acc.highestY = y;
      } else {
        if (y > acc.highestY) acc.highestY = y;
      }
      return acc;
    },
    { lowestX: null, highestX: null, lowestY: null, highestY: null },
  );
  const { lowestX, lowestY, highestX, highestY } = boo;

  canvas.width = (highestX - lowestX + 20) * 5;
  canvas.height = (highestY - lowestY + 20) * 5;
  const ctx = canvas.getContext('2d');

  if (currentBackgroundColor !== 'transparent') {
    ctx.fillStyle = currentBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  Object.keys(cells).forEach(key => {
    const { x, y, color } = cells[key];
    ctx.fillStyle = color;
    ctx.fillRect((x - lowestX) * 5, (y - lowestY) * 5, 20 * 5, 20 * 5);
  });

  const image = new Image();

  const dataUrl = canvas.toDataURL('img/png');

  Jimp.read(dataUrl).then(img => {
    img.resize(2400, Jimp.AUTO);
    img.quality(80);
    img.getBase64Async(Jimp.MIME_JPEG).then(thing => {
      image.src = thing;

      image.style.width = '100%';
      image.style.height = '100%';
      image.style.objectFit = 'contain';
      const w = window.open('');
      w.document.body.appendChild(image);
    });
  });
};
