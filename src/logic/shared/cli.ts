export function waitInformation(text: string) {
  let dotIndex = 0;
  
  const id = setInterval(() => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(text + ".".repeat(dotIndex));
    
    dotIndex = dotIndex >= 5 ? 0 : dotIndex + 1;
  }, 500);
  return id;
}