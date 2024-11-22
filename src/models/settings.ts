export class Config {
  /** User **/
  public static removeUnusedKeys: boolean = false;
  public static defaultLanguage: string = "en";
  public static sourceLocation: string = "";
  
  /** Static **/
  public static translocoImport = /@(jsverse|ngneat)\/transloco/;
  public static translocoExtractorImport = /@nyffels\/transloco-keys-extractor-with-defaults/;
}