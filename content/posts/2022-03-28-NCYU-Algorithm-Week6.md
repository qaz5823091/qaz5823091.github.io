---
title: "[作業] 演算法 week 6"
date: 2022-03-28T23:42:16+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## 演算法作業 Week6

### 第一題
* Kruskal
![demo](/images/kruskal_process.gif)

* Prim
![demo](/images/prim_process.gif)

### 第二題
回合  | 選取點 | (B) | (C) | (D) | (E) | (F)
:----:|:-----:|----:|----:|----:|----:|----:|
1     |   B   | 10  |  15 |  ∞  |  ∞  |  ∞  |
2     |   C   | 10  |  15 | 22  |  ∞  | 25  |
3     |   D   | 10  |  15 | 22  | 25  | 25  |
4     |   F   | 10  |  15 | 22  | 24  | 23  |
5     |   E   | 10  |  15 | 22  | 24  | 23  |

### 第三題
![demo](/images/huffman_code_process.gif)

* 110 0110 111 為 E A G

### 第四題
```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        maximum = 0
        is_left = True
        left, right = 0, len(height) - 1
        while left < right:
            min_value = min(height[left], height[right])
            if min_value == height[left]:
                is_left = True
            else:
                is_left = False

            temp = min_value * (right - left)
            if temp > maximum:
                maximum = temp

            if is_left:
                left += 1
            else:
                right -= 1

        return maximum
```

* 題目連結：[11. Container With Most Water - LeetCode](https://leetcode.com/problems/container-with-most-water/)
* LeetCode 執行結果： ![demo](/images/leetcode_11_result.png)
* 語言：Python
* 花費時間：30 分鐘
* 完成程度：觀摩別人想法
* 其他：設定左右兩指標，並計算可以裝多少水。若左邊較低，則左邊指標（`left`）就向右移，不然右邊指標（`right`）就向左移。

### 第五題
```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        length = len(nums)
        if length <= 1:
            return 0

        jump_times = 0
        temp_end = 0
        maximum = 0
        index = 0

        while index < length - 1:
            maximum = max(maximum, index + nums[index])
            if index == temp_end:
                jump_times += 1
                temp_end = maximum
                if temp_end == length - 1:
                    return jump_times

            index += 1

        return jump_times
```

* 題目連結：[45. Jump Game II - LeetCode](https://leetcode.com/problems/jump-game-ii/)
* LeetCode 執行結果： ![demo](/images/leetcode_45_result.png)
* 語言：Python
* 花費時間：50 分鐘
* 完成程度：觀摩別人程式
* 其他：跟上次的[題目](../2022-03-20-ncyu-algorithm-week5/#第五題)比較的話，多了 `temp_end` 以及 `jump_times`。
`temp_end` 用來記錄目前能到的最遠地方，若能踏到（`index == temp_end`），跳躍次數就增加（`jump_times + 1`），若最遠的地方是 `length - 1`，則達到終點回傳結果。

### 本週心得
一到三題，資料結構跟離散數學都有上過了，所以寫起來得心應手，
相對來說，程式題比較難想，Greedy 的題目沒寫過的話，都要想好久的時間....
