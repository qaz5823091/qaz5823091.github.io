---
title: "[Python] 矩陣運算"
date: 2020-11-02T21:53:00+08:00
categories: [jekyll]
tags: [Python,NCYU]
---
因為 Linear Algebra 的 sheng 哥出題不手軟，<br>
所以就把矩陣的各種運算都寫好了！<br>
以免上機的時候腦袋卡住 . . .


行列式：
* 利用遞迴將陣列縮小，並算出行列式值
* 遞迴終點為 length==2 （二階行列式定義）
* 計算原理是 first row 計算
* 回傳：數字（number）

```python
def determinant(m) :
  length = len(m)
  if length > 2 :
    result = 0
    coe = []
    for i in range(length) :
      coe.append( (-1)**(i)*m[0][i] )
      matrix = []
      for j in range(1,length) :
        row = []
        for k in range(length) :
          if k != i :
            row.append(m[j][k])
        matrix.append(row)
      result += coe[i]*determinant(matrix)
    return result
  else :
    return m[0][0]*m[1][1]-m[1][0]*m[0][1]
```

轉置矩陣：
* 就是個轉置矩陣
* 注意陣列大小是 row , column 互換
* 回傳：二維陣列（two-dimensional list）

```python
def transpose(m) :
  row = len(m)
  col = len(m[0])
  matrix = []

  for i in range(col) :
    newRow = []
    for j in range(row) :
      newRow.append(m[j][i])
    matrix.append(newRow)

  return matrix
```

Minor：
* 計算陣列中指定位置的 minor
* 除了傳入陣列，還要傳入位置
* `if newRow :` 判斷 `newRow` 是否為空陣列
* 回傳：二維陣列（two-dimensional list）

```python
def minor(m,row,col) :
  length = len(m)
  matrix = []

  for i in range(length) :
    newRow = []
    for j in range(length) :
      if i!=row and j!=col :
        newRow.append(m[i][j])
    if newRow :
      matrix.append(newRow)

  return matrix
```

Cofactor：
* 配合 Minor 跟 determinant 計算出 Cofactor
* 回傳：二維陣列（two-dimensional list）

```python
def cofactor(m) :
  length = len(m)
  matrix = []

  for i in range(length) :
    newRow = []
    for j in range(length) :
      newRow.append( (-1)**(i+j)*determinant(minor(m,i,j)) )
    matrix.append(newRow)

  return matrix
```

伴隨矩陣：
* 利用 adjoint 的定義計算
* 先取陣列的 cofactor 再 transpose
* 回傳：二維陣列（two-dimensional list）

```python
def adjoint(m) :
  matrix = cofactor(m)
  matrix = transpose(matrix)

  return matrix
```

反矩陣：
* inverse 計算有兩種
* 一種是 `row operation`，另一種是 `adjoint` 跟 `determinant` 的組合，這裡使用後者
* 行列式值為零是沒被定義的，所以會回傳錯誤
* 回傳：字串（Error） OR 二維陣列（two-dimensional list）

```python
def inverse(m) :
  length = len(m)
  det = determinant(m)
  if det == 0 :
    return "Error"
  matrix = adjoint(m)

  for i in range(length) :
    for j in range(length) :
      matrix[i][j] *= (1/det)

  return matrix
```
<br>

完整程式碼：
```python
def determinant(m) :
  length = len(m)
  if length > 2 :
    result = 0
    coe = []
    for i in range(length) :
      coe.append( (-1)**(i)*m[0][i] )
      matrix = []
      for j in range(1,length) :
        row = []
        for k in range(length) :
          if k != i :
            row.append(m[j][k])
        matrix.append(row)
      result += coe[i]*determinant(matrix)
    return result
  else :
    return m[0][0]*m[1][1]-m[1][0]*m[0][1]

def transpose(m) :
  row = len(m)
  col = len(m[0])
  matrix = []

  for i in range(col) :
    newRow = []
    for j in range(row) :
      newRow.append(m[j][i])
    matrix.append(newRow)

  return matrix

def minor(m,row,col) :
  length = len(m)
  matrix = []

  for i in range(length) :
    newRow = []
    for j in range(length) :
      if i!=row and j!=col :
        newRow.append(m[i][j])
    if newRow :
      matrix.append(newRow)

  return matrix

def cofactor(m) :
  length = len(m)
  matrix = []

  for i in range(length) :
    newRow = []
    for j in range(length) :
      newRow.append( (-1)**(i+j)*determinant(minor(m,i,j)) )
    matrix.append(newRow)

  return matrix

def adjoint(m) :
  matrix = cofactor(m)
  matrix = transpose(matrix)

  return matrix

def inverse(m) :
  length = len(m)
  det = determinant(m)
  if det == 0 :
    return "Error"
  matrix = adjoint(m)

  for i in range(length) :
    for j in range(length) :
      matrix[i][j] *= (1/det)

  return matrix
```

測試：
```python
matrix = [
  [1,-1,0],
  [1,0,-1],
  [-6,2,3]
]


m = cofactor(matrix)
print(m)
m = adjoint(matrix)
print(m)
m = inverse(matrix)
print(m)
```

測試工具：<br>
* [陣列產生器](https://onlinemathtools.com/generate-random-matrix)
* [矩陣計算機](https://www.symbolab.com/solver/matrix-calculator)
