// 本地存储的简单封装
class Storage {
  storage: globalThis.Storage;
  constructor(type: 'local' | 'session') {
    this.storage = type === 'session' ? sessionStorage : localStorage;
  }

  public get(key?: string) {
    if (!key) {
      return;
    }
    const storage = this.storage.getItem(key);
    try {
      if (storage) {
        return JSON.parse(storage);
      } else {
        this.storage.removeItem(key);
        return null;
      }
    } catch {
      this.storage.removeItem(key);
      return null;
    }
  }

  public set(key: string, data: any) {
    this.storage.setItem(key, JSON.stringify(data));
  }

  public remove(key?: string) {
    if (!key) {
      return;
    }
    this.storage.removeItem(key);
  }

  public clear() {
    this.storage.clear();
  }
}

export default Storage;
