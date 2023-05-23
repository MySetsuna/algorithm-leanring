const DIGIT_MAP_16 = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 10,
  a: 10,
  B: 11,
  b: 11,
  C: 12,
  c: 12,
  D: 13,
  d: 13,
  E: 14,
  e: 14,
  F: 15,
  f: 15,
};

const DIGIT_MAP_SIGN_16 = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};

const DIGIT_START_SIGN_MAP = { 16: "0x", 8: "0o", 2: "0b" };

const DIGIT_MAP_2 = { 0: 0, 1: 1 };

const DIGIT_MAPS = { 16: DIGIT_MAP_16 };
const DIGIT_SIGN_MAPS = { 16: DIGIT_MAP_SIGN_16 };

function toTenDigit(numberStr, digit, map) {
  const digitMap =
    map || DIGIT_MAPS[digit] || (digit <= 16 ? DIGIT_MAPS[16] : undefined);
  if (!digitMap) {
    throw new Error("no match digitMap, you shuold put it at third param");
  }
  if (typeof numberStr === "number") {
    return numberStr;
  }
  if (typeof numberStr !== "string") {
    throw new Error("wrong input type");
  }
  let d = 1;
  let result = 0;
  for (let i = numberStr.length - 1; i >= 0; i--) {
    const num = numberStr[i];
    if (num && digitMap[num] !== undefined) {
      result += d * digitMap[num];
    } else {
      break;
    }
    d = d * digit;
  }
  return result;
}

function formTenDigit(input, digit, map) {
  const digitMap =
    map ||
    DIGIT_SIGN_MAPS[digit] ||
    (digit <= 16 ? DIGIT_SIGN_MAPS[16] : undefined);
  if (!digitMap) {
    throw new Error("no match digitMap, you shuold put it at third param");
  }

  if (typeof input !== "number") {
    throw new Error("wrong input type");
  }
  let resultArr = [];
  let temp = input;
  while (temp) {
    if (temp >= digit) {
      const digitNumber = Math.floor(temp / digit);
      resultArr.push(digitMap[temp % digit]);
      temp = digitNumber;
    } else {
      resultArr.push(digitMap[temp]);
      temp = 0;
    }
  }
  return (DIGIT_START_SIGN_MAP[digit] || "") + resultArr.reverse().join("");
}

console.log(toTenDigit("0xaa", 16));
console.log(toTenDigit("1000", 2));
console.log(toTenDigit("100", 10));

console.log(formTenDigit(127, 2));
console.log(formTenDigit(192, 2));
console.log(formTenDigit(168, 2));
