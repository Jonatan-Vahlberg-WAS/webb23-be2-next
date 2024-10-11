type LocalStorageKey = "@library/token";

class LocalStorageKit {
  static set(key: LocalStorageKey, data: any) {
    const jsonData = JSON.stringify(data);

    localStorage.setItem(key, jsonData);
  }

  static get(key: LocalStorageKey) {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) {
      return null;
    }
    return JSON.parse(jsonData);
  }

  static remove(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}

export default LocalStorageKit
