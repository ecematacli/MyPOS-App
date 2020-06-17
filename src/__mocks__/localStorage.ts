export class LocalStorageMock {
  store: { [key: string]: any }
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key: string) {
    return this.store[key] || undefined
  }

  setItem(key: string, value: any) {
    this.store[key] = value
  }

  removeItem(key: string) {
    delete this.store[key]
  }
}
