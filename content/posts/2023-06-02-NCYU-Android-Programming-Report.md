---
title: "[專題] MCM - Must C Movies"
date: 2023-06-02T16:18:22+08:00
author: "CPP"
tags: [NCYU, Android, Homework, Kotlin, MVVM]
summary: "國立嘉義大學行動裝置程式設計期末專題，可觀摩但請勿抄襲。"
---

## Must C Movies 客製化電影必看清單！
### 前言
這是行動裝置程式設計期末專題，需要在 Android 環境上使用 Kotlin 開發，
文章主要記錄此 APP 撰寫的過程及功能實現。

那就繼續看下去吧！

先從 MVVM 講起

### MVVM
意即 `Model View ViewModel`

#### Movie.kt
```kotlin
@Entity
data class Movie(
    @PrimaryKey(autoGenerate = true)
    var id : Int?=null,
    @ColumnInfo(name = "title") val title: String,
    @ColumnInfo(name = "rating") val rating: Float,
    @ColumnInfo(name = "comment") val comment: String,
    var order: Int = 0
) {
    override fun toString(): String {
        return "Title: $title, rating: $rating, comment: $comment order: $order"
    }
}
```

`Movie` 只有簡單的四個欄位，`id`、`title`、`rating` 跟 `comment`，
其中比較特別的是 `order` 沒進資料庫，只用來即時更新排名。

`toString()` 用來 debug 用的

---

#### MovieDao.kt
```kotlin
@Dao
interface MovieDao {
    @Query("SELECT * FROM movie")
    fun getAll(): LiveData<List<Movie>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(movie: Movie)

    @Delete
    fun delete(movie: Movie)

    @Query("DELETE FROM movie")
    fun deleteAll()

    @Update
    fun update(movie: Movie)

    @Query("SELECT * FROM movie WHERE id=:id")
    fun getOne(id: Int): LiveData<Movie>
}
```

DAO （Database Access Object）分成增刪查改，
* 增：`insert()` 帶入要新增的 `Movie`
* 刪：`delete()` 帶入要刪的 `Movie`、`deleteAll()` 全部刪掉
* 查：`getOne()` 帶入 `id` 取得特定 `Movie`、`getAll()` 取得全部的 `Movie`
	* 型別都需要宣告成 `ListData` 是為了後面可以使用 `observe`
* 改：`update()` 帶入修改的 `Movie`，它會自動對 `id` 更新

---

#### MovieRepository.kt
```kotlin
class MovieRepository(val dao: MovieDao) {
    fun getAll(): LiveData<List<Movie>> {
        return dao.getAll()
    }

    fun insert(movie: Movie) {
        dao.insert(movie)
    }

    fun delete(movie: Movie) {
        dao.delete(movie)
    }

    fun deleteAll() {
        dao.deleteAll()
    }

    fun update(movie: Movie) {
        dao.update(movie)
    }

    fun getOne(id: Int): LiveData<Movie> {
        return dao.getOne(id)
    }
}
```

實作 `MovieDao` 的內容

---

#### MovieViewModel.kt
```kotlin
class MovieViewModel(application: Application): AndroidViewModel(application) {
    private val repository: MovieRepository
    init {
        val dao = AppDatabase.getInstance(application).movieDao()
        repository = MovieRepository(dao)
    }

    fun addMovie(movie: Movie) {
        repository.insert(movie)
    }

    fun getAllMovies(): LiveData<List<Movie>> = repository.getAll()

    fun updateAllMovies(movies: MutableList<Movie>) {
        repository.deleteAll()
        movies.forEach {
            repository.insert(Movie(null, it.title, it.rating, it.comment))
        }
    }

    fun updateMovie(movie: Movie) {
        repository.update(movie)
    }

    fun getOneMovie(id: Int): LiveData<Movie> {
        return repository.getOne(id)
    }
}
```

從 `AppDatabase` 得到實例 `instance` 並實作 `ViewModel` 能使用的函式

---

### Database
#### AppDatabase.kt
```kotlin
@Database(entities = [Movie::class], version = 4)
abstract class AppDatabase: RoomDatabase() {
    abstract fun movieDao(): MovieDao
    companion object {
        @Volatile
        var INSTANCE: AppDatabase?=null

        fun getInstance(context: Context): AppDatabase {
            val tempInstance = INSTANCE
            if(tempInstance!=null){
                return tempInstance
            }

            synchronized(this){
                val roomDatabaseInstance = Room.databaseBuilder(context, AppDatabase::class.java,"MCM-database")
                    .allowMainThreadQueries()
                    .fallbackToDestructiveMigration()
                    .build()

                INSTANCE = roomDatabaseInstance

                return roomDatabaseInstance
            }
        }
    }
}
```

特別的是若 `version` 新增、欄位有更改，需要寫 `migration` 的程式。

如果不想寫直接 cascaded `fallbackToDestructiveMigration()` 就不用遷移資料了！

---

### Activity
#### MainActivity.kt
控制全部程式的邏輯，包含 `Toolbar`、`Navigation`、`Permission`

---

##### 取得權限
```kotlin
if (checkPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE)) {
    requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE)
}

if (checkPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
    requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
}

private fun checkPermission(permission: String): Boolean {
    return ActivityCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED
}

private fun requestPermission(permission: String) {
    ActivityCompat.requestPermissions(this, arrayOf(permission), 0)
}
```

確認用戶已允許 APP 可以讀寫 `Storage`

此外需要在 `AndroidManifest.xml` 增加 `Permission`
```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission
    android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    tools:ignore="ScopedStorage" />
```

---

#### SharedActivity.kt
控制風格客製化的邏輯，包含 `FAB(Floating Action Button)` （`返回`、`截圖`、`分享` 功能），還有 `ViewPager` 以及 `TabLayout`

---

##### 渲染 Fragment
```kotlin
 override fun getItem(position: Int) : Fragment {
    val fragment = when (position) {
        0 -> LofiFragment()
        1 -> NeonFragment()
        else -> TotoroFragment()
    }

    return fragment
}

override fun getPageTitle(position: Int) = when (position) {
    0 -> "Lofi"
    1 -> "Neon"
    else -> "Totoro"
}
```

---

##### 綁定 TabLayout
```kotlin
tabLayout.setupWithViewPager(viewPager)
```

這個可以做到拿 `getPageTitle()` 設定 `Tab` 的標題，

```kotlin
tabLayout.setOnTabSelectedListener(object: TabLayout.OnTabSelectedListener {
    override fun onTabSelected(tab: TabLayout.Tab) {
        viewPager.currentItem = tab.position
    }
})
```
也可以不只左滑、右滑切換 `Fragment`，點上面 `Tab` 也可以！

---

##### 返回主畫面
```kotlin
fabBack.setOnClickListener {
    this.finish()
}
```

會自動 return 到 `MainActivity`

---

##### 下載圖片
```
screenshot = Bitmap.createBitmap(view.measuredWidth, view.measuredHeight, Bitmap.Config.ARGB_8888)
```

網路上找到的，把 `View` 用成畫布 `Canvas` 再匯出成圖片，
特別的是為了要把圖片保持在 `9:16`，在 `sharedViewPager` 外面包了一個 `ConstraintLayout`，
並在裡面加了一個屬性

```xml
app:layout_constraintDimensionRatio="H,9:16"
```

---

##### 分享到 IG
```kotlin
private fun shareToInstagram(imageUri: Uri?) {
        val intent = Intent("com.instagram.share.ADD_TO_STORY")
        val backgroundAssetUri = Uri.parse(imageUri.toString())
        intent.setDataAndType(backgroundAssetUri, "image/jpeg")
        intent.flags = Intent.FLAG_GRANT_READ_URI_PERMISSION

        startActivity(intent)
    }
```

比我想象的還要簡單，把圖片下載下來，並把 `Uri` 傳入 `setDatAndType()`，並 start 這個 `Intent`

---

### Fragments
從 `MainActivity` 控制四個 `Fragment`，從 `Use Case` 的方式切入

#### ListFragment.kt
CRUD 裡的 `Read`，可以看到所有的電影，
由 `ItemAdapter` 渲染 `layout` 裡面的 `item_view` 再綁定到 `list_fragment` 裡的 `RecyclerView`

之後的 `SharedFragment` 都是做一樣的事

---

##### 綁定 Adapter
```kotlin
itemAdapter = ItemAdapter(displayItems)
binding.recyclerView.layoutManager = LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false)
binding.recyclerView.adapter = itemAdapter
```

---

##### Swipe 功能
用到別人的套件，可以從下面的參考找

```kotlin
ItemTouchHelper.LEFT -> {
    var deletedMovie = displayItems[position]
    displayItems.removeAt(position)
    binding.recyclerView.adapter?.notifyItemRemoved(position)
    binding.recyclerView.adapter?.notifyDataSetChanged()

    Snackbar.make(view!!, "已刪除 ${deletedMovie.title}", Snackbar.LENGTH_LONG)
        .setAction("復原") {
            displayItems.add(position, deletedMovie)
            binding.recyclerView.adapter?.notifyItemInserted(position)
            binding.recyclerView.adapter?.notifyDataSetChanged()
        }.show()
}

ItemTouchHelper.RIGHT -> {
    var editedMovie = displayItems[position]
    val bundle = Bundle()
    bundle.putInt("id", editedMovie.id!!)
    findNavController().navigate(R.id.action_FirstFragment_to_FourthFragment, bundle)
}
```

往左滑刪除，但不是真的刪除，可以從 `MutableList` 裡復原

往右滑編輯開一個 `EditFragment` 並傳入 `id`，但是是用 `Navigation` 引導

---

##### 向下滑更新
也是用到別人的套件，下面參考也找得到

```kotlin
if (!binding.swipeRefreshLayout.isRefreshing) {
    viewModel.getAllMovies().observe(viewLifecycleOwner) {
        displayItems = it as MutableList<Movie>
        itemAdapter = ItemAdapter(displayItems)
        binding.recyclerView.layoutManager = LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false)
        binding.recyclerView.adapter = itemAdapter
        itemAdapter.onItemClick = { movie ->
            val bundle = Bundle()
            bundle.putInt("id", movie.id!!)

            findNavController().navigate(R.id.action_FirstFragment_to_ThirdFragment, bundle)
        }
    }
}
```

這邊用到 `ViewModel` 的 `observe`，從資料庫抓全部的 `Movie` 並渲染到 `RecyclerView`，
並把 `itemAdapter` 綁定 `onItemClick()`，按下去就會帶入 `id` 到 `ReadFragment`

```kotlin
// ListFragment.kt
private fun onUpdate() {
    viewModel.updateAllMovies(displayItems)
}
```

```kotlin
// MovieViewModel.kt
fun updateAllMovies(movies: MutableList<Movie>) {
    repository.deleteAll()
    movies.forEach {
        repository.insert(Movie(null, it.title, it.rating, it.comment))
    }
}
```

更新其實是把資料庫全部 delete 掉，再重新 insert 上去

---

##### 長按更改排名
跟 `Swipe` 功能是同個套件

```kotlin
override fun onMove(
    recyclerView: RecyclerView,
    viewHolder: RecyclerView.ViewHolder,
    target: RecyclerView.ViewHolder
): Boolean {
    var sourcePosition = viewHolder.bindingAdapterPosition
    var targetPosition = target.bindingAdapterPosition

    itemAdapter.onItemMove(sourcePosition, targetPosition)

    return true
}
```

上述會將點到的 `item` 交換到放下的位置

```kotlin
fun onItemMove(fromPosition: Int, toPosition: Int): Boolean {
    Collections.swap(data, fromPosition, toPosition)

    var temp = data[fromPosition].order
    data[fromPosition].order = data[toPosition].order
    data[toPosition].order = temp

    //Log.d("movieeeeeeeeeeeeee", data.toString())

    notifyItemMoved(fromPosition, toPosition)
    notifyItemChanged(fromPosition)
    notifyItemChanged(toPosition)

    return true
}
```

在 `ItemAdapter` 裡面會把前面提到的 `Movie.kt` 裡面沒進到資料庫的 `order` 屬性，將排名即時更新。
要搭配 `notifyItemMoved()`、兩個不同 `position` 的 `notifyItemChange()` 才能做到這個效果！

我想很久🥲

---

##### 兩個 FAB 功能
```kotlin
binding.fab.setOnClickListener {
    findNavController().navigate(R.id.action_FirstFragment_to_SecondFragment)
}

// Export movie list
binding.fabExport.setOnClickListener {
    val intent = Intent (requireActivity(), SharedActivity::class.java)
    requireActivity().startActivity(intent)
}
```

一個帶到 `AddFragment`，另一個帶到 `SharedActivity`

---

#### AddFragment.kt
CRUD 裡的 `Create`，可以新增電影，輸入標題、評分、評論

```kotlin
private val onBackPressedCallback = object : OnBackPressedCallback(true) {
    override fun handleOnBackPressed() {
        AlertDialog.Builder(requireContext())
            .setMessage("尚未儲存變更，確定要離開嗎？")
            .setTitle("提示")
            .setPositiveButton("確定") { _,_ ->
                isEnabled = false // DON'T FORGET THIS!
                requireActivity().onBackPressedDispatcher.onBackPressed()
            }
            .setNeutralButton("取消", null)
            .show()
    }
}

requireActivity().onBackPressedDispatcher.addCallback(onBackPressedCallback)
```

複寫新增畫面的返回動作，會提醒使用者尚未新增，符合好的 `UX`，但是左上角 `Toolbar` 的返回寫不到...

```kotlin
private fun createMovie() {
    val title = binding.inputTitle.text.toString()
    val rating = binding.ratingBar.rating
    val comment = binding.inputComment.text.toString()
    val data = Movie(null, title, rating, comment)

    viewModel.addMovie(data)
}

private fun isTitleNotEmpty(): Boolean {
    return binding.inputTitle.text.isNotEmpty()
}

override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)

    binding.buttonSubmit.setOnClickListener {
        if (isTitleNotEmpty()) {
            createMovie()
            findNavController().popBackStack()
        }
        else {
            Snackbar.make(requireView(), "請填入電影名稱！", Snackbar.LENGTH_LONG).show()
        }
    }
}
```

簡單判斷標題是不是空的，空的就不能新增

---

##### ReadFragment
CRUD 裡的 `Read`，可以看到電影的詳細資訊

```kotlin
val id = requireArguments().getInt("id")
viewModel.getOneMovie(id).observe(viewLifecycleOwner) {
    binding.showTitle.text = it.title
    binding.showRatingBar.rating = it.rating
    binding.showComment.text = it.comment
}
```

做的事簡單很多，把傳入的 `id`，透過 `getOneMove` 用 `observe()` 的方法設定畫面

---

##### EditFragment.kt
CRUD 裡的 `Update`，更新電影資訊

結合 `ReadFragment`、跟 `AddFragment` 的部分功能

（ViewModel 的 observe 跟 電影標題是否為空的判斷）

---

### SharedFragments
```kotlin
override fun onCreateView(inflater: LayoutInflater, container:
    ViewGroup?, savedInstanceState: Bundle?): View? {

    _binding = LoFiLayoutBinding.inflate(inflater, container, false)

    viewModel.getAllMovies().observe(viewLifecycleOwner) {
        sharedItemAdapter = SharedItemAdapter(it as MutableList<Movie>, "Lofi")
        binding.sharedRecyclerView.layoutManager = LinearLayoutManager(activity, LinearLayoutManager.VERTICAL, false)
        binding.sharedRecyclerView.adapter = sharedItemAdapter
    }

    return binding.root
}
```

三個 `Fragment` 都是一樣的操作，因為每張圖片的排版跟風格都不一樣，
所以才用三個不同 `DataBinding` 的 `Fragment`。

而 `SharedItemAdapter()` 代入的參數不同，會把每個 `item` 渲染成不同風格

### Adapter
算是整個 APP 最主要最核心的功能

#### ItemAdapter.kt
```kotlin
override fun onBindViewHolder(holder: ViewHolder, position: Int) {
    holder.textTitle.text = data[position].title
    holder.textOrder.text = (position + 1).toString()

    // marquee effect
    holder.textTitle.postDelayed( {
        holder.textTitle.isSelected = true
    }, 1500)

    holder.itemView.setOnClickListener {
        onItemClick?.invoke(data[position])
    }

}
```

渲染畫面，並設定跑馬燈效果（間隔 1500ms），可以再下面的參考看到

---

#### SharedItemAdapter.kt
```kotlin
override fun onCreateViewHolder(viewGroup: ViewGroup, position: Int): ViewHolder {
    var itemLayoutType = when (mode) {
        "Lofi" ->  R.layout.lo_fi_item
        "Neon" -> R.layout.neon_item
        else -> R.layout.totoro_item
    }

    val v = LayoutInflater.from(viewGroup.context)
        .inflate(itemLayoutType, viewGroup, false)

    return ViewHolder(v)
}
```

渲染不同風格的 `item` 並傳入 `LayoutInflater`

---

### 結論
最後就這樣作出 MCM APP 了！

其實是因為決定記錄每年的電影必看清單，覺得用記事本記有點麻煩，
剛好這次期末要做出一個 APP，所以就借題發揮了～

最後串 IG 的功能，其實是還三年前許的願！


最後最後希望你之後回來看，已經很會寫 APP 了！！！！！！

### 相關連結
* [Github - qaz5823091/MustCMovies](https://github.com/qaz5823091/MustCMovies)
* [APK - Must C Movies](https://drive.google.com/file/d/1OHKHj5eefqdPE2MdiIJ8wZX5PyRt6dPm/view?usp=drive_link)

### 參考
* [Drag to reorder](https://www.youtube.com/watch?v=TXAbYWZhpBQ)
* [Swipe left or right](https://www.geeksforgeeks.org/android-swipe-to-delete-and-undo-in-recyclerview-with-kotlin/)
* [Drag Drop and Swipable](https://github.com/indently/DragDropListTutorial)
* [RecyclerView All Tutorial](https://www.youtube.com/playlist?list=PL65Ccv9j4eZI5xMPqIjABKniid-5X-BgS)
* [swipe to delete 套件](https://github.com/xabaras/RecyclerViewSwipeDecorator)
* [Room Database](https://developer.android.com/training/data-storage/room)
* [How to Build a Simple Contact List Android App using MVVM and Room Database?](https://www.geeksforgeeks.org/how-to-build-a-simple-contact-list-android-app-using-mvvm-and-room-database/)
* [Swipe to refresh](https://developer.android.com/develop/ui/views/touch-and-input/swipe/add-swipe-interface)
* [Marquee](https://www.youtube.com/watch?v=vTJTY4rOoss)
* [onBackPressed](https://github.com/mightyfrog/OnBackPressedCallback-Sample)
* [IG Story](https://developers.facebook.com/docs/instagram/sharing-to-stories)