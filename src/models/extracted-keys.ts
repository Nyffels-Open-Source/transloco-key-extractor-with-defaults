export class ExtractedKeys {
  private static _keys: {key: string, defaultValue: string}[] = [];
  
  static Add(key: string, defaultValue: string) {
      this._keys.push({key, defaultValue});
  }
}