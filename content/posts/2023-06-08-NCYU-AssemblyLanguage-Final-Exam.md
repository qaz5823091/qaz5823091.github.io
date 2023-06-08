---
title: "[期末] AssemblyLanguage Final Exam"
date: 2023-06-08T20:25:00+08:00
author: "CPP"
tags: [NCYU, Assembly, Homework, FinalExam]
summary: "國立嘉義大學組合語言與實習期末考題。"
---

# 組語期末上機考

## 第一題
**輸入兩個 32-bit 正整數，輸出其最小公倍數。**
### Code
```asm=
TITLE fe1.asm
include Irvine32.inc

.data
    prompt1 BYTE "Enter the first number: ", 0
    prompt2 BYTE "Enter the second number: ", 0
    result BYTE  "The least common multiple is: ", 0
    newline BYTE 10, 0

.data?
    num1 DWORD ?
    num2 DWORD ?

.code
main PROC
    ; Print prompt for first number
    mov edx, OFFSET prompt1
    call WriteString

    ; Read first number from user
    call ReadInt
    mov num1, eax


    ; Print prompt for second number
    mov edx, OFFSET prompt2
    call WriteString

    ; Read second number from user
    call ReadInt
    mov num2, eax

    ; Find the greatest common divisor (GCD)
    mov eax, num1
    mov ebx, num2

    call gcd

    ; Calculate the least common multiple (LCM)
    mov ecx, eax
    mov eax, num1
    mov ebx, num2
    mul ebx
    div ecx

    ; Print the result
    mov edx, OFFSET result
    call WriteString
    call WriteInt

    ; Print a newline
    mov edx, OFFSET newline
    call WriteString

    call Crlf

    ; Exit the program
    exit
main ENDP

gcd PROC
    ; Euclidean algorithm to find the GCD
    cmp eax, ebx
    jz done
    jb swap
    sub eax, ebx
    jmp gcd

swap:
    xchg eax, ebx
    jmp gcd

done:
    ret
gcd ENDP

END main
```

### 結果
![](https://hackmd.io/_uploads/HJVBnRS8h.png)


## 第二題
**輸入一個日期，輸出那天星期幾。**
### Code
```asm=
TITLE fe2.asm
include Irvine32.inc

.data
    prompt BYTE "Please type data in format (yyyy/mm/dd): ", 0
    weekday BYTE "The day is ", 0
    newline BYTE 10, 0
    inputDate BYTE 11 DUP(?)     ; 存儲輸入的日期字串
    weeks   BYTE "Sunday   ", 0
	    BYTE "Monday   ", 0
	    BYTE "Tuesday  ", 0
	    BYTE "Wednesday", 0
	    BYTE "Thursday ", 0
	    BYTE "Friday   ", 0
	    BYTE "Saturday ", 0
    offsetValue DWORD 10

.code
main PROC
    ; Print prompt for date
    mov edx, OFFSET prompt
    call WriteString

    ; Read date from user
    mov ecx, 11        ; Buffer size (including null terminator)
    mov edx, OFFSET inputDate
    call ReadString

    ; Extract year, month, and day
    mov esi, OFFSET inputDate     ; Offset of the input date string
    call ParseDate

    ; Adjust month and year for Zeller's congruence
    sub ebx, 3
    jz adjust_year
    sub ebx, 12
    inc eax

adjust_year:
    cmp ebx, 0
    jl adjust_year

    ; Calculate Zeller's congruence
    mov edx, eax
    mov eax, 1
    mov ecx, ebx
    mov ebx, 2
    mov esi, 20
    call ZellersCongruence

    ; Map the weekday to its corresponding name
    mov edx, OFFSET weekday
    cmp eax, 0
    je sunday
    cmp eax, 1
    je monday
    cmp eax, 2
    je tuesday
    cmp eax, 3
    je wednesday
    cmp eax, 4
    je thursday
    cmp eax, 5
    je friday
    cmp eax, 6
    je saturday

sunday:
    mov ebx, 0
    jmp print_weekday

monday:
    mov ebx, 1
    jmp print_weekday

tuesday:
    mov ebx, 2
    jmp print_weekday

wednesday:
    mov ebx, 3
    jmp print_weekday

thursday:
    mov ebx, 4
    jmp print_weekday

friday:
    mov ebx, 5
    jmp print_weekday

saturday:
    mov ebx, 6

print_weekday:
    mov edx, OFFSET weekday
    call WriteString

    ; Print the weekday
    mov esi, OFFSET weeks
    mov eax, offsetValue
    mul ebx
    add esi, eax
    mov edx, esi
    call WriteString

    ; Print a newline
    mov edx, OFFSET newline

    call WriteString
    exit
main ENDP

ParseDate PROC
    ; Parses the input date string in the format "yyyy/mm/dd"
    ; Input: esi = offset of the input string
    ; Output: eax = year, ebx = month, ecx = day

    movzx eax, byte ptr [esi]     ; Extract the first digit of the year (thousands place)
    imul eax, eax, 1000
    inc esi

    movzx ebx, byte ptr [esi]     ; Extract the second digit of the year (hundreds place)
    imul ebx, ebx, 100
    inc esi

    movzx edx, byte ptr [esi]     ; Extract the third digit of the year (tens place)
    imul edx, edx, 10
    inc esi

    movzx ecx, byte ptr [esi]     ; Extract the fourth digit of the year (ones place)
    add eax, ebx                  ; Combine all four digits to form the year

    add eax, edx                  ; Combine the tens and ones place of the month
    inc esi

    movzx ebx, byte ptr [esi]     ; Extract the hundreds place of the month
    imul ebx, ebx, 10
    inc esi

    movzx edx, byte ptr [esi]     ; Extract the ones place of the month
    add eax, ebx                  ; Combine the hundreds and tens place to form the month
    add eax, edx                  ; Combine all digits to form the month

    add esi, 2                    ; Skip the slash (/)

    movzx ebx, byte ptr [esi]     ; Extract the tens place of the day
    imul ebx, ebx, 10
    inc esi

    movzx edx, byte ptr [esi]     ; Extract the ones place of the day
    add ecx, ebx                  ; Combine the tens and ones place to form the day
    add ecx, edx                  ; Combine all digits to form the day

    ret
ParseDate ENDP

ZellersCongruence PROC
    ; Zeller's Congruence algorithm to calculate the weekday
    ; Inputs: eax = day of the month (1-31), ebx = adjusted month (1-12), ecx = adjusted year, esi = century value (e.g., 20 for 2020)
    ; Outputs: eax = weekday (0-6, 0 = Saturday, 1 = Sunday, ..., 6 = Friday)
    mov edx, eax
    mov eax, ecx
    mov ecx, ebx

    ; Zeller's Congruence formula: h = (q + (13*(m+1))/5 + K + K/4 + J/4 - 2*J) mod 7
    mov edx, 13
    mul ecx                     ; edx:eax = ecx * 13
    add eax, edx                ; eax = eax + edx = ecx * 13 + edx
    add eax, esi                ; eax = eax + esi = ecx * 13 + edx + esi
    add eax, ecx                ; eax = eax + ecx = ecx * 13 + edx + esi + ecx
    shr eax, 2                  ; eax = eax / 4 = (ecx * 13 + edx + esi + ecx) / 4
    add eax, edx                ; eax = eax + edx = (ecx * 13 + edx + esi + ecx) / 4 + edx
    shr eax, 2                  ; eax = eax / 4 = (ecx * 13 + edx + esi + ecx) / 4 + edx / 4
    sub eax, edx                ; eax = eax - edx = (ecx * 13 + edx + esi + ecx) / 4 + edx / 4 - edx
    add eax, ecx                ; eax = eax + ecx = (ecx * 13 + edx + esi + ecx) / 4 + edx / 4 - edx + ecx
    and eax, 7                  ; eax = eax % 7 = (ecx * 13 + edx + esi + ecx) / 4 + edx / 4 - edx + ecx % 7

    ret
ZellersCongruence ENDP

END main
```
### 結果
![](https://hackmd.io/_uploads/ry2KtyIIh.png)


## 第三題
**輸入一個正整數，輸出所有比它小的質數。**
### Code
```asm=
TITLE fe3.asm
INCLUDE Irvine32.inc

.data
prompt BYTE "Please type an integer:", 0
output BYTE "Primes smaller than input:", 0
newline BYTE 0DH, 0AH, 0
input  DWORD ?
temp   DWORD ?

.code
main PROC
    mov edx, OFFSET prompt
    call WriteString        ; 印出提示訊息

    call ReadInt
    mov input, eax
    mov ebx, input

    mov ecx, input            ; 將輸入的整數儲存到 ecx 寄存器
    mov eax, 2              ; eax = 2 (第一個質數)

    cmp ecx, eax            ; 比較輸入的整數與 2 的大小
    jle done                ; 如果輸入的整數小於或等於 2，則直接跳出程式

    mov edx, OFFSET output
    call WriteString        ; 印出 "質數：" 字串

    mov temp, 0
    print_loop:
        call WriteInt       ; 印出質數

    next_number:
        inc eax             ; 目前的質數加 1
        mov temp, eax
        cmp eax, input        ; 比較目前的質數與輸入的整數的大小
        jg done             ; 如果目前的質數大於輸入的整數，則跳出迴圈

        mov ebx, 2      ; ebx = 2 (除數)
        is_prime:
            mov edx, 0      ; edx = 0 (除數是否整除的標誌)

        div_check:
            div ebx     ; eax / ebx，商存在 eax，餘數存在 edx
            mov eax, temp
            cmp edx, 0  ; 判斷是否整除
            je next_number ; 如果整除，則不是質數

            inc ebx     ; 除數加 1
            cmp ebx, eax; 比較除數與目前的質數的大小
            je print_loop ; 如果除數大於目前的質數，則目前的質數是質數

            jmp is_prime ; 目前的質數不是質數，繼續找下一個

    done:
        call Crlf          ; 換行
        exit
main ENDP
END main
```

### 結果
![](https://hackmd.io/_uploads/SkKHEGIIh.png)


## 第四題
**寫一個計算機，可以計算輸入運算式結果，支援 + - * / ( )，如 2+4-6\*2 = -6。**
### Code
### 結果

## 第五題
**修改 TSR 的 Clock2.asm 或 Clock3.asm 不出現時間  改出現 NCYUCSIE 開始由 N 出現後出現 C 再來出現 Y 一個字母一個字母出現 到 E 後又從 N 開始。**
### Code
### 結果

## 參考
* [[Masm] Assembly 筆記 - Ch5 程序](https://blog.xuite.net/asd.wang/alog/269353-%5BMasm%5D+Assembly+%E7%AD%86%E8%A8%98+-+Ch5+%E7%A8%8B%E5%BA%8F)