import {waitInformation} from "../shared/cli";
import fs from 'fs';
import {Config} from "../../models/settings";

export function extractKeys() {
  const cliId = waitInformation("extracting keys");
  
  extractKeysFromTypescript();
  extractKeysFromTemplates()
  
  return;
}

function extractKeysFromTypescript() {
  const files = fs.readFileSync(Config.sourceLocation, {encoding: "utf8"});
  console.log(files);
}

function extractKeysFromTemplates() {
  // TODO
}