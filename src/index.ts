import {Config} from "./models/settings";
import * as Path from "node:path";
import extract from "./logic/extract";

const args = process.argv.slice(2);

if (args.find(a => /^extract$/.test(a))) {
  if (args.find(a => a == "--help")) {
    // TODO Show all the options with explenations
    console.log("Help function isn't yet available");
    process.exit();
  }

  if (args.find(a => a == "--removed-unused-keys")) {
    Config.removeUnusedKeys = true;
  }

  if (args.find(a => a.includes("--default-language="))) {
    Config.defaultLanguage = args.find(a => a.includes("--default-language="))
      ?.replace("--default-language=", "") ?? "en";
  }

  if (args.find(a => a.includes("--marker-alias="))) {
    Config.markerAlias = args.find(a => a.includes("--marker-alias="))
      ?.replace("--marker-alias=", "") ?? "defaultMarker";
  }

  if (args.find(a => a.includes("--source="))) {
    const tmpSource = args.find(a => a.includes("--source="))
      ?.replace("--source=", "") ?? "./";

    Config.sourceLocation = Path.join(process.cwd(), tmpSource);
  } else {
    Config.sourceLocation = Path.join(process.cwd(), "./");
  }

  extract();
} else {
  if (args.find(a => a == "--help")) {
    // TODO Show all actions with explenation
    console.log("Help function isn't yet available");
    process.exit();
  }

  console.error("No action given...");
}