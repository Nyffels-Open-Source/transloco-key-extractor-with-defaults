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
    console.log(content);
  }
  clearInterval(cliId);
  console.log("Extraction completed");
  return;
}