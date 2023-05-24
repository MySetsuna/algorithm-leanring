class Goods {
  price;
  value;
  exraP0;
  exraV0;
  exraP1;
  exraV1;
  get exraPrice0() {
    return this.price + this.exraP0;
  }
  get exraValue0() {
    return this.value + this.exraV0;
  }

  get exraPrice1() {
    return this.price + this.exraP1;
  }
  get exraValue1() {
    return this.value + this.exraV1;
  }
  get maxPrice() {
    return this.price + this.exraP1 + this.exraP0;
  }
  get maxValue() {
    return this.value + this.exraV1 + this.exraV0;
  }
  id;
  constructor(price, value, id) {
    this.price = price;
    this.value = value;
    this.id = id;
  }
}

const lines = ["50 5", "20 3 5", "20 3 5", "10 3 0", "10 2 0", "10 1 0"];

const BASE = 10;
const goodsMap = new Map();
let total;
let num;
lines.forEach((line, index) => {
  const splits = line.split(" ");
  if (splits.length === 3) {
    console.log(goodsMap);
    if (splits[2] === "0") {
      const price = Number(splits[0]) / BASE;
      const value = Number(splits[1]) * price;
      const goods = goodsMap.get(index) || new Goods(price, value, index);
      goods.price = price;
      goods.value = value;
      goodsMap.set(index, goods);
    } else {
      const pGoods =
        goodsMap.get(Number(splits[2])) ||
        new Goods(undefined, undefined, Number(splits[2]));
      const price = Number(splits[0]) / BASE;
      const value = Number(splits[1]) * price;
      if (!pGoods.exraP0) {
        pGoods.exraP0 = price;
        pGoods.exraV0 = value;
      } else if (!pGoods.exraV1) {
        pGoods.exraP1 = price;
        pGoods.exraV1 = value;
      }
      goodsMap.set(Number(splits[2]), pGoods);
    }
  } else {
    total = Number(splits[0]) / BASE;
    num = Number(splits[1]);
  }
});
const goodsList = [...goodsMap.values()];
const dp = new Array(goodsList.length)
  .fill()
  .map(() => Array(total + 1).fill(0));
dp[-1] = Array(total + 1).fill(0);
for (let j = goodsList[0].price; j <= total; j++) {
  dp[0][j] = goodsList[0].value;
}

for (let i = 0; i < goodsList.length; i++) {
  const goods = goodsList[i];
  for (let j = 1; j <= total; j++) {
    if (j < goods.price) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.max(
        dp[i - 1][j],
        dp[i - 1][j - goods.price] + goods.value
      );
      if (goods.exraPrice0 && j >= goods.exraPrice0) {
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i - 1][j - goods.exraPrice0] + goods.exraValue0
        );
      }
      if (goods.exraPrice1 && j >= goods.exraPrice1) {
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i - 1][j - goods.exraPrice1] + goods.exraValue1
        );
      }
      if (goods.maxPrice && j >= goods.maxPrice) {
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i - 1][j - goods.maxPrice] + goods.maxValue
        );
      }
    }
  }
}
switch (key) {
    case value:
        
        break;

    default:
        break;
}

console.log(goodsList, dp[goodsList.length - 1][total] * BASE);
