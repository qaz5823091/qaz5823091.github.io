---
title: "[練習] GitLab CI/CD"
date: 2023-08-29T22:26:13+08:00
author: "CPP"
tags: [Kdan, Android, Gitlab, CI/CD]
summary: "Kdan Android Team 實習作業"
---

# GitLab CI/CD 練習
## 前言
這是我 Android 實習的第一份作業，為了讓我的主管們知道我理解的程度，記錄一下學習的過程～

## 任務清單
- [x] 1. 使用 Android Studio 創建一個 ”Hello World!” 專案
- [x] 2. 試著在該專案寫一個 Unit Test (Java Test)，並成功執行測試
- [x] 3. 試著在該專案寫一個執行 androidTest，並成功執行測試
- [x] 4. 在 GitLab 上新增該專案的 Repository
- [x] 5. 嘗試在 Windows 或是 MacOS 或是 Linux 上架設 GitLabRunner (三擇一)
- [x] 6. 再嘗試使用架設 GitLab Runner 在 Docker container 之中
- [x] 7. 然後將架設好的 GitLab Runner 註冊至題目 4 的 GitLab Repository
- [x] 8. 研究 yml 檔案如何撰寫及其中所代表的意義

## CI / CD 簡介
一個軟體開發後，需要經過很多個測試，可能還需要維護，為了讓開發團隊以及維護團隊能夠更快、有效率的運作，產生出一個 DevOps （Development & Operations）的概念。它算是一個慣例，更準確來說是一種規範，而 CI/CD 就是其中的一個環節!
![demo](https://orangematter.solarwinds.com/wp-content/uploads/2022/03/DevOps-lifecycle-capabilities-1024x621.png)
> https://orangematter.solarwinds.com/wp-content/uploads/2022/03/DevOps-lifecycle-capabilities-1024x621.png



### CI
Continuous Integration 持續整合，通常是讓程式能夠 build 以及 test

### CD
Continuous Deploy / Development 持續部署，讓這些程式能夠依照我們想要的環境部署

### Why
就以測試來講每寫一個 test code，就要跑一遍，這樣太沒效率了，如果可以把它自動化就會變得非常方便，所以 CI/CD 就顯得非常重要。

我們可以利用一些 `lint` 檢查 code 的語法或是風格使它們一致；也可以建立`虛擬環境`讓它在產品階段部署，把這些產品的產線自動化後，後續的維護會節省很多的人力成本，而且也可以把每一個步驟拆分給更專業的人員，這就是它的精神！

以下會用 `Gitlab` 來實作簡單的 CI！

## 撰寫測試
Android 的測試分兩種：test、androidTest，與平常寫程式的地方 `main` 在同一層目錄
![demo](/images/android_test_directory.png)

簡單寫一個 `HelloWorld` 的類別，以利後面進行測試
```kotlin
package com.cppdesign.helloworld

class HelloWorld(private val name: String) {
    override fun toString(): String {
        return "Hello, $name!"
    }
}
```
> 這裡使用 `Kotlin`，後續 test 都用 `Java`

### test
* test 包含 `UnitTest`
* 驗證邏輯與功能（Model 的 function 之類的）
* 在 local 的 JVM(Java Virtual Machine) 跑

> 需要 import `Junit` 的類別，以及需要的 `Assert` functions
```java
package com.cppdesign.helloworld;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class HelloWorldUnitTest {
    private HelloWorld helloWorld;

    @Test
    public void toString_correct() {
        helloWorld = new HelloWorld("Steven");
        assertEquals("Hello, Steven!", helloWorld.toString());
    }

    // it must be fail because the sentence is missing one symbol (!)
    @Test
    public void toString_fail() {
        helloWorld = new HelloWorld("Steven");
        assertEquals("Hello, Steven", helloWorld.toString());
    }
}
```
> 上述函式在進行測試時，會有一個成功、一個失敗（少一個 `!`）

### androidTest
* androidTest 包含 `InstrumentedTest`
* 會需要在模擬器或是實體裝置上運行
* 通常驗證整體行為與 Android 平台的互動

> 不確定要測試什麼，所以就學 `ExampleInstrumentedTest.kt`
```java
package com.cppdesign.helloworld;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

import android.content.Context;

import androidx.test.platform.app.InstrumentationRegistry;

public class HelloWorldInstrumentedTest {
    Context appContext;

    @Before
    public void createInstrumentationRegistry() {
        appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
    }

    @Test
    public void useAppName() {
        assertEquals("Hello World!", appContext.getApplicationInfo().loadLabel(appContext.getPackageManager()).toString());
    }

    @Test
    public void useAppNameFail() {
        assertEquals("Hello, World!", appContext.getApplicationInfo().loadLabel(appContext.getPackageManager()).toString());
    }
}
```
> 利用 `@Before` 把會用到的的變數實體化。一樣會一成功、一失敗（多了 `!`）

## Gitlab 介紹
因為自己都使用 `Github` 託管程式碼，第一次接觸到 `Gitlab` 發現很多地方很相似，所以記錄一些都會用到的功能以及名詞

### 名詞比較
Gitlab / Github
- project / repository
- ci / action
- group / organization

### 連接方式
它也跟 `Github` 一樣提供了 `SSH` 與 `PAT` 的功能，讓讀取更方便，可以不用打密碼登入帳號

#### SSH Key
從頭像點進去 `Edit profile` (`User settings`) > `SSH Keys`
![demo](/images/gitlab_ssh_key.png)

#### Personal Access Token
這功能在 `Github` 裡是可以在 `Android Studio` 操作相關 `repo`，但是我在 AS 裡找不到 `Gitlab` 的選項，所以只好寫起來放 

![demo](/images/gitlab_pat.png)
> 跟 SSH Keys 同一層，要點 `Access Tokens`

### Android Studio VCS
VCS(Version Control System) 是 AS 提供版本控制的系統，一開始要把 VCS 打開，但因為找不到 `Gitlab` 的選項，所以只能手動加入 `remote`

* 利用 `token` 連接 Project 可以不用打帳密登入
![demo](/images/vcs_1.png)
	> 紅色部分為 token

* 在 `push` 前，把 branch 名稱改成 `main`
![demo](/images/vcs_2.png)
	> 因為平權意識抬頭，現在 branch 提倡用 main/others 命名方式

### 上傳程式碼
這部分就是一系列的 `git` 操作，沒有什麼差別

![demo](/images/gitlab_project.png)

## Workflow
![](https://about.gitlab.com/images/gitlab-flow/gitlab-flow.svg)
> https://about.gitlab.com/images/gitlab-flow/gitlab-flow.svg

---

Gitlab flow 就與 Git flow 有差別了，想知道更多可以看這部影片
{{< youtube 7lgGEXpsflI >}}

## GitLab CI 實作
這次用 Gitlab 主要是使用它的 `CI` 功能，不像 Github Actions 有很多套件可以選擇，反而需要自己寫 workflow 還有建製 runner

### 名詞介紹

![demo](https://www.opengeosys.org/docs/devguide/testing/gitlab-ci/GitLab-Pipeline.png)
> https://www.opengeosys.org/docs/devguide/testing/gitlab-ci/GitLab-Pipeline.png

#### Pipelines
上圖一整個畫面就是一個 `pipeline`，在 Gitlab 中的 pipeline 與 CPU pipeline 相似，目的都是讓程式能夠更快的執行完畢，在這裡是為了讓我們的 CI 各方便快速。

#### Stages
最上面那一列的粗體黑字就是 `stage`，代表這一個 pipeline 的各個階段，Gitlab 的官方文件有簡易的寫法，也可以自定義。

#### Jobs
stage 裡面每一個方框就是 `job`，代表它的工作，實際上要做什麼事都在裡面定義

#### Runners
這些 jobs 需要架機器在上面跑，這時候就需要 `runner`

* 在 Gitlab 中分成這三種：
	- shared runner
	- group runner
	- project runner

### .gitlab-ci.yml
上述說到 Gitlab CI 非常的客製化，可以自定義 pipeline，而這些檔案就需要寫在 `.gitlab-ci.yml`

> 1. `.` 指在目錄中預設隱藏（不會顯示），與 `.gitignore` 一樣
> 2. `gitlab-ci` 是 Gitlab 的預設檔名，會自動加入 pipeline
> 3. `yml` 是一種標籤語言（YAML Ain't a Markup Language），常用來記錄設定檔（configuration）

這是官方文件的設定檔範例
{{< highlight go "linenos=table">}}
build-job:
	stage: build
	script:
		- echo "Hello, $GITLAB_USER_LOGIN!"

test-job1:
	stage: test
	script:
		- echo "This job tests something"

test-job2:
	stage: test
	script:
		- echo "This job tests something, but takes more time than test-job1."
		- echo "After the echo commands complete, it runs the sleep command for 20 seconds"
		- echo "which simulates a test that runs 20 seconds longer than test-job1"
		- sleep 20

deploy-prod:
	stage: deploy
	script:
		- echo "This job deploys something from the $CI_COMMIT_BRANCH branch."
	environment: production
{{< / highlight >}}

一般來說會有以下 `stages`：
- build
- test
- staging
- production

1. `stages` 標籤是記錄各種階段，對應到每個 job 裡面的 `stage`（line 2, 7, 12, 20）
2. `jobs` 的名稱沒有硬性規定，就像變數命名一樣（line 1, 6, 11, 19）
3. `script` 就跟 `shell script` 很像，可以執行一些指令（line 3, 8, 13, 21）

> 官方文件還有很多[關鍵字](https://docs.gitlab.com/ee/ci/yaml/index.html)參考

### Assigned Runner
寫完設定檔之後，再來就要架設 runner，規則大概如下：

#### 新建 runner
在 project 裡面點進 `Settings` > `CI/CD` > `Runners` > 點進 `Expand`
![demo](/images/gitlab_runners.png)

左右邊分成兩種 runner：
- project runner
- shared runner (credit card validate)

> 第二種 shared runner 是官方提供的 runner，但是需要信用卡認證（不用錢），但自己還是有疑慮就沒試了

點進 project runners > new project runner
![demo](/images/gitlab_add_new_runner.png)

填寫 `Operating System`、`Tags`、`Details`，就可以 `Create runner` 了
> 在 `Tags` 下有一個 checkbox 建議勾選（當初沒勾選卡了很久）


#### 安裝 gitlab-runner
在註冊 runner 前，需要在自己的機器上建立環境，分成兩種：
- local runner （很麻煩）
- docker （推薦用這個）

安裝記錄就不寫了，放幾個當時遇到問題的圖片以及 references：
![demo](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_fbf25dd286eda84c01ad6306cbf5da01.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1693464151&Signature=6KJzbSdRuJvjKRiON6rtEEWknIg%3D)
![demo](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_9ec5ea8445dd54534465ab47f2ead72b.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1693464177&Signature=l%2Fzu14ZDCcTnluCJvkhfp0BdWmE%3D)
![demo](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_f8ddc98225d43c28f542a8b609d21fa4.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1693464199&Signature=adDt4Btqwbg52INaAmamhbEoBBk%3D)

- [Change Gitlab CI Runner user](https://stackoverflow.com/questions/37187899/change-gitlab-ci-runner-user)
- [Registering runners](https://docs.gitlab.com/runner/register/index.html#docker)
> 主要是權限環境問題，所以很推薦直接用 docker 建立虛擬環境，會它的基本指令直接照文件下就好了

#### 註冊 runner
建立完 runner 後再來就是 `register`，這步驟就像是你的 repo 與你電腦裡的 runner 連接

![demo](/images/gitlab_runner_register.png)
> 紅色部分為 token，每個 runner 的 token 都是唯一的

接著照著下指令寫 runner 的設定檔（`config.toml`）：
- INSTANCE URL （你的 repo 的前綴網址）
	> 詳情看[這裡](https://stackoverflow.com/questions/58236175/what-is-a-gitlab-instance-url-and-how-can-i-get-it)
- token
- name (Description)
- executor
	> 它有很多種可以選，如果 runner 架在 local，想直接跑 `.gitlab-ci.yml` 選擇 `shell` 就好；用 docker 架設的話就選 `docker`

這個設定檔預設放在 `/etc/gitlab-runner`
![demo](/images/gitlab_runner_config.png)

> 因為每建一個 runner 都要再設定一次 config，也不可能改 config 位置，所以用 docker 建 runner 真的很方便

#### 執行 runner
再來就是 run runner 了

- local 端就下
	```bash
	$ gitlab-runner run
	```

- docker 就用 `image` 建立實例
	```bash
	$ docker run --rm -it -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register
	```

### 結果
到 Project 裡的 `Build` > `Pipelines`，可以看到這個 pipeline 的運行結果
![demo](/images/gitlab_pipelines.png)

> 如果看到左邊的 Status 一直在 `pending` 可能是你的 runner 沒打開

---

## 心得
Gitlab CI 的自由度好高，感覺可以把很多後續維護的步驟全部自動化。而且後來研究過程中才發現我用過 `Github Actions` 它也是 CI 的一種，我這個部落格的架設就是利用它！

因為我的 code 沒有太龐大，所以沒有寫到 auto test，只有簡單的 echo，希望之後可以學到更多～

## 相關連結
- [Gitlab Project - Steven Ye / Hello World](https://gitlab.com/steven.ye1132024/hello-world)
- [Github Actions - qaz5823091.github.io](https://github.com/qaz5823091/qaz5823091.github.io/actions/workflows/pages/pages-build-deployment)

## 參考
- [Build local unit tests](https://developer.android.com/training/testing/local-tests)
- [Build instrumented tests](https://developer.android.com/training/testing/instrumented-tests)
- [Continuous Integration with GitLab (overview demo)](https://www.youtube.com/watch?v=ljth1Q5oJoo&t=2s)
- [GitLab Runner](https://docs.gitlab.com/runner/)
- [Install GitLab Runner](https://docs.gitlab.com/runner/)
- [架設 GitLab CI Runner](https://ithelp.ithome.com.tw/articles/10218938)
- [What Is GitLab Workflow | GitLab Flow | GitLab Tutorial For Beginners | Part III](https://www.youtube.com/watch?v=7lgGEXpsflI)
- [別怕！.gitlab-ci.yml 勇敢寫下去！](https://marsping.gitlab.io/GitLabCICD/section1/)
- [.gitlab-ci.yml keyword reference](https://docs.gitlab.com/ee/ci/yaml/index.html)
- [Gitlab CI/CD 介紹與 Runner 的架設](https://sean22492249.medium.com/gitlab-ci-cd-%E4%BB%8B%E7%B4%B9%E8%88%87-runner-%E7%9A%84%E6%9E%B6%E8%A8%AD-afdbde9f22aa)
- [CI/CD pipelines](https://docs.gitlab.com/ee/ci/pipelines/)
- [https://linyencheng.github.io/2022/05/30/devops-gitlab-ci-and-gitlab-runner/](https://linyencheng.github.io/2022/05/30/devops-gitlab-ci-and-gitlab-runner/)
- [Tutorial: Create and run your first GitLab CI/CD pipeline](https://docs.gitlab.com/ee/ci/quick_start/)
- [Gitlab instance URL](https://stackoverflow.com/questions/58236175/what-is-a-gitlab-instance-url-and-how-can-i-get-it)
- [Android GitLab CI + Docker 工程实践](https://juejin.cn/post/6844903661328400397)
- [Change Gitlab CI Runner user](https://stackoverflow.com/questions/37187899/change-gitlab-ci-runner-user)
- [Pipelines jobs without tag](https://stackoverflow.com/questions/34625885/gitlab-ci-builds-remains-pending)
- [Registering runners Docker part](https://docs.gitlab.com/runner/register/index.html#docker)
- [Run GitLab Runner in a container](https://docs.gitlab.com/runner/install/docker.html)