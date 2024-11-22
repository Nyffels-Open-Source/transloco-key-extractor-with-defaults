import {waitInformation} from "../shared/cli";
import {readdir} from 'node:fs/promises';
import {Config} from "../../models/settings";
import fs from 'fs';
import Path from 'path';

export async function extractKeys() {
  let cliId = waitInformation("Analysing files");
  let files = await readdir(Config.sourceLocation, {recursive: true});
  files = files.filter(f => /.*(\.ts)|(\.html)$/.test(f));
  clearInterval(cliId);

  cliId = waitInformation("Extracting keys");
  for (let file of files) {
    let content = fs.readFileSync(Path.join(Config.sourceLocation, file), 'utf8');
    content = content.replace(/(\r\n|\n|\r)/gm,"").replace(/\s/g, "")
    if ((Config.translocoImport.test(content) && Config.translocoExtractorImport.test(content)) || Config.translocoPipeTemplate.test(content)) {
      console.log(file);
      // console.log("----");
      // console.log(content);
      // console.log("----");
    }
  }
  clearInterval(cliId);
  console.log("Extraction completed");
  return;
}