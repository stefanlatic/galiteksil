export function toCyrillic(text) {
  const map = {
    a: "а", b: "б", v: "в", g: "г", d: "д", đ: "ђ", e: "е", ž: "ж", z: "з",
    i: "и", j: "ј", k: "к", l: "л", lj: "љ", m: "м", n: "н", nj: "њ", o: "о",
    p: "п", r: "р", s: "с", t: "т", ć: "ћ", u: "у", f: "ф", h: "х", c: "ц",
    č: "ч", dž: "џ", š: "ш"
  };

  return text
    .toLowerCase()
    .replace(/dž/g, "џ")
    .replace(/nj/g, "њ")
    .replace(/lj/g, "љ")
    .split('')
    .map((ch) => map[ch] || ch)
    .join('');
}
