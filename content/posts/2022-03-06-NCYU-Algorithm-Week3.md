---
title: "[作業] 演算法 week 3"
date: 2022-03-06T19:43:45+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## 演算法作業 Week3

### 第一題
* 2/5 + 3/5 + 4/5 + 5/5 + 6/5 = (2 + 3 + 4 + 5 + 6) / 5 = 20 / 5 = 4
* 6, 4, 1, 3, 5
    - 1 > 4, 6, 1, 3, 5 > 3
    - 2 > 1, 4, 6, 3, 5 > 4
    - 3 > 1, 3, 4, 6, 5 > 4
    - 4 > 1, 3, 4, 5, 6 > 3
    - total: 14

### 第二題
![demo](/images/ppt_page_25.png)
![demo](/images/ppt_page_26.png)

* n = 15, k = 4
* A(n) = 1 / 31 * [(16 * 3) + 1 + 3 * 16] = 3.031

### 第三題
```Python
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        if num == 1:
            return True

        left, right = 1, num
        while left <= right:
            middle = (left + right) // 2
            square = middle * middle
            if square > num:
                right = middle - 1
            elif num == square:
                return True
            else:
                left = middle + 1

        return False
```

* 題目連結：[367. Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square)
* LeetCode 執行結果： ![demo](/images/leetcode_367_result.png)
* 語言：Python
* 花費時間：5 分鐘
* 完成程度：完全靠自己
* 其他：做法與 [演算法 week 1](../2022-02-18-ncyu-algorithm-week1/#第六題) 的第六題差不多，只差在是完全平方數的話要回傳 `True`，否則 `False`。

### 第四題
```python
class Solution:
    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        left, right = 0, len(letters) - 1
        while left <= right:
            middle = (left + right) // 2
            if target < letters[middle]:
                right = middle - 1
            else:
                left = middle + 1

        return letters[left % len(letters)]
```

* 題目連結：[744. Find Smallest Letter Greater Than Target](https://leetcode.com/problems/find-smallest-letter-greater-than-target/)
* LeetCode 執行結果： ![demo](/images/leetcode_744_result.png)
* 語言：Python
* 花費時間：20 分鐘
* 完成程度：完全靠自己
* 其他：做法與 [演算法 week 1](../2022-02-18-ncyu-algorithm-week1/#第四題) 的第四題差不多。

### 第五題
```python
class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        left, right = 0, len(arr) - 1
        while left < right:
            middle = (left + right) // 2
            if arr[middle - 1] >= arr[middle]:
                right = middle
            elif arr[middle] <= arr[middle + 1]:
                left = middle
            else:
                return middle
```

* 題目連結：[852. Peak Index in a Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/)
* LeetCode 執行結果： ![demo](/images/leetcode_852_result.png)
* 語言：Python
* 花費時間：15 分鐘
* 完成程度：完全靠自己
* 想法：邏輯很重要，並且注意 `arr` 長度一定大於三，所以山項（`peak number`）不會在最左邊或最右邊。
以 `middle` 為基準，左邊那項如果比 `middle` 大，代表這段在 `遞減`（山的右側），所以要把 `right` 移到 `middle`；
反之亦然。最後前兩個條件都不符合的話，即是題目所求！

### 本週心得
這次教了一個演算法的 Best Case, Worst Case 以及 Average Case，並且用數學式去推導，其中的思考過程跟計算方式，
都是之前學這個演算法沒想過的，收穫很多！
