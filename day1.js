const feipei = (cpus = [], needCpuNumber) => {
  const result = [];
  /**
   * key: needCpuNumber
   * arr: cases
   */
  const firendlyRule = {
    1: [1, 3, 2, 4],
    2: [2, 4, 3],
    4: [4],
    8: [0],
  };

  let grup1 = [0, 1, 2, 3];
  grup1 = grup1.filter((item) => cpus.includes(item));
  let grup2 = [4, 5, 6, 7];
  grup2 = grup2.filter((item) => cpus.includes(item));
  if (needCpuNumber === 8) {
    if (cpus.length === 8) return [cpus];
    else return [];
  }
  const mostCase = firendlyRule[needCpuNumber];

  for (const caseNumber of mostCase) {
    let temp;
    let temp2;
    if (grup1.length === caseNumber) {
      temp = choose1(grup1, needCpuNumber);
      result.push(...temp);
    }
    if (grup2.length === caseNumber) {
      temp2 = choose1(grup2, needCpuNumber);
      result.push(...temp2);
    }
    if (temp?.length || temp2?.length) break;
  }
  return result;
};

function factorialize(num) {
  if (num > 0) {
    return num * factorialize(num - 1);
  } else return 1;
}

function factorialize2(num) {
  let result = 1;
  for (let number = num; number > 1; number--) {
    result = number * result;
  }
  return result;
}

function choose1(arr, size) {
  let allResult = [];
  getChoose(arr, size, [], allResult);
  return allResult;
}
function getChoose(arr, size, result, allResult = []) {
  let arrLen = arr.length;
  if (size > arrLen) {
    return;
  }
  if (size === arrLen) {
    allResult.push([...result, ...arr]);
  } else {
    for (let i = 0; i < arr.length; i++) {
      const newResult = [...result];
      newResult.push(arr[i]);
      if (size == 1) {
        allResult.push(newResult);
      } else {
        const newArr = [...arr];
        newArr.splice(0, i + 1);
        getChoose(newArr, size - 1, newResult, allResult);
      }
    }
  }
}

function choose(arr, size) {
  var allResult = [];

  (function (arr, size, result) {
    var arrLen = arr.length;
    if (size > arrLen) {
      return;
    }
    if (size == arrLen) {
      allResult.push([].concat(result, arr));
    } else {
      for (var i = 0; i < arrLen; i++) {
        var newResult = [].concat(result);
        newResult.push(arr[i]);

        if (size == 1) {
          allResult.push(newResult);
        } else {
          var newArr = [].concat(arr);
          newArr.splice(0, i + 1);
          arguments.callee(newArr, size - 1, newResult);
        }
      }
    }
  })(arr, size, []);

  return allResult;
}

function getResult(arr = [], num) {
  const link1 = [];
  const link2 = [];
  arr
    .sort((a, b) => a - b)
    .forEach((e) => (e < 4 ? link1.push(e) : link2.push(e)));
  const ans = [];
  const len1 = link1.length;
  const len2 = link2.length;
  console.log(len1, len2);
  switch (num) {
    case 2:
      if (len1 === 2 || len2 === 2) {
        if (len1 === 2) dfs(link1, 0, 2, [], ans);
        if (len2 === 2) dfs(link2, 0, 2, [], ans);
      }
      break;

    default:
      break;
  }
  return ans;
}
function dfs(arr, index, level, path, res) {
  if (level === path.length) {
    return res.push([...path]);
  }
  for (let i = index; i < arr.length; i++) {
    path.push(arr[i]);
    dfs(arr, i + 1, level, path, res);
    path.pop();
  }
}
const r1 = feipei([0, 1, 4, 5, 6, 7], 1);
const r11 = getResult([0, 1, 4, 5, 6, 7], 1);
console.log(r1, "r1");
console.log(r11, "r11");
const r2 = feipei([0, 1, 4, 5, 6, 7], 4);
const r22 = getResult([0, 1, 4, 5, 6, 7], 4);
console.log(r2, "r2");
console.log(r22, "r22");
const r3 = getResult([0, 1, 4, 5, 6, 7], 2);
const r4 = feipei([0, 1, 4, 5, 6, 7], 2);
console.log(r3, "r3");
console.log(r4, "r4");
const r8 = feipei([0, 1, 2, 3, 4, 5, 6, 7], 8);
console.log(r8, "r8");
