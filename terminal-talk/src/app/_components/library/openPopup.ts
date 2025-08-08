// lib/openPopup.ts
export function openPopup(
  url: string,
  name = 'TTWebPlayer',
  width = 520,
  height = 760
) {
  // center on current screen
  const dualLeft = window.screenLeft ?? window.screenX ?? 0;
  const dualTop = window.screenTop ?? window.screenY ?? 0;
  const w = window.outerWidth ?? window.innerWidth;
  const h = window.outerHeight ?? window.innerHeight;

  const left = Math.max(dualLeft + (w - width) / 2, 0);
  const top = Math.max(dualTop + (h - height) / 2, 0);

  const features = [
    'popup=yes',
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    'menubar=no',
    'toolbar=no',
    'location=no',
    'status=no',
    'scrollbars=no',
    'resizable=yes',
  ].join(',');

  // IMPORTANT: must be called directly in onClick (user gesture)
  return window.open(url, name, features);
}
