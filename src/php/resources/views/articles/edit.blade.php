
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        ブログ編集
        </h2>
    </x-slot>

    <x-errorbar :errors="$errors"></x-errorbar>
    <x-messagebar></x-messagebar>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="mt-8 mx-auto block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <form method="POST" action="{{ route('articles.update', ['article' => $article]) }}">
                        @method('PATCH')
                        {{-- @include('articles.form') --}}
                        @csrf
<div class="grid grid-cols-1 gap-4">
<!--Title input-->
<div class="mb-6">
    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">タイトル</label>
    <input type="text" name="title" id="title" value="{{ $article->title ?? old('title') }}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
</div>
<!--Tag input-->
<div id="tagForm" class="mb-6">
    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tag</label>
    <div class="flex flex-wrap relative mb-6 flex justify-center" data-te-input-wrapper-init>
        <!--$tagsがあれば入力フォームを表示-->
        @if (isset($tags))
            @foreach ($tags as $tag)
                <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                </div>
            @endforeach
        @endif
    </div>

    <button type="button" id="addTagBtn" class="rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg text-white" style="background-color:rgba(107, 159, 29, 0.89)">タグを増やす</button><br>
    <div id="tagContainer">
        {{-- DBに登録されたタグの値を表示する --}}
        @if (isset($tags))
            @foreach ($tags as $tag)
                <div class="tag-item">
                    <label>タグ：
                        <input type="text" name="tags[]" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="{{$tag->name}}">
                        <span class="close-icon text-white rounded-full bg-red-600 hover:bg-red-500 px-2 py-1">✖</span>
                    </label>
                </div>
            @endforeach
        @endif
    </div>
</div>
<!--Category-->
<div class="mb-6 min-h-[1.5rem] items-center justify-center">
    <label for="article_category_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">カテゴリー</label>
    <input type="radio" name="article_category_id" value="1" id="article_category_id1" {{ (isset($article) && $article->article_category_id == 1) ? 'checked' : '' }} required>備忘録
    <input type="radio" name="article_category_id" value="2" id="article_category_id2" {{ (isset($article) && $article->article_category_id == 2) ? 'checked' : '' }} required>技術共有
    <input type="radio" name="article_category_id" value="3" id="article_category_id3" {{ (isset($article) && $article->article_category_id == 3) ? 'checked' : '' }} required>体験共有
    <input type="radio" name="article_category_id" value="4" id="article_category_id4" {{ (isset($article) && $article->article_category_id == 4) ? 'checked' : '' }} required>その他
</div>
<!--Body input-->
<div class="mb-6 min-h-[1.5rem] items-center justify-center">
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ブログ内容</label>
    {{-- <textarea id="message" name="body" rows="30" required class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">
        {{ $article->body ?? old('body') }}
    </textarea> --}}
    {{-- <textarea id="message" name="body" rows="30" required class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">{{ htmlspecialchars($article->body ?? old('body')) }}</textarea> --}}
    <textarea id="message" name="body" rows="30" required class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">{{ $article->body ?? old('body') }}</textarea>

</div>
 {{-- タグ機能のjs --}}
 <script>
    const addTagBtn = document.getElementById('addTagBtn');
    const form = document.getElementById('tagForm');
    const closeIcons = document.querySelectorAll('.close-icon');
    const tagItems = document.querySelectorAll('.tag-item');

    function createNewForm(){
        const newDiv = document.createElement('div');
        newDiv.classList.add('tag-item');

        const newForm = document.createElement('input');
        newForm.type = 'text';
        newForm.className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
        newForm.setAttribute('name','tags[]');

        const newLabel = document.createElement('label');
        newLabel.textContent = 'タグ：';

        const newSpan = document.createElement('span');
        newSpan.classList.add('close-icon', 'text-white', 'rounded-full', 'bg-red-600', 'hover:bg-red-500', 'px-2', 'py-1');
        newSpan.textContent = '✖';

        newLabel.appendChild(newForm);
        newDiv.appendChild(newLabel);
        newDiv.appendChild(newSpan);

        // 「✖」をクリックしたときの処理を追加
        newSpan.addEventListener('click', () => {
            newDiv.remove();
        });

        return newDiv;
    }

    // 「✖」をクリックしたときの処理
    for (let j = 0; j < closeIcons.length; j++) {
    closeIcons[j].addEventListener('click', () => {
        tagItems[j].remove();
    });
    }

    // ボタンをクリックしたときの処理
    addTagBtn.addEventListener('click', () => {
    form.appendChild(createNewForm());
    });
</script>


                        <!--Submit button-->
                        @if (isset($article->shipped_at))
                        <button
                        name="update"
                        value="update"
                        type="submit"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style="background-color: #1da1f2">
                        ブログを更新する
                        </button>
                        @else
                        <button
                        type="submit"
                        name="saveAsDraft"
                        value="saveAsDraft"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style="background-color: #f21dab">
                        下書き保存する
                        </button>
                        <button
                        type="submit"
                        name="saveAsPublicArticle"
                        value="saveAsPublicArticle"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style="background-color: #1da1f2">
                        登録する
                        </button>
                        @endif
                    </form>
                </div>
            </div>
        </div>
    </div>
    
</x-app-layout>




