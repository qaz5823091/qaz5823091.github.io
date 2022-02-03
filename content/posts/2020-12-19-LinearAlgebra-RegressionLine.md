---
title: "[Python] 回歸線"
date: 2020-12-19T00:59:00+08:00
categories: [jekyll]
tags: [Python,NCYU]
---

「欸！你這題怎麽做？」<br><br>
程式電神曾經說過：「 copy and paste 」 <br><br>
「 . . . 」<br><br>

我謹記在心
<br>

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
    lengthRow = len(m)
    lengthCol = len(m[0])
    matrix = []
    for col in range(lengthCol) :
        newRow = []
        for row in range(lengthRow) :
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

    adjointMatrix = transpose(cofactorMatrix)

    # inverse
    matrix = []
    for row in range(length) :
        newRow = []
        for col in range(length) :
            result = det**(-1)*adjointMatrix[row][col]
            newRow.append(result)
        matrix.append(newRow)
    return matrix

def mutiple(matrixA, matrixB) :
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
                result += matrixA[row][inCol] * matrixB[inCol][col]
            newRow.append(result)
        matrix.append(newRow)

    return matrix


def changeBasis(basis, toBasis) :
    length = len(basis)
    inverseBasis = inverse(toBasis)
    matrix = matrixMutiple(inverseBasis,basis)
    return matrix

def makeOntoMatrix(lead, x) :
    matrix = []
    lengthRow = len(x)
    lengthCol = lead + 1
    for r in range(lengthRow) :
        newRow = []
        for c in range(lengthCol) :
            newRow.append(x[r]**(c))
        matrix.append(newRow)

    return matrix

def printLine(x) :
    length = len(x)
    print('y = ',end='')
    for i in range(length) :
        if i == 0 :
            print(f'%.2f' %x[i][0],end='')
        else :
            temp = float(x[i][0])
            if temp == 0.0 :
                continue
            if temp < 0 :
                print(f'-%.2f x^%d' %(abs(temp),i),end='')
            else :
                print(f'+%.2f x^%d' %(temp,i),end='')

    print()

def inputData() :
    lead = int(input())
    points = input().split()
    points = list(map(float,points))
    length = len(points)

    coordinateX = []
    coordinateY = []
    for i in range(length) :
        if i%2 == 0 :
            coordinateX.append(points[i])
        else :
            coordinateY.append(points[i])

    A = makeOntoMatrix(lead,coordinateX)
    AT = transpose(A)
    b = makeCoordinate(coordinateY)
    A = mutiple(AT,A)
    A = inverse(A)
    b = mutiple(AT,b)
    x = mutiple(A,b)

    printLine(x)

def main() :
    inputData()

main()
```
