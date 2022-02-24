---
title: "[作業] 演算法 week 2"
date: 2022-02-24T01:24:22+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python, C++]
---

## 演算法作業 Week2

### 第一題
* [教學影片](https://www.youtube.com/watch?v=X7wROLI-o-g)
![demo](https://i.imgur.com/Kb409LO.png)
* f(n) = O(n^3), c = 4, n0 = 1

### 第二題
![demo](https://i.imgur.com/3QWngi5.png)
* f(n) = O(n^2), c = 3, n0 = 0

### 第三題
```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        count = 0
        index = 0
        while index < len(nums) - 1:
            if nums[index] > nums[index + 1]:
                count = index + 1
                break
            index = index + 1

        left, right = 0 + count, len(nums) - 1 + count
        while left <= right:
            middle = (left + right) // 2
            temp_middle = middle % len(nums)
            if target > nums[temp_middle]:
                left = middle + 1
            elif target == nums[temp_middle]:
                return temp_middle
            else:
                right = middle - 1

        return -1
```

* 題目連結：[33. Search in Rotated Sorted Array - LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array/)
* LeetCode 執行結果： ![demo](/images/leetcode_33_result.png)
* 語言：Python
* 花費時間：30 分鐘
* 完成程度：完全靠自己
* 想法：`while` 迴圈找出第一個不遞增的部分，就可以知道陣列旋轉幾次。而 `left` 跟 `right` shift `count` 次，最後利用 module 陣列長度得到真正的索引值（`temp_middle`）。

### 第四題
```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        if target not in nums:
            return [-1, -1]

        left, right = 0, len(nums) - 1
        answer = [-1, -1]

        while left <= right:
            middle = (left + right) // 2
            if target < nums[middle]:
                right = middle - 1
            else:
                left = middle + 1

        answer[1] = right
        left = 0
        while left <= right:
            middle = (left + right) // 2
            if target > nums[middle]:
                left = middle + 1
            else:
                right = middle - 1

        answer[0] = left

        return answer
```

* 題目連結：[34. Find First and Last Position of Element in Sorted Array - LeetCode](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
* LeetCode 執行結果： ![demo](/images/leetcode_34_result.png)
* 語言：Python
* 花費時間：10 分鐘
* 完成程度：完全靠自己
* 想法：先用一個 `while` 迴圈算出目標數最右邊的 `index`，然後 `left` 歸零，`right` 照舊，繼續二分搜尋，找出目標最左邊的 `index`。

### 第五題
```cpp
class Solution {
public:
    int left, right, middle, answer;
    int guessNumber(int n) {
        left = 1;
        right = n;
        while (left <= right) {
            middle = left + (right - left) / 2;
            if (guess(middle) < 0) {
                right = middle - 1;
            }
            else if (guess(middle) == 0) {
                answer = middle;
                break;
            }
            else {
                left = middle + 1;
            }
        }

        return answer;
    }
};
```

* 題目連結：[374. Guess Number Higher or Lower - LeetCode](https://leetcode.com/problems/guess-number-higher-or-lower/)
* LeetCode 執行結果： ![demo](/images/leetcode_374_result.png)
* 語言：C++
* 花費時間：10 分鐘
* 完成程度：完全靠自己
* 想法：利用 `二分搜尋` 找尋目標的數字。
    > **Note :** 因為題目的 `n` 為 `int` 大小，所以 `middle` 要用特別的算法才不會 overflow。

### 本週心得
這次多了計算 function 複雜度以及程式的複雜度，感覺更瞭解了演算法。  
然後在觀摩同學的作業時，看到了[神仙解法](https://github.com/tony11306/practice/blob/main/algo-course/hw1/hw.md#sol-3-c-lower_bound-functionlogn)，希望下次上課的時候可以看到他講解！
