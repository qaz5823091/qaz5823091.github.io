---
title: "[作業] 演算法 week 1"
date: 2022-02-18T21:01:40+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## 演算法作業 Week1

### 第一題
* [教學影片](https://www.youtube.com/watch?v=52eRysOaP1c)
* NP-Complete：Nondeterministic Polynomial-time Complete
* 影片中提到：
    - 0/1 Knapsack problem （旅客背包問題）
    - Traveling salesperson problem （旅行推銷員問題）
    - Partition problem （分割問題）
    - Art gallery problem （美術館問題）

### 第二題
* SAT problem（boolean SATisfiability problem）
    - 給定一組布林函數，是否能找出一組變數賦值能使結果為真
    - 應用：給定一電路，是否存在一組 input 使其 output `True`
    - 其他：3-SAT problem
    - 參考：[(一) SAT problem 介紹](https://willyc20.github.io/2016/12/17/sat-problem-1/)

* GCP （Graph Coloring Problem）
    - 著色問題

* ECP （Exact Cover Problem）
    - 完全覆蓋問題（有點像 Partition problem）
    - 給定數個子集，將數個子集聯集，得到特定集合
    - 參考 & 應用：[Day29 -- Sudoku - Algorithm X](https://ithelp.ithome.com.tw/articles/10249684)

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
> **Note :** Python 的整數除法為 `//`

* 題目連結：[704. Binary Search - LeetCode](https://leetcode.com/problems/binary-search/)
* LeetCode 執行結果： ![demo](/images/binary_search_result_with_leetcode.png)
* 語言：Python
* 花費時間：15 分鐘
* 完成程度：完全靠自己
* 其他：[C++ 遞迴版本]({{< ref "2021-01-08-Algorithm-BinarySearch" >}} "[Algorithm] 二分搜尋法")


### 第三題
```Python=
def search(nums, target) -> int:
	left, right = 0, len(nums) - 1
	answer = -1

	while left <= right:
		middle = (left + right) // 2
		if target > nums[middle]:
			left = middle + 1
		elif target == nums[middle]:
			answer = middle
			right = middle - 1
		else:
			right = middle - 1

	return answer

for _ in range(3):
	l = list(map(int, input().split()))
	t = int(input())
	print("Smallest index at:", search(l, t))
```

* 執行結果： ![demo](/images/binary_search_result_with_input_and_output.png)
* 語言：Python
* 花費時間：5 分鐘
* 完成程度：完全靠自己
* 想法：即使找到了，還是繼續找。因為最小的 `index` 一定在左邊，所以要把 `right` 往左調整。
    > **Note :** 要找最大的 `index`，就把 `left` 向右調整

### 第四題
```Python=
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1

        while left <= right:
            middle = (left + right) // 2

            if target > nums[middle]:
                left = middle + 1
            elif target == nums[middle]:
                return middle
            else:
                right = middle - 1

        return left
```

* 題目連結：[35. Search Insert Position - LeetCode](https://leetcode.com/problems/search-insert-position/)
* 執行結果： ![demo](/images/binary_search_insert_result.png)
* 語言：Python
* 花費時間：體感 90 分鐘
* 完成程度：上網找答案（[參考](https://leetcode.com/problems/search-insert-position/discuss/1785791/Easiest-JAVA-Solution-100-faster)）
* 想法：如果 `target` 有在 `nums` 裡面，直接回傳 `middle` ; 如果不在 `nums`，肯定在最後的 `left`
    > **Note :** 關鍵是最後還是找不到的話 `left` 跟 `right` 會重疊

### 第五題
```Python=
class Solution:
    def firstBadVersion(self, n: int) -> int:
        left, right = 1, n
        answer = -1
        while left <= right:
            middle = (left + right) // 2
            if isBadVersion(middle):
                answer = middle
                right = middle - 1
            else:
                left = middle + 1

        return answer
```

* 題目連結：[278. First Bad Version - LeetCode](https://leetcode.com/problems/first-bad-version/)
* 執行結果： ![demo](/images/binary_search_application_result.png)
* 語言：Python
* 花費時間：5 分鐘
* 完成程度：完全靠自己
* 想法：想成[第三題](#第三題)的特化版，加上結果是 `True` 往左找，`False` 則往右找。

### 第六題
```Python=
def findSquareRootByInteger(number) -> int:
	if number == 1:
		return 1
	if number < 1:
		return -1

	left, right = 1, number
	answer = -1
	while left <= right:
		middle = (left + right) // 2
		square = middle * middle
		if number < square:
			answer = middle
			right = middle - 1
		else:
			left = middle + 1

	return answer - 1

for _ in range(5):
	number = input('Number: ')
	number = int(number)
	print('Result: ', findSquareRootByInteger(number))
```

* 執行結果： ![demo](/images/find_square_root_by_binary_search.png)
* 語言：Python
* 花費時間：15 分鐘
* 完成程度：完全靠自己
* 想法：想成[第五題](#第五題)的特化版，找第一個整數平方超過目標數字的整數，往左邊找一個就是答案了。
    > **Note :** target = 7, f(1) = false, f(2) = false, f(3) = true, 2 即為所求。

### 本週心得
首先！真的是滿喜歡老師快轉的聲音😂  
老師教學很用心，會循循善誘得引導大家思考，並用一些生活例子來驗證這理論的正確性與效率。
而且教材都放在 `hackmd` ，大家容易觀看，我從大一就在推 hackmd 的共筆，
希望能藉由老師的推廣，讓大家善加利用這個工具。  
至於適應程度，之前為了幫助同學學習程式就有做過筆記了，只是做到後面沒有動力，就不了了之，
剛好這次課程要做足筆記，也算是監督我寫 blog ，一舉兩得！

### 程式碼
上述的程式碼都在 [Github](https://github.com/qaz5823091/NCYU_Algorithm) 找得到！
