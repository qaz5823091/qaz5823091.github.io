---
title: "[作業] 演算法 week 8"
date: 2022-05-03T00:12:15+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## 演算法作業 week 8
### 第一題
![demo](/images/vd.gif)

* Voronoi Diagram 步驟
    1. 找出兩邊的 `convex hull`
    2. 合併，並找出新增的兩組點（ (P1, P5), (P2, P6) ），作為畫中垂線的起點、終點
    3. 開始畫兩點的中垂線，延伸至原本 `convex hull` 形成的圖形（綠線）
    4. 重複 `3` ，直到畫到終點

### 第二題
* 請說明 The Euclidean all nearest neighbor problem 為何，以及如何應用VD來解此問題？
    > * 平面上有 n 個點，找出此平面上所有的 `closest pair`
    > * 使用 VD 性質，兩個臨近的點會共用 VD 所形成的邊
    > * 遍歷所有的邊，找出最短距離，這兩點就會是 `closest pair`

### 第三題
* 當輸入為：{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16}，請說明如何應用FFT得到結果(只須說明計算過程，不用算出結果)？
    > 1. 分成偶數堆與奇數堆 -> `{2, 4, 6, 8, 10, 12, 14, 16}` 與 `{1, 3, 5, 7, 9, 11, 13, 15}`
    > 2. 算 `{2, 4, 6, 8, 10, 12, 14, 16}` 的 DFT 值，但不直接算，而是先繼續拆偶數項與奇數項 `{2, 6, 10, 14}` 與 `{4, 8, 12, 16}`
    > 3. 把 `{2, 6, 10, 14}` 拆成 `{2, 10}` 與 `{6, 14}`，`{4, 8, 12, 16}` 同理拆開，這樣就可以算 DFT
    > 4. 把 `3` 的結果 merge 變成 `{2, 6, 10, 14}` 與 `{4, 8, 12, 16}` DFT 的結果，然後再把這兩個 merge 起來就會變成 `{2, 4, 6, 8, 10, 12, 14, 16}` 的 DFT 結果。
    > 5. 把數列換成 `{1, 3, 5, 7, 9, 11, 13, 15}` 然後回到 `2`
    > 6. 算出來的兩個 `{2, 4, 6, 8, 10, 12, 14, 16}` 與 `{1, 3, 5, 7, 9, 11, 13, 15}` 的 DFT 值再做一次 merge 就會是 `{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}` 的 DFT 值

### 第四題
```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not inorder:
            return None

        val = preorder[0]
        index = inorder.index(preorder[0])
        preorder.pop(0)
        left = self.buildTree(preorder, inorder[:index])
        right = self.buildTree(preorder, inorder[index + 1:])

        return TreeNode(val, left, right)
```

* 題目連結：[105. Construct Binary Tree from Preorder and Inorder Traversal - LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
* LeetCode 執行結果： ![demo](/images/leetcode_105_result.png)
* 語言：Python
* 花費時間：40 分鐘
* 完成程度：觀摩別人想法
* 其他：待補


### 第五題
```python
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        if not inorder or not postorder:
            return None

        val = postorder[-1]
        index = inorder.index(postorder[-1])
        right = self.buildTree(inorder[index + 1:], postorder[index:-1])
        left = self.buildTree(inorder[:index], postorder[:index])

        return TreeNode(val, left, right)
```

* 題目連結：[106. Construct Binary Tree from Inorder and Postorder Traversal - LeetCode](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
* LeetCode 執行結果： ![demo](/images/leetcode_106_result.png)
* 語言：Python
* 花費時間：40 分鐘
* 完成程度：觀摩別人想法
* 其他：待補

### 延伸練習
```python
class Solution:
    def constructFromPrePost(self, preorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        if postorder:
            if len(postorder) == 1:
                return TreeNode(preorder.pop(0))

            val = preorder.pop(0)
            index = postorder.index(preorder[0])
            left = self.constructFromPrePost(preorder, postorder[:index + 1])
            right = self.constructFromPrePost(preorder, postorder[index + 1: -1])

            return TreeNode(val, left, right)
```

* 題目連結：[889. Construct Binary Tree from Preorder and Postorder Traversal - LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)
* LeetCode 執行結果： ![demo](/images/leetcode_889_result.png)
* 語言：Python
* 花費時間：40 分鐘
* 完成程度：觀摩別人想法
* 其他：待補

### 本週心得
這次教的演算法滿酷的，是之前都沒有接觸過得，而且還可以在生活中找到一些演算法的足跡！

### 參考
* [allenlin316 - Github](https://github.com/allenlin316)
