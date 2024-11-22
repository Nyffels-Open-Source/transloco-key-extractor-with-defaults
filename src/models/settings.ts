export class Config {
  /** User **/
  public static removeUnusedKeys: boolean = false;
  public static defaultLanguage: string = "en";
  public static sourceLocation: string = "";
  public static markerAlias: string = "defaultMarker";
  
  /** Static **/
  public static translocoImport = /.*@(jsverse|ngneat)\/transloco.*/;
  public static translocoExtractorImport = /.*@nyffels\/transloco-extractor-defaults.*/;
  public static translocoPipeTemplate = /.*\|transloco.*/;
}