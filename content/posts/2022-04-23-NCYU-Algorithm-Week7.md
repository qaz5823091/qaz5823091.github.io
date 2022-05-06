---
title: "[作業] 演算法 week 7"
date: 2022-04-23T14:34:42+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## 演算法作業 week 7
### 第一題
先算出每個物品的 `CP 值`（價值 / 重量）
1. 100 / 20 = 5
2. 60 / 40 = 1 ... 20
3. 30 / 10 = 3
4. 60 / 30 = 2

再把 `CP 值` 較高的先放進背包（上限 80），
1. 放 `1` ，背包剩 60
2. 放 `3` ，背包剩 50
3. 放 `4` ，背包剩 30
4. 放 `2` 的 3/4，背包全滿

最後背包裡的價值會是：
* 100 + 30 + 60 + 60 * 0.5 = 220

### 第二題
* Closest Pair problem
1. 先把平面上所有點根據 `y 值` 做排序
2. 如果平面分割到最後只有一個點的話，距離就回傳無限大
3. 找一條中線（垂直 x 象限），分成左、右兩平面
4. 重複 `2`、`3` 取得 `dL` 與 `dR`，`min(dL, dR)` 即為所求
5. （因為把 `3` 的中線拿掉後，可以會有新的最短距離所以）以中線為基準，向左向右 `d` 單位（`L - d`, `L + d`），若一個點 P 在左邊（L-d, L），而它的最短距離的點可能會在右邊（L, L + d），並且 y 範圍限制在 (Py - d, Py + d)。若在那範圍找到更小的距離 d' ，那 `d'` 就是最終答案。

### 第三題
* Convex Hull problem
    > 平面上若干個點，從這些點中，連起一個`凸多邊形`，而這多邊形要包住所有的點。

* 為何不直接用 sort 來得到 polygon，而要採用 merge？
    > 因為最佳的 sort 時間複雜度為 O(n log n)，使用 merge 的方式會更有效率。

* 請說明如何將 polygon，修改成 convex hull？
    > 將 polygon 內角超過 180 度（reflex angle）的節點刪除。

### 第四題
```python
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head is None or head.next is None:
            return head

        temp = None
        fast, slow = head, head
        while fast is not None and fast.next is not None:
            temp = slow
            slow = slow.next
            fast = fast.next.next

        temp.next = None

        first = self.sortList(head)
        second = self.sortList(slow)

        return self.merge(first, second)


    def merge(self, first: Optional[ListNode], second: Optional[ListNode]) -> Optional[ListNode]:
        head = ListNode()
        now = head

        while first is not None and second is not None:
            if first.val <= second.val:
                now.next = first
                first = first.next
            else:
                now.next = second
                second = second.next

            now = now.next

        if first is not None:
            now.next = first

        if second is not None:
            now.next = second

        return head.next
```

* 題目連結：[148. Sort List - LeetCode](https://leetcode.com/problems/sort-list/)
* LeetCode 執行結果： ![demo](/images/leetcode_148_result.png)
* 語言：Python
* 花費時間：20 分鐘
* 完成程度：觀摩別人想法
* 其他：`merge sort` 在大一的時候就做過了，使用 `vector` 來存放資料。跟這次不同的是，題目是用 `linked list` 來存放資料，所以這部分就去觀摩別人如何實作了。`sortList()` 裡的第一個迴圈作用是把一個 `list` 分成兩個，使用的方法是 `two pointer` 來算 list 的 `中間值`，一快一慢，而快的指標是慢的兩倍，所以慢的最後指到一定是中間！而 `temp.next = None` 用意是切斷 `head` 為頭的 list。`merge()` 值得注意的地方是後面的 `if`，若上面的 `while` 沒跑完 `list` 的東西，`now` 就要接上剩下的東西。

### 第五題之一
```python
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        if len(nums) == 1:
            return TreeNode(nums[0])
        elif len(nums) == 2:
            return TreeNode(nums[1], TreeNode(nums[0]))

        end = len(nums) // 2
        start = end + 1

        left = self.sortedArrayToBST(nums[:end])
        right = self.sortedArrayToBST(nums[start:])

        return self.merge(nums[end], left, right)

    def merge(self, root: int, left: Optional[TreeNode], right: Optional[TreeNode]) -> Optional[TreeNode]:
        return TreeNode(root, left, right)
```

* 題目連結：[108. Convert Sorted Array to Binary Search Tree - LeetCode](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)
* LeetCode 執行結果： ![demo](/images/leetcode_108_result.png)
* 語言：Python
* 花費時間：20 分鐘
* 完成程度：自己來
* 其他：因為題目是 `divide and conquer`，會有 `merge` 的部分，所以先完成了 `merge()`（但這部分可以再簡化）。如果 `nums` 剩下一個數字，把它變成一個節點，剩兩個的話，就接成兩個，其他狀況就繼續分割（`recursive`）。至於 `end` 與 `start` 的做法，一開始有特意判別 `nums` 的長度是否為偶數，但是後來發現沒差。

### 第五題之二
```python
class Solution:
    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:
        if head is None:
            return None
        elif head.next is None:
            return TreeNode(head.val)
        elif head.next.next is None:
            return TreeNode(head.next.val, TreeNode(head.val))

        middle = self.getMiddle(head)

        left = self.sortedListToBST(head)
        right = self.sortedListToBST(middle.next)

        return TreeNode(middle.val, left, right)


    def getMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        temp = None
        fast, slow = head, head
        while fast is not None and fast.next is not None:
            temp = slow
            slow = slow.next
            fast = fast.next.next

        temp.next = None
        return slow
```

* 題目連結：[109. Convert Sorted List to Binary Search Tree - LeetCode](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/)
* LeetCode 執行結果： ![demo](/images/leetcode_109_result.png)
* 語言：Python
* 花費時間：30 分鐘
* 完成程度：觀摩別人想法
* 其他：跟[上面那題](#第五題之一)一樣，只是 `input` 變成 `linked list`，所以要藉助上面的[`coded snippet`](#第四題)（取中間的部分）。還有一個地方不太一樣，`getMiddle()` 有可能回傳空的 `head`，所以在 `sortedListToBST()` 要再多判別。

### 挑戰題
```python
class Solution:
    def beautifulArray(self, n: int) -> List[int]:
        if n == 1:
            return [1]

        # evens + odds
        left = self.beautifulArray(n // 2)
        right = self.beautifulArray(n - n // 2)

        return [x * 2 for x in left] + [x * 2 - 1 for x in right]
```

* 題目連結：[932. Beautiful Array - LeetCode](https://leetcode.com/problems/beautiful-array/)
* LeetCode 執行結果： ![demo](/images/leetcode_932_result.png)
* 語言：Python
* 花費時間：45 分鐘
* 完成程度：觀摩別人想法
* 其他：主要是看這個人的[解釋](https://leetcode.com/problems/beautiful-array/discuss/1506453/C%2B%2B-Short-and-simple-explanation)，這題真的好燒腦🤯，有機會的話，想跟大家分享怎麼解的！

### 本週心得
期中的筆試都是上課教過的，還算普通難度。上機考的部分就有點難了，不過因為平常有在 `Leetcode` 練習題目，所以有一題很快就解出來了！

這週教 DC（Divide and Conquer），解題越來越不直覺，因為會使用到 `recursive` 遞迴的部分。至於影片的部分老師講的很清楚！

一口氣解完上面這些題目後，犒賞自己看個電影，二刷 `Inception`（臺灣翻譯：全面啟動、盜夢空間），推薦大家去看！
![demo](https://arielhsu.tw/wp-content/uploads/20190603035232_78.jpg)

### 參考
* [作業連結](https://hackmd.io/@wang1234/HJ000aAV5)
* [Algo-Ch4-VD](https://www.youtube.com/watch?v=WNzm_IwNAQc)
* [Algo-Ch4-FFT](https://www.youtube.com/watch?v=dUcf2RKQres)
