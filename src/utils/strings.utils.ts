export function extractConcentration(str: string): any {
  const regex = /^\s*(\d{1,5}\s*[a-zA-Z]{2})[\s_]?/;
  const match = str.match(regex);
  const validExtensions = [".txt", ".csv"];
  if (match && validExtensions.includes(str.slice(-4))) {
    return match[1].replace(/\s+/g, "");
  }
  return null;
}
