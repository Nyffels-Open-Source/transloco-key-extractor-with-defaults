import {waitInformation} from "../shared/cli";
import {readdir} from 'node:fs/promises';
import {Config} from "../../models/settings";
import fs from 'fs';
import Path from 'path';

export default async function extract() {
  let cliId = waitInformation("Analysing files");
  let files = await readdir(Config.sourceLocation, {recursive: true});
  files = files.filter(f => /.*(\.ts)|(\.html)$/.test(f));
  clearInterval(cliId);

  cliId = waitInformation("Extracting keys");
  for (let file of files) {
    const content = fs.readFileSync(Path.join(Config.sourceLocation, file), 'utf8');
    const trimmedContent = content.replace(/(\r\n|\n|\r)/gm,"").replace(/\s/g, "")
    if (Config.translocoImport.test(trimmedContent) && Config.translocoExtractorImport.test(trimmedContent)) {
      const re = new RegExp(Config.markerAlias + '\\(.*\\)', 'g');
      const matches = content.match(re);
    }
    
    if (Config.translocoPipeTemplate.test(content)) {
      // TODO Extract using pipe 
      console.log(content);
    }
  }
  clearInterval(cliId);
  console.log("Extraction completed");
  return;
}