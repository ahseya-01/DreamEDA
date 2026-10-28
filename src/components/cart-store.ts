// The cart only remembers product IDs in this browser. Prices are always looked up on the server.
const KEY = 'inkdia_cart';
export const getCart = (): string[] => {
  try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []; } catch { return []; }
};
export const setCart = (ids: string[]) => {
  try { localStorage.setItem(KEY, JSON.stringify([...new Set(ids)])); } catch { /* storage blocked */ }
  window.dispatchEvent(new Event('cart-changed'));
};
