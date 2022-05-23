---
title: "[作業] 演算法 week 11"
date: 2022-05-23T20:39:16+08:00
author: "CPP"
draft: false
tags: [NCYU, Algorithm, Homework, Python]
summary: "國立嘉義大學演算法作業，可觀摩但請勿抄襲。"
---

## 演算法作業 week 11
### 第一題
* 題目
    ![demo](https://i.imgur.com/qnzsIEZ.png)

* Forward Approach
    > d(1, 12) = min{
        9 + d(2, 12),
        7 + d(3, 12),
        3 + d(4, 12),
        2 + d(5, 12)
    }

    > d(2, 12) = min{
        4 + d(6, 12),
        2 + d(7, 12),
        1 + d(8, 12)
    }

    > d(6, 12) = min{
        6 + d(9, 12),
        5 + d(10, 12),
    }

    > d(9, 12) = 4\
    > d(10, 12) = 2\
    > d(6, 12) = min{6 + 4, 5 + 2} = 7

    > d(7, 12) = min{
        4 + d(9, 12),
        3 + d(10, 12)
    }\
    > d(7, 12) = min{4 + 4, 3 + 2} = 6

    > d(8, 12) = min{
        5 + d(10, 12),
        6 + d(11, 12)
    }\

    > d(11, 12) = 6\
    > d(8, 12) = min{5 + 2, 6 + 6} = 7\
    > d(2, 12) = min{4 + 7, 2 + 6, 1 + 7} = 8

    > d(3, 12) = min{
        2 + d(6, 12),
        7 + d(7, 12)
    }\
    > d(3, 12) = {2 + 7, 7 + 6} = 9

    > d(4, 12) = min{
        11 + d(8, 12)
    }\
    > d(4, 12) = min{11 + 7} = 18

    > d(5, 12) = min{
        11 + d(7, 12),
        8 + d(8, 12)
    }\
    > d(5, 12) = min{11 + 6, 8 + 7} = 15\

    > d(1, 12) = min{
        9 + 8,
        7 + 9,
        3 + 18,
        2 + 15
    }\
    > d(1, 12) = 16

* Backward Approach
    > d(1, 12) = min{
        d(1, 9) + 4,
        d(1, 10) + 2,
        d(1, 11) + 6
    }

    > d(1, 9) = min{
        d(1, 6) + 6,
        d(1, 7) + 4
    }

    > d(1, 6) = min{
        d(1, 2) + 4,
        d(1, 3) + 2
    }

    > d(1, 2) = 9\
    > d(1, 3) = 7\
    > d(1, 6) = min{9 + 4, 7 + 2} = 9

    > d(1, 7) = min{
        d(1, 2) + 2,
        d(1, 3) + 7,
        d(1, 5) + 11
    }

    > d(1, 5) = 2\
    > d(1, 7) = min{9 + 2, 7 + 7, 2 + 11} = 11

    > d(1, 9) = min{9 + 6, 11 + 4} = 15

    > d(1, 10) = min{
        d(1, 6) + 5,
        d(1, 7) + 3,
        d(1, 8) + 5
    }

    > d(1, 8) = min{
        d(1, 2) + 1,
        d(1, 4) + 11,
        d(1, 5) + 8
    }

    > d(1, 4) = 3\
    > d(1, 8) = min{
        9 + 1,
        3 + 11,
        2 + 8
    } = 10\
    > d(1, 10) = min{
        9 + 5,
        11 + 3,
        10 + 5
    } = 14

    > d(1, 11) = min{
        d(1, 8) + 6
    }\
    > d(1, 11) = min{10 + 6} = 16

    > d(1, 12) = min{
        15 + 4,
        14 + 2,
        16 + 6
    } = 16

* 最短路徑
    > 1 > 3 > 6 > 10 > 12

### 第二題
```python
class Solution:
    def countSquares(self, matrix: List[List[int]]) -> int:
        answer = sum(matrix[0])
        for y in range(1, len(matrix)):
            for x in range(1, len(matrix[0])):
                if matrix[y][x] == 1:
                    matrix[y][x] = min(
                        matrix[y - 1][x - 1],
                        matrix[y - 1][x],
                        matrix[y][x - 1]
                    ) + 1

            answer += sum(matrix[y])

        return answer
```

* 題目連結：[1277. Count Square Submatrices with All Ones - LeetCode](https://leetcode.com/problems/count-square-submatrices-with-all-ones/)
* LeetCode 執行結果： ![demo](/images/leetcode_1277_result.png)
* 語言：Python
* 花費時間：30 分鐘
* 完成程度：參考別人
* 其他：從第一列開始往 `左`、`上`、`左上` 找最小值並且 `+1`（若都是 `1`，則可以形成一個正方形），
一列算完之後，用 `sum()` 把它加總就是從那列為起點可行成正方形的數量。

### 第三題
```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        answer = []

        def backtrace(left: int, right: int, temp: str):
            if left == right == n:
                answer.append("".join(temp))
                return

            if left < n:
                temp.append('(')
                backtrace(left + 1, right, temp)
                temp.pop()

            if right < left:
                temp.append(')')
                backtrace(left, right + 1, temp)
                temp.pop()

        backtrace(0, 0, [])

        return answer
```

* 題目連結：[22. Generate Parentheses - LeetCode](https://leetcode.com/problems/generate-parentheses/)
* LeetCode 執行結果： ![demo](/images/leetcode_22_result_with_backtrace.png)
* 語言：Python
* 花費時間：30 分鐘
* 完成程度：參考別人
* 其他：使用 `backtrace` 的方式解，操控的變數是 `left` 跟 `right`，代表的是 `(` 的數量 `)`，
當 `left` 跟 `right` 都是 `n` 的話，代表產生完成，把它加入到 `answer`（因為 `append()` 是把字串加入陣列，所以要用 `"".join()` 把 `temp` 這個陣列轉成字串）。規則的話就是先加入 `(`，再加入 `)`，右括號的數量不能大於左括號的數量，這樣就不會配對成功了。會想用 `backtrace` 的方式解是因為很像 `permutaion` 的問題。

    * C++ number permutation code snippet
    ```c++
    void backtrack(int n) {
        if (n == NUMBER) {
            print();
            return ;
        }

        for (int i=0;i<NUMBER;i++) {
            if (!used[i]) {
                used[i] = true;
                a[n] = i + 1;
                // cout << n << " " << i << " " << used[i] << endl;
                backtrack(n+1);
                used[i] = false;
            }
        }
    }
    ```

### 第四題
```python
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        answer = []
        for row in range(numRows):
            new_row = []
            for col in range(row + 1):
                if col == 0 or col == row:
                    new_row.append(1)
                else:
                    new_row.append(
                        answer[row - 1][col]
                        + answer[row - 1][col - 1]
                    )

            answer.append(new_row)

        return answer
```

* 題目連結：[118. Pascal's Triangle - LeetCode](https://leetcode.com/problems/pascals-triangle/)
* LeetCode 執行結果： ![demo](/images/leetcode_118_result.png)
* 語言：Python
* 花費時間：10 分鐘
* 完成程度：自己想
* 其他：新的一列從上一列的兩項相加。嗯，就是 `DP`。

### 本週心得
這週教了 `DP`，個人覺得這個演算法是最吃天份跟練習的，像是高中在學 `permutation` 的時候是完全看不懂！
大一在 `code review` 的時候才能理解，能想到這些方法的人真的很厲害！ 
