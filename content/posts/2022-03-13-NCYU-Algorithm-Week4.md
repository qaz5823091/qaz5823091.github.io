---
title: "[作業] 演算法 week 4"
date: 2022-03-13T22:08:22+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## 演算法作業 Week4

### 第一題
* Selection Sort
* 6 4 1 3 5
    - 1 4 6 3 5, 2
    - 1 3 6 4 5, 1
    - 1 3 4 6 5, 1
    - 1 3 4 5 6, 1
    - total: 5

### 第二題
* Quick Sort
* Best Case
    * Pivot Choise
    ![demo](/images/quick_sort_best_case.png)
    * Division
    ![demo](/images/quick_sort_best_case_process.png)

* Worst Case
    * Pivot Choise
    ![demo](/images/quick_sort_worst_case2.png)
    * Division
    ![demo](/images/quick_sort_worst_case_process.png)

### 第三題
* 2D Racking
![demo](/images/racking.gif)

### 第四題
```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        s = ''.join(letter for letter in s if letter.isalnum())
        left, right = 0, len(s) - 1
        while left < right:
            if s[left].lower() != s[right].lower():
                return False

            left = left + 1
            right = len(s) - 1 - left

        return True
```

* 題目連結：[121. Valid Palindrome - LeetCode](https://leetcode.com/problems/valid-palindrome/)
* LeetCode 執行結果： ![demo](/images/leetcode_125_result.png)
* 語言：Python
* 花費時間：10 分鐘
* 完成程度：完全靠自己
* 其他：`Python` 的 `Generator` 很特別，可以用一行程式碼的方式，做繁複的動作。第三行就是把 `數字` 及 `字母` 留下，其餘去除並重新 assign 給字串 `s`。`lower()` function 是把字元轉成 `小寫` 的形式，只要 `left` 與 `right` 指到的字元不相等，即不是迴文（`Palindrome`）。

### 第五題
```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if head == None:
            return False

        slow, fast = head, head
        while fast != None and fast.next != None:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                return True

        return False
```

* 題目連結：[141. Linked List Cycle - LeetCode](https://leetcode.com/problems/linked-list-cycle/)
* LeetCode 執行結果： ![demo](/images/leetcode_141_result.png)
* 語言：Python
* 花費時間：10 分鐘
* 完成程度：完全靠自己
* 其他：就像老師給的提示一樣，建立兩指標，一快一慢，只要任一指標指到 `None`（`nullptr`），就代表此 `list` 不循環。
若兩指標讀到一樣的東西（停止條件），即為有 `cycle` 的 `list`。

**另外分享很酷的做法：**
```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        try:
            slow = head
            fast = head.next
            while slow is not fast:
                slow = slow.next
                fast = fast.next.next
            return True
        except:
            return False
```

* 利用 `Exception Handling` 來處理 `pointer` 指到 `None` 的情況。

### 本週心得
這次影片多了好多分量，有點難以消化，在影片還沒完全看完前，就已經著手處理功課了！
另外，畫圖理解理論的部分，滿有趣的。製作成動圖，就更容易理解了！
