export function embedToUrl(url: string) {
  const regex = /src=['"]([^'"]+)['"]/i;
  const res = url.match(regex);
  return res ? res[1] : "null";
}
