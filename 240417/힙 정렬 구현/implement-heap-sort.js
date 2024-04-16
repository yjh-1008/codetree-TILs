const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const N = parseInt(input[0]);
let nums = input[1].split(" ").map(Number);

function heapSort(array) {
  /**
   * 요소 swap 메서드
   * @param {array} swapArray : swap 대상 배열
   * @param {number} a : 교체 대상 인덱스
   * @param {number} b : 교체 인덱스
   */
  function swap(swapArray, a, b) {
    const temp = swapArray[a];
    swapArray[a] = swapArray[b];
    swapArray[b] = temp;
  }

  /**
   * heapify 메서드
   * @param {array} heapArray : heap으로 변환 할 배열
   * @param {number} length : 배열 길이
   * @param {number} parent : 부모 인덱스
   */
  function heap(heapArray, length, parent) {
    const left = parent * 2 + 1;
    const right = left + 1;
    let root = parent;
    //좌측 요소가 부모 값 보다 크면 부모 인덱스를 left 인덱스로 대입
    if (left < length && heapArray[left] > heapArray[root]) {
      root = left;
    }

    //우측 요소가 부모 값 보다 크면 부모 인덱스를 right 인덱스로 대입
    if (right < length && heapArray[right] > heapArray[root]) {
      root = right;
    }

    //부모 요소가 자식 요소와 바꾸어 졌으면 swap처리 및 heap 재검사
    if (root !== parent) {
      swap(heapArray, parent, root);
      heap(heapArray, length, root);
    }
  }

  /**
   * 정렬 메서드
   * @param {array} tempArray : 정렬 대상 배열
   * @returns
   */
  function sort(tempArray) {
    let length = tempArray.length;
    if (length === 1) {
      return tempArray;
    } else {
      //배열을 이등분하여 좌측 요소들을 heap 형태로 변환
      for (let i = Math.floor(tempArray.length / 2) - 1; i >= 0; i--) {
        heap(tempArray, length, i);
      }

      for (let i = tempArray.length - 1; i > 0; i--) {
        swap(tempArray, 0, i); //가장 큰 요소와 정렬되지 않은 마지막 요소와 교환
        length--;
        heap(tempArray, length, 0); //배열의 나머지 부분들을 heap상태로 만들며 정렬 과정 수행
      }
      return tempArray;
    }
  }

  return sort(array);
}
console.log(heapSort(nums).join(" "))