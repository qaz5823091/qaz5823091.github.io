---
title: "[專題] 演算法白板題講解"
date: 2022-05-12T15:33:23+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## 演算法白板題講解
### 前言
這是演算法的期末報告，
要我們從 Leetcode 眾多題目中選出一題來講解，
並拍成影片上傳至 Youtube，
個人覺得這項作業超棒的！也很感謝老師的用心！

因為對於題目的類別沒什麼太大的想法，\
所以就選了專屬於自己數字的題目 `814. Binary Tree Pruning`。

* 題目連結：[814. Binary Tree Pruning - LeetCode](https://leetcode.com/problems/binary-tree-pruning/)
* LeetCode 執行結果： ![demo](/images/leetcode_814_result.png)
* 語言：Python
* 花費時間：快 1 小時
* 完成程度：自己想

### 題意
一開始還沒有看題目意思前，以為是上到這堂課後面的進度才會寫。（`Prune and Search`）
到後來看了一下題目的 `topic` 才發現跟現在上的東西一模一樣（`Tree Search Strategies`），真巧！

題目在第一段就點明了，要修剪（`prune`，意即移除）`root` 中不包含數字 `1` 的子樹。
> Given the `root` of a binary tree, return the same tree where every **subtree** (of the given tree) not containing a 1 has been removed.

以題目裡的範例一來解釋：
![demo](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/06/1028_2.png)
> 橘色的 `node` 為上一個藍色且數字為 `0` 的 node 的 `subtree`，並且不包含 `1`，所以橘色 `node` 應該要被修剪。\
> 至於藍色數字 `0` 的 `node` 因為有右下角值為 `1` 的 `node`，所以不該被修剪！

### 思考過程
#### 第一階段想法
一開始沒很瞭解題目的時候，最先的想法是有 `0` 的 `node` 就要被刪除，
但很明顯不太對，因為這樣範例一的結果，就會變成只剩 `[1]`。

#### 第二階段想法
從 `root` 到 `leaf`（這裡是關鍵）為一條路徑，把這個路徑存為一個 `list`，再去判斷這個 `list` 中是不是以 `1` 結尾，
若是以 `1` 結尾就符合我們修剪的規則；不是的話，就去修剪它。最後 `pop` 更新路徑。

但是 `list` 會變動，也無法判斷是否到 `leaf` 了。

#### 最終想法
不要那麼貪心，慢慢修剪（像範例二的圖，很明顯左子樹可以整個移除）
![demo](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/06/1028_1.png)

到 `leaf` 再判斷要不要修剪（DFS，Depth First Search，的精神），
若值是 `0` 就剪掉；不是的話就不要理它！
![demo](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/05/1028.png)
> 從範例三的圖可以看到 `leaf` 才做修剪的線索

### 程式碼
```python
class Solution:
    def pruneTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        def goDeeper(root):
            if root is None:
                return None

            val = root.val
            left = goDeeper(root.left)
            right = goDeeper(root.right)

            if left is None and right is None:
                if val == 0:
                    return None

            return TreeNode(val, left, right)

        return goDeeper(root)
```
* 特別注意的點
    1. 因為要到 `leaf` 才做判斷，而在程式上的 `leaf` 其實就是 `root` 的 `left` 跟 `right` 都是 `None`
    2. 因為先判斷 `left` 再判斷 `right`，`root node` 最後判斷，所以是後序法
    3. `root` 的 `val` 為 `0` 才回傳 `None`（`pruned`）
    4. 一開始是寫沒有回傳值的 `function`（像 C++ void function），想說是修改樹，沒有太大變動。但是後來發現無法修改 `root` 的值（`root = None`），才改回回傳 `TreeNode` 的 `function`。原程式碼如下：
    ```python
    class Solution:
        def pruneTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
            def goDeeper(root):
                if root is None:
                    return

                goDeeper(root.left)
                goDeeper(root.right)

                if root.left is None and root.right is None:
                    if root.val == 0:
                        root = None

            goDeeper(root)
            return root
    ```
    > 這個方法還沒找到問題出在哪

### 觀摩與學習
我的解法跟討論區的都差不多，若有看到其他特別的解法再來更新。\
又或是想到上面問題的解決方式，就來分享。

### 心得
記錄過程一直都是我很擅長的事，分享也是，
所以這次的作業滿簡單的，希望之後工作面試的白板題也能得心應手！
