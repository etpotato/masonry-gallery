const ENABLE_CACHE = import.meta.env.VITE_ENABLE_CACHE;

export class CachesSafe {
  private cache: Cache | null = null;

  constructor(private readonly cachesName: string) {}

  public async init() {
    if (!this.cache) {
      this.cache = await caches.open(this.cachesName);
    }
  }

  public async match(key: string) {
    try {
      return (await this.cache?.match(key)) || null;
    } catch {
      console.error('caches.match failed');
      return null;
    }
  }

  public async put(key: string, response: Response) {
    try {
      return await this.cache?.put(key, response);
    } catch {
      console.error('caches.put failed');
    }
  }
}

export function withCachesSafe<T>(
  cachesName: string,
  fetchData: (url: string, ...args: unknown[]) => Promise<Response>,
) {
  const cachesSafe = new CachesSafe(cachesName);
  cachesSafe.init();

  return async function (url: string, ...args: unknown[]) {
    if (ENABLE_CACHE) {
      const fromCaches = await cachesSafe.match(url);

      if (fromCaches) {
        return (await fromCaches.json()) as T;
      }
    }

    const response = await fetchData(url, ...args);

    if (ENABLE_CACHE) {
      await cachesSafe.put(url, response.clone());
    }

    const data = (await response.json()) as T;

    return data;
  };
}
