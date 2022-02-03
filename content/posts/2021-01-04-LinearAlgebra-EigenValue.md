---
title: "[Python] 特徵值"
date: 2021-01-04T20:21:00+08:00
categories: [jekyll]
tags: [Python,NCYU]
---
我只解出一元二次、三次方程式 . . . 我好爛 <br>


```python
import math as math

def toFactor(matrix) :
    length = len(matrix)

    if length == 4 :
        a, b = matrix[0], matrix[1]
        c, d = matrix[2], matrix[3]

        A = 1
        B = (a+d) * (-1)
        C = a*d - b*c

        return A,B,C

    if length == 9 :
        a, b, c = matrix[0], matrix[1], matrix[2]
        d, f, g = matrix[3], matrix[4], matrix[5]
        h, j, l = matrix[6], matrix[7], matrix[8]


        A = 1
        B = - a - f - l
        C = - b*d + a*f - c*h - g*j + a*l + f*l
        D = c*f*h + b*g*h + c*d*j + a*g*j + b*d*l - a*f*l

        return A,B,C,D

    if length == 16 :
        a, b, c, d = matrix[0], matrix[1], matrix[2], matrix[3]
        f, g, h, j = matrix[4], matrix[5], matrix[6], matrix[7]
        l, m, o, p = matrix[8], matrix[9], matrix[10], matrix[11]
        q, r, s, t = matrix[12], matrix[13], matrix[14], matrix[15]

        A = 1
        B = - a - g - o - t
        C = - b*f + a*g - c*l - h*m + a*o + g*o - d*q - j*r - p*s + a*t + g*t + o*t
        D = ( c*g*l - b*h*l - c*f*m + a*h*m + b*f*o - a*g*o + d*g*q - b*j*q + d*o*q - c*p*q - d*f*r + a*j*r + j*o*r - h*p*r - d*l*s - j*m*s + a*p*s + g*p*s + b*f*t - a*g*t + c*l*t + h*m*t - a*o*t - g*o*t)
        E = (d*h*m*q - c*j*m*q - d*g*o*q + b*j*o*q
            + c*g*p*q - b*h*p*q - d*h*l*r + c*j*l*r
            + d*f*o*r - a*j*o*r - c*f*p*r + a*h*p*r
            + d*g*l*s - b*j*l*s - d*f*m*s + a*j*m*s
            + b*f*p*s - a*g*p*s - c*g*l*t + b*h*l*t
            + c*f*m*t - a*h*m*t - b*f*o*t + a*g*o*t)

        return A,B,C,D,E

def solveFunction(f) :
    length = len(f)

    if length == 3 :
        A, B, C = f[0],f[1],f[2]

        x1 = ( -B + (B*B - 4*A*C)**(1/2)) / (2*A)
        x2 = ( -B - (B*B - 4*A*C)**(1/2)) / (2*A)

        return x1,x2

    if length == 4 :
        A, B, C, D = f[0], f[1], f[2], f[3]

        p =  ( -(B*B) / (3*A*A) ) + (C/A)
        q = ( (2*B*B*B) / (27*A*A*A) ) - ((B*C) / (3*A*A)) + (D/A)
        w = complex(-1,3**(1/2)) / 2

        U = (-q / 2) + ( ( ( q / 2 )**2 + ( p / 3 )**3 )**(1/2) )
        V = (-q / 2) - ( ( ( q / 2 )**2 + ( p / 3 )**3 )**(1/2) )

        if U > 0 :
            U =  math.pow(U,float(1)/3)
        elif U < 0 :
            U = -math.pow(abs(U),float(1)/3)
        else :
            U = 0

        if V > 0 :
            V =  math.pow(V,float(1)/3)
        elif V < 0 :
            V = -math.pow(abs(V),float(1)/3)
        else :
            V = 0

        x1 = U + V - (B/(3*A))
        x2 = U*w + V*w*w - (B/(3*A))
        x3 = U*w*w + V*w - (B/(3*A))

        return x1,x2,x3

    if length == 5 :
        A, B, C, D, E = f[0], f[1], f[2], f[3], f[4]

        p1 = 2*C*C*C - 9*B*C*D + 27*A*D*D + 27*B*B*E - 72*A*C*E
        p2 = p1 + ( -4*((C*C - 3*B*D + 12*A*E)**3) + (p1)**2 )**(1/2)
        print(p2)
        p3 = (C*C - 3*B*D + 12*A*E) / (3*A)*(math.pow(p2, float(1)/3) / 2) + math.pow(p2, float(1)/3) / 2 / (3*A)
        p4 = ( (B*B)/(4*A*A) - (2*C)/(3*A) + p3 )**(1/2)
        p5 = (B*B)/(2*A*A) - (4*C)/(3*A) - p3
        p6 = ( -(B*B*B)/(A*A*A) + (4*B*C)/(A*A) - (8*D)/A ) / (4*p4)

        x1 = - B/(4*A) - p4/2 - ( (p5-p6)**(1/2) ) / 2
        x2 = - B/(4*A) - p4/2 + ( (p5-p6)**(1/2) ) / 2
        x3 = - B/(4*A) + p4/2 - ( (p5+p6)**(1/2) ) / 2
        x4 = - B/(4*A) + p4/2 + ( (p5+p6)**(1/2) ) / 2

        '''
        a = B/A
        b = C/A
        c = D/A
        d = E/A

        # 1 -7 12 4 -16
        p = b - (3*a*a)/8
        q = c - (a*b)/2 + (a*a*a)/8
        r = d - (a*c)/4 - (a*a*b)/16 - (3*a*a*a*a)/256

        print(p,q,r)
        zDer = [1, -p, -4*r, (4*p*r-q*q)]
        print(zDer)
        z1,z2,z3 = solveFunction(zDer)

        if z1.imag == 0 :
            z = z1
        if z2.imag == 0 :
            z = z2
        if z3.imag == 0 :
            z = z3
        print(z1,z2,z3)
        print(z)
        yDerPositive = [1, (z-p)**(1/2),- ( (q*((z-p)**(1/2))) / (2*(z-p)) ) + z/2]
        yDerNegative = [1, -((z-p)**(1/2)),- ( (q*((z-p)**(1/2))) / (2*(z-p)) ) + z/2]
        y1, y2 = solveFunction(yDerPositive)
        y3, y4 = solveFunction(yDerNegative)

        x1 = y1 - a/4
        x2 = y2 - a/4
        x3 = y3 - a/4
        x4 = y4 - a/4
        '''
        return x1,x2,x3,x4

'''
number = [1,-7,12,4,16]
'''
number = [1,-7,12,4,16]
number = solveFunction(number)
print(number)
```


---
算惹，好課值得一修再修
