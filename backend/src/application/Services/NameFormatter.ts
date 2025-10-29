export function NameFormatter(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => {
      const wordLength = word.length;
      const endsWithS = word.endsWith("s");

      if (wordLength === 1) return word;

      if (wordLength === 2) return word;

      if (wordLength === 3 && endsWithS) return word;

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
