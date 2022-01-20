---
title: APC机制
tags: 内核
categories: 技术



---

# APC机制

APC机制使耗时操作可以异步回调处理

<!-- more -->

线程是不能被“杀死”，“挂起”，“恢复”的，线程在执行的时候自己占据着CPU，别人怎么可能控制它呢？

如果说线程如果想“死”，**一定是自己执行代码把自己杀死**，不存在"他杀"这种情况！

如果要改变一个线程的行为该怎么办呢？

可以给他提供一个函数，让它自己去调用，这个函数就是**APC（Asyncroneus Procedure Call）**，即**异步过程调用**

## _KAPC_STATE

```c
kd> dt _KTHREAD
nt!_KTHREAD
	...
	   +0x034 ApcState         : _KAPC_STATE
	...
kd> dt _KAPC_STATE
nt!_KAPC_STATE
   +0x000 ApcListHead      : [2] _LIST_ENTRY//两个APC队列(分别是内核APC和用户APC)，存储着要给他提供的APC函数，在某个时刻线程会检查自己的APC链表执行。链表中的内容与当前地址一样则说明该链表为空
   +0x010 Process          : Ptr32 _KPROCESS//当前线程挂靠的进程的进程结构体地址
   +0x014 KernelApcInProgress : UChar//内核APC是否正在执行
   +0x015 KernelApcPending : UChar//是否有正在等待执行的内核APC
   +0x016 UserApcPending   : UChar//是否有正在等待执行的用户APC
```

- 用户APC：APC函数地址位于用户空间，在用户空间执行.
- 内核APC：APC函数地址位于内核空间，在内核空间执行.

**_KAPC**（详细解读在后面）

ApcListHead中存的就是_KAPC结构的地址

```c
kd> dt _kapc
nt!_KAPC
   +0x000 Type             : Int2B
   +0x002 Size             : Int2B
   +0x004 Spare0           : Uint4B
   +0x008 Thread           : Ptr32 _KTHREAD
   +0x00c ApcListEntry     : _LIST_ENTRY
   +0x014 KernelRoutine    : Ptr32     void 
   +0x018 RundownRoutine   : Ptr32     void 
   +0x01c NormalRoutine    : Ptr32     void //找到你提供的APC函数，并不完全等于APC函数的地址，后面会讲
   +0x020 NormalContext    : Ptr32 Void
   +0x024 SystemArgument1  : Ptr32 Void
   +0x028 SystemArgument2  : Ptr32 Void
   +0x02c ApcStateIndex    : Char
   +0x02d ApcMode          : Char
   +0x02e Inserted         : UChar
```

如果想让线程做什么事情，就给它的APC队列里面挂一个APC。 

![image-20211013171657971](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211013171657971.png)

![image-20211023213229559](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211023213229559.png)

![image-20211023213307816](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211023213307816.png)

## 什么时候执行APC中的函数？

- **KiServiceExit**函数：

  ​	这个函数是**系统调用，异常或中断返回用户空间的必经之路**。

- **KiDeliverApc**函数：

  ​	**负责执行APC函数**

总结：当系统调用，异常，中断的时候，都有机会调用KiDeliverApc函数执行APC函数。

## 备用APC队列

### _KTHREAD中APC相关成员

```c
kd> dt _KTHREAD
nt!_KTHREAD
   ...
   +0x02e Alerted          : [2] UChar//内核模式和用户模式apc是否为"已经被唤醒"
   +0x034 ApcState         : _KAPC_STATE//APC队列,挂靠的话就是挂靠进程相关的APC队列，若未挂靠就是所属进程相关的APC队列。总是标识线程当前使用的APC队列
   ...
   +0x138 ApcStatePointer  : [2] Ptr32 _KAPC_STATE//为了操作方便存在的指向APC队列和备用APC队列的指针数组（顺序看挂靠情况而定）
  ...
   +0x14c SavedApcState    : _KAPC_STATE//备用APC队列，挂靠的情景下是所属进程相关的APC队列
  ...
   +0x164 Alertable        : UChar//当前线程的apc是否可唤醒
   +0x165 ApcStateIndex    : UChar//标识当前线程处于什么状态：0-正常状态  1-挂靠状态  
   +0x166 ApcQueueable     : UChar//表示是否可以向线程的APC队列中插入APC（当线程正在执行退出的代码时，会将这个值设置为0，如果此时执行插入APC的代码(KeInsertQueueApc后面会讲)，在插入函数中会判断这个值的状态，如果为0，则插入失败）
  ...
```

### ApcStatePointer

为了操作方便，_KTHREAD结构体中定义了一个指针数组ApcStatePointer，长度为2

正常情况下：

- *ApcStatePointer[0]*  指向**ApcState**（里面存的是**所属进程**的APC队列）
- *ApcStatePointer[1]*  指向**SavedApcState**（里面存的是**挂靠进程**的APC队列）

挂靠情况下：

- *ApcStatePointer[0]*  指向**SavedApcState**（里面存的是**所属进程**的APC队列）
- *ApcStatePointer[1]*  指向**ApcState**（里面存的是**挂靠进程**的APC队列）

### SavedApcState的意义

线程APC队列中的APC函数都是与进程相关联的，具体点说：A进程的T线程中的所有APC函数，要访问的内存地址都是A进程的。

但线程是可以挂靠到其他的进程，比如A进程的线程T，通过修改Cr3(改为B进程的页目录基址)，就可以访问B进程地址空间，即所谓“进程挂靠”

当T线程挂靠B进程后，APC队列中存储的却仍然是原来的APC。具体点说，比如某个APC函数要读取一个地址为0x12345678的数据，如果此时进行读取，读到的将是B进程的地址空间，这样逻辑就错误了。

**为了避免混乱，在T线程挂靠B进程时，会将Apcstate中的值暂时存储到SavedApcState中，等回到原进程A时，再将APC队列恢复。**

所以，SavedApcState又称为**备用APC队列**

#### 挂靠环境下ApcState的意义

**在挂靠的环境下，也是可以在线程APC队列插入APC的**，那这种情况下，使用的是哪个APC队列呢？

A进程的T线程挂靠B进程，A是T的所属进程，B是T的挂靠进程

- ApcState---B进程(挂靠进程)相关的APC函数
- SavedApcState---A(所属进程)进程相关的APC函数

### KTHREAD.ApcStatePointer与KTHREAD.ApcStateIndex组合寻址

- [x] 正常情况下，向ApcState队列中插入APC时：

- ApcStatePointer[0] 指向 ApcState此时ApcStateIndex的值为0
- **ApcStatePointer[KTHREAD.ApcStateIndex] 指向 ApcState**

- [x] 挂靠情况下，向ApcState队列中插入APC时：

- ApcStatePointer[1] 指向 ApcState此时ApcStateIndex的值为1
- **ApcStatePointer[KTHREAD.ApcStateIndex] 指向 ApcState**

【总结】无论什么环境下,**ApcStatePointer[ApcStateIndex] 指向的都是 ApcState**。

**ApcState**则**总是标识线程当前使用的APC状态**。

### 分析NtReadVirtualMemory

**在挂靠时是如何备份和恢复APC队列的**

**NtReadVirtualMemory**内有挂靠进程函数\_KeStackAttachProcess以及恢复不挂靠状态的函数\_KeUnstackDetachProcess

```c
_KeStackAttachProcess
	--->_KeStackAttachProcess
		--->_KiAttachProcess
			--->//若进程本身未挂靠情况下，则调用_KiMoveApcState（x，y），其作用是将x的ApcState结构备份到y的ApcState中，以实现ApcState备份到SavedApcState中
```

#### _KiMoveApcState

![image-20211028152615008](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211028152615008.png)



## APC挂入过程(内含KAPC详细结构)

无论是正常状态还是挂靠状态，都有两个APC队列，一个内核队列，一个用户队列。

每当要挂入一个APC函数时，不管是内核APC还是用户APC，内核都要准备一个KAPC的数据结构，并且将这个KAPC结构挂到相应的APC队列中。

### _KAPC

```c
kd> dt _kapc
nt!_KAPC
   +0x000 Type             : Int2B//类型 APC类型为0x12
   +0x002 Size             : Int2B//本结构体的大小 0x30
   +0x004 Spare0           : Uint4B//未使用，疑似多核相关
   +0x008 Thread           : Ptr32 _KTHREAD//目标线程
   +0x00c ApcListEntry     : _LIST_ENTRY//APC队列挂的位置
   +0x014 KernelRoutine    : Ptr32     void //指向一个函数(调用_IopDeallocateApc函数释放APC)
   +0x018 RundownRoutine   : Ptr32     void //略
   +0x01c NormalRoutine    : Ptr32     void //用户APC总入口(通过这个入口，即_BaseDispatchAPC@12（用于分发用户APC的函数），可以找到所有的用户APC函数) 或者 真正的内核apc函数 或者该成员为NULL的特殊内核APC（执行该内核APC时将直接释放）
   +0x020 NormalContext    : Ptr32 Void//内核APC：NULL 用户APC：真正的APC函数
   +0x024 SystemArgument1  : Ptr32 Void//APC函数的参数
   +0x028 SystemArgument2  : Ptr32 Void//不是用户自己填的，来源于__imp__RtlQueryInformationActivationContext函数的返回值
   +0x02c ApcStateIndex    : Char//挂哪个队列，有4个值：0,1,2,3，后续详解
   +0x02d ApcMode          : Char//标识是内核APC还是用户APC，1表示用户APC,0表示内核apc
   +0x02e Inserted         : UChar//表示本APC是否已挂入队列，挂入前：0		挂入后：1
```

#### ApcStateIndex

与KTHREAD（+0x165）的属性同名但含义不一样：

**ApcStateIndex有四个值**

- **0**---原始环境，不管是否挂靠都插入到当前线程所属进程（亲生父母）相关的APC队列（未挂靠就插入ApcState，挂靠了就插入SavedApcState）
- **1**---挂靠环境，插入到当前线程挂靠进程相关的APC队列（未挂靠就插入SavedApcState，挂靠了就插入ApcState）
- **2**---当前环境，使用\_KTHREAD.ApcStateIndex，ApcStatePointer[\_KTHREAD.ApcStateIndex]， 即**都是写入ApcState**。初始化时如果没有挂靠，插入到所属进程相关的APC队列；初始化时如果挂靠了，插入到挂靠进程相关的APC队列
- **3**---插入APC时的当前环境，在插入APC之前会更新当前线程是否处于挂靠状态（将\_ETHREAD.Tcb.ApcStateIndex覆盖到\_KAPC.ApcStateIndex中） 再进行APC插入

NtQueueApcThread到KiInsertQueueApc才真正插入完，插入的过程中有可能线程的状态改变，因此3的意思指的是在KiInsertQueueApc这一步才更新线程状态

TargetEnvironment(ApcStateIndex)里存的四种情况的枚举类型，出自WRK

![image-20211018180147858](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211018180147858.png)

### 用户APC挂入流程

![image-20211012154033183](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211012154033183.png)

#### QueueUserAPC函数

```assembly
.text:7C82C07A ; DWORD __stdcall QueueUserAPC(PAPCFUNC pfnAPC, HANDLE hThread, ULONG_PTR dwData)
.text:7C82C07A                 public _QueueUserAPC@12
.text:7C82C07A _QueueUserAPC@12 proc near              ; DATA XREF: .text:off_7C802654↑o
.text:7C82C07A
.text:7C82C07A pvBuffer        = dword ptr -8
.text:7C82C07A var_4           = byte ptr -4
.text:7C82C07A pfnAPC          = dword ptr  8
.text:7C82C07A hThread         = dword ptr  0Ch
.text:7C82C07A dwData          = dword ptr  10h
.text:7C82C07A
.text:7C82C07A ; FUNCTION CHUNK AT .text:7C844C8E SIZE 00000022 BYTES
.text:7C82C07A
.text:7C82C07A                 mov     edi, edi
.text:7C82C07C                 push    ebp
.text:7C82C07D                 mov     ebp, esp
.text:7C82C07F                 push    ecx
.text:7C82C080                 push    ecx
.text:7C82C081                 and     [ebp+pvBuffer], 0
.text:7C82C085                 push    edi
.text:7C82C086                 xor     eax, eax
.text:7C82C088                 push    eax             ; pcbWrittenOrRequired
.text:7C82C089                 push    8               ; cbBuffer
.text:7C82C08B                 lea     edi, [ebp+var_4]
.text:7C82C08E                 stosd
.text:7C82C08F                 lea     eax, [ebp+pvBuffer]
.text:7C82C092                 push    eax             ; pvBuffer
.text:7C82C093                 push    1               ; ulInfoClass
.text:7C82C095                 push    0               ; pvSubInstance
.text:7C82C097                 push    0               ; Context
.text:7C82C099                 push    1               ; dwFlags
.text:7C82C09B                 call    ds:__imp__RtlQueryInformationActivationContext@28 ; RtlQueryInformationActivationContext(x,x,x,x,x,x,x)
.text:7C82C0A1                 test    eax, eax
.text:7C82C0A3                 pop     edi
.text:7C82C0A4                 jl      loc_7C844C8E
.text:7C82C0AA                 test    [ebp+var_4], 1
.text:7C82C0AE                 mov     eax, [ebp+pvBuffer]
.text:7C82C0B1                 jnz     loc_7C844CA8
.text:7C82C0B7
.text:7C82C0B7 loc_7C82C0B7:                           ; CODE XREF: QueueUserAPC(x,x,x)+18C31↓j
.text:7C82C0B7                 push    eax             ; SystemArgument2，来源于__imp__RtlQueryInformationActivationContext函数的返回值
.text:7C82C0B8                 push    [ebp+dwData]    ; SystemArgument1
.text:7C82C0BB                 push    [ebp+pfnAPC]    ; NormalContext
.text:7C82C0BE                 push    offset _BaseDispatchAPC@12 ; ApcRoutine，此处填入的是NormalRoutine，即_BaseDispatchAPC，分发函数的函数地址
.text:7C82C0C3                 push    [ebp+hThread]   ; ThreadHandle
.text:7C82C0C6                 call    ds:__imp__NtQueueApcThread@20 ; NtQueueApcThread(x,x,x,x,x)
.text:7C82C0CC                 xor     ecx, ecx
.text:7C82C0CE                 test    eax, eax
.text:7C82C0D0                 setnl   cl
.text:7C82C0D3                 mov     eax, ecx
.text:7C82C0D5
.text:7C82C0D5 locret_7C82C0D5:                        ; CODE XREF: QueueUserAPC(x,x,x)+18C29↓j
.text:7C82C0D5                 leave
.text:7C82C0D6                 retn    0Ch
.text:7C82C0D6 _QueueUserAPC@12 endp

```

上面可见，三环插入用户apc往NormalRoutine填入的是_BaseDispatchAPC@12函数

#### NtQueueApcThread函数

```assembly
PAGE:004BA08B ; NTSTATUS __stdcall NtQueueApcThread(HANDLE ThreadHandle, PKNORMAL_ROUTINE ApcRoutine, PVOID NormalContext, PVOID SystemArgument1, PVOID SystemArgument2)
PAGE:004BA08B _NtQueueApcThread@20 proc near          ; DATA XREF: .text:0040B978↑o
PAGE:004BA08B
PAGE:004BA08B AccessMode      = byte ptr -4
PAGE:004BA08B ThreadHandle    = dword ptr  8
PAGE:004BA08B ApcRoutine      = dword ptr  0Ch
PAGE:004BA08B NormalContext   = dword ptr  10h
PAGE:004BA08B SystemArgument1 = dword ptr  14h
PAGE:004BA08B SystemArgument2 = dword ptr  18h
PAGE:004BA08B
PAGE:004BA08B ; FUNCTION CHUNK AT PAGE:00523983 SIZE 00000025 BYTES
PAGE:004BA08B
PAGE:004BA08B                 mov     edi, edi
PAGE:004BA08D                 push    ebp
PAGE:004BA08E                 mov     ebp, esp
PAGE:004BA090                 push    ecx
PAGE:004BA091                 push    ebx
PAGE:004BA092                 push    esi
PAGE:004BA093                 mov     eax, large fs:124h
PAGE:004BA099                 mov     al, [eax+140h]
PAGE:004BA09F                 mov     [ebp+AccessMode], al
PAGE:004BA0A2                 xor     esi, esi
PAGE:004BA0A4                 push    esi             ; HandleInformation
PAGE:004BA0A5                 lea     eax, [ebp+ThreadHandle]
PAGE:004BA0A8                 push    eax             ; Object
PAGE:004BA0A9                 push    dword ptr [ebp+AccessMode] ; AccessMode
PAGE:004BA0AC                 push    _PsThreadType   ; ObjectType
PAGE:004BA0B2                 push    10h             ; DesiredAccess
PAGE:004BA0B4                 push    [ebp+ThreadHandle] ; Handle
PAGE:004BA0B7                 call    _ObReferenceObjectByHandle@24 ; ObReferenceObjectByHandle(x,x,x,x,x,x)
PAGE:004BA0BC                 mov     ebx, eax
PAGE:004BA0BE                 cmp     ebx, esi
PAGE:004BA0C0                 jl      short loc_4BA123
PAGE:004BA0C2                 mov     eax, [ebp+ThreadHandle]
PAGE:004BA0C5                 xor     ebx, ebx
PAGE:004BA0C7                 test    byte ptr [eax+_ETHREAD.___u24.CrossThreadFlags], 10h ; 判断当前线程是否是系统线程
PAGE:004BA0CE                 jnz     loc_523983
PAGE:004BA0D4                 push    edi
PAGE:004BA0D5                 push    70617350h       ; Tag
PAGE:004BA0DA                 push    30h             ; NumberOfBytes
PAGE:004BA0DC                 push    8               ; PoolType
PAGE:004BA0DE                 call    _ExAllocatePoolWithQuotaTag@12 ; ExAllocatePoolWithQuotaTag(x,x,x)创建0x30字节的空间，给KAPC使用
PAGE:004BA0E3                 mov     edi, eax        ; 返回的内存地址放入edi中
PAGE:004BA0E5                 cmp     edi, esi        ; 判断是否返回NULL
PAGE:004BA0E7                 jz      loc_52398D
PAGE:004BA0ED                 push    [ebp+NormalContext]
PAGE:004BA0F0                 push    1
PAGE:004BA0F2                 push    [ebp+ApcRoutine];NormalRoutine，上层函数传入的参数，统一的分发函数
PAGE:004BA0F5                 push    esi             ; 0
PAGE:004BA0F6                 push    offset _IopDeallocateApc@20 ; _IopDeallocateApc函数地址，其内部执行了_ExFreePoolWithTag@8
PAGE:004BA0FB                 push    esi             ; 0
PAGE:004BA0FC                 push    [ebp+ThreadHandle]
PAGE:004BA0FF                 push    edi             ; KAPC
PAGE:004BA100                 call    _KeInitializeApc@32 ; KeInitializeApc(x,x,x,x,x,x,x,x)，初始化APC函数
PAGE:004BA105                 push    esi             ; 0
PAGE:004BA106                 push    [ebp+SystemArgument2]
PAGE:004BA109                 push    [ebp+SystemArgument1]
PAGE:004BA10C                 push    edi             ; KPAC
PAGE:004BA10D                 call    _KeInsertQueueApc@16 ; KeInsertQueueApc(x,x,x,x)
PAGE:004BA112                 test    al, al
PAGE:004BA114                 jz      loc_523997
PAGE:004BA11A
PAGE:004BA11A loc_4BA11A:                             ; CODE XREF: NtQueueApcThread(x,x,x,x,x)+69907↓j
PAGE:004BA11A                                         ; NtQueueApcThread(x,x,x,x,x)+69918↓j
PAGE:004BA11A                 pop     edi
PAGE:004BA11B
PAGE:004BA11B loc_4BA11B:                             ; CODE XREF: NtQueueApcThread(x,x,x,x,x)+698FD↓j
PAGE:004BA11B                 mov     ecx, [ebp+ThreadHandle] ; Object
PAGE:004BA11E                 call    @ObfDereferenceObject@4 ; ObfDereferenceObject(x)
PAGE:004BA123
PAGE:004BA123 loc_4BA123:                             ; CODE XREF: NtQueueApcThread(x,x,x,x,x)+35↑j
PAGE:004BA123                 pop     esi
PAGE:004BA124                 mov     eax, ebx
PAGE:004BA126                 pop     ebx
PAGE:004BA127                 leave
PAGE:004BA128                 retn    14h
PAGE:004BA128 _NtQueueApcThread@20 endp
```

#### KeInitializeApc函数

该函数并未公布，但导出了

```c
//来自WRK源码
VOID KeInitializeApc
(
IN PKAPC Apc,//KAPC指针，分配好的还没有初始化的KAPC指针
IN PKTHREAD Thread,//目标线程，存储到_kapc.Thread
IN KAPC_ENVIRONMENT TargetEnvironment,//0 1 2 3四种状态，要挂到哪一个APC队列中，存储到_kapc.ApcStateIndex
IN PKKERNEL_ROUTINE KernelRoutine,//销毁KAPC的函数地址,存储到_kapc.KernelRoutine
IN PKRUNDOWN_ROUTINE RundownRoutine OPTIONAL,
IN PKNORMAL_ROUTINE NormalRoutine,//用户APC总入口或者内核apc函数,存储到_kapc.NormalRoutine
IN KPROCESSOR_MODE Mode,//要插入用户apc队列还是内核apc队列，存储到_kapc.ApcMode
IN PVOID Context//内核APC：NULL  用户APC：真正的APC函数   存储到_kapc.NormalContext
) 
```

![image-20211019150353138](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211019150353138.png)

#### KeInsertQueueApc函数

![image-20211029143018774](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211029143018774.png)

#### KiInsertQueueApc函数

1. 根据KAPC.ApcStateIndex找到对应的APC队列
2. 再根据KAPC.ApcMode确定是用户队列还是内核队列
3. 将KAPC挂到对应的队列中(挂到KAPC的ApcListEntry处)
4. 再根据KAPC结构中的Inserted置1，标识当前的KAPC为已插入状态
5. KAPC_STATE结构中的KernelApcPending/UserApcPending置1(**UserApcPending未必置1，只有当前线程处于等待状态，并且是用户自己导致的等待，并且是可以吵醒(Alertable)的线程才置1**)

![image-20211101140140226](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211101140140226.png)

该函数返回值为1表示APC已插入，但**如果UserApcPending未置1，则该用户APC未必有机会执行**

插入的上半部分

![image-20211101164401536](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211101164401536.png)

插入的下半部分

<img src="https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211101164523600.png" alt="image-20211101164523600"  />

反汇编：

```c
VOID
FASTCALL
KiInsertQueueApc(IN PKAPC Apc,IN KPRIORITY PriorityBoost)
{    
    if (Apc->ApcStateIndex == InsertApcEnvironment)
    {
        Apc->ApcStateIndex = Thread->ApcStateIndex;
    }    
    //PKAPC_STATE ApcStatePointer[2];//说明ApcStateIndex只能是
    //OriginalApcEnvironment,//0
    //AttachedApcEnvironment,//1
    //从Thread的ApcStatePointer取出对应的ApcState
    ApcState = Thread->ApcStatePointer[(UCHAR)Apc->ApcStateIndex];
    ApcMode = Apc->ApcMode;
    
    ASSERT(Apc->Inserted == TRUE);    
    /* 插入队列的三种方式:
     * 1) Kernel APC with Normal Routine or User APC = Put it at the end of the List
     * 2) User APC which is PsExitSpecialApc = Put it at the front of the List
     * 3) Kernel APC without Normal Routine = Put it at the end of the No-Normal Routine Kernel APC list
     */
    //PsExitSpecialApc
    
    if (Thread->ApcStateIndex == Apc->ApcStateIndex)
    {   if(当前线程 ) {            
            if(KernelMode) 
            {
                Thread->ApcState.KernelApcPending = TRUE;                
                if (!Thread->SpecialApcDisable)
                {                        //中断线程当前执行六？？
                    /* They're not, so request the interrupt */
                    HalRequestSoftwareInterrupt(APC_LEVEL);
                }
            }
        }        
        else {            
            if(KernelMode) {
                Thread->ApcState.KernelApcPending = TRUE;                
                if (Thread->State == Running) 
                    HalRequestSoftwareInterrupt(APC_LEVEL);                
                else if(一堆条件){
                    KiUnwaitThread(Thread, Status, PriorityBoost);//唤醒线程
                }
                
            } 
            else {                
                if ((Thread->State == Waiting) &&
                     (Thread->WaitMode == UserMode) &&
                     ((Thread->Alertable) || //
                      (Thread->ApcState.UserApcPending)))
                {                    /* Set user-mode APC pending */
                    Thread->ApcState.UserApcPending = TRUE;
                    Status = STATUS_USER_APC;
                    KiUnwaitThread(Thread, Status, PriorityBoost);//唤醒线程
                }
            }
        }
    }
}
```

KiInsertQueueApc函数插入的三种方式，上面只节选了如下第2种方式

```c
/* 插入队列的三种方式:
     * 1) Kernel APC with Normal Routine or User APC = Put it at the end of the List
     * 2) User APC which is PsExitSpecialApc = Put it at the front of the List
     * 3) Kernel APC without Normal Routine = Put it at the end of the No-Normal Routine Kernel APC list
     */
```

##### Alertable属性

意思为：是否允许被APC吵醒

```c
kd> dt _KTHREAD
ntdll!_KTHREAD
   ...
   +0x164 Alertable        : UChar
   ...

DWORD SleepEx(
  DWORD dwMilliseconds, // time-out interval
  BOOL bAlertable        	// early completion option
);
DWORD WaitForSingleObjectEx(
  HANDLE hHandle,        	// handle to object
  DWORD dwMilliseconds, // time-out interval
  BOOL bAlertable        	// alertable option
);
```

- Alertable=0 时

  ​	当前插入的APC函数未必有机会执行：UserApcPending = 0

- Alertable=1 时

  ​	UserApcPending = 1

  ​	将目标线程唤醒(从等待链表中摘出来，并挂到调度链表)

### 三环APC API挂入实验

#### QueueUserAPC

```c
DWORD QueueUserAPC(
  [in] PAPCFUNC  pfnAPC,//APC回调函数
  [in] HANDLE    hThread,//线程的句柄。句柄必须具有THREAD_SET_CONTEXT访问权限。
  [in] ULONG_PTR dwData//APC回调函数参数
);
```

#### 三环APC API挂入实验

```c
VOID NTAPI myAPC(_In_ ULONG_PTR Parameter)
{
	printf("APC执行，参数为%d\r\n", Parameter);
}
void threadCall()
{
	printf("线程开始执行\r\n");
	while(1)
	{
		printf("线程执行中...\r\n");
		SleepEx(1000,TRUE);//TRUE表示该线程的休眠可被APC唤醒，修改的成员是KTHREAD.alertable。WaitForSingleObjectEx也有类似参数
	}
	
}

void main()
{
	HANDLE hThread = CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)threadCall, NULL, 0, NULL);
	if (hThread==0)
	{
		cout << "CreateThread wrong!   wrong num："<< GetLastError() << endl;
	}
	ULONG a = 30;
	getchar();//按任意键插入用户APC
	//使用现成的API编写代码向某个线程插入一个用户APC，体会什么是APC
	QueueUserAPC(myAPC, hThread, a);
	
	getchar();//防止主线程结束，导致程序释放了
}
```

![image-20211026232558356](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211026232558356.png)

## 内核APC执行流程

APC函数的执行与插入并不是同一个线程，具体点讲：

在线程A中向B线程插入一个APC，插入的动作是在A线程中完成的，但什么时候执行则由B线程决定。所以叫"异步过程调用"。

内核APC函数与用户APC函数的执行时间和执行方式也有区别。

### 执行点：线程切换

**该执行点只执行内核APC**

```c
SwapContext	//判断是否有内核APC，有内核apc执行返回1，没有返回0
    | 执行完返回到
KiSwapContext//有内核apc执行返回1，没有返回0
    | 执行完返回到
KiSwapThread//KiSwapContext返回的是1就调用下面的函数
	| 执行完返回到
KiDeliverApc //执行内核APC函数
```

**SwapContext函数截取**

```assembly
;末端截取
.text:004049F6                 cmp     [esi+_ETHREAD.Tcb.ApcState.KernelApcPending], 0 ; 判断要切换的线程是否有要执行的内核APC
.text:004049FA                 jnz     short loc_404A00
.text:004049FC                 popf
.text:004049FD                 xor     eax, eax
.text:004049FF                 retn
.text:00404A00 ; ---------------------------------------------------------------------------
.text:00404A00
.text:00404A00 loc_404A00:                             ; CODE XREF: SwapContext+D6↑j
.text:00404A00                 popf
.text:00404A01                 jnz     short loc_404A06
.text:00404A03                 mov     al, 1           ; 有要执行的内核apc返回1
.text:00404A05                 retn
.text:00404A06 ; ---------------------------------------------------------------------------
.text:00404A06
.text:00404A06 loc_404A06:                             ; CODE XREF: SwapContext+DD↑j
.text:00404A06                 mov     cl, 1
.text:00404A08                 call    ds:__imp_@HalRequestSoftwareInterrupt@4 ; HalRequestSoftwareInterrupt(x)
.text:00404A0E                 xor     eax, eax        ; 没有要执行的内核apc返回0
.text:00404A10                 retn
.text:00404A11 ; ---------------------------------------------------------------------------
```

**KiSwapThread函数截取**

```assembly
;截取KiSwapThread
.text:004050F0 loc_4050F0:                             ; CODE XREF: KiSwapThread()+B8F4↓j
.text:004050F0                 mov     ecx, eax        ; 取要切换的目标线程
.text:004050F2                 call    @KiSwapContext@4 ; KiSwapContext(x)
.text:004050F7                 test    al, al
.text:004050F9                 mov     cl, [edi+_KTHREAD.WaitIrql] ; NewIrql
.text:004050FC                 mov     edi, [edi+_KTHREAD.WaitStatus]
.text:004050FF                 mov     esi, ds:__imp_@KfLowerIrql@4 ; KfLowerIrql(x)
.text:00405105                 jnz     loc_415ADB      ; 这个跳转处理APC
.text:00415ADB ; ---------------------------------------------------------------------------
.text:00415ADB
.text:00415ADB loc_415ADB:                             ; CODE XREF: KiSwapThread()+46↑j
.text:00415ADB                 mov     cl, 1           ; NewIrql
.text:00415ADD                 call    esi ; KfLowerIrql(x) ; KfLowerIrql(x)
.text:00415ADF                 xor     eax, eax
.text:00415AE1                 push    eax
.text:00415AE2                 push    eax
.text:00415AE3                 push    eax             ; 0处理内核APC  1处理内核APC和用户APC
.text:00415AE4                 call    _KiDeliverApc@12 ; KiDeliverApc(x,x,x) 专门用来处理APC的函数
.text:00415AE9                 xor     cl, cl
.text:00415AEB                 jmp     loc_40510B
.text:00415AF0 ; ---------------------------------------------------------------------------
```

### 执行点：系统调用，中断或异常(_KiServiceExit)

即从内核返回用户空间的途中

**_KiServiceExit**是系统调用，中断或异常**回三环的时候必须要走的函数**。

**该执行点先执行内核APC，再执行用户APC**

**_KiServiceExit截取**

```assembly
.text:004077FD _KiServiceExit  proc near               ; CODE XREF: _KiSetLowWaitHighThread+7C↓j
.text:004077FD                                         ; NtContinue(x,x)+42↓j ...
.text:004077FD
.text:004077FD arg_C           = dword ptr  10h
.text:004077FD arg_10          = dword ptr  14h
.text:004077FD arg_40          = dword ptr  44h
.text:004077FD arg_44          = dword ptr  48h
.text:004077FD arg_48          = dword ptr  4Ch
.text:004077FD arg_60          = dword ptr  64h
.text:004077FD arg_64          = dword ptr  68h
.text:004077FD arg_68          = dword ptr  6Ch
.text:004077FD arg_6C          = dword ptr  70h
.text:004077FD
.text:004077FD ; FUNCTION CHUNK AT .text:00407908 SIZE 00000088 BYTES
.text:004077FD
.text:004077FD                 cli
.text:004077FE                 test    dword ptr [ebp+70h], 20000h ; 判断CPU模式 [ebp+70]是3环的Eflags
.text:00407805                 jnz     short loc_40780D ; 获取_KTHREAD
.text:00407807                 test    byte ptr [ebp+6Ch], 1 ; 三环的SegCs
.text:0040780B                 jz      short loc_407864
.text:0040780D
.text:0040780D loc_40780D:                             ; CODE XREF: _KiServiceExit+8↑j
.text:0040780D                                         ; _KiServiceExit+63↓j
.text:0040780D                 mov     ebx, ds:0FFDFF124h ; 获取_KTHREAD
.text:00407813                 mov     [ebx+_KTHREAD.Alerted], 0
.text:00407817                 cmp     [ebx+_KTHREAD.ApcState.UserApcPending], 0 ; 判断是否存在用户APC等待执行
.text:0040781B                 jz      short loc_407864 ; 没有用户APC等待执行就跳转
.text:0040781D                 mov     ebx, ebp
.text:0040781F                 mov     [ebx+44h], eax
.text:00407822                 mov     dword ptr [ebx+50h], 3Bh
.text:00407829                 mov     dword ptr [ebx+38h], 23h
.text:00407830                 mov     dword ptr [ebx+34h], 23h
.text:00407837                 mov     dword ptr [ebx+30h], 0
.text:0040783E                 mov     ecx, 1          ; NewIrql
.text:00407843                 call    ds:__imp_@KfRaiseIrql@4 ; KfRaiseIrql(x)
.text:00407849                 push    eax             ; KfRaiseIrql返回老的运行级别，入栈
.text:0040784A                 sti
.text:0040784B                 push    ebx
.text:0040784C                 push    0
.text:0040784E                 push    1               ; 0处理内核APC   1处理内核APC和用户APC
.text:00407850                 call    _KiDeliverApc@12 ; 执行内核APC函数，并为用户空间的APC的执行进行准备
.text:00407850                                         ; 下面是将老的运行级别出栈，然后执行KfLowerIrql函数恢复原来的运行级别
.text:00407855                 pop     ecx             ; NewIrql
.text:00407856                 call    ds:__imp_@KfLowerIrql@4 ; KfLowerIrql(x)
.text:0040785C                 mov     eax, [ebx+44h]
.text:0040785F                 cli
.text:00407860                 jmp     short loc_40780D ; 获取_KTHREAD
.text:00407860 ; ---------------------------------------------------------------------------
.text:00407862                 align 4
```

**【注意】这个执行点必须是有用户APC存在的情况下，才可以触发该执行点**(先处理内核APC再处理用户APC)，不然就直接返回了

### KiDeliverApc函数内核APC执行流程

1. 判断第一个链表是否为空
2. 判断KTHREAD.ApcState.KernelApcInProgress是否为1
3. 判断是否禁用内核APC（KTHREAD.KernelApcDisable是否为1）
4. 将当前KAPC结构体从链表中摘除
5. 执行KAPC.KernelRoutine执行的函数，释放KAPC结构体占用的空间
6. 将KTHREAD.ApcState.KernelApcInProgress设置为1，标识正在执行内核APC
7. 执行真正的内核APC函数（KAPC.NormalRoutine）
8. 执行完毕，将KernelApcInProgress改为0
9. 循环

**汇编流程如下：**

<img src="https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211015132902898.png" alt="image-20211015132902898"  />

### 内核APC总结

1. 内核APC在线程切换的时候就会执行，这也就意味着，只要插入内核APC很快就会执行。
2. 在执行用户APC之前就会先执行内核APC。
3. 内核APC在内核空间执行，不需要换栈，一个循环全部执行完毕

## 用户APC执行流程

当产生系统调用，中断或者异常，线程在返回用户空间前都会调用\_KiServiceExit函数，在\_KiServiceExit会判断是否有要执行的用户APC，如果有则调用KiDeliverApc函数(第一个参数为1)进行处理

![image-20211023221626174](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211023221626174.png)

![deliver](https://gitee.com/ZEROKO14/blog-img/raw/master/img/deliver.png)

上图是从用户模式调用Native API才走KiServiceExit2

**总览流程图**

![image-20211118112937375](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211118112937375.png)

![20201202171056458](https://gitee.com/ZEROKO14/blog-img/raw/master/img/20201202171056458.png)

### 执行用户APC时的堆栈操作

处理用户APC要比内核APC复杂的多，因为，用户APC函数要在用户空间执行的，这里**涉及到大量换栈的操作**：

当线程从用户层进入内核层时，要保留原来的运行环境，比如各种寄存器，栈的位置等等（\_Trap\_Frame），然后切换成内核的堆栈，如果正常返回，恢复堆栈环境即可。

但如果有用户APC要执行的话，就意味着线程要**提前返回到用户空间去执行**，而且返回的位置不是线程进入内核时的位置，而是**返回到其他的位置**，每处理一个用户APC都会涉及到：
$$
内核  --->  用户空间  --->  再回到内核空间
$$
堆栈的操作比较复杂，如果不了解堆栈的操作细节不可能理解用户APC是如何执行的！

堆栈变化总结：



### KiInitializeUserApc函数分析

线程进入0环时，原来的运行环境（寄存器栈顶等）保存到\_Trap\_Frame结构体中，如果要提前返回到3环取处理用户APC，就必须要**修改\_Trap\_Frame结构体**：

比如：进入0环时的位置存储在EIP中，现在要提前返回，而且返回的并不是原来的位置，那就意味着必须要修改EIP为新的返回位置。还有堆栈ESP，也要修改为处理APC需要的堆栈。那原来的值怎么办呢？处理完APC后该如何返回原来的位置呢？

KiInitializeUserApc要做的**第一件事就是备份**：

将原来的\_Trap\_Frame结构体的值备份到一个新的结构体中（[CONTEXT](https://www.cnblogs.com/DeeLMind/p/6855085.html)），这个功能由其子函数**KeContextFromKframes**来完成。

**KiInitializeUserApc函数分析：准备回用户层的执行环境**

1. 段寄存器：SS DS FS GS
2. 修改EFLAGS寄存器
3. 修改ESP
4. 修改EIP（此EIP是固定修改为全局变量_KeUserApcDispatcher存的值，其值指向ntdll.KiUserApcDispatcher函数）

![image-20211016154954475](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211016154954475.png)![image-20211016155050235](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20211016155050235.png)

#### CONTEXT结构体

```c
typedef struct _CONTEXT
{
    DWORD           ContextFlags    // -|               +00h
    DWORD           Dr0             //  |               +04h
    DWORD           Dr1             //  |               +08h
    DWORD           Dr2             //  >调试寄存器     +0Ch
    DWORD           Dr3             //  |               +10h
    DWORD           Dr6             //  |               +14h
    DWORD           Dr7             // -|               +18h

    FLOATING_SAVE_AREA FloatSave;   //浮点寄存器区      +1Ch~~~88h

    DWORD           SegGs           //-|                +8Ch
    DWORD           SegFs           // |\段寄存器       +90h
    DWORD           SegEs           // |/               +94h
    DWORD           SegDs           //-|                +98h

    DWORD           Edi             //________          +9Ch
    DWORD           Esi             // |  通用          +A0h
    DWORD           Ebx             // |   寄           +A4h
    DWORD           Edx             // |   存           +A8h
    DWORD           Ecx             // |   器           +ACh
    DWORD           Eax             //_|___组_          +B0h

    DWORD           Ebp             //++++++            +B4h
    DWORD           Eip             // |控制            +B8h
    DWORD           SegCs           // |寄存            +BCh
    DWORD           EFlag           // |器组            +C0h
    DWORD           Esp             // |                +C4h
    DWORD           SegSs           //++++++            +C8h

    BYTE    ExtendedRegisters[MAXIMUM_SUPPORTED_EXTENSION];
} CONTEXT;


//windbg中
nt!_CONTEXT
   +0x000 ContextFlags     : Uint4B
   +0x004 Dr0              : Uint4B
   +0x008 Dr1              : Uint4B
   +0x00c Dr2              : Uint4B
   +0x010 Dr3              : Uint4B
   +0x014 Dr6              : Uint4B
   +0x018 Dr7              : Uint4B
   +0x01c FloatSave        : _FLOATING_SAVE_AREA
   +0x08c SegGs            : Uint4B
   +0x090 SegFs            : Uint4B
   +0x094 SegEs            : Uint4B
   +0x098 SegDs            : Uint4B
   +0x09c Edi              : Uint4B
   +0x0a0 Esi              : Uint4B
   +0x0a4 Ebx              : Uint4B
   +0x0a8 Edx              : Uint4B
   +0x0ac Ecx              : Uint4B
   +0x0b0 Eax              : Uint4B
   +0x0b4 Ebp              : Uint4B
   +0x0b8 Eip              : Uint4B
   +0x0bc SegCs            : Uint4B
   +0x0c0 EFlags           : Uint4B
   +0x0c4 Esp              : Uint4B
   +0x0c8 SegSs            : Uint4B
   +0x0cc ExtendedRegisters : [512] UChar
   //win32的CONTEXT结构体共占0xCC+0x200=0x2CC字节
```

![image-20210831191749044](https://gitee.com/ZEROKO14/blog-img/raw/master/img/image-20210831191749044.png)

#### ntdll.KiUserApcDispatcher分析

```assembly
.text:7C92E430 ; __stdcall KiUserApcDispatcher(x, x, x, x, x)
.text:7C92E430                 public _KiUserApcDispatcher@20
.text:7C92E430 _KiUserApcDispatcher@20 proc near       ; DATA XREF: .text:off_7C923428↑o
.text:7C92E430
.text:7C92E430 arg_C           = byte ptr  10h
.text:7C92E430
.text:7C92E430                 lea     edi, [esp+arg_C]; CONTEXT指针
.text:7C92E434                 pop     eax
.text:7C92E435                 call    eax             ; 处理用户APC的总入口：NormalRoutine
.text:7C92E437                 push    1
.text:7C92E439                 push    edi
.text:7C92E43A                 call    _ZwContinue@8   ; ZwContinue(x,x) 返回内核
.text:7C92E43F                 nop
.text:7C92E43F _KiUserApcDispatcher@20 endp ; sp-analysis failed
.text:7C92E43F
.text:7C92E440 ; Exported entry  46. KiUserCallbackDispatcher
```

1. 当用户在3环调用QueueUserAPC函数来插入APC时，不需要提供NormalRoutine，这个参数是在QueueUserAPC内部指定的：

   ​	**Kernel32.BaseDispatchAPC函数**：调用用户提供的真正的用户APC函数

2. ZwContinue函数的意义：

   - 返回内核，如果还有用户APC，重复上面的执行过程
   - 如果没有需要执行的用户APC，会将CONTEXT赋值给Trap_Frame结构体。就像从来没有修改过一样。ZwContinue后面的代码不会执行，线程从哪里进0环仍然会从哪里回去。



### 总结

1. 内核APC在线程切换时执行，不需要换栈，比较简单，一个循环执行完毕。
2. 用户APC在系统调用，中断或异常返回3环前会进行判断，如果有要执行的用户APC，再执行。
3. 用户APC执行前会先执行内核APC