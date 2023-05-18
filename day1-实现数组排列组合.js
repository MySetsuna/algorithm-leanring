/**
 * @descrption 乘阶计算 !0 =1 !1 =1
 * @param {*} num
 * @returns
 */
function factorialize(num) {
  let result = 1;
  if (num > 1) {
    for (let number = num; number > 1; number--) {
      result = number * result;
    }
  }
  return result;
}

/**
 * 组合
 */
function (arr,num) {
    
}