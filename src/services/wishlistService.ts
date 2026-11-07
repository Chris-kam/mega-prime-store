// Wishlist persistence service using localStorage

const WISHLIST_STORAGE_KEY = 'megaprime_fashion_wishlist';

export const getWishlist = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const isInWishlist = (slug: string): boolean => {
  const list = getWishlist();
  return list.includes(slug);
};

export const toggleWishlist = (slug: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const list = getWishlist();
    const index = list.indexOf(slug);
    let updated: string[];
    let added: boolean;

    if (index >= 0) {
      updated = list.filter((s) => s !== slug);
      added = false;
    } else {
      updated = [...list, slug];
      added = true;
    }

    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('megaprime_wishlist_updated', { detail: updated }));
    return added;
  } catch {
    return false;
  }
};

export const clearWishlist = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('megaprime_wishlist_updated', { detail: [] }));
  } catch {
    // ignore
  }
};

