---
title: "[作業] 演算法 week 1"
date: 2022-02-18T21:01:40+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
---

## 演算法作業 Week1

### 第一題
### 第二題

### 二分搜尋
```python=
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1

        while left <= right:
            middle = (left + right) // 2
            if target > nums[middle]:
                left = middle + 1
            elif target == nums[middle]:
                return middle
            else:
                right = middle - 1

        return -1
```

* 語言：Python
* 花費時間：15 分鐘
* 完成程度：完全靠自己
* 其他：[C++ 遞迴版本]({{< ref "2021-01-08-Algorithm-BinarySearch" >}} "[Algorithm] 二分搜尋法")


### 第三題
### 第四題
### 第五題
### 第六題
### 第七題
