---
title: "[作業] 演算法 week 5"
date: 2022-03-20T20:23:15+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## 演算法作業 Week4

## 第一題
I.
![demo](/images/max_heap_process.gif)

II.
![demo](https://i.imgur.com/nzpnLZS.png)
* d 是完全平衡樹的樹高（`floor(log n)`）
* L 為某個節點的 level（距離 root 有多遠）
* 2(d - L) 是復原樹所需要的比較次數（因為有兩個 children，所以比較兩次）
* 2^L 是在 L level 中最大的節點數量
* 而上述公式是指在 level 上每個節點所需花費的比較次數（`worst case`）

## 第二題
![demo](https://i.imgur.com/cdthw9f.png)

* 如果 L(root) = 0
    - External Path Length = 4 * 3 + 2 * 2 = 16
    - 平均深度 = (0 + 2 * 1 + 4 * 2 + 4 * 3) / 11 = 2

## 第三題
* 4, 1, 3, 2, 5
    - 將五個數字轉成平面座標
    > (4, 16), (1, 1), (3, 9), (2, 4), (5, 25)

    - 變成 convex hull
    > (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)

    - 最後排序完成
    > 1, 2, 3, 4, 5

## 第四題
```python
class Solution:
    def minTimeToType(self, word: str) -> int:
        pointer = 'a'
        seconds = len(word)
        for letter in word:
            movement = abs(ord(letter) - ord(pointer))
            seconds = seconds + min(movement, 26 - movement)
            pointer = letter

        return seconds
```

* 題目連結：[1974. Minimum Time to Type Word Using Special Typewriter - LeetCode](https://leetcode.com/problems/minimum-time-to-type-word-using-special-typewriter/)
* LeetCode 執行結果： ![demo](/images/leetcode_1974_result.png)
* 語言：Python
* 花費時間：10 分鐘
* 完成程度：完全靠自己
* 其他：每次都選擇最佳的選擇，是貪婪法（Greedy）的核心。所以每次都取順時鐘轉（clockwise）與逆時鐘轉（counterclockwise）之中取最小值，再加上每次 type in 都要一秒，最終秒數即為所求。

## 第五題
```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        maximum = nums[0]
        length = len(nums)
        index = 0

        while index <= maximum and index < length:
            if maximum >= length - 1:
                return True

            maximum = max(maximum, index + nums[index])
            index += 1

        return False
```

* 題目連結：[55. Jump Game - LeetCode](https://leetcode.com/problems/jump-game/)
* LeetCode 執行結果： ![demo](/images/leetcode_55_result.png)
* 語言：Python
* 花費時間：50 分鐘
* 完成程度：看[影片](https://youtu.be/zQmE2449S3k)
* 其他：一開始用自己的想法做，花費許多時間。參考了別人的影片才恍然大悟，index 代表現在踏到哪裡，而 `while` 的兩個條件，index 不能超過 length，超過會 index out of range ，另一個是踏到的地方一定會是最大值。`while` 裡，踏到的地方一定是先走了 `index` 步，再加上接下來會走的最大步數，與當前的 `maximum` 取最大值，就會是每一次可達到的最大步數，如果達到 `length - 1` 就代表跳得到最後！

## 本週心得
