---
title: "[作業] 演算法 week 9"
date: 2022-05-07T14:34:38+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## 演算法作業 week 8
### 第一題
* 第一次 bound 23
![demo](/images/branch_and_bound_1.png)

* 超過 bound 不符合
![demo](/images/branch_and_bound_2.png)

* 第二次 bound 20
![demo](/images/branch_and_bound_3.png)

* 最後 bound 在 9（最後答案）
![demo](/images/branch_and_bound_4.png)

    > 好沒效率喔

### 第二題
* matrix
![demo](/images/personal_assignment_1.png)

* order
![demo](/images/personal_assignment_2.png)

* tree
![demo](/images/personal_assignment_3.png)

### 第三題∞
* original matrix
i \ j | 1 | 2 | 3 | 4 | 5 | 6 | 7
:----:|:-:|:-:|:-:|:-:|:-:|:-:|:-:
1     | ∞ | 0 | 83| 9 | 30| 6 | 50
2     | 0 | ∞ | 66| 37| 17| 12| 26
3     | 29| 1 | ∞ | 19| 0 | 12| 5
4     | 32| 83| 66| ∞ | 49| 0 | 80
5     | 3 | 21| 56| 7 | ∞ | 0 | 28
6     | 0 | 85| 8 | 42| 89| ∞ | 0
7     | 18| 0 | 0 | 0 | 58| 13| ∞
    > lower bound: 3+4+16+7+25+3+26+7+1+4 = 96

* with arc 6-7 (reduce row 6 and column 7)
i \ j | 1 | 2 | 3 | 4 | 5 | 6
:----:|:-:|:-:|:-:|:-:|:-:|:-:
1     | ∞ | 0 | 83| 9 | 30| 6
2     | 0 | ∞ | 66| 37| 17| 12
3     | 29| 1 | ∞ | 19| 0 | 12
4     | 32| 83| 66| ∞ | 49| 0
5     | 3 | 21| 56| 7 | ∞ | 0
7     | 18| 0 | 0 | 0 | 58| ∞
    > lower bound: 96 + 0 = 96

* without arc 6-7 （matrix 同 original）
    > lower bound: 96 + 0 + 5 = 101

* with arc 3-5 (reduce row 3 and column 5)
i \ j | 1 | 2 | 3 | 4 | 6
:----:|:-:|:-:|:-:|:-:|:-:
1     | ∞ | 0 | 83| 9 | 6
2     | 0 | ∞ | 66| 37| 12
4     | 32| 83| 66| ∞ | 0
5     | 3 | 21| ∞ | 7 | 0
7     | 18| 0 | 0 | 0 | ∞
    > lower bound: 96 + 0 = 96

* without arc 3-5 （matrix 同 with arc 6-7）
    > lower bound: 96 + 1 + 17 = 114

### 第四題
```python
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root is None:
            return None

        val = root.val
        left = self.invertTree(root.right)
        right = self.invertTree(root.left)

        return TreeNode(val, left, right)
```

* 題目連結：[226. Invert Binary Tree - LeetCode](https://leetcode.com/problems/invert-binary-tree/)
* LeetCode 執行結果： ![demo](/images/leetcode_226_result.png)
* 語言：Python
* 花費時間：5 分鐘
* 完成程度：自己想
* 其他：滿直覺的想法，用 `DC` 然後把 `left` 跟 `right` 互換，若發現節點是 `leaf` 的 left 或 right 就回傳 `None` 終止。

### 延伸練習
#### 找出第 k 小的值
```python
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []

        def goDeeper(root):
            if root is None:
                return None

            val = root.val
            left = goDeeper(root.left)

            stack.append(val)
            if len(stack) == k:
                return None

            right = goDeeper(root.right)

            return None

        goDeeper(root)
        return stack[k - 1]
```

* 題目連結：[230. Kth Smallest Element in a BST - LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
* LeetCode 執行結果： ![demo](/images/leetcode_230_result.png)
* 語言：Python
* 花費時間：20 分鐘
* 完成程度：看完四個提示
* 其他：使用中序依序把當前最小值加入 `stack` 裡面，然後 `stack` 大小為 `k` 時，就終止程式，最後 `stack[k - 1]` 就會是答案了！（k 是 1-indexed）

---

#### 二元樹中序遍歷
```python
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        answer = []
        def traversal(root):
            if root is None:
                return None

            traversal(root.left)
            answer.append(root.val)
            traversal(root.right)

            return None

        traversal(root)
        return answer
```


* 題目連結：[94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
* LeetCode 執行結果： ![demo](/images/leetcode_94_result.png)
* 語言：Python
* 花費時間：5 分鐘
* 完成程度：自己想
* 其他：一樣用 `DC` 遍歷，然後因為是中序，所以在 `traversal` 左右邊的中間把 `val` 加入到 `answer`，最後回傳 `answer`。

### 本週心得
這次作業光是畫圖就要花好多時間了，真佩服想出這些演算法的人！

考量到大家的壓力，所以這次作業只剩一題，個人覺得有點少，就自己找來做幾題了！

### 參考
* [作業連結](https://hackmd.io/@wang1234/BJh_PEZLc)
* [Algo-Ch5-TreeSearching](https://www.youtube.com/watch?v=VkUY6kwaI4M)
* [Ch5-Branch-and-Bound介紹](https://www.youtube.com/watch?v=YPQlZ-TYhko)
* [Algo-Ch5-PersonalAssignment](https://www.youtube.com/watch?v=bjOqPLNSXbI)
* [Algo-Ch5-TSP](https://www.youtube.com/watch?v=UiZ2h-jHAQA)
