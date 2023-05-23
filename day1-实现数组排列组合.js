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
function choose(arr, size) {
  /**
   * 创建存储所有结果的数组容器
   */
  let allResult = [];
  // 进入填装结果的方法
  getChoose(arr, size, [], allResult);
  // 返回结果
  return allResult;
}
function getChoose(arr, size, result, allResult = []) {
  let arrLen = arr.length;
  // 如果所需结果数量大于数组长度，直接返回
  if (size > arrLen) {
    return;
  }
  //如果所需结果数量等于数组长度，在所有结果中存入之前累计的结果数组和当前数据数组
  if (size === arrLen) {
    allResult.push([...result, ...arr]);
  } else {
    // 如果所需的结果长度大于数据数组长度，则遍历数据数组
    for (let i = 0; i < arr.length; i++) {
      // 根据上一个递归的累计结果，声明新的累计结果数组
      const newResult = [...result];
      // 将遍历的当前数据存入型新的累计结果数组
      newResult.push(arr[i]);
      // 如果所需的结果数量恰好是1，则直接新的累计结果数组存入全部结果数组
      if (size == 1) {
        allResult.push(newResult);
      } else {
        // 如果所需的结果数量不是1，则拼装数据，进入下一个递归
        // 拼装新的数据数组，将从零索引到当前数据索引加1的数据全都清除
        const newArr = [...arr];
        newArr.splice(0, i + 1);
        // 进入新的递归
        getChoose(newArr, size - 1, newResult, allResult);
      }
    }
  }
}
// 排序
function queue(arr, size) {
  let allResult = [];
  getQueue(arr, size, [], allResult);
  return allResult;
}

function getQueue(arr, size, result, allResult) {
  let arrLen = arr.length;
  if (size < arrLen) {
    return;
  }
  if (size === arrLen) {
    return allResult.push([...result, ...arr]);
  } else {
    for (let i = 0; i < arr.length; i++) {
      const newArr = [...arr];
      const element = newArr.splice(i, 1);
      const newResult = [...result, element];
      getQueue(newArr, size, newResult, allResult);
    }
  }
}
