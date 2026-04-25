import "@testing-library/jest-dom/vitest";

// Node 25 ships an experimental built-in `localStorage` that is silently broken
// when no backing file is configured (Object.keys(localStorage) returns [] and
// the methods are undefined). It also shadows jsdom's WebStorage. Replace it
// with an in-memory implementation for tests so `localStorage.setItem/getItem/
// clear/removeItem` behave normally.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length(): number {
    return this.store.size;
  }
  clear(): void {
    this.store.clear();
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  writable: true,
  value: new MemoryStorage(),
});
Object.defineProperty(globalThis, "sessionStorage", {
  configurable: true,
  writable: true,
  value: new MemoryStorage(),
});
