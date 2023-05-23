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
const lines = ["1000 5", "800 2 0", "400 5 1", "300 5 1", "400 3 0", "500 2 0"];
const [t, ...g] = lines;
const goods = g.map((item) => item.split(" "));
const [totalMoney, totalNumber] = t.split(" ");
const prices = [];
const values = [];
const vp = [];
const belongIds = [];
const mainGoods = [];
const extraGoods = [];
goods.forEach(([price, value, belong]) => {
  if (belong === "0") {
    mainGoods.push([price, value]);
    prices.push(parseInt(price / 10));
    values.push(parseInt(value));
    vp.push(parseInt(price / 10) * parseInt(value));
  } else {
    extraGoods.push([price, value, belong]);
  }
});
const dp = new Array(mainGoods.length).fill(new Array(totalMoney / 10).fill(0));
for (let j = prices[0]; j <= totalMoney / 10; j++) {
  dp[0][j] = vp[0];
}

for (let i = 1; i < prices.length; i++) {
  for (let j = 0; j <= totalMoney / 10; j += 1) {
    if (j < prices[0]) {
      dp[i][j] = dp[i - 1][j];
    } else dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - prices[i]] + vp[i]);
    console.log(dp[i][j], i, j);
  }
}
console.log(vp, values, prices);
console.log(dp[mainGoods.length - 1][totalMoney / 10]);
