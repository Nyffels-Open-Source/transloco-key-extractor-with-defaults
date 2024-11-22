import {waitInformation} from "../shared/cli";
import {readdir} from 'node:fs/promises';
import {Config} from "../../models/settings";
import fs from 'fs';
import Path from 'path';
import {ExtractedKey} from "./extractedKey";

export default async function extract() {
  const keys: ExtractedKey[] = [];

  let cliId = waitInformation("Analysing files");
  let files = await readdir(Config.sourceLocation, {recursive: true});
  files = files.filter(f => /.*(\.ts)|(\.html)$/.test(f));
  clearInterval(cliId);

  cliId = waitInformation("Extracting keys");
  for (let file of files) {
    const content = fs.readFileSync(Path.join(Config.sourceLocation, file), 'utf8');
    const trimmedContent = content.replace(/(\r\n|\n|\r)/gm, "")
      .replace(/\s/g, "")
    if (Config.translocoImport.test(trimmedContent) && Config.translocoExtractorImport.test(trimmedContent)) {
      const re = new RegExp(Config.markerAlias + '\\(.*\\)', 'g');
      const matches = content.match(re)
        .map(m => m.match(/\((.*?)\)/)
          .pop())
        .filter(m => m.length > 0);

      for (let match of matches) {
        if (/^("|'|`).*\,.*("|'|`)$/.test(match)) {
          /** This is a key with default value **/
          const [key, defaultValue] = {"\"": match.split(/,(?=(?:[^"]*"[^"]*")*$)/g), "'": match.split(/,(?=(?:[^']*'[^']*')*$)/g), "`": match.split(/,(?=(?:[^`]*`[^`]*`)*$)/g)}[match[0]];
          keys.push({key, defaultValue});
        } else if (/^("|'|`).*("|'|`)$/.test(match)) {
          /** this is a key without default value **/
          keys.push({key: match, defaultValue: ""});
        }
      }
    }
    
    if (Config.translocoPipeTemplate.test(trimmedContent)) {
      console.log(content);
      console.log("----");
      const matches = content.match(/{{.*\|.*transloco.*}}/);
      
      for (let match of matches) {
        console.log(match);
        
        if (/transloco.*default/.test(match)) {
          /** This is a key with default value **/ 
          const key = match.match(/'(.*?)'.*|,*transloco/).pop();
          // console.log(key);
        } else {
          /** THis is a key without defualt value **/
          const key = match.match(/'(.*?)'.*|,*transloco/).pop();
          // console.log(key);
        }
      }
    }
  }
  clearInterval(cliId);
  console.log("Extraction completed");
  return keys;
}