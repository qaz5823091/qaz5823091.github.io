---
title: "[Python] 轉移矩陣"
date: 2020-12-07T20:41:00+08:00
categories: [jekyll]
tags: [Python,NCYU]
---

<br>
sheng 又再刁難人了 . . . <br>
塊陶 R ！

#### 以功能來介紹：
* 將一維資料轉成二維矩陣 （ `makeMatrix` ）
* 將一維資料轉成一行的座標 （`makeCoordinate`）
* 轉換轉置矩陣 （ `transpose` ）
* 計算行列式 （ `determinant` ）
* 計算反矩陣 （ `inverse` ）
* 矩陣乘法 （ `matrixMutiple` ）
* 轉換基底 （ `changeBasis` ）

```python
def makeMatrix(m) :
    length = len(m)
    size = int( length**(1/2) )
    matrix = []
    for i in range(size) :
        newRow = []
        for j in range(size) :
            newRow.append(m[i*size+j])
        matrix.append(newRow)

    return matrix

def makeCoordinate(m) :
    length = len(m)
    matrix = []
    for row in range(length) :
        newRow = [m[row]]
        matrix.append(newRow)

    return matrix

def transpose(m) :
    length = len(m)
    matrix = []
    for col in range(length) :
        newRow = []
        for row in range(length) :
            newRow.append(m[row][col])
        matrix.append(newRow)

    return matrix

def determinant(m) :
    length = len(m)
    if length > 1 :
        result = 0
        for i in range(length) :
            matrix = []
            coe = (-1)**i*m[0][i]
            for row in range(1,length) :
                newRow = []
                for col in range(length) :
                    if col != i :
                        newRow.append(m[row][col])
                matrix.append(newRow)
            result += coe*determinant(matrix)
        return result
    else :
        return m[0][0]

def inverse(m) :
    det = determinant(m)
    if det == 0 :
        print('Error!')
        return

    # adjoint
    length = len(m)
    cofactorMatrix = []
    for row in range(length) :
        newRow = []
        for col in range(length) :
            minorMatrix = []
            for i in range(length) :
                minorRow = []
                for j in range(length) :
                    if row != i and col != j :
                        minorRow.append(m[i][j])
                if minorRow :
                    minorMatrix.append(minorRow)
            newRow.append((-1)**(row+col)*determinant(minorMatrix))
        cofactorMatrix.append(newRow)

    adjointMatrix = []
    for col in range(length) :
        newRow = []
        for row in range(length) :
            newRow.append(cofactorMatrix[row][col])
        adjointMatrix.append(newRow)

    # inverse
    matrix = []
    for row in range(length) :
        newRow = []
        for col in range(length) :
            result = round(det**(-1), 8)*adjointMatrix[row][col]
            newRow.append( round( result, 5 ) )
        matrix.append(newRow)
    return matrix

def matrixMutiple(matrixA, matrixB) :
    rowA = len(matrixA)
    colA = len(matrixA[0])
    rowB = len(matrixB)
    colB = len(matrixB[0])

    if colA != rowB :
        return 'Error'

    matrix = []
    for row in range(rowA) :
        newRow = []
        for col in range(colB) :
            result = 0
            for inCol in range(rowB) :
                result += round(matrixA[row][inCol] * matrixB[inCol][col], 8)
            newRow.append( round(result, 5))
        matrix.append(newRow)

    return matrix


def changeBasis(basis, toBasis) :
    length = len(basis)
    inverseBasis = inverse(toBasis)
    matrix = matrixMutiple(inverseBasis,basis)
    return matrix



def inputData() :
    matrixA = input().split()
    matrixA = list(map(float,matrixA))
    matrixA = makeMatrix(matrixA)
    matrixA = transpose(matrixA)
    coordinate = input().split()
    coordinate = list(map(float,coordinate))
    coordinate = makeCoordinate(coordinate)
    matrixB = input().split()
    matrixB = list(map(float,matrixB))
    matrixB = makeMatrix(matrixB)
    matrixB = transpose(matrixB)
    print(matrixA)
    print(coordinate)
    print(matrixB)
    transition = changeBasis(matrixA,matrixB)
    print(transition)
    result = matrixMutiple(transition,coordinate)
    print(result)




def main() :
    inputData()



main()
```
