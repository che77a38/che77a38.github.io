---
**title**: C++多线程
tags:
  - C++
categories: 技术
mathjax: true
abbrlink: 9f089854
---

C++语言级线程支持详解

标准库提供了五个头文件以支持多线程：atomic（提供原子操作功能）、thread（线程模型封装）、mutex（互斥量）、condition_variable（条件变量）、future

<!-- more -->

# 概述

[参考](https://zhuanlan.zhihu.com/p/613630658)

[cppreference并发支持参考](https://zh.cppreference.com/w/cpp/thread#.E6.9D.A1.E4.BB.B6.E5.8F.98.E9.87.8F)

为什么要用多线程

- 任务分解

  耗时的操作,任务分解,实时响应

- 数据分解

  充分利用多核cpu处理数据

- 数据流分解

  读写分离,解耦合设计

> 先了解操作系统提供的线程api
>
> - [[linux基础以及系统编程#线程相关函数|linux提供的线程操作用法详解]]
> - [[windows开发#线程|windows提供的线程操作用法详解]]
>
> 多进程:
>
> 使用多进程并发是将一个应用程序划分为多个独立的进程（每个进程只有一个线程），这些独立的进程间可以互相通信，共同完成任务。由于操作系统对进程提供了大量的保护机制，以避免一个进程修改了另一个进程的数据，使用多进程比使用多线程更容易写出相对安全的代码。但是这也造就了多进程并发的两个缺点：
>
> - 在进程间的通信，无论是使用信号、套接字，还是文件、管道等方式，其使用要么比较复杂，要么就是速度较慢或者两者兼而有之。
> - 运行多个进程的开销很大，操作系统要分配很多的资源来对这些进程进行管理。
>
> 因此就有了多线程:
>
> 多线程并发指的是在同一个进程中执行多个线程。
>
> 优点：有操作系统相关知识的应该知道，线程是轻量级的进程，每个线程可以独立的运行不同的指令序列，但是线程不独立的拥有资源，依赖于创建它的进程而存在。也就是说，同一进程中的多个线程共享相同的地址空间，可以访问进程中的大部分数据，指针和引用可以在线程间进行传递。这样，同一进程内的多个线程能够很方便的进行数据共享以及通信，也就比进程更适用于并发操作。
>
> 缺点：由于缺少操作系统提供的保护机制，在多线程共享数据及通信时，就需要程序员做更多的工作以保证对共享数据段的操作是以预想的操作顺序进行的，并且要**极力的避免死锁(deadlock)**。

C++11引入了语言级线程支持,使用头文件`#include <thread>`,同时linux上额外需要编译选项`-lpthread`

C++11提供了语言层面上的多线程，包含在头文件<thread>中。它解决了跨平台的问题，提供了管理线程、保护共享数据、线程间同步操作、原子操作等类。C++11 新标准中引入了5个头文件来支持多线程编程

# Thread类型

## 何时执行

线程在构造关联的线程对象时立即开始执行，从提供给Thread类的线程函数开始。

有几点需要注意：

- 线程函数的**返回值将被忽略**，而且若它以抛异常终止，则调用`std::terminate`。在需要获取返回值时，线程函数可以通过`std::promise`或者修改共享变量（可能需要锁机制进行线程同步）。
- 当使用不带参数的默认构造函数`thread()`构造`std::thread`对象时，该对象不表示任何线程，也不会有新线程产生。
- `std::thread`对象不可复制（复制构造函数已被删除）。没有两个`std::thread`对象会表示同一执行线程。
- 可以使用移动构造函数迁移原`thread`对象所关联的执行线程的所有权到新thread对象

## 线程函数参数

`std::thread`常用的构造函数如下

```cpp
template< class Function, class... Args >
explicit thread( Function&& f, Args&&... args );
```

其中，`f`为任意可调用对象（Callable），`args`为任意数目的作为可调用对象`f`的参数。

可调用对象（Callable）是C++的一个具名要求，常见的函数、成员函数、仿函数（函数对象）都属于可调用对象。

线程函数可以是以下几种方式：

1. 函数
2. 成员函数
3. 函数对象
4. 使用lambda表达式

### 函数作为线程函数

比较简单,仅需将函数名与函数参数分别传入即可。

```cpp
void testFunc(int p1,float& p2,string str)
{
    cout<<"subThread begin"<<endl;
    cout<<p1<<endl;
    cout<<p2<<endl;
    cout<<str<<endl;
    cout<<"subThread end"<<endl;
}
int main(int argc, const char **argv) {
    cout<<"main begin"<<endl;
  	float f = 1.1;
    thread th(testFunc,101,ref(f),"hello world");//传参给线程函数
    th.join();//堵塞,等待子线程退出
    //th.detach();//分离
    cout<<"main end"<<endl;
    return 0;
}
```

注意:传参给线程函数的过程默认是**值传递**,除非用`std::ref`把他包起来

使用`std::thread`创建的线程是**没有返回值的**，所以如果你想从线程中返回些什么，请使用引用将你想返回的值作为一个传入参数

### 成员函数作为线程函数

需要以`std::thread(&类名::成员函数名, &类实例)`的格式传入新线程。

```cpp
class foo
{
public:
    void bar(int showNum)
    {
        for (int i = 0; i < 5; ++i) {
            std::cout << "Thread 3 executing NO."<<showNum<<endl;
            ++n;
            std::this_thread::sleep_for(std::chrono::milliseconds(10));
        }
    }
    int n = 0;
};
int n = 0;
foo f;
std::thread t(&foo::bar, &f,999); // t 在对象 f (引用传递)上运行 foo::bar()
//std::thread t(&foo::bar, f,999);// t 在对象 f (值传递)上运行 foo::bar()
t.join();
return 0;
```

### 函数对象作为线程函数

仿函数（或称函数对象）便是传入类的第二种情况，此时该类的工作比较简单（单一，并非指实际工作难度），例如标准库中的`std::function`, `std::bind`等，又例如第一篇文章中的`ThreadWorker`类。成为仿函数的类，一般来说需要**重载函数调用运算符()**。在`std::thread`对象构建新线程后，会自动进行INVOKE操作执行传入的可调用对象。INVOKE操作执行对象为仿函数时，会自动调用仿函数重载的函数调用运算符`operator()`。例如：

```cpp
class baz
{
public:
    void operator()()
    {
        for (int i = 0; i < 5; ++i) {
            std::cout << "Thread 4 executing\n";
            ++n;
            std::this_thread::sleep_for(std::chrono::milliseconds(10));
        }
    }
    int n = 0;
};
//按值传递的方式
thread t(b);
t.join();
cout<<b.n<<endl;
return 0;
//输出:0

//按引用传递的方式
baz b;
thread t(ref(b));
t.join();
cout<<b.n<<endl;
return 0;
//输出:5
```

需要注意的是，新线程运行的仿函数实际上是传入时指定的仿函数的副本，这同时也就**要求该仿函数是可拷贝的**。

可以将返回值作为伪函数对象的一个成员变量来储存,这里的例子就是n

### lambda表达式作为线程函数

```cpp
vector<int> v;
v.push_back(1);
v.push_back(2);
v.emplace_back(3);
int acm1 = 0;
std::thread t1([&acm1, &v] {
    for (int i = 0; i < v.size() ; ++i)
    {
        acm1 += v[i];
    }
});
t1.join();
cout<<acm1<<endl;
//输出: 6
```

作为传参的替代方式，我们可以使用lambda表达式的捕获(capture)方式来处理参数传递

### 线程参数传引用

`std::thread`对象构造新线程时，会移动或按值复制线程函数的参数。若需要传递引用参数给线程函数，则必须包装它（例如用`std::ref`或`std::cref`）。例如：

#### std::ref

- **用途**：`std::ref` 用于创建一个 `std::reference_wrapper` 对象，该对象封装了一个非 `const` 引用，允许通过这个包装器修改原始变量的值。
- **语法**：`std::ref(var)`
- 特性
  - 通过 `std::ref` 包装的引用可以用来代替原始变量参与运算，包括赋值、读取和修改。
  - 通过调用 `get()` 方法或者直接使用转换到引用的隐式转换，可以访问到封装的原始变量。
  - 使用 `std::ref` 包装的引用传递给函数时，函数内可以通过包装器修改原始变量的值。

#### std::cref

- **用途**：`std::cref` 同样用于创建一个 `std::reference_wrapper` 对象，但封装的是一个 `const` 引用，保证封装的对象不能被修改。
- **语法**：`std::cref(constVar)`
- 特性
  - 通过 `std::cref` 包装的 `const` 引用只能用来读取原始变量的值，不能对其进行修改。
  - 尽管封装的是 `const` 引用，`std::cref` 创建的包装器对象本身不是 `const`，意味着可以复制和赋值这样的包装器，但无论如何都不能通过包装器改变底层 `const` 变量的值。
  - 同样可以通过 `get()` 方法或隐式转换访问底层的 `const` 变量，但在函数体内只能以 `const` 方式访问。

**应用场景举例**：

- **函数式编程**：当你需要将某个变量作为参数传递给一个高阶函数（如 `std::bind` 或者 lambda 表达式），并且希望在目标函数体内能修改原始变量时，使用 `std::ref`。反之，如果希望保持原始变量不可变，使用 `std::cref`。
- **容器和算法**：某些容器（如 `std::map`）的比较函数可能要求传入 `const` 引用。如果你需要基于用户定义类型的非 `const` 实例进行排序或查找，可以使用 `std::cref` 包装这些实例。
- **回调机制**：在注册事件处理器或设置回调函数时，若需要访问（可能修改）外部作用域内的变量，可以用 `std::ref` 提供可修改的引用；如果仅需观察而不改变变量，则使用 `std::cref`。

## Thread的成员函数

- join/detach
- swap
- native_handle
- hardware_concurrency

### join/detach

**thread下的两个成员函数,用于主线程与子线程之间的交互**

- `join()`: 等待线程结束并阻塞当前线程，直到被等待的线程执行完毕。

  可以在整个程序析构的时候调用join,来等待子线程退出

- `detach()`: 将线程设置为分离状态，使得线程结束时资源可以自动释放，不需要显式调用`join`来等待线程结束。

> `this_thread::sleep_for(chrono::seconds(1));`  等待一秒
>
> 由C++11引入
>
>    - `this_thread::sleep_for` 需要使用 `std::this_thread` 命名空间，并且需要包含 `<thread>` 和 `<chrono>` 头文件。
>
>      精度更高,可移植性更强
>
>    - `sleep` 函数通常在 POSIX 系统中使用，需要包含 `<unistd.h>` 头文件。

常用: `if (myThread.joinable()) foo.join();`

### swap

Swap 线程，交换两个线程对象所代表的底层句柄(underlying handles)。

```cpp
std::thread t1(foo);
std::thread t2(bar);
t1.swap(t2);
t1.join();
t2.join();
```

### native_handle

返回 native handle（由于 std::thread 的实现和操作系统相关，因此该函数返回与 std::thread 具体实现相关的线程句柄，例如在符合 Posix 标准的平台下(如 Unix/Linux)是 Pthread 库）

```cpp
std::thread t1(foo);
cout<<t1.native_handle()<<endl;
```

### 硬件线程并发数

> `hardware_concurrency`是thread类型的静态函数,表示硬件支持的最大并发量

```cpp
#include <iostream>
#include <thread>

int main() {
  unsigned int n = std::thread::hardware_concurrency();
  std::cout << n << " concurrent threads are supported.\n";
}
//10核m1 pro输出的是: 10 concurrent threads are supported.
//对于4核8线程的cpu返回的是8
```

# this_thread

this_thread是一个命名空间，它有4个功能函数，具体如下：

| 函数        | 使用                                                  | 说明                                                         |
| ----------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| get_id      | std::this_thread::get_id()                            | 获取线程id                                                   |
| yield       | std::this_thread::yield()                             | 放弃线程执行，回到就绪状态,操作系统调度另一线程继续执行      |
| sleep_for   | std::this_thread::sleep_for(std::chrono::seconds(1)); | 线程休眠某个指定的时间片(time span)，该线程才被重新唤醒，不过由于线程调度等原因，实际休眠时间可能比 sleep_duration 所表示的时间片更长。 |
| sleep_until | 如下                                                  | 线程休眠至某个指定的时刻(time point)，该线程才被重新唤醒     |

```cpp
using std::chrono::system_clock;
std::time_t tt = system_clock::to_time_t(system_clock::now());
struct std::tm * ptm = std::localtime(&tt);
cout << "Waiting for the next minute to begin...\n";
++ptm->tm_min; //加一分钟
ptm->tm_sec = 0; //秒数设置为0//暂停执行，到下一整分执行
this_thread::sleep_until(system_clock::from_time_t(mktime(ptm)));
```

函数盘点

| C++                  | Windows               | POSIX             | 功能          |
| -------------------- | --------------------- | ----------------- | ------------- |
| this_thread::yield() | BOOL SwitchToThread() | int sched_yield() | 让出cpu时间片 |
|                      |                       |                   |               |
|                      |                       |                   |               |
|                      |                       |                   |               |
|                      |                       |                   |               |
|                      |                       |                   |               |
|                      |                       |                   |               |
|                      |                       |                   |               |
|                      |                       |                   |               |



| C++                                             | Windows                                                      | POSIX                                                        | 功能                             |
| :---------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :------------------------------- |
| `std::this_thread::yield()`                     | `BOOL SwitchToThread()`                                      | `int sched_yield()`                                          | 让出CPU时间片，允许其他线程执行  |
| `std::thread::sleep_for(std::chrono::duration)` | `Sleep(DWORD milliseconds)`                                  | `nanosleep(struct timespec *)`                               | 暂停当前线程指定的持续时间       |
| `std::thread::join()`                           | `WaitForSingleObject(HANDLE, DWORD)`配合`CreateThread()`使用 | `pthread_join(pthread_t, void **)`                           | 等待指定线程结束其执行           |
| `std::mutex::lock()`, `unlock()`                | `EnterCriticalSection(CRITICAL_SECTION*)`,`LeaveCriticalSection(CRITICAL_SECTION*)` 或`LockResource(HGLOBAL)`, `UnlockResource(HGLOBAL)` | `pthread_mutex_lock(pthread_mutex_t*)`,`pthread_mutex_unlock(pthread_mutex_t*)` | 线程间互斥锁的获取与释放         |
| `std::condition_variable::wait()`               | `WaitForMultipleObjects()`,结合`CRITICAL_SECTION`或`SRWLOCK`使用 | `pthread_cond_wait(pthread_cond_t*, pthread_mutex_t*)`       | 线程等待特定条件满足             |
| `std::atomic`操作                               | `InterlockedExchange*()`,`_ReadWriteBarrier`,`MemoryBarrier`等函数 | `__atomic_*`系列函数                                         | 原子操作以实现线程安全的数据访问 |

# 通用互斥体管理器

下面所有通用互斥体管理器都是严格基于作用域的互斥体所有权包装器:即RAII封装器

下面所有互斥体管理器均**不可复制**

## lock_guard

严格基于作用域的互斥体所有权包装器

```cpp
std::mutex myMytex;
std::lock_guard<std::mutex> lock(myMutex);
```

`std::lock_guard` 是 C++ 中的一种 [RAII](https://cloud.tencent.com/developer/article/1857405)（Resource Acquisition Is Initialization）机制实现，用于**自动管理互斥量的锁定和解锁过程**，确保即使在发生异常或提前返回的情况下也能正确释放互斥量，避免资源泄露。它通常与 `std::mutex` 结合使用，以简化同步代码的编写，提高程序的健壮性。

[通过lock_guard理解RAII思想](https://cloud.tencent.com/developer/article/1857405)

### 第二个参数adopt_lock

**adopt_lock帮助std::lock解锁**

通常情况下，`std::lock_guard` 在构造时会自动锁定其关联的互斥锁。然而，这里使用了额外的构造参数 `std::adopt_lock`，它的作用是：

- 告诉 `std::lock_guard` 它所关联的互斥锁已经被外部机制（此处为 `std::lock`）锁定。
- `std::lock_guard` 不再尝试再次锁定互斥锁，而是直接“接管”（adopt）现有的锁定状态。
- 当 `sbguard1` 和 `sbguard2` 的生命周期结束（例如所在作用域结束时），它们各自的析构函数将自动调用 `unlock()` 方法释放之前被 `std::lock` 锁定的互斥锁。

```cpp
std::mutex myMutex1;
std::mutex myMutex2;
std::lock(myMutex1,myMutex2);

std::lock_guard<std::mutex> lock1(myMutex1,std::adopt_lock);//帮前面的std::lock解锁
std::lock_guard<std::mutex> lock2(myMutex2,std::adopt_lock);
```

没有其他成员函数

## unique_lock

实现可移动的互斥体所有权包装器

- unique_lock比lock_guard灵活性更高，但是执行效率差一点，内存占用的也稍微多一些
- unique_lock可以完全取代lock_guard

```cpp
std::unique_lock<std::mutex> lock(myMutex);
```

> 相对于[lock_guard](#lock_guard)而言,unique_lock多了下面的功能
>
> 1. **延迟锁定**,不必构造的时候马上锁定
> 2. **条件解锁与重新锁定**
> 3. **支持超时锁定**,提供了带超时的锁定尝试
> 4. [**转移所有权**](#unique_lock所有权转移)
> 5. 与[条件变量](#condition_variable)配合实现**等待与通知**

### 第二个参数

- `std::adopt_lock`  免去了加锁流程,仅保留只能解锁,[功能同lock_guard的adopt_lock参数](#第二个参数adopt_lock)

- `std::try_to_lock`  尝试用mutex的lock去锁定这个mutex，但没锁成功会立即返回，并不会阻塞在那里（前提：程序员不能自己先去lock这个mutex）

  ```cpp
  //把收到的消息放入容器
  void inMsgRecvQueue()
  {
      for(int i = 0;i<10000;i++)
      {
          cout<<"inMsgRecvQueue()执行，插入一个元素"<<i<<endl;
          std::unique_lock<std::mutex> sbguard1(my_mutex,std::try_to_lock);
          if(sbguard1.owns_lock())    //如果条件成立拿到了这个锁
          {
              msgRecvQueue.push_back(i);
          }//自动加锁解锁
          else
          {
              //没拿到锁
              cout<<"inMsgRecvQueue()执行，但没拿到锁，只能干点别的事"<<i<<endl;
          }
      }
      return;
  }
  ```

- std::defer_lock  初始化mutex,但没有给mutex加锁,目的是为了实现延迟锁定

### unique_lock成员函数

- lock  上锁

- unlock  解锁

- try_lock  尝试上锁,返回true表示拿到了锁

- release  返回它所管理的mutex对象指针，并**释放所有权**，解除两者的关联关系

  意味着此后不能再通过该 `unique_lock` 对互斥量进行任何锁定或解锁操作。调用release不会改变mutex锁的状态,本来上锁了释放了还是上锁状态

- try_lock_for/try_lock_until  结合时间间隔以及时间节点的尝试上锁

- swap 交换

- mutex  返回指向关联的互斥体的指针

- owns_lock/operator bool  测试是否占有其关联的互斥体

### unique_lock所有权转移

两种情况

1. 移动语义   `unique_lock<mutex> sbguard2(move(sbguard1));`

2. 返回unique_lock类型  

   ```cpp
   std::unique_lock<std::mutex> rtn_unique_lock()
   {
   	std::unique_lock<std::mutex> tmpguard(my_mutex);
       return tmpguard;//从函数返回一个局部unique_lock对象是可以的，返回这种局部对象会调用unique_lock的移动构造函数
   }
   std::unique_lock<std::mutex> sbguard1 = rtn_unique_lock();
   ```

## shared_lock

实现可移动的**共享**互斥体所有权封装器

功能与[unique_lock](#unique_lock)完全一致,只是后者针对的是非共享互斥体

成员函数与[unique_lock成员函数](#unique_lock成员函数)一致

## scoped_lock

> C++17才引入
>
> **简化多锁同步**:特别适用于同时管理多个互斥量的场景，如实现复杂的多资源同步逻辑。它可以一次性安全地锁定多个互斥量，确保了锁的获取顺序一致性和**避免死锁**。开发者无需手动编写繁琐的锁获取和释放代码，降低了编程复杂度和出错的可能性。这对于涉及多个相关数据结构或资源的并发操作至关重要，有助于保证程序的线程安全性。

```cpp
mutex m1,m2;
scoped_lock lock(m1,m2);
// 等价代码 1（用 std::lock 和 std::lock_guard ）
// std::lock(e1.m, e2.m);
// std::lock_guard<std::mutex> lk1(e1.m, std::adopt_lock);
// std::lock_guard<std::mutex> lk2(e2.m, std::adopt_lock);
// 等价代码 2（若需要 unique_lock，例如对于条件变量）
// std::unique_lock<std::mutex> lk1(e1.m, std::defer_lock);
// std::unique_lock<std::mutex> lk2(e2.m, std::defer_lock);
// std::lock(lk1, lk2);
```

没有其他成员函数

# mutex系列

1. `mutex` C++11 基本的互斥量

2. `timed_mutex` C++11 有超时机制的互斥量

   超时机制: 提供了带超时限制的锁定尝试方法，如 `try_lock_for()` 和 `try_lock_until()`。

3. `recursive_mutex` C++11 可重入的互斥量

   可重入: 指一个线程在已经持有某个互斥体的情况下，能够再次成功获取该互斥体而不会阻塞自己

4. `recursive_timed_mutex` C++11 结合timed_mutex和recursize_mutex特点的互斥量

5. `shared_timed_mutex` C++14 具有超时机制的可共享互斥量

   可共享:支持两种锁定模式：独占（exclusive）模式和共享（shared）模式。多个线程可以同时以共享模式锁定互斥量，但任何时候只有一个线程可以以独占模式锁定。共享模式下提供`try_lock_shared_for()` 和 `try_lock_shared_until()` 方法用于尝试在指定时间内获取共享锁。注意释放共享锁需要使用`unlock_shared()` 

6. `shared_mutex` C++17 共享的互斥量

```cpp
std::mutex g_num_mutex;
g_num_mutex.lock();
//干活
g_num_mutex.unlock();
```

> - **共享锁机制的意义**:允许多个读取事务同时访问同一数据,具备了**更高效的并发读取**，同时保证了**数据一致性**:虽然多个读取线程可以同时持有共享锁，但写入线程必须先获取到 `std::shared_mutex` 的独占锁（即排他锁）。这样，写入操作期间，所有试图获取共享锁的读取线程都会被阻塞，直到写入完成。这种方式确保了读取线程始终能看到一个完整且一致的计数器值，不会出现因写入操作中途而读取到部分更新的数据（即**避免“脏读”**）。
> - **超时锁机制的意义**:获取锁的过程变为**限时等待**,**主动错误处理**,**预防死锁**
> - **可重入锁机制的意义**:递归锁定支持,这对于设计复杂、可能存在嵌套锁需求的代码尤为关键.**简化编程模型**：程序员无需关注锁的递归使用情况，可以直接在需要同步的代码块中重复调用锁定操作，无需手动管理锁的层次结构和释放顺序。

下面提供一个share_lock的使用案例:

```cpp
#include <iostream>
#include <thread>
#include <vector>
#include <shared_mutex>

class SharedCounter {
public:
    int get_value() const {
        std::shared_lock<std::shared_mutex> lock(mutex_);//锁定共享锁(读锁)
        return value_;
    }

    void increment() {
        std::unique_lock<std::shared_mutex> lock(mutex_);//锁定独占锁(写锁)
        ++value_;
    }

private:
    mutable std::shared_mutex mutex_;
    int value_ = 0;
};

int main() {
    SharedCounter counter;

    // 创建多个读取线程
    std::vector<std::thread> reader_threads;
    for (int i = 0; i < 10; ++i) {
        reader_threads.emplace_back([&counter]() {
            for (int j = 0; j < 1000; ++j) {
                std::cout << "Thread " << std::this_thread::get_id() << ": Reading counter value: " << counter.get_value() << '\n';
            }
        });
    }

    // 创建一个写入线程
    std::thread writer_thread([&counter]() {
        for (int i = 0; i < 100; ++i) {
            std::cout << "Writer thread (" << std::this_thread::get_id() << "): Incrementing counter...\n";
            counter.increment();
        }
    });

    // 等待所有读取线程完成
    for (auto& t : reader_threads) {
        t.join();
    }

    // 等待写入线程完成
    writer_thread.join();

    return 0;
}
```

## lock/unlock

一次性允许锁住多把锁,但需要自己解锁

```cpp
std::mutex myMutex1;
std::mutex myMutex2;
std::lock(myMutex1,myMutex2);
//..
myMutex1.unlock();
myMutex2.unlock();
```

`std::lock` 函数接受两个或更多互斥锁作为参数，会以以一种**无死锁的方式同时锁定它们**。这意味着它会采用一种**自旋等待策略（如“循环尝试”算法）**，确保无论线程调度情况如何，都不会导致两个线程互相等待对方释放已锁定的互斥锁而形成死锁。一旦成功锁定两个互斥锁，程序继续执行下一行代码。

# 单次调用

头文件: `#include <mutex>`

**避免在多线程环境下多次执行同一个函数**的快捷实现代码

C++11 中引入的用于确保某个函数只被调用一次的线程安全的函数和类型

- once_flag   一个类型，用于标记一段代码是否已经被执行过。它必须通过引用传递给 `std::call_once` 函数，以确保在多线程环境下仅仅执行一次。

- call_once   

  接受两个参数：一个可调用对象（可以是函数、lambda 表达式等）和一个 `std::once_flag` 对象的引用。该函数会检查 `std::once_flag` 对象是否被设置过，如果没有，就调用可调用对象，并设置 `std::once_flag` 对象为已设置状态。

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::once_flag flag;

void do_something()
{
	//call_once中的 lambda 表达式只执行一次
    std::call_once(flag, []() {
        std::cout << "do_something() called once" << std::endl;
    });

    std::cout << "Thread id" << std::this_thread::get_id() << std::endl;
}

int main()
{
    std::thread t1(do_something);
    std::thread t2(do_something);

    t1.join();
    t2.join();

    return 0;
}

```

如果需要传递参数,直接接在函数名参数后面:(如下)

```cpp
std::once_flag flag;
std::call_once(flag,testOutput,"hello world!");//"hello world!"为参数
```

下面使用`call_once` 函数来保证单例模式在多线程环境中的正确性

```cpp
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>

class Singleton
{
public:
    //使用了 std::call_once 函数，因此在多个线程同时调用时，只有一个线程会创建单例对象 instance_，即只有一个线程执行函数init()
    //其他线程会直接返回之前创建的单例对象 instance_，从而保证单例对象只被创建一次
    static Singleton& getInstance()
    {
        std::call_once(flag_, &Singleton::init);
        return *instance_;
    }

    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;

private:
    Singleton() { std::cout << "Singleton instance created.\n"; }

    static void init()
    {
        instance_ = new Singleton();
    }

    //在类的定义中，一个静态成员变量必须由该类声明为static
    //并且通常还需要在类外初始化，这意味着在类的定义中仅指定其类型和名称
    static std::once_flag flag_;
    static Singleton* instance_;
};

//在 class 外初始化 static 成员变量
std::once_flag Singleton::flag_;
Singleton* Singleton::instance_ = nullptr;

void thread_func()
{
    //调用 Singleton::getInstance() 函数来获取单例对象的引用
    Singleton& singleton = Singleton::getInstance();
    std::cout << "Singleton instance address: " << &singleton << "\n";
}

int main()
{
    std::vector<std::thread> threads;
    const int num_threads = 10;

    for (int i = 0; i < num_threads; ++i)
    {
        //threads将 `thread_func` 函数作为线程函数，创建多个线程并启动它们：
        threads.emplace_back(thread_func);
    }

    for (auto& t : threads)
    {
        t.join();
    }

    return 0;
}
```

# 条件变量

条件变量是允许多个线程相互交流的同步原语。它允许一定量的线程等待（可以定时）另一线程的提醒，然后再继续。条件变量始终关联到一个互斥体。

C++11引入了两种条件变量

- [std::condition_variable](#condition_variable)
- std::condition_variable_any    支持更多的锁，但在一些平台上性能更差,略

## condition_variable

头文件: `#include <condition_variable>`

在C++11中，我们可以使用条件变量（condition_variable）实现多个线程间的同步操作；当条件不满足时，相关线程被一直阻塞，直到某种条件出现，这些线程才会被唤醒。

条件变量是利用线程间共享的全局变量进行同步的一种机制，主要包括两个动作：

- 一个线程因等待"条件变量的条件成立"而挂起
- 另外一个线程使"条件成立",给出信号,从而唤醒被等待的线程

为了防止竞争，条件变量的使用总是和一个[互斥锁](#mutex系列)结合在一起；通常情况下这个锁是`std::mutex`,使用[unique_lock管理锁](#unique_lock)

### 成员函数

- 通知

  - `void notify_one()`  通知一个等待的线程
  - `void notify_call()` 通知所有等待的线程

- 等待

  - `void wait(std::unique_lock<std::mutex>& lock)`  释放互斥锁,阻塞当前线程,直到条件变量被唤醒

    获取互斥锁后，线程应立即检查等待的条件是否确实满足。这是因为唤醒并不意味着条件一定已经变为真，可能存在“**虚假唤醒**”（spurious wakeup）的情况。标准并未规定何时发生虚假唤醒，但实现中可能会出于效率等原因导致这种情况出现。因此，**通常会将 `wait()` 嵌套在一个循环中，循环体内检查条件是否满足，如果不满足则再次调用 `wait()` 继续等待**。

  - wait_for 阻塞当前线程,直到条件变量被唤醒,或到指定时限时长后

    ```cpp
    template< class Rep, class Period >
    std::cv_status wait_for( std::unique_lock<std::mutex>& lock,const std::chrono::duration<Rep, Period>& rel_time );
    //lock	-	必须已经由调用线程锁定的锁
    //rel_time	-	可以等待的最长时长
    ```

  - wait_until 阻塞当前线程,直到条件变量被唤醒,或直到抵达指定时间点

    ```cpp
    template< class Clock, class Duration >
    std::cv_status wait_until( std::unique_lock<std::mutex>& lock,const std::chrono::time_point<Clock, Duration>& abs_time );
    //lock	-	必须已经由调用线程锁定的锁
    //abs_time	-	等待截止的时间点
    ```

- 原生句柄

  - native_handle  返回原生句柄

> 上面的wait_for和wait_until两个函数返回的cv_status类型如下:
>
> ```cpp
> enum class cv_status {
>     no_timeout,//条件变量因notify_all或notify_one被唤醒
>     timeout  //条件变量因时限耗尽被唤醒
> };
> ```
>
> `wait_for`/`wait_until` 函数返回一个 `std::cv_status` 枚举值，用来指示线程是由于何种原因被唤醒的：
>
> - 如果计数器值达到或超过了阈值（即谓词返回 `true`），`wait_for` 会立即返回，返回值为 `std::cv_status::no_timeout`，表示线程是由于条件满足而非超时被唤醒的。
> - 如果在指定时间内计数器值仍未达到阈值，则到达了最大等待时间，`wait_for` 返回 `std::cv_status::timeout`，表示线程是由于超时被唤醒的。
>
> ```cpp
> auto status = cv.wait_for(lock, std::chrono::seconds(5), [threshold = 10]{ return counter >= threshold; });
> switch (status) {
>   case std::cv_status::no_timeout:
>     std::cout << "Thread " << std::this_thread::get_id() << ": Counter reached or exceeded threshold (value: "
>       << counter << ").\n";
>     break;
>   case std::cv_status::timeout:
>     std::cout << "Thread " << std::this_thread::get_id() << ": Timed out waiting for counter to reach threshold (current value: "
>       << counter << ").\n";
>     break;
> }
> ```

生产者消费者案例

```cpp
#include <iostream>
#include <thread>
#include <memory>
#include <functional>       //必须包含这个头文件，否则报错
#include <vector>
#include <list>
#include <mutex>
#include <condition_variable>

using namespace std;

class Task
{
public:
    Task(int taskID)
    {
        this->taskID = taskID;
    }

    void doTask()
    {
        std::cout<<"handle a task,taskID: "<<taskID<<",threadID: "<<std::this_thread::get_id()<<std::endl;
    }

private:
    int taskID;
};

std::mutex                  myMutex;
std::list<Task*>            tasks;
std::condition_variable     mycv;

void* consumer_thread()
{
    Task* pTask = NULL;
    while(true)
    {
        std::unique_lock<std::mutex> guard(myMutex);
        while(tasks.empty())
        {
            //如果发生变化后，如果条件合适，则pthread_cond_wait将直接获得锁
            mycv.wait(guard);
        }

        pTask = tasks.front();
        tasks.pop_front();

        if(pTask == NULL)
            continue;

        pTask->doTask();//任务就是打印自己线程号
        delete pTask;
        pTask = NULL;

    }

    return NULL;
}

void* producer_thread()
{
    int taskID = 0;
    Task* pTask = NULL;
    while(true)
    {
        pTask = new Task(taskID);
        //使用括号减少guard锁的利用范围
        {
            std::lock_guard<std::mutex> sbguard(myMutex);
            tasks.push_back(pTask);
            std::cout<<"produce a task,taskID: "<<taskID<<",threadID :"<<std::this_thread::get_id()<<std::endl;
        }

        //释放信号量，通知消费者线程
        mycv.notify_one();//相当于pthread_cond_signal

        ++taskID;

        //休眠一秒
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    return NULL;
}


int main()
{
    //创建5个消费者线程
    std::thread consumer1(consumer_thread);
    std::thread consumer2(consumer_thread);
    std::thread consumer3(consumer_thread);
    std::thread consumer4(consumer_thread);
    std::thread consumer5(consumer_thread);

    //创建1个生产者线程
    std::thread producer1(producer_thread);

    //回收线程
    producer1.join();
    consumer1.join();
    consumer2.join();
    consumer3.join();
    consumer4.join();
    consumer5.join();

    return 0;
}
```

## 简单测试

### 仅使用互斥体

```cpp
list<int> taskNos;
std::mutex theMutex;
condition_variable cv;
//生产者
void myProducer()
{
    int seed = 0;
    while(1)
    {
        unique_lock<mutex> lock(theMutex);
        taskNos.emplace_back(seed++);
    }
}

//消费者
void myConsumer()
{
    while(1)
    {
        unique_lock<mutex> lock(theMutex);
        if(taskNos.empty())
        {

        }
        else
        {
            cout<<this_thread::get_id()<<"执行No."<<taskNos.front()<<"任务!"<<endl;
            taskNos.pop_front();
        }
    }
}

int main(int argc, const char **argv) {
    thread ttt1(myConsumer);
    thread ttt2(myConsumer);
    thread ttt3(myConsumer);
    thread ttt4(myConsumer);
    thread ttt5(myConsumer);
    thread ttt6(myProducer);
    std::this_thread::sleep_for(std::chrono::seconds(2)); // 等待 2 秒
    return 0;
}
//335072
//368127
//364789
```

平均完成任务数为355996

> 如果只使用互斥量而不引入条件变量，消费者线程可能会陷入**“忙等待”状态**。当任务列表（`taskNos`）为空时，每个消费者线程都会反复尝试锁定互斥锁，检查任务列表是否已非空。这种做法会导致CPU资源的浪费，尤其是在任务生成速度远低于消费者线程消费速度的情况下。

### 使用条件变量

```cpp
list<int> taskNos;
std::mutex theMutex;
condition_variable cv;
//生产者,每秒生产两个货品
void myProducer()
{
    int seed = 0;
    while(1)
    {
        {
            unique_lock<mutex> lock(theMutex);
            taskNos.emplace_back(seed++);
        }
        //通知消费者消费
        cv.notify_one();

    }
}

//消费者
void myConsumer()
{
    while(1)
    {
        unique_lock<mutex> lock(theMutex);
        while(taskNos.empty())
        {
            cv.wait(lock);
        }
        cout<<this_thread::get_id()<<"执行No."<<taskNos.front()<<"任务!"<<endl;
        taskNos.pop_front();
    }
}



int main(int argc, const char **argv) {
    thread ttt1(myConsumer);
    thread ttt2(myConsumer);
    thread ttt3(myConsumer);
    thread ttt4(myConsumer);
    thread ttt5(myConsumer);
    thread ttt6(myProducer);
    std::this_thread::sleep_for(std::chrono::seconds(2)); // 等待 2 秒
    return 0;
}
```

平均完成任务数为381065

测试差别不是很大

> 精确唤醒: 生产者在添加新任务时，通过 `cv.notify_one()` 或 `cv.notify_all()` 唤醒等待的消费者线程。这种精确唤醒机制使得唤醒的线程可以直接进行有效的工作（消费任务），而不是像忙等待那样可能连续多次检查后仍无任务可做。

## notify_all_at_thread_exit函数

在执行一组异步任务的线程中，当所有任务完成后，该线程可以使用 `notify_all_at_thread_exit` 向等待的任务协调者线程发送信号，表示所有任务已完成，无需再轮询或检查任务状态。重点是可以**简化线程清理逻辑**

```cpp
void notify_all_at_thread_exit( std::condition_variable& cond,
                                std::unique_lock<std::mutex> lk );
```

通知其他线程给定的线程已完全完成，包括销毁所有 [`thread_local`](https://zh.cppreference.com/w/cpp/keyword/thread_local) 对象。它操作如下：

1. 将先前获得的锁 lk 的所有权转移到内部存储。
2. 修改执行环境，以令当前线程退出时，如同以 `lk.unlock();`
   `cond.notify_all();` 通知条件变量 cond。

隐含的 lk.unlock 按顺序晚于与当前线程关联的所有拥有线程局域存储期的对象析构。

此部分代码零碎地描绘 `notify_all_at_thread_exit` 能如何用于避免在线程局域对象处于被析构过程时，访问依赖于它们的数据(因为将会在析构掉thread_local 对象后才解锁互斥体,不会看到析构到一半的thread_local变量)

```cpp
#include <cassert>
#include <condition_variable>
#include <mutex>
#include <string>
#include <thread>
 
std::mutex m;
std::condition_variable cv;
 
bool ready = false;
ComplexType result; // 某种任意类型
 
void thread_func()
{
    thread_local std::string thread_local_data = "42";
 
    std::unique_lock<std::mutex> lk(m);
 
    // 用 thread_local 数据赋值给 result
    result = thread_local_data;
    ready = true;
 
    std::notify_all_at_thread_exit(cv, std::move(lk));
 
}   // 1. 销毁 thread_local 对象；
    // 2. 解锁互斥体；
    // 3. 通知 cv。
 
int main()
{
    std::thread t(thread_func);
    t.detach();
 
    // 做其他工作
    // .…
 
    // 等待脱附的线程
    std::unique_lock<std::mutex> lk(m);
    cv.wait(lk, []{ return ready; });
 
    // result 已就绪且 thread_local 析构函数已完成，无 UB
    assert(result == "42");
}
```

# promise\future模型

除了std::thread，我们还可以使用 promise\future模型.

头文件: `#include <future>`

在并发编程中，我们通常会用到一组非阻塞的模型：`promise\future`。在python、js、java中都提供future\promise，是现代语言常用的非阻塞编程模型。

> 与thread的主要区别
>
> - `#include <future>` 主要关注异步任务的提交、结果的获取以及跨线程通信，侧重于任务的异步执行与结果同步，提供了高层级的抽象和便利接口，适用于需要等待异步结果的场景。
> - `#include <thread>` 则专注于线程的创建、管理和同步，提供了底层的线程控制机制，适合直接操作线程以及解决多线程间的同步和通信问题。
>
> future的优势如下:
>
> 1. **异步任务结果的封装与传递**：
>    - `std::future` 和 `std::shared_future` 为异步任务的结果提供了一种标准化、类型安全的封装。通过它们，可以方便地在不同线程之间传递和访问异步任务的最终输出，而无需自行设计和实现复杂的通信机制。这种方式有利于代码的组织和复用，降低了异步编程的复杂度。
> 2. **任务执行策略的灵活性**：
>    - `std::async` 函数允许指定任务的执行策略。例如，可以选择立即在新的线程上执行、推迟至某个适当时机执行（如当前线程空闲时）、或者放入线程池中执行。这种灵活性使得程序员可以根据应用需求和系统资源状况调整任务的调度方式，提高程序的整体效率。
> 3. **异步编程的高级抽象**：
>    - `std::packaged_task` 为异步任务提供了更高级别的抽象。它可以保存一个可调用对象，并生成一个相应的 `std::future`，简化了异步任务的创建和管理。此外，`std::packaged_task` 还支持任务的多次执行和重置，为复杂异步逻辑提供了便利。
> 4. **优雅的异步控制流**：
>    - `std::future` 提供了多种等待机制（如阻塞等待、限时等待、定时等待），使得主线程可以灵活地控制等待异步结果的行为，避免无谓的阻塞。同时，通过 `std::future::get` 方法可以安全地获取并清除异步任务的结果，确保了结果的一次性使用和内存的有效管理。
> 5. **更好的异常处理**：
>    - 当异步任务执行过程中抛出异常时，异常会被存储在对应的 `std::future` 对象中。通过调用 `std::future::get`，可以在适当的位置捕获并处理这些异常，使得异步编程中的异常处理更加可控和统一。

- future表示一个可能还没有实际完成的**异步任务的结果**，针对这个结果可以添加回调函数以便在任务执行成功或失败后做出对应的操作；（回调就是自己写了却不调用，给别人调用的函数）
- promise交由任务执行者，任务执行者**通过promise可以标记任务完成或者失败**；

异步调用创建的时候，会返回一个`std::future`对象实例给异步调用创建方。异步调用执行方持有`std::promise`对象实例。双方持有的`std::promise`对象实例和`std::future`对象实例分别连接一个共享对象，这个共享对象在异步调用创建方和异步调用执行方之间构建了一个信息同步的通道（`channel`)，双方通过这个通道进行异步调用执行情况的信息交互(如图)

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404071103042.png" alt="std::future和std::promise详解(原理、应用、源码）" style="zoom:33%;" />

future\promise编程模型本质上还是message pass（任务线程与主线程消息传递）。在future模型中阻塞和非阻塞都有：**拉起一个新线程**（非阻塞），在主线程`.get()`（阻塞）。整个流程见下图：

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404031544071.jpeg" alt="promise" style="zoom: 50%;" />

message pass的编程范式，先来思考一下有哪几种编写方法：

- 利用条件变量。在任务线程完成时调用`notify_one()`，在主函数中调用`wait()`；
- 利用flag（原子类型）。在任务完成时修改flag，在主线程中阻塞，不断轮询flag直到成功；

上面第一种上锁会带来一定开销，好处是适合长时间阻塞，第二种适合短时间阻塞。

那么c++11 future采用哪一种呢？答案是第二种，future内定义了一个原子对象，主线程通过自旋锁不断轮询，此外会进行`sys_futex`系统调用。futex是linux非常经典的同步机制，锁冲突时在用户态利用自旋锁，而需要挂起等待时到内核态进行睡眠与唤醒。

**实用案例**

```cpp
vector<int> v;
v.emplace_back(1);
v.emplace_back(2);
v.emplace_back(3);
auto f1 = [](std::vector<int> &v,
    unsigned int left, unsigned int right) {
    unsigned long long acm = 0;
    for (unsigned int i = left; i < right; ++i)
    {
        acm += v[i];
    }

    return acm;
};
auto t1 = std::async(f1, std::ref(v),0, v.size() );
//You can do other things here!
unsigned long long acm1 = t1.get();
std::cout << "acm1: " << acm1 << endl;
return 0;
//输出: acm1: 6
```

1. tasks使用`std::async`创建
2. `std::async`的返回值是一个叫`std::future`的类型。别被他的名字唬到，他的意思是t1和t2的值会在未来被真正的赋值。我们通过调用`t1.get()`来获得他的真正的返回值。
3. 如果`future`的返回值还没有准备好（任务还没有计算完成），那么调用get()的主线程会被卡住，直到准备好了返回值（和join()的行为一样）。
4. 注意，我们传递给std::async的函数（实际上是lambda表达式）是有返回值的，这个返回值用过一个叫做`std::promise`的类型来传递。大多数情况下你不需要了解任何`promise`的细节，C++在幕后可以处理好这些事情。
5. 默认的情况下，tasks也会在创建之后立刻运行（有办法来修改这个行为，但是本文没有涉及）。

std::async也同样可以使用

- 函数指针
- 伪函数
- lambda表达式

## future

future类不支持拷贝构造,支持移动语义,C++提供的另一个类`shared_future`支持拷贝,他可用于同时向多个线程发信,允许多个线程等候同一共享状态

`std::future`提供了一个重要方法就是`.get()`，这将阻塞主线程，直到future就绪。注意：`.get()`方法**只能调用一次**。

可以通过下面三个方式来获得`std::future`。

- `std::promise`的get_future函数
- `std::packaged_task`的get_future函数
- `std::async` 函数

### future成员函数

- get  返回回调函数返回的结果
- wait  等待结果变得可用
- wait_for   等待结果，如果在指定的超时间隔后仍然无法得到结果，则返回状态
- wait_until   等待结果，如果在已经到达指定的时间点时仍然无法得到结果，则返回状态
- valid 检查*this是否拥有共享状态
- share  从*this转移共享状态给shared_future并返回它

状态返回有如下:

- future_status::ready   异步操作已经完成；
- future_status::timeout  异步操作超时。
- future_status::deferred   异步操作还没有开始；

```cpp
std::future<int> future = std::async(std::launch::async, [](){
  std::this_thread::sleep_for(3s);
  return 8;
});

std::cout << "waiting...\n";
std::future_status status;
do {
  switch(status = future.wait_for(1s); status) {
    case std::future_status::deferred: std::cout << "deferred\n"; break;
    case std::future_status::timeout: std::cout << "timeout\n"; break;
    case std::future_status::ready: std::cout << "ready!\n"; break;
  }
} while (status != std::future_status::ready);
```

### future的源码实现

```cpp
//只截取上半段
template <class _Rp>
class _LIBCPP_TEMPLATE_VIS _LIBCPP_AVAILABILITY_FUTURE future
{
    __assoc_state<_Rp>* __state_;

    explicit future(__assoc_state<_Rp>* __state);

    template <class> friend class promise;
    template <class> friend class shared_future;

    template <class _R1, class _Fp>
        friend future<_R1> __make_deferred_assoc_state(_Fp&& __f);
    template <class _R1, class _Fp>
        friend future<_R1> __make_async_assoc_state(_Fp&& __f);

public:
    _LIBCPP_INLINE_VISIBILITY
    future() _NOEXCEPT : __state_(nullptr) {}
```

promis的数据成员只有一个`__assoc_state<_RP>* __state_`,该指针指向的是一个状态,该状态对象对应的是promise和future之间的通道.`_Rp`为一步操作返回值的类型(泛型),即该状态对象内部保存并传递异步调用的返回值

#### future构造源码

```cpp
template <class _Rp>
future<_Rp>::future(__assoc_state<_Rp>* __state)
    : __state_(__state)
{
    __state_->__attach_future();
}

```

该构造函数接受一个关联状态对象的地址信息，然后使用该地址信息来初始化内部的`__state_`变量，完成当前`future`到关联状态对象的链接,调用关联状态对象的`__attach_future`成员函数，完成`future`和关联状态对象的链接（`attach`）

#### get函数源码

```cpp
template <class _Rp>
_Rp
future<_Rp>::get()
{
    unique_ptr<__shared_count, __release_shared_count> __(__state_);
    __assoc_state<_Rp>* __s = __state_;
    __state_ = nullptr;
    return __s->move();
}
```

1. 创建一个名为`__`的`unique_ptr`的临时对象，并且将`__state_`托管给该对象，该对象是一个临时对象，将会在`get`函数运行结束的时候进行释放，当该对象释放的时候，将会对通过`__release_shared_count`函数来对`__state_`指向的关联状态对象进行相关的处理
2. 将当前`__state_`的值赋值给临时变量`__s`，将`__state_`进行置空，完成`future`对状态对象的链接的断开
3. 通过调用`__s->move()`来完成对关联状态中异步调用结果的获取，获取完成之后将该值作为`get`函数的返回值进行返回。同时`__s->move()`函数不仅仅是单纯的获取异步调用结果，同时还会判断是否有异步调用的值，如果异步调用没有完成，则会阻塞在`move`函数中，等待异步调用完成  [move的源码参考此处](#move函数源码))

> 上面我们看到在调用`get`方法之后，`future`断开了和关联状态对象的链接，这说明**`future`对象只能调用一次`get`方法来获取**，如果多次调用，其内部`__state_`将为空指针，则会因为对空指针调用`move`方法，造成未定义行为

#### future析构源码

```cpp
template <class _Rp>
future<_Rp>::~future()
{
    if (__state_)
        __state_->__release_shared();
}
```

如果当前`future`有链接状态关联对象，则调用其`__release_shared`成员函数，从而对其内部引用计数进行递减，当其内部引用计数递减至`-1`的时候，将完成自身占用资源的释放

## promise

### 成员函数

- get_future   返回与承诺的结果关联的[future](#future)
- set_value    设置结果为指定值
- set_value_at_thread_exit   设置结果为指定值,同时仅在线程退出时(销毁所有拥有线程区域存储期的变量后)分发提醒
- set_exception   设置结果为指示异常
- set_exception_at_thread_exit  设置结果为指示异常,同时仅在线程退出时(销毁所有拥有线程区域存储期的变量后)分发提醒

### promise的源码实现

```cpp
//只截取了上半部分
template <class _Rp>
class _LIBCPP_TEMPLATE_VIS _LIBCPP_AVAILABILITY_FUTURE promise
{
    __assoc_state<_Rp>* __state_;

    _LIBCPP_INLINE_VISIBILITY
    explicit promise(nullptr_t) _NOEXCEPT : __state_(nullptr) {}

    template <class> friend class packaged_task;
public:
    promise();
    template <class _Alloc>
        promise(allocator_arg_t, const _Alloc& __a);
```

与`future`一致,promis的数据成员只有一个`__assoc_state<_RP>* __state_`,该指针指向的是一个状态,该状态对象对应的是promise和future之间的通道.`_Rp`为一步操作返回值的类型(泛型),即该状态对象内部保存并传递异步调用的返回值

#### promise默认构造函数

```cpp
template <class _Rp>
promise<_Rp>::promise()
    : __state_(new __assoc_state<_Rp>)
{
}
```

只做了:通过`new`操作符构建了一个关联状态对象`__assoc_state<_Rp>`，用这个关联对象的地址信息初始化内部的指针变量`__state_`

#### get_future的源码实现

```cpp
template <class _Rp>
future<_Rp>
promise<_Rp>::get_future()
{
    if (__state_ == nullptr)
        __throw_future_error(future_errc::no_state);//抛出异常
    return future<_Rp>(__state_);
}
```

如果关联了关联状态对象，则通过该关联对象的地址信息来构建`future`对象，返回一个链接该关联状态对象的`future`对象实例

#### set_value的源码实现

```cpp
//两个版本只是分别针对左值和右值
template <class _Rp>
void
promise<_Rp>::set_value(const _Rp& __r)//左值版本
{
    if (__state_ == nullptr)
        __throw_future_error(future_errc::no_state);
    __state_->set_value(__r);
}

template <class _Rp>
void
promise<_Rp>::set_value(_Rp&& __r)//右值版本
{
    if (__state_ == nullptr)
        __throw_future_error(future_errc::no_state);
    __state_->set_value(_VSTD::move(__r));
}
```

如果关联了关联对象实例，则调用关联对象实例的`set_value`成员方法，将`__r`实参传入，完成将异步调用结果写入关联状态对象中（即所链接的通道中）

#### promise析构源码

```cpp
template <class _Rp>
promise<_Rp>::~promise()
{
    if (__state_)
    {
        if (!__state_->__has_value() && __state_->use_count() > 1)
            __state_->set_exception(make_exception_ptr(
                      future_error(make_error_code(future_errc::broken_promise))
                                                      ));
        __state_->__release_shared();
    }
}
```

- `__state_->has_value()`用来判断当前关联状态对象中是否存有异步调用结果信息（即是否被设置值或者异常信息，异常信息后面讨论）；`__state_->use_count()>1`用来判断当前关联状态对象中是否有被其他对象关联（在此处为是否有其他`future`对象关联）；此处`if`内的整体条件判断是用来判断当前关联状态对象中在是否被其他`future`对象所关联的情况下，没有被设定异步调用的结果的相关信息，如果条件成立执行代码行`7~9`的代码，这两行代码是抛出一个`broken_promise`的异常，用来表征当前`promise`是一个坏的（`broken`）`promise`对象（没有兑现承诺）
- 调用`__state_->__release_shared()`来释放对关联状态对象的链接，其背后的逻辑类似于`shared_ptr`中的引用计数，当所有链接关联状态对象的对象都释放链接的时候，该关联状态对象会进行自身资源的释放，占用内存的归还，这部分我们会在后面进行展开讨论

## 内部状态源码

### 关联状态对象的代码实现

`clang`版本的关联对象的实现是通过`3`层继承来实现的，每层继承都对应了一个功能实现的职责，按照继承树的层级从上至下，这`3`层继承分别如下：

1. `__shared_count`：引用计数类，该类用来保存引用计数信息，通过该类内部的引用计数信息来实现自身对象生命周期的管理。用来跟踪链接到自身的`promise`和`future`对象的数量，当没有任何对象链接自身的时候，进行自身资源的释放
2. `__assoc_sub_state`：负责保存管理当前关联状态对象的状态（`constructed`/`attached`/`ready`/`deferred`，随后展开讨论），进行线程之间的同步
3. `__assoc_state`：负责保存异步操作返回值，并且做最终的封装提供最终的接口给`future`和`promise`来使用

#### __assoc_state

只有一个成员`__value_`,用于**存取异步操作返回值**

```cpp
//截取上半
template <class _Rp>
class _LIBCPP_AVAILABILITY_FUTURE _LIBCPP_HIDDEN __assoc_state
    : public __assoc_sub_state
{
    typedef __assoc_sub_state base;
_LIBCPP_SUPPRESS_DEPRECATED_PUSH
    typedef typename aligned_storage<sizeof(_Rp), alignment_of<_Rp>::value>::type _Up;
_LIBCPP_SUPPRESS_DEPRECATED_POP
protected:
    _Up __value_;
```

通过返回值类型`_Rp`构建了一个对应的内存对齐的数据类型`_Up`,理解上可以认为`__value_`的类型就相当于是异步操作返回值的类型

##### set_value源码

```cpp
template <class _Rp>
template <class _Arg>
_LIBCPP_AVAILABILITY_FUTURE
void
__assoc_state<_Rp>::set_value(_Arg&& __arg)
{
    unique_lock<mutex> __lk(this->__mut_);
    if (this->__has_value())
        __throw_future_error(future_errc::promise_already_satisfied);
    ::new ((void*)&__value_) _Rp(_VSTD::forward<_Arg>(__arg));
    this->__state_ |= base::__constructed | base::ready;
    __cv_.notify_all();
}
```

该函数的形参`__arg`是用来接受待设置到关联状态对象内部的异步调用结果的值，该函数是一个万能引用，从而根据传入的实参来自动的进行判断传入的实参是以左值引用的方式传入的还是以右值的方式传入的。从而通过`std::forward`进行完美转发，从而决定是以移动的方式还是拷贝的方式进行实参的接收

- 实例化一个局部的`unique_lock`类型`__lk`临时对象，通过`RAII`技术来持有内部的`__mut_`互斥锁，当该临时对象离开作用域的时候，即函数结束的时候，会在析构的时候对互斥锁`__mut_`进行释放。该`__mut_`锁是用来保存内部数据在并发操作的时的多线程并发安全性的。比如异步操作创建线程和异步操作执行线程同时分别通过`future`和`promise`来从通道中读取和写入值的时候
- 通过调用成员函数`_has_value`来判断当前关联状态对象是否已经被设定值了，即设定了异步调用结果信息，如果已经设定了，此时执行代码，抛出`promise already satisfied`异常，用来告诉调用方该`promise`早已经被兑现了
- 通过`placement new`操作符，在`__value_`上以函数形参`__arg`的值，构建异步调用返回值对象。这里之所以采用`placement new`是因为用来保存返回值的内存早就已经存在，即内部的`__value_`成员变量，这行代码要做的只是在这个内存上进行对象的构建，而不需要通过`new`那样先申请内存，然后在申请的内存上进行对象的构建
- 设置当前关联对象的状态为`constructed`，表征当前关联状态对象内部已经构建了异步调用的结果的值；以及设置当前关联对象的状态为`ready`，用来表征当前关联状态对象已经处于就绪（`ready`）状态，`future`对象可以通过`get`立刻获取到异步调用的结果信息
- 调用内部的`__cv_`条件变量（`conditional variable`），用来通知因为在关联状态对象没有`ready`的时候因为调用`future`对象的`get`方法而阻塞的线程，唤醒这些线程继续获取异步调用的结果信息

##### move函数源码

```cpp
template <class _Rp>
_Rp
__assoc_state<_Rp>::move()
{
    unique_lock<mutex> __lk(this->__mut_);
    this->__sub_wait(__lk);
    if (this->__exception_ != nullptr)
        std::rethrow_exception(this->__exception_);
    return _VSTD::move(*reinterpret_cast<_Rp*>(&__value_));
}
```

- 声明一个`unique_lock`类型的临时对象`__lk`来对内部的`__mut_`互斥量进行上锁，从而对关联状态对象内部的数据进行并发保护
- 通过调用`__sub_wait`成员函数（该成员函数是从基类继承来的），该成员函数内部对关联状态对象的值的状态进行判断，如果处于就绪状态，即已经可以允许`future`来获取值的状态，则会接着向下执行。如果没有处于就绪状态，则会在此处阻塞知道状态就绪，这就是`wait`的含义
- 判断关联状态内部是否保存异步调用执行过程中抛出的异常信息，进行该异常的重新抛出，**完成异常从异步调用线程到异步调用创建方线程的传递**。此处为异常安全的设计需求，[后续展开讨论](#future和promise之间的异常安全)
- 以移动的方式返回关联状态对象内部的异步调用结果

该函数在[future::get](#get函数源码)中被引用

##### __on_zero_shared源码

该关联对象还有一个函数`__on_zero_shared`，该函数是对其基类`__shared_count`的同名虚函数的实现（重写）。该函数在内部引用计数递减至`-1`的时候，即没有任何`promise`或者`future`对象链接该关联状态对象的时候，调用该函数，完成对自身资源的释放

```cpp
template <class _Rp>
void
__assoc_state<_Rp>::__on_zero_shared() _NOEXCEPT
{
    if (this->__state_ & base::__constructed)
        reinterpret_cast<_Rp*>(&__value_)->~_Rp();
    delete this;
}
```

- 判断当前关联对象内部是否构建了保存异步调用对象返回值的变量，如果构建了调用其析构函数。注意这里是调用析构函数，并没有释放内存，因为该值是保存在关联状态对象内部成员变量中，会随着状态对象自身的释放而释放
- 对自身占用的资源进行释放

### __assoc_sub_state

```cpp
//只截取上半截
class _LIBCPP_TYPE_VIS _LIBCPP_AVAILABILITY_FUTURE __assoc_sub_state
    : public __shared_count
{
protected:
    exception_ptr __exception_;
    mutable mutex __mut_;
    mutable condition_variable __cv_;
    unsigned __state_;

    void __on_zero_shared() _NOEXCEPT override;
    void __sub_wait(unique_lock<mutex>& __lk);
public:
    enum
    {
        __constructed = 1,
        __future_attached = 2,
        ready = 4,
        deferred = 8
    };
```

- `__exception_`用来保存异步调用时抛出的异常信息，该异常信息会在异步操作创建方线程调用[future::get](#get函数源码)方法的时候，重新在该线程抛出，从而完成异常信息在异步调用线程和其创建线程之间传递

- `__mut_`互斥量，用来实现关联状态对象内部数据的线程安全，保证并发安全

- `__cv_`条件变量，用来实现异步调用线程和异步调用创建方线程之间的同步

- `__state_`用来记录关联状态对象当前的状态，下面我们先展开说一下这个状态

  `__state_`是用来被记录当前关联状态对象的状态的，其是按照位来存储的，初始状态下`__state_`初始值为`0`，代表所有状态位都为`false

  - `__constructed`：对应`bit0`，是用来表示内部已经**构建**保存了异步调用操作的结果值
  - `__future_attached`：对应`bit1`，是用来表示当前关联状态对象已经被`future`对象所链接（`attached`）
  - `ready`：用来表示当前关联状态对象处于就绪（`ready`）状态，链接该对象的`future`对象可以通过调用`get`方法来立刻获取到该异步调用的结果相关信息（获取到异步调用的返回值或者异步调用时发生的异常）
  - `deferred`：用来表示这是一个推迟执行的“异步调用”，这块后边章节会单独介绍，这种推迟调用，是当前不即可求值也不会在其他线程进行并发求值，而是在使用`future`进行`get`的时候，在`get`的时候，在`get`调用的线程进行同步求值

[上述源码转载于此,更多详解参考此处](https://zhuanlan.zhihu.com/p/672327290)

## async

 是一个模板函数，接收一个回调（回调函数或可调用对象）作为参数，并异步执行。

```cpp
template <class Fn, class... Args>
future<typename result_of<Fn(Args...)>::type> async (launch policy, Fn&& fn, Args&&... args);
```

- `launch policy` :其控制 `syd::async` 的异步行为。有三种 launch policy 可选：
  - `std::launch::async` ：保证行为是异步的 - 强制这个异步任务在 **新线程**上执行，在调用`std::async()`函数的时候就开始创建线程
  - `std::launch::deferred` ：行为是非异步的 - 会在其他线程调用 future 的 `get()` 时被调用传入的回调函数.如果`wait()`和`get()`**没有调用**，则不会创建新线程，也不执行函数
  - `std::launch::async | std::launch::deferred` ：程序会根据系统情况自动决定是同步还是异步，开发者无法手动控制。(不指定的情况下默认这种)
- `fn` :回调函数可以是函数指针、函数对象和 lambda 表达式
- `args`:回调函数的参数

> `std::async`比`std::thread`更安全！`std::thread`当创建太多线程时，会导致创建失败，进而程序崩溃。

async会做下面三件事:

1. 自动创建一个新线程（或者是从其内部的线程池中拿一个线程）和一个 `promise` 对象
2. 向新线程中的函数传入 `std::promise` 对象，并返回与之关联的 `std::future` 对象
3. 在函数运行结束后，设置 `std::promise` 对象的值，我们即可通过 `std::future` 获取返回值

> **async的get函数会返回回调函数中return的值**

**缺点**

1. 局限性挺大,对服务器开发来说用得到的机会并不多
2. 结果单一

### 不使用async实现类似效果案例

```cpp
//创建一个promise对象实例
promise<int> thePromise;
//从promise对象实例中获取对应的future对象实例
future<int> theFuture = thePromise.get_future();//建立通道
//构建测试对象
vector<int> test_data = {1,2,3,4,5,6};
//创建一个任务,该任务为对容器内的所有元素进行求和,求和完成之后通过promise来返回结果
auto sum_of_data = [](const vector<int> data,promise<int> prom){
  int sum = accumulate(data.cbegin(),data.cend(),0);
  this_thread::sleep_for(chrono::milliseconds(1000));//休眠1000毫秒
  prom.set_value(sum);//兑现承诺,将结果写入通道中
};
//将这个任务交给一个线程,进行异步执行
cout<<"create thread"<<endl;
//将这个任务交给一个线程,进行异步操作
thread work_thread(sum_of_data,test_data,move(thePromise));
//通过future的get方法来获取异步调用执行结果
cout<<"result is "<<theFuture.get()<<endl;
//等待work_thread退出销毁完成
work_thread.join();
```

上述创建了一个`promise`对象，并且从该对象实例中获取到了用于获取承诺兑现的值的`std::future`对象实例，这样就构建了一个异步调用创建方（发起方）和异步调用执行方之间用于传递异步调用结果的**数据通道**

在异步调用任务中，完成计算之后，通过`std::promise::set_value`来进行**承诺兑现**，将异步调用的结果写入通道中。异步调用创建方通过`std::future`中的`get`方法来获取异步调用的结果

**由此可见,`async` 可以理解为是 future 和 thread 的高级封装**

### 回调参数

与[thread定义支持的回调参数](#线程函数参数)是一模一样的

- [函数作为回调参数](#函数作为回调参数案例)
- [成员函数作为回调参数](#成员函数作为回调参数案例)
- [函数对象作为回调参数](#函数对象作为回调参数案例)
- [Lambda表达式作为回调参数](#Lambda表达式作为回调参数案例)

#### 函数作为回调参数案例

```cpp
#include <iostream>
#include <string>
#include <chrono>
#include <thread>
#include <future>

using namespace std;
using namespace std::chrono;
std::string fetchDataFromDB(std::string recvdData)
{
    // 模拟耗时的数据库查询操作，让该函数运行五秒
    std::this_thread::sleep_for(seconds(5));
    return "DB_" + recvdData;
}
std::string fetchDataFromFile(std::string recvdData)
{
    // 模拟耗时的本地数据读取操作，让该函数运行五秒
    std::this_thread::sleep_for(seconds(5));
    return "File_" + recvdData;
}

int main(int argc, char const *argv[])
{
    // 获取开始时间
    system_clock::time_point start = system_clock::now();
    std::future<std::string> resultFromDB = std::async(std::launch::async, fetchDataFromDB, "Data");
    // 从本地文件获取数据
    std::string fileData = fetchDataFromFile("Data");
    // 从数据库获取数据
    // 代码会在此处阻塞，直到 future<std::string> 对象中的数据就绪
    std::string dbData = resultFromDB.get();
    // 获取结束时间
    auto end = system_clock::now();
    auto diff = duration_cast < std::chrono::seconds > (end - start).count();
    std::cout << "总耗时 = " << diff << " 秒" << std::endl;
    // 混合数据
    std::string data = dbData + " :: " + fileData;
    // 打印混合数据
    std::cout << "Data = " << data << std::endl;
    return 0;
}
//输出为:
//总耗时 = 5 秒
//Data = DB_Data :: File_Data
```

两个5秒操作使用并发后只需5秒解决

#### 成员函数作为回调参数案例

```cpp
struct DataFetcher
{
    string test(int no)
    {
        cout<<"succeed!"<<endl;
        nn=10;
        cout<<no<<endl;
        return "succeed2";
    }
    public:
    int nn=3;
};
DataFetcher d;
cout<<"d.nn = "<<d.nn<<endl;
auto res = async(&DataFetcher::test,&d,1000);//d前面是否带&或者ref包裹,决定了是否会以引用传递d的对象,在此案例中决定了nn是否可以真正被改变
cout<<res.get()<<endl;
cout<<"d.nn = "<<d.nn<<endl;
/*
输出:
d.nn = 3
succeed!
1000
succeed2
d.nn = 10
*/
```

#### 函数对象作为回调参数案例

```cpp
/*
 * 函数对象
 */
struct DataFetcher
{
    std::string operator()(std::string recvdData)
    {
        // 模拟耗时操作，需要运行五秒
        std::this_thread::sleep_for (seconds(5));
        // 做一些获取数据相关的操作
        return "File_" + recvdData;
    }
};
// 使用函数对象调用 std::async
std::future<std::string> fileResult = std::async(DataFetcher(), "Data");
cout<<fileResult.get()<<endl;
```

#### Lambda表达式作为回调参数案例

```cpp
// 使用 Lambda 表达式作为回调函数，调用 std::async
std::future<std::string> resultFromDB = std::async([](std::string recvdData){
                        std::this_thread::sleep_for (seconds(5));
                        // 做一些数据库查询相关的操作
                        return "DB_" + recvdData;
                    }, "Data");
cout<<resultFromDB.get()<<endl;
```

### async的右值析构问题

> 当async函数的返回值不被任何变量接收时，返回值将会被临时对象接收，这个临时对象在当前语句结束时会被销毁。如果该返回值是一个异步任务（比如future或promise），在其析构时可能会导致阻塞。这是因为异步任务通常会在析构时等待其关联的任务完成，以确保资源的正确释放。因此，如果**不及时处理异步任务的返回值，可能会导致程序出现阻塞现象**。为避免这种情况，建议在async函数调用后立即将返回值赋给一个变量，以确保异步任务能够正常执行并完成

```cpp
std::cout << "Test 1 start" << std::endl;
auto fut1 = std::async(std::launch::async, [] { std::this_thread::sleep_for(std::chrono::milliseconds(5000)); std::cout << "work done 1!\n"; 
                                               return 1;}); // 这一步没有阻塞，因为async的返回的future对象用于move构造了fut1，没有析构

std::cout << "Work done - implicit join on fut1 associated thread just ended\n\n";

std::cout << "Test 2 start" << std::endl;
std::async(std::launch::async, [] { std::this_thread::sleep_for(std::chrono::milliseconds(5000)); std::cout << "work done 2!" << std::endl; });// 这一步阻塞了！因为async返回future对象是右值，将要析构，而析构会阻塞
std::cout << "This shold show before work done 2!?" << std::endl;
return 0;
/*
输出:
Test 1 start
Work done - implicit join on fut1 associated thread just ended

Test 2 start
work done 2!
work done 1!
This shold show before work done 2!?
*/
```

## future和promise之间的并发安全和线程同步

其`API`的内部是通过互斥量对内部状态进行保护，从而实现了线程安全。通过条件变量来实现的线程同步。并且**一个关联状态对象在一个时刻只能被一个`future`和一个`promise`所链接**，如果被多个链接则会抛出异常

并且,异步操作创建方只能调用一次`future::get`来获取异步调用的结果信息，这是因为[future::get函数内部](#get函数源码)，会断开`future`对象与关联状态对象之间的链接

> 值得一提的是,future对象析构时如果没有调用get接口,通常不会阻塞当前进程
>
> 仅当满足以下所有条件时,才会阻塞:
>
> 1. 这个共享状态是通过调用`async`创建的
> 2. 共享状态目前没有处于就绪状态(因此在等待他就绪才能释放)
> 3. 当前对象是最后一个引用该共享状态对象的对象
>
> 上面说的实际上就是[这里的情况:async的右值析构问题](#async的右值析构问题)

## future和promise之间的异常安全

> 在C++中，`std::promise`和`std::future`可以用来在两个线程之间传递数据。当我们在一个线程中设置`std::promise`的值时，我们可以在另一个线程中获取这个值，这是通过`std::future`实现的。这种机制也可以用来在两个线程之间传递异常。
>
> 如果在设置`std::promise`的值时发生了异常，这个异常会被存储并传递给`std::future`。当我们试图从`std::future`中获取值时，**如果有异常被捕获，那么这个异常会被重新抛出**。

`promise`和`future`进行异步调用结果信息同步的这个机制，从代码上的设计就是异常安全的。这里面的异常安全设计主要在两个方向：

1. 首先相关的`API`接口和函数实现需要是异常安全的，即软件内部如果出现异常的时候，**函数异常返回的时候不能出现内存泄漏，资源未正确释放等异常情况**
2. 其次异步调用的时候，如果产生异常可以通过`promise`和`future`以及关联状态对象，**将异常从异步操作执行线程传递到异步操作创建方所在线程中**  原因参考此: [future::get](#get函数源码)  ->  [__assoc_state::move](#move函数源码)

> 当一个函数抛出异常的时候，该异常会沿着调用链逐级向上返回，当异常返回到调用链的最高层级这个逐级向上返回的过程中，没有对异常进行捕捉处理，此时会导致程序终止。这里面异常是沿着调用链逐级向上传递的，这也就说明异常只能在产生异常的线程内部进行逐级向上传递（因为函数调用链的各个层级必然属于一个线程）
>
> 而这里，构建一个`future`和`promise`传递异常的通道的原因是由于异步调用是在另外一个线程执行异步操作，但是在另外一个线程进行异步调用结果信息获取，如果异步调用执行过程中出现异常，那么此时这个异常信息也是异步调用执行结果的一种表现形式，那么此时如果不捕获这异常通过构建的通道传递给异步调用结果信息使用线程，这个异常将会在异步调用线程被传递，在异步调用结果使用线程中无法捕捉这一异常信息（因为不会传递到该线程）。那么该线程就无法了解异步调用操作异常返回这一信息

为了实现这两点:

- 针对第一点:为了保证在函数异常返回的时候，不能出现资源泄露。通常为了实现这点有一个有效的途径就是在函数内使用`RAII`计数来管理资源
- 针对第二点:实现的流程在[future::get](#get函数源码)  ->  [__assoc_state::move](#move函数源码) ,

```cpp
int main(int argc, char const *argv[])
{
    //创建一个promise对象实例
    promise<int> thePromise;
    //从promise对象实例中获取对应的future对象实例
    future<int> theFuture = thePromise.get_future();
    //创建一个会产生异常的异步任务
    auto throw_exp_task = [](promise<int> prom){
        try
        {
            throw std::out_of_range("this is a test exception");
        }
        catch(...)
        {
            prom.set_exception(std::current_exception());
        }  
    };
    //将这个任务交给一个线程,进行异步执行
    thread work_thread(throw_exp_task,move(thePromise));
    try
    {
        theFuture.get();
    }
    catch(const std::exception& e)
    {
        cerr<<e.what()<<endl;
    }
    work_thread.join();

    return 0;
}
//输出:this is a test exception
```

在上述代码中，我们在`throw_exp_task`中抛出了一个异常，然后将这个异常传递给了`std::promise`对象。当我们试图从`std::future`对象中获取值时，这个异常被重新抛出，然后我们在`main`函数中捕获了这个异常。这就是如何在两个线程之间传递异常。

## packaged_task

`std::packaged_task`在C++中起到的作用是包装一个可调用目标（如函数、lambda表达式、bind表达式或函数对象），使其成为一个可以异步执行的任务，并且能够通过`std::future`来获取其执行结果或捕获抛出的异常。具体来说，`std::packaged_task`的主要作用包括：

> 提供了下面的功能:
>
> - 结果同步与访问
> - 任务重用与重置
> - 线程退出时设置结果
> - 统一接口与封装

**封装可调用对象**： `std::packaged_task`模板接受一个可调用对象作为模板参数，如`std::packaged_task<int(double)>`表示包装一个接收一个`double`参数并返回一个`int`值的可调用对象。通过构造函数或赋值操作符将实际的可调用对象传入`packaged_task`实例，如：

```cpp
std::packaged_task<int(double)> task([](double x) { return static_cast<int>(x * 2); });
```

**结果同步与访问**： 与`packaged_task`关联的执行结果可以通过调用其`get_future()`成员函数获得一个`std::future`对象。这个`future`对象提供了接口来查询任务是否已完成、阻塞等待结果准备就绪、非阻塞尝试获取结果、获取结果（阻塞直到结果可用）以及捕获可能抛出的异常。例如：

```cpp
std::future<int> result_future = task.get_future();
// ...
int result = result_future.get();  // 阻塞，直到任务执行完毕并获取结果
```

**任务重用与重置**： 如果需要重新使用同一个`packaged_task`实例包装不同的可调用对象或再次执行相同的任务，可以调用`reset()`成员函数。这将清除之前任务的状态，允许重新设置新的可调用对象并再次执行。注意，`reset()`会丢弃之前任务的执行结果或未处理的异常。

**线程退出时设置结果**： 在某些情况下，可能希望在当前线程即将退出时才令`packaged_task`的结果就绪。这时可以使用`make_ready_at_thread_exit()`成员函数，它会在当前线程结束时，且所有线程局部对象被销毁后，使与`packaged_task`关联的`future`对象准备就绪。

类似于`funciton`, `packaged_task`可以绑定一个可调用对象并执行,但是它的返回类型是`void`，获取它的返回值必须用`future`:

```cpp
int main()
{
    // 如何给它传入固定参数, 而不必在调用时指定:使用bind函数
    std::packaged_task<int(int)> t(factorial);
    std::packaged_task<int()> t(std::bind(factorial, 6));

    // do something else

    t(); // in a different context， always return void
    int x = t.get_future().get();//获取返回值
    std::cout << x << std::endl;
    return 0;
}
```

它和`function`的不同之处在于`packaged_task`把一个可调用对象链接到了未来，用于多线程执行

# 原子库

> `std::atomic`类型位于`<atomic>`头文件中，是一种特殊的模板类型，旨在提供对单个变量的无锁原子访问。在多线程环境中，当多个线程需要访问同一个变量时，如果该变量被声明为`std::atomic`类型，那么对该变量的所有操作都将自动成为原子操作。
>
> 独特的优势盘点:
>
> 1. **细粒度同步**:允许对基本数据类型和用户定义类型进行原子更新
> 2. **无锁编程**:使用原子库可以编写出更高效、无阻塞的并发代码，减少上下文切换和锁争抢带来的性能损失
> 3. **内存模型支持:**支持定义内存顺序约束，如 `std::memory_order_acquire`、`std::memory_order_release` 等
> 4. **低级别构建块**：原子库提供的是并发编程的基础构建块，可以用来构建更复杂的同步原语和数据结构
> 5. **硬件级别的原子性**:原子库通常利用底层硬件提供的原子指令来实现其功能，这些指令在硬件层面确保了操作的不可分割性。对于某些关键的、需要绝对一致性的操作（如引用计数、状态标志更新等），使用原子库提供的操作比单纯依靠操作系统或语言级别的同步机制更能确保操作的正确完成。
> 5. **避免死锁**
>
> 局限性:
>
> 主要适用于简单的数据共享场景，如单一变量的读写。对于更复杂的同步需求，比如需要保持多个变量之间的一致性，无锁编程无法有效应对,需要回到更传统的同步机制，如[互斥锁](#mutex系列)或[条件变量](#条件变量)

在原子性操作库中，每个原子变量都有以下几个特点：

1. 原子变量的读写操作是原子的，即不会被其他线程中断。
2. 原子变量的值可以被多个线程同时访问和修改。
3. 原子变量的修改操作是按照一定顺序进行的，保证了多个线程对同一个变量进行操作时的正确性。

原子性操作库中提供了一系列的原子操作函数，包括load、store、exchange、compare_exchange等。load函数用于读取原子变量的值，store函数用于设置原子变量的值，exchange函数用于交换原子变量的值，而compare_exchange函数用于比较并交换原子变量的值

## 原子变量

原子性操作库(atomic)提供了多种类型的原子变量，包括`bool` 、`char`、`short`、`int`、`long`、`long long`等基本数据类型，以及`intmax_t`、`uintmax_t`、`intptr_t`等扩展类型。每个原子变量都有对应的原子类型，比如`atomic_bool`、`atomic_char`、`atomic_int`等。在使用时，我们需要根据实际的需求选择合适的原子类型和原子变量。

### 原子类型

下面是原子性操作库中支持的一些原子类型：

| 原子类型         | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| atomic_bool      | 原子布尔型，只能存储true或false。                            |
| atomic_char      | 原子字符型，相当于char类型。                                 |
| atomic_uchar     | 原子无符号字符型，相当于unsigned char类型。                  |
| atomic_schar     | 原子有符号字符型，相当于signed char类型。                    |
| atomic_short     | 原子短整型，相当于short类型。                                |
| atomic_ushort    | 原子无符号短整型，相当于unsigned short类型。                 |
| atomic_int       | 原子整型，相当于int类型。                                    |
| atomic_uint      | 原子无符号整型，相当于unsigned int类型。                     |
| atomic_long      | 原子长整型，相当于long类型。                                 |
| atomic_ulong     | 原子无符号长整型，相当于unsigned long类型。                  |
| atomic_llong     | 原子长长整型，相当于long long类型。                          |
| atomic_ullong    | 原子无符号长长整型，相当于unsigned long long类型。           |
| atomic_wchar_t   | 原子宽字符型，相当于wchar_t类型。                            |
| atomic_char16_t  | 原子16位字符型，相当于char16_t类型。                         |
| atomic_char32_t  | 原子32位字符型，相当于char32_t类型。                         |
| atomic_intmax_t  | 原子最大宽度整数类型，对应<inttypes.h>中的intmax_t类型。     |
| atomic_uintmax_t | 原子最大宽度无符号整数类型，对应<inttypes.h>中的uintmax_t类型。 |
| atomic_intptr_t  | 原子指针宽度整数类型，对应<stddef.h>中的intptr_t类型。       |
| atomic_uintptr_t | 原子指针宽度无符号整数类型，对应<stddef.h>中的uintptr_t类型。 |
| atomic_size_t    | 原子size_t类型，用于表示对象的大小。                         |
| atomic_ptrdiff_t | 原子ptrdiff_t类型，用于表示两个指针之间的距离。              |

当我们去看这些类型的定义时会发现，起始它们都是用`atomic<T>`模板来定义的。例如`std::atomic_llong`就是用`std::atomic<long long>`来定义的。

C++11 的原子标准不保证其在每个平台上的实现都是无锁的，因此最好要清楚你的平台和工具链的能力。你可以调用 `std::atomic<>::is_lock_free` 来确认一下。

```cpp
#include <atomic>
#include <iostream>
#include <bitset>
std::atomic_llong total = 0;            // atomic_llong相当于long long，但是本身就拥有原子性,意味着多个线程访问total时，有且仅有一个线程能对total进行操作
//long long total = 0;				//不是线程安全的
void func()
{
    for (long long i = 0; i < 100000000LL; ++i)
    {
        total += i;
    }
}

int main() {
    std::thread t1(func);
    std::thread t2(func);

    t1.join();
    t2.join();

    std::cout << total << std::endl;     // 9999999900000000
}
//total如果定义为long long类型,输出的结果将是:5035590076049140
//输出:9999999900000000
```

### 哪些类型适用于原子操作

并非所有数据类型都适用于原子操作,要成为原子类型,数据类型必须满足以下条件:

- **可拷贝性**：**类型必须是可拷贝的**，意味着它可以通过简单的内存复制来复制或移动，没有复杂的内部状态。
- **固定大小**：**类型的大小必须是固定的且足够小**，以便硬件能够保证其操作的原子性。
- **对齐要求**：**正确的内存对齐是必要的**，以确保原子操作的正确性和效率。

> 整数类型和指针类型通常适用于原子操作，而大型结构体或类实例可能不适合

## 原子类型函数

**注意**：**原子类型和原子操作函数需要包含 `<atomic>` 头文件才能使用**。

C++11中将原子操作定义为atomic模板类的成员函数，包括了大多数类型的操作，比如读写、交换等。对于内置类型，主要通过重载全局操作符来实现。下面列出所有atomic类型及其支持的相关操作列表：

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404080916307.png" alt="img" style="zoom: 67%;" />

下面是常用的原子类型函数：

| 函数                      | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| load()                    | 原子读取操作，用于获取原子变量的当前值。                     |
| store()                   | 原子写入操作，用于设置原子变量的值。                         |
| exchange()                | 原子交换操作，用于交换原子变量的值，并返回原始值。           |
| compare_exchange_weak()   | 条件性原子地替换原子对象的值                                 |
| compare_exchange_strong() | 条件性原子地替换原子对象的值                                 |
| fetch_add()               | 原子加法操作，用于增加原子变量的值，并返回原始值。           |
| fetch_sub()               | 原子减法操作，用于减少原子变量的值，并返回原始值。           |
| fetch_and()               | 原子按位与操作，用于按位与原子变量的值，并返回原始值。       |
| fetch_or()                | 原子按位或操作，用于按位或原子变量的值，并返回原始值。       |
| fetch_xor()               | 原子按位异或操作，用于按位异或原子变量的值，并返回原始值。   |
| fetch_min()               | 原子最小值操作，将原子变量与给定值比较，并将较小的值存储在原子变量中。返回原始值。 |
| fetch_max()               | 原子最大值操作，将原子变量与给定值比较，并将较大的值存储在原子变量中。返回原始值。 |
| fetch_mul()               | 原子乘法操作，将原子变量与给定值相乘，并将结果存储在原子变量中。返回原始值。 |
| fetch_div()               | 原子除法操作，将原子变量与给定值相除，并将结果存储在原子变量中。返回原始值。 |
| fetch_and_not()           | 原子按位与非操作，对原子变量进行按位与非运算，并将结果存储在原子变量中。返回原始值。 |
| fetch_negate()            | 原子取反操作，对原子变量进行取反运算，并将结果存储在原子变量中。返回原始值。 |
| fetch_bitwise_and()       | 原子按位与操作，将原子变量与给定值进行按位与运算，并将结果存储在原子变量中。返回原始值。 |
| fetch_bitwise_or()        | 原子按位或操作，将原子变量与给定值进行按位或运算，并将结果存储在原子变量中。返回原始值。 |
| fetch_bitwise_xor()       | 原子按位异或操作，将原子变量与给定值进行按位异或运算，并将结果存储在原子变量中。返回原始值。 |
| is_lock_free()            | 判断是否是无锁的                                             |

**注意**：**以上函数只是原子类型库中的一部分函数**，还有其他函数可用于更复杂的操作，具体取决于你的需求。

### 使用示例

```cpp
#include <atomic>
#include <iostream>
int main() {
    std::atomic_int counter(0); // 创建一个原子整型变量并初始化为0,相当于atomic<int> counter=0;
    counter++; // 原子操作：递增counter的值,相当于counter.fetch_add(1);
    int value = counter.load(); // 原子操作：读取counter的值,相当于int value = counter;
    std::cout << "Counter value: " << value << std::endl;
    counter.store(10); // 原子操作：将counter的值设置为10,等价于counter = 10;
    bool exchanged = counter.compare_exchange_weak(value, 5); // 原子操作：比较并交换counter的值
    if (exchanged) {
        std::cout << "Value exchanged successfully!" << std::endl;
    } else {
      
        std::cout << "Value exchange failed!" << std::endl;
    }
    return 0;
}
```

**通过使用原子类型和原子操作，我们可以确保多线程环境下对共享变量的安全访问和修改**。

### 特殊的atomic_flag

**atomic_flag** 与其他类型不同,他是**无锁**的(lock_free)

atomic_flag只支持test_and_set以及clear两个成员函数

- `test_and_set函数`   检查 std::atomic_flag 标志，如果 std::atomic_flag 之前没有被设置过，则设置 std::atomic_flag 的标志，并返回先前该 std::atomic_flag 对象是否被设置过，如果之前 std::atomic_flag 对象已被设置，则返回 true，否则返回 false；
- `clear函数`   清除 std::atomic_flag 标志使得下一次调用 std::atomic_flag::test_and_set 返回 false。

可以用这两个函数来实现一个自旋锁：

```cpp
atomic_flag flag;
void func1()
{
    while (flag.test_and_set(std::memory_order_acquire))    // 在主线程中设置为true，需要等待t2线程clear
    {
        std::cout << "wait" << std::endl;
    }

    std::cout << "do something" << std::endl;
}

void func2()
{
    std::cout << "start" << std::endl;
    flag.clear();
}

int main() {
    flag.test_and_set();             // 设置状态
    std::thread t1(func1);
    this_thread::sleep_for(chrono::seconds(5));
    std::thread t2(func2);
    t1.join();
    t2.join();
    return 0;
}
```

代码中，线程t1调用test_and_set一直返回true(因为在主线程中被设置过)，所以一直在等待，而等待一段时间后当线程t2运行并调用了clear，test_and_set返回了false退出循环等待并进行相应操作。这样一来，就实现了一个线程等待另一个线程的效果。

## memory_order的枚举值

> 在多线程程序中，不同线程对内存的读写操作可能导致意想不到的结果，这主要是因为**现代计算机系统和编译器通常会对操作进行重排序，以优化性能和资源利用率**。
>
> 重排序的影响:
>
> 1. **处理器重排序**：为了提高执行效率，处理器可能会改变指令的执行顺序，只要这种重排序不影响单线程内的程序语义。
> 2. **编译器优化**：编译器同样可能为了优化而改变代码的执行顺序。
>
> 这种重排序在单线程程序中通常是安全的，但在多线程环境下，它可能导致数据竞争和不一致的内存状态。
>
> **内存顺序（Memory Ordering），是一种规则，它定义了操作的可见性和执行顺序，是确保多线程程序正确性的关键**。在C++中，这些规则通过原子操作的内存顺序标志来实现。

在C++11中一共有6种memory_order枚举值，**默认按照memory_order_seq_cst执行**:

<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404081028074.png" alt="memory" style="zoom:67%;" />

如下:

```cpp
a.store(1, std::memory_order_relaxed);//std::memory_order_relaxed表示松散内存顺序，该枚举值代表编译器可以任由编译器重新排序或者由处理器乱序处理
```

不是所有memory_order枚举值都能被atomic成员函数使用:

- store函数可以使用memory_order_seq_cst、memory_order_release、memory_order_relaxed。
- load函数可以使用memory_order_seq_cst、memory_order_acquire、memory_order_consume、memory_order_relaxed。
- 需要同时读写的操作，例如test_and_flag、exchange等操作。可以使用全部6种:memory_order_seq_cst、memory_order_rel、memory_order_release、memory_order_acquire、memory_order_consume、memory_order_relaxed。

原子类型提供的一些操作符都是`memory_order_seq_cst`的封装，所以他们都是[顺序一致性](#顺序一致性的核心概念)的。

### 顺序一致性的核心概念

顺序一致性是并发编程中最直观、最易理解的内存模型。它遵循两个基本原则：

1. **操作顺序**：在单个线程内部，所有操作（包括原子操作和非原子操作）的执行顺序与程序代码中的顺序相符。
2. **全局顺序**：程序中所有原子操作都存在一个全局的顺序，所有线程都能观察到这一相同的顺序。

这意味着，使用 `std::memory_order_seq_cst` 的原子操作仿佛在一个单线程环境中执行一样，其执行顺序清晰且易于预测。

> std::atomic和**std::memory_order只有在多cpu多线程情况下，无锁编程才会用到**。在x86下，由于是strong memory order的，所以很多时候只需要考虑编译器优化；保险起见，可以用std::atomic，他会同时处理编译器优化和cpu的memory order（虽然x86用不到）。但是在除非必要的情况下，不用使用std::memory_order，std::atmoic默认用的是最强限制。

尽管 `std::memory_order_seq_cst` 提供了最强的一致性保证，但这种保证有时候是以牺牲性能为代价的。在高性能并发程序中，过度依赖顺序一致性可能会成为性能瓶颈。因此，选择正确的内存顺序需要在易用性和性能之间做出平衡。

### 获取和释放语义

并发编程的艺术在于精确控制多个线程间的操作和交互。在这个艺术中，`std::memory_order_acquire` 和 `std::memory_order_release` 扮演着重要的角色

`std::memory_order_acquire`（获取）和 `std::memory_order_release`（释放）代表了两种内存顺序语义，它们用于控制原子操作在多线程环境中的执行顺序。

1. **`std::memory_order_acquire`**：用于读取操作，**保证在该操作之后的内存读写不会被重排序到该操作之前**。它**确保对共享数据的读取操作可以看到之前的写入操作的结果**。
2. **`std::memory_order_release`**：用于写入操作，**保证在该操作之前的内存读写不会被重排序到该操作之后**。它**确保写入操作对后续的读取操作可见**。

这两种语义通常需要配对使用，以保证线程间的操作顺序和数据一致性。

```cpp
xxx.load(std::memory_order_acquire);
xxx.store(status,memory_order_release);
//读取操作使用 std::memory_order_acquire
//写入操作使用 std::memory_order_release
//这确保了状态变更对所有线程的可见性，同时防止了潜在的内存重排序问题。
```

实际的并发编程中，`std::memory_order_acquire` 和 `std::memory_order_release` 常用于实现无锁数据结构和算法，如无锁队列和计数器。这些内存顺序标志的使用减少了对昂贵的锁操作的依赖，提高了程序的性能。

**性能测试**：虽然无锁编程可能提高性能，但这并不是绝对的。在某些情况下，尤其是在低竞争环境中，互斥锁可能仍然是更好的选择。性能测试是必要的。

## 性能与安全性

无锁编程的一个主要目标是提高性能，但这不应该以牺牲安全性和正确性为代价。在实际应用中，需要仔细评估无锁编程带来的性能提升是否值得在安全性和易用性上做出妥协。

- **性能测试**：在采用无锁编程之前，进行全面的性能测试是必要的，以确保它确实带来了预期的性能提升。
- **错误处理**：原子操作不提供内建的错误处理机制。因此，开发者需要仔细设计代码以处理潜在的错误情况。
- **复杂性和可维护性**：无锁编程通常比使用互斥锁更复杂，可能导致代码难以理解和维护。

## 无锁编程

无锁编程，即不使用锁的情况下实现多线程之间的变量同步，也就是在没有线程被阻塞的情况下实现变量的同步，所以也叫非阻塞同步（Non-blocking Synchronization），实现非阻塞同步的方案称为“无锁编程算法”。

无锁编程主要依靠原子操作（Atomic Operations）来实现。原子操作是一种不可分割的操作，保证在执行过程中不会被其他线程中断。在C++中，这通常通过 `std::atomic` 类型和相关函数实现，它们可以对基本数据类型进行无锁操作。

为什么要非阻塞同步，使用lock实现线程同步有非常多缺点：

- 产生竞争时，线程被阻塞等待，**无法做到线程实时响应**
- dead lock 死锁
- live lock 活锁
- 优先级反转
- 使用不当，造成性能下降

优势:

- **性能提升**：由于减少了线程阻塞和上下文切换，无锁编程可以显著提高程序的性能，特别是在高并发环境中。
- **避免死锁和饥饿**：传统的锁机制可能导致死锁或线程饥饿的问题，无锁编程可以有效地避免这些问题。
- **实时系统中的应用**：在要求高响应性的实时系统中，比如智能驾驶的域控制系统，无锁编程由于其较低的延迟特性，被广泛应用。

从心理学的角度来看，互斥锁类似于人们在面对资源竞争时的等待策略，而无锁编程则更像是持续尝试直到成功的坚持策略

非同步阻塞的实现分为三个级别：wait-free/lock-free/obstruction-free

1. wait-free  无等待编程

   最理想的模式,整个操作保证每个线程在有限步骤下完毕

   保证系统级吞吐（system-wide throughput）以及无线程饥饿

2. lock-free  无锁编程

   同意个别线程饥饿，但保证系统级吞吐。

   确保至少有一个线程可以继续运行。

   wait-free的算法必然也是lock-free的。

3. obstruction-free

   在不论什么时间点，一个线程被隔离为一个事务进行运行（其它线程suspended），而且在有限步骤内完毕。在运行过程中，一旦发现数据被改动（採用时间戳、版本），则回滚，也叫做乐观锁，即乐观并发控制(OOC)。

事务的过程是：

- 读取，并写时间戳
- 准备写入，版本号校验
- 检验通过则写入，检验不通过，则回滚

**无锁算法感触最深的是复杂度的分解，比如多线程对于一个双向链表的插入或删除操作，如何能一步一步分解成一个一个串联的原子操作，并能保证事务内存的一致性。**

### 为什么要无锁

1. 首先是性能考虑。通信项目一般对性能有极致的追求，这是我们使用无锁的重要原因。当然，无锁算法如果实现的不好，性能可能还不如使用锁，所以我们选择比较擅长的数据结构和算法进行lock-free实现，比如Queue，对于比较复杂的数据结构和算法我们通过lock来控制，比如Map
2. 避免锁的使用引起的错误和问题
   - 死锁:两个以上线程互相等待
   - 锁护送(lock convoy):多个同优先级的线程反复竞争同一个锁,抢占锁失败后强制上下文切换,引起性能下降
   - 优先级反转(priority inversion):低优先级线程拥有锁时被中优先级的线程抢占,而高优先级的线程因为申请不到锁被阻塞

> 锁护送(锁列队)和活锁的区别:
>
> **Lock Convoy（锁列队）**： 在计算机科学中，锁列队是在使用锁进行并发控制的多线程应用程序中可能出现的性能问题。当多个具有相同优先级的线程反复争用同一把锁时，就会发生锁列队。与死锁和活锁的情况不同，锁列队中的线程确实在进展；然而，每次线程尝试获取锁并失败时，它都会放弃其剩余的调度量子，并强制进行上下文切换。重复的上下文切换和调度量子的低利用率降低了整体性能。锁列队通常发生在并发控制原语（如锁）序列化访问常用资源（如内存堆或线程池）的情况下。它们有时可以通过使用非锁定替代方案（如无锁算法）或者改变争用线程的相对优先级来解决。
>
> **活锁（Live Lock）**： 活锁是指线程们都在运行并尝试执行任务，但是由于某些条件始终无法满足，导致线程们一直在重试，但是最终无法完成任务。这种情况下，线程们看起来像是在不断地活动，但是实际上却没有任何进展。

### 如何无锁

在现代的 CPU 处理器上，很多操作已经被设计为原子的，比如对齐读（Aligned Read）和对齐写（Aligned Write）等。Read-Modify-Write（RMW）操作的设计让执行更复杂的事务操作变成了原子操作，当有多个写入者想对相同的内存进行修改时，保证一次只执行一个操作。

RMW 操作在不同的 CPU 家族中是通过不同的方式来支持的：

- x86/64 和 Itanium 架构通过 Compare-And-Swap (CAS) 方式来实现
- PowerPC、MIPS 和 ARM 架构通过 Load-Link/Store-Conditional (LL/SC) 方式来实现

在x64下进行实践的，用的是CAS操作，CAS操作是lock-free技术的基础,CAS可以用下面的代码来描述:

```cpp
template <class T>
bool CAS(T* addr, T expected, T value)
{
  if (*addr == expected)
  {
     *addr = value;
     return true;
  }
  return false;
}
```

#### 工作原理

无锁编程具体使用和考虑到的技术方法包括：

- 原子操作（atomic operations）
- 内存栅栏（memory barriers）
- 内存顺序冲突（memory order）
- 指令序列一致性（sequential consistency）
- 顺ABA现象
- 等等

在这其中最基础最重要的是操作的原子性或说原子操作

对于原子操作的实现机制，在**硬件层面上CPU处理器会默认保证基本的内存操作的原子性**，CPU保证从系统内存当中读取或者写入一个字节的行为肯定是原子的，当一个处理器读取一个字节时，其他CPU处理器不能访问这个字节的内存地址。

但是对于**复杂的内存操作**CPU处理器不能自动保证其原子性，比如跨总线宽度或者跨多个缓存行（Cache Line），跨页表的访问等。这个时候就需要用到**CPU指令集中设计的原子操作指令**，现在大部分CPU指令集都会支持一系列的原子操作。而在无锁编程中经常用到的原子操作是Read-Modify-Write （RMW）这种类型的，这其中最常用的原子操作又是 COMPARE AND SWAP（CAS），几乎所有的CPU指令集都支持CAS的原子操作，比如X86平台下中的是 CMPXCHG

**CAS操作**行为是比较某个内存地址处的内容是否和期望值一致，如果一致则将该地址处的数值替换为一个新值。CAS能够操作的位数越多，使用它来实现锁无关的数据结构就越容易（细节可以在intel手册中查看）。CAS操作具体的实现原理主要是两种方式：

- 总线锁定

  CPU执行某条指令的时候先锁住数据总线的， 使用同一条数据总线的CPU就无法访问内存了，在指令执行完成后再释放锁住的数据总线。锁住数据总线的方式系统开销很大，限制了访问内存的效率

- 缓存锁定

  用CPU的缓存一致性的机制来防止内存区域的数据被两个以上的处理器修改（可详见CPU缓存的MESI协议）

**操作系统的层面**，Linux系统提供了软件级的原子操作，包括两大类系统调用，一类是基于对整数进行操作的atomic_set/and/inc，一类是针对单独的位进行操作的set/clear/change_bit，它们大部分都是基于硬件层面的CAS的指令实现的。

在各种**开发语言中**（c,c++,java）基于操作系统提供的接口也都封装实现了对应的原子操作api，所以开发者完全可以直接调用各个开发语言提供的接口实现无锁程序。

### 无锁编程技术

事实证明，当你试图满足无锁编程的无阻塞条件时，会出现一系列技术：原子操作、内存屏障、避免ABA问题，等等。从这里开始，事情很快变得棘手了。

#### 内存保序

正如前面流程图所建议的那样，任何时候做多核（或者任何对称多处理器）的无锁编程，如果你的环境不能保证顺序一致性，你都必须考虑如何来防止 内存重新排序。

在当今的架构中，增强内存保序性的工具通常分为三类，它们既防止 编译器重新排序 又防止 处理器重新排序：

- 一个轻型的同步或屏障指令
- 一个完全的内存屏障指令
- [提供获取或释放语义的内存操作](#获取和释放语义)

获取语义可防止按照程序顺序对其进行操作的内存重新排序，而释放语义则可防止对其进行操作前的内存重新排序。这些语义尤其适用于存在生产者/消费者关系的情况，其中一个线程发布一些信息，而另一个线程读取它。

#### 无锁编程如何控制对一个很大的对象的访问

如果这是一个高一致性的场景，也只能使用锁了。但是如果这并不是一个对一致性要求非常高的场景呢？比如可以允许修改内容在10s内生效而不是立即生效，那么就可以结合无锁编程使用一种高效的方法：

用指针来访问这个共享对象，写线程修改对象时，不直接在对象上进行修改，而是新建一个对象进行赋值，赋值完成后，再通过CAS将指针指向这个新的对象，然后销毁旧的对象。通过这种方法，可以将临界区从一大段代码缩减为一句代码，极大的减少了对读线程的影响。

修改指针这一步只有一条代码语句，虽然也可以用加锁的方式来保证线程安全，但是恰好无锁编程也是只能对一条语句进行操作，所以无锁编程非常符合这种方式，往往一想到无锁编程就想到这种方法。

### 无锁队列

> 如果一秒只需要处理几百或者几千的数据，是没有必要考虑用无锁队列的。用互斥锁就能解决问题，数据量相对少的时候互斥锁与无锁队列之间差别并不是很明显。

无锁队列是lock-free中最基本的数据结构，一般应用场景是资源分配，比如TimerId的分配，WorkerId的分配，上电内存初始块数的申请等等。对于多线程用户来说，**无锁队列的入队和出队操作是线程安全的**，不用再加锁控制。

- initQueue初始化队列：根据unitSize和maxUnitNum申请内存，并对内存进行初始化。
- enQueue入队：从队尾增加元素
- dequeue出队：从队头删除元素
- getQueueSize获取队列大小：返回队列中的元素数
- isQueueEmpty队列是否为空：true表示队列为空，false表示队列非空

#### 开源无锁队列

- **Boost库**：Boost库提供了`boost::lockfree::queue`，这是一个支持多个生产者和多个消费者线程的无锁队列。此外，Boost库还提供了`boost::lockfree::stack`（无锁栈）和`boost::lockfree::spsc_queue`(仅支持单个生产者和单个消费者线程的无锁队列)。
- **ConcurrentQueue**：[ConcurrentQueue](https://github.com/cameron314/concurrentqueue)是一个基于C++实现的工业级无锁队列方案。
- **ReaderWriterQueue**：[ReaderWriterQueue](https://github.com/cameron314/readerwriterqueue)是一个基于C++实现的单生产者单消费者场景的无锁队列方案。
- [**lockfreequeue**：lockfreequeue是一个使用C++11原子操作实现的高性能自旋锁队列](https://gitee.com/videoaudioer/lockfreequeue)。

# 软件事务内存和协程

> 并发编程领域不断发展，新的模式和技术持续出现。无锁编程正成为一种越来越受欢迎的方法，但同时新的同步原语和库也在不断涌现。例如，软件事务内存（Software Transactional Memory, STM）和协程（Coroutines）提供了新的并发处理方式。
>
> 正如计算机科学家 Edsger Dijkstra 曾指出：“**简单性是成功复杂系统设计的关键**。” 无论选择哪种并发策略，始终需要在性能、复杂性、可维护性和未来可扩展性之间找到平衡点。

# 如何排查并发编程死锁问题

[[linux基础以及系统编程#如何避免死锁|如何避免死锁参阅]]

如果死锁已经发生,又应该如何排查呢?

## 使用gdb等调试工具来排查

在运行时检查线程的状态,找出死锁的原因

`ps aux | grep  xxxx`

`top -Hp xxxx的pid`

查看进程的cpu利用率,如果cpu利用率和内存异常低,可能是发生了死锁

使用gdb `info threads`去查看线程情况,结合线程调用栈`bt 线程编号`,定位到线程的代码,如果刚好是在等锁的代码上,就要留意这块的逻辑是否陷入了死锁.

> 使用lldb的话命令有所不同,比如说`thread list`和`thread backtrace 线程编号`
>
> <img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404131505391.png" alt="image-20240413150549654" style="zoom: 25%;" />定位到行:<img src="https://cdn.jsdelivr.net/gh/che77a38/blogImage2/202404131506402.png" alt="image-20240413150620177" style="zoom:25%;" />

## Valgrind

支持Linux/Mac不支持windows系统

Valgrind是另一个强大的工具，它提供了一系列的内存调试和分析工具。其中的Helgrind工具专门用于检测多线程程序中的同步错误，包括死锁。Helgrind通过分析程序的运行，识别竞争条件、锁顺序不一致等问题，帮助开发者定位和解决死锁问题。

windows上可以使用Process Explorer来排查死锁

## Linux Perf Tools

Linux Perf Tools是一组性能分析工具，它可以用来分析程序的运行时性能，包括CPU使用情况、缓存命中率、上下文切换次数等。这些工具对于理解程序的运行时行为，包括可能导致死锁的情况，非常有帮助。



