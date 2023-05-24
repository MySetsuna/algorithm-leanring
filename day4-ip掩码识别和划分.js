/**
 * 关于ip 地址的基础知识
 *
 * 由4个字节，即32位二进制组成的一个逻辑地址，将这32位二进制分成4组，每组代表一个八位二进制数。
 *
 * 如果各个数字位上的数字全是 1 ，
 */
const ipCode = new Array(3).fill([]).map((item, index) => {
  if (!index) {
    return new Array(8).fill(1);
  } else if (index === 2) {
    return new Array(8).fill(2).map((base, i) => base ** (7 - i));
  } else if (index === 1) {
    return new Array(8).fill(2).map((base, i) => `${base}**${7 - i}`);
  }
});
console.log("查看八位二进制数的对应数字表:");
console.table(ipCode);
console.log(
  "这个ip段的数字，即是这个八位二进制数的十进制数: ",
  ipCode[2].reduce((a, b) => a + b)
);

/**
 * 从逻辑上分为网络号和主机号，
 * 网络号： 某一个完整的范围
 * 主机号：某一个独立的主机
 *
 * 网络号范围越大，容纳主机越多。反之亦然
 *
 * ip地址分类：A B C D E
 * A：它的前八位的第一位一定是0 [0,*,*,*,*,*,*,*]。A的网络号是第一个字节
 * B：它的前八位必须以10开头 [1,0,*,*,*,*,*,*]。B的网络号是前两个字节
 * C：[1,1,0,*,*,*,*,*] 。 C的网络号是前三个字节
 * D：[1,1,1,0,*,*,*,*]
 * E：[1,1,1,1,0,*,*,*]
 *
 * 私网ip：
 * 1：[00001010]
 * 2：[10101100][0001****]
 * 3：[11000000][10101000]
 *
 * 子网掩码：
 * 配合IP地址，区分出网络号
 * 子网掩码所有 1 对应 IP地址 的网络号。前边是全1，后边是全0
 *
 * 子网划分：
 * 在已有的主机号里划分一个子网号，通过修改子网掩码1的长度，得到不同的子网络
 *
 * 网络地址就是网络号
 *
 *
 */
// js api 将数字转换成别的进制
// 1.十进制转其他进制
console.log(parseInt(10).toString(2).padStart(8, 0));
// 2.其他进制转十进制
console.log(parseInt("1000", 2));

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

const IGNORE_TAG = -1;
const ERROR_TAG = -2;
const BYTE_IP_LENGTH = 32;
const A_IP_TEMP = ["1.0.0.0", "126.255.255.255"];
const B_IP_TEMP = ["128.0.0.0", "191.255.255.255"];
const C_IP_TEMP = ["192.0.0.0", "223.255.255.255"];
const D_IP_TEMP = ["224.0.0.0", "239.255.255.255"];
const E_IP_TEMP = ["240.0.0.0", "255.255.255.255"];
const F_IP_TEMP = ["0.0.0.0", "255.255.255.256"];

const PRIVATE_IP_TEMP1 = ["10.0.0.0", "10.255.255.255"];
const PRIVATE_IP_TEMP2 = ["172.16.0.0", "172.31.255.255"];
const PRIVATE_IP_TEMP3 = ["192.168.0.0", "192.168.255.255"];
function toIPNumber(ipStr = "") {
  let byteNumber;
  try {
    let byteStr = "";
    const bytes = ipStr.split(".");

    for (let i = 0; i < bytes.length; i++) {
      const byte = bytes[i];
      const number = parseInt(byte);
      if (!i && (number === 0 || number === 127)) {
        return IGNORE_TAG;
      }
      if (number < 0 || number > 255 || isNaN(number)) {
        throw new Error("error ip");
      }
      byteStr += number.toString(2).padStart(8, "0");
    }
    byteNumber = parseInt(byteStr, 2);
  } catch {
    return ERROR_TAG;
  }
  return byteNumber;
}
const A_AREA = A_IP_TEMP.map(toIPNumber);
const B_AREA = B_IP_TEMP.map(toIPNumber);
const C_AREA = C_IP_TEMP.map(toIPNumber);
const D_AREA = D_IP_TEMP.map(toIPNumber);
const E_AREA = E_IP_TEMP.map(toIPNumber);

const PRIVATE_AREA1 = PRIVATE_IP_TEMP1.map(toIPNumber);
const PRIVATE_AREA2 = PRIVATE_IP_TEMP2.map(toIPNumber);
const PRIVATE_AREA3 = PRIVATE_IP_TEMP3.map(toIPNumber);

function isA(ipNumber) {
  return ipNumber >= A_AREA[0] && ipNumber <= A_AREA[1];
}
function isB(ipNumber) {
  return ipNumber >= B_AREA[0] && ipNumber <= B_AREA[1];
}
function isC(ipNumber) {
  return ipNumber >= C_AREA[0] && ipNumber <= C_AREA[1];
}
function isD(ipNumber) {
  return ipNumber >= D_AREA[0] && ipNumber <= D_AREA[1];
}
function isE(ipNumber) {
  return ipNumber >= E_AREA[0] && ipNumber <= E_AREA[1];
}

function isPrivate(ipNumber) {
  return (
    (ipNumber >= PRIVATE_AREA1[0] && ipNumber <= PRIVATE_AREA1[1]) ||
    (ipNumber >= PRIVATE_AREA2[0] && ipNumber <= PRIVATE_AREA2[1]) ||
    (ipNumber >= PRIVATE_AREA3[0] && ipNumber <= PRIVATE_AREA3[1])
  );
}

function isMatchChildCode(ipStr = "") {
  const bytes = ipStr.split(".");
  let matchKey = "1";
  let count_1 = 0;
  let count_0 = 0;
  try {
    for (const byte of bytes) {
      const byteStr = parseInt(byte).toString(2).padStart(8, "0");
      for (const key of byteStr) {
        if (!count_1 && key === "0") {
          return false;
        }
        if (matchKey === "1" && key === matchKey) {
          count_1++;
        }
        if (count_1 && key === "0") {
          matchKey = key;
          count_0++;
        }
        if (count_0 && key === "1") {
          return false;
        }
      }
    }
  } catch (error) {
    return false;
  }
  return count_1 && count_1 < 32 && count_0 + count_1 === BYTE_IP_LENGTH;
}
const lines = [
  "225.240.129.203~255.110.255.255",
  "183.181.49.4~255.0.0.0",
  "172.177.113.45~255.0.0.0",
  "176.134.46.246~255.0.0.0",
];
void (async function () {
  // Write your code here
  let a = 0,
    b = 0,
    c = 0,
    d = 0,
    e = 0,
    err = 0,
    priv = 0;
  for (const line of lines) {
    let [ipStr, childStr] = line.split("~");

    const ipNumber = toIPNumber(ipStr);
    if (ipNumber < 0) {
      if (ipNumber === ERROR_TAG) {
        err++;
      }
      continue;
    }
    if (!isMatchChildCode(childStr)) {
      err++;
      continue;
    }
    if (isPrivate(ipNumber)) {
      priv++;
    }
    switch (true) {
      case isA(ipNumber):
        a++;
        break;
      case isB(ipNumber):
        b++;
        break;
      case isC(ipNumber):
        c++;
        break;
      case isD(ipNumber):
        d++;
        break;
      case isE(ipNumber):
        e++;
        break;
    }
  }
  console.log([a, b, c, d, e, err, priv].join(" "));
})();
