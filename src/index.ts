import {Settings} from "./models/settings";
import extractKeys from "./logic/extract";

const args = process.argv.slice(2);

if (args.find(a => /^extract$/.test(a))) {
  if (args.find(a => a == "--help")) {
    // TODO Show all the options with explenations
    console.log("Help function isn't yet available");
    process.exit();
  }
  
  if (args.find(a => a == "--removed-unused-keys")) {
    Settings.removeUnusedKeys = true;
  }

  if (args.find(a => a.includes("--default-language="))) {
    Settings.defaultLanguage = args.find(a => a.includes("--default-language="))
      ?.replace("--default-language=", "") ?? "";
  }

  extractKeys();
} else {
  if (args.find(a => a == "--help")) {
    // TODO Show all actions with explenation
    console.log("Help function isn't yet available");
    process.exit();
  }
  
  console.error("No action given...");
}