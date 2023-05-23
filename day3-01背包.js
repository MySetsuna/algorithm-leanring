/**
 *  dp二维数组
 * dp[i][j]
 * 0 到 i的物品任取，放进容量为j的背包里
 * i: 物品下标
 * j: 容量
 *
 * a: 不放物品 i 价值：dp[i-1][j]
 * b: 放物品 i 价值： dp[i-1][j-weight[i]] + value[i]
 *  dp[i][j] = max(a,b)
 *
 * 遍历： 二维数组遍历顺序可以改变
 *  for 1 遍历物品
 *  for 2 遍历背包
 * */
// const lines = ["1000 5", "800 2 0", "400 5 1", "300 5 1", "400 3 0", "500 2 0"];
// const lines = ["100 2", "80 16", "40 12", "50 10"];
// const lines =[
// '50 5',
// '20 3 5',
// '20 3 5',
// '10 3 0',
// '10 2 0',
// '10 1 0',]
const lines = [
  '4500 12',
  '100 3 0',
  '400 5 0',
  '300 5 0',
  '1400 2 0',
  '500 2 0',
  '800 2 4',
  '1400 5 4',
  '300 5 0',
  '1400 3 8',
  '500 2 0',
  '1800 4 0',
  '440 5 10',
]
const [t, ...g] = lines;
const goods = g.map((item) => item.split(" "));
const [totalMoney, totalNumber] = t.split(" ");
const total = totalMoney/10
const prices = [];
const vp = [];
const extraGoods = {};
const mainIds = [];
goods.forEach(([price, value,belong], index) => {
  if (belong === "0") {
    prices.push(parseInt(price / 10));
    vp.push(parseInt(price / 10) * parseInt(value));
    mainIds.push(index + 1);
  } else {
    if (!extraGoods[parseInt(belong) ])
      extraGoods[parseInt(belong) ] = [];
    extraGoods[parseInt(belong) ].push([
      parseInt(price / 10),
      parseInt(price / 10) * parseInt(value),
    ]);
  }
});
const dp = new Array(prices.length).fill().map(() => Array(total + 1).fill(0));
dp[-1] =  Array(total + 1).fill(0)
for (let j = prices[0]; j <= total; j++) {
  dp[0][j] = vp[0];
}
for (let i = 0; i < prices.length; i++) {
  for (let j = 0; j <= total; j += 1) {
    if (j < prices[i]) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - prices[i]] + vp[i]);
      const id = mainIds[i];
      const extra = extraGoods[id];
      if (extra) {
        if (j >= (prices[i] + extra[0][0])) {
          dp[i][j] = Math.max(
            dp[i][j],
            dp[i - 1][j - prices[i] - extra[0][0]] + vp[i] + extra[0][1]
          );
        }
        if (extra[1]&&j >= (prices[i] + extra[1][0])) {
          dp[i][j] = Math.max(
            dp[i][j],
            dp[i - 1][j - prices[i] - extra[1][0]] + vp[i] + extra[1][1]
          );
        }
        if (extra[1]&&j >= (prices[i] + extra[1][0] + extra[0][0])) {
          dp[i][j] = Math.max(
            dp[i][j],
            dp[i - 1][j - prices[i] - extra[1][0] - extra[0][0]] +
              vp[i] +
              extra[1][1] +
              extra[0][1]
          );
        }
      }
    }
  }
}
// console.table(dp)
console.log(dp[prices.length - 1][total] * 10);
