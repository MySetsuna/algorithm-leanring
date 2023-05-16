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
    if (cpus.length === 8) return cpus;
    else return [];
  }
  const mostCase = firendlyRule[needCpuNumber];

  for (const caseNumber of mostCase) {
    let temp;
    let temp2;
    if (
      grup1.length - needCpuNumber === caseNumber ||
      (needCpuNumber === 4 && grup2.length === 4)
    ) {
      temp = choose(grup1, needCpuNumber);
      result.push(...temp);
    }
    if (
      grup2.length - needCpuNumber === caseNumber ||
      (needCpuNumber === 4 && grup2.length === 4)
    ) {
      temp2 = choose(grup2, needCpuNumber);
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

const r1 = feipei([0, 1, 4, 5, 6, 7], 1);
console.log(r1, "r1");
const r2 = feipei([0, 1, 4, 5, 6, 7], 4);
console.log(r2, "r2");
