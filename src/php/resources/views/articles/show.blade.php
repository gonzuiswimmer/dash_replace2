<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            ブログ詳細画面
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white pt-2 pl-3 overflow-hidden shadow-sm sm:rounded-lg">
                {{-- 自分のブログだったら編集ができる --}}
                <div>
                    @if ($article->user->id === Auth::id())
                        @if (isset($article->shipped_at))
                            <div class="rounded mb-2 rounded px-6 py-2.5 text-s text-center font-medium uppercase text-white"
                                style="background-color:rgb(11, 146, 51)">公開済み</div>
                        @else
                            <div class="rounded mb-2 rounded px-6 py-2.5 text-s text-center font-medium uppercase text-white"
                                style="background-color:rgb(142, 11, 146)">下書き</div>
                        @endif
                        <div>
                            <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">

                            <button type="button" onclick="location.href='{{ route('articles.edit', $article->id) }}' "
                                class="inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                style="background-color:rgb(11, 146, 51)" data-te-ripple-init
                                data-te-ripple-color="light">
                                編集する
                            </button>
                            <form action="{{ route('articles.destroy', $article->id) }}" method="POST"
                                class="inline-block ">
                                @csrf
                                @method('DELETE')
                                <button type="submit"
                                    class="rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                    style="background-color:rgb(241, 45, 45)" data-te-ripple-init
                                    data-te-ripple-color="light" onclick="return confirm('本当に削除しますか?')">
                                    削除する
                                </button>
                            </form>
                        </div>
                        </div>                
                                <div>
                                    <a class="inline-flex items-center">
                                        <img alt="blog" src="https://dummyimage.com/104x104"
                                            class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
                                        <span class="flex-grow flex flex-col pl-4">
											<span class="title-font font-medium text-gray-900">
												<a class="text-info" href="{{ $article->user->id === auth()->user()->id ? route('profile.edit') : route('profile.show', ['id' => $article->user->id]) }}">{{ $article->user->name }}</a>
											</span><br>
												<span>{{ $article->user->entry_date }}</span><span>【{{ $article->user->department->name }}】</span><br>
                                            <span
                                                class="text-gray-400 text-xs tracking-widest mt-0.5">{{ $article->created_at->format('Y-m-d') }}に作成</span>
                                    </a>
                                </div>
                                <h3 class="text-center font-semibold text-xl text-gray-800 leading-tight">
									【{{$articleCategory->name}}】
                                    {{ $article->title }}
                                </h3>
                                <div
                                    class="mx-auto block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                    @foreach ($article->tags as $tag)
                                        <span class="bg-cyan-400 text-white">{{ $tag->name }}</span>
                                    @endforeach
                                    {{-- <div>{{ $article->body }}</div> --}}
                                    {{-- <div>{!! $convertedBody !!}</div> --}}
                                    {{-- <div>{!! $article->body !!}</div> --}}
                                    {{-- <div>
                                        {!! markdown($article->body) !!}
                                    </div> --}}
                                    {{-- @php
                                        $parsedown = new Parsedown();
                                    @endphp

                                    {!! $parsedown->text($article->body ?? old('body')) !!} --}}
                                    @php
                                        $parsedown = new ParsedownExtra();
                                    @endphp
                                    

                                    <div class="prose">
                                        {!! $parsedown->text($article->body ?? old('body')) !!}
                                    </div>


                                <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                        <path
                                            d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                        </path>
                                    </svg>
                                    {{ $article->comments_count }}
                                </span>

                        {{-- 自分以外のブログだったら表示のみ --}}
                    @else
                        <div>
                            @stack('styles')
                            @stack('scripts')
                            <a class="inline-flex items-center">
                                <img alt="blog" src="https://dummyimage.com/104x104"
                                    class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
                                <span class="flex-grow flex flex-col pl-4">
                                    <span class="title-font font-medium text-gray-900">
										<a class="text-info" href="{{ $article->user->id === auth()->user()->id ? route('profile.edit') : route('profile.show', ['id' => $article->user->id]) }}">{{ $article->user->name }}</a>
									</span><br>
										<span>{{ $article->user->entry_date }}</span><span>【{{ $article->user->department->name }}】</span><br>
                                    <span
                                        class="text-gray-400 text-xs tracking-widest mt-0.5">{{ $article->created_at->format('Y-m-d') }}に作成</span>
                                </span>
                            </a>
                        </div>
                        <div>
                            <h3 class="text-center font-semibold text-xl text-gray-800 leading-tight">
                                【{{$articleCategory->name}}】
                                {{ $article->title }}
                            </h3>
                            <div class="mx-auto block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                @foreach ($article->tags as $tag)
                                
                                    <span class="bg-cyan-400 text-white">{{ $tag->name }}</span>
                                @endforeach
                                {{-- <div>{{$article->body}}</div> --}}
                                <div>{!! $convertedBody !!}</div>
                            </div>
                            
                        </div>
                        <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                            <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                <path
                                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                </path>
                            </svg>
                            {{ $article->comments_count }}
                        </span>
                    @endif
                </div>

            <favorite-button>
@if (Auth::check())
    @if ($article->isFavoritedByUser(Auth::user()))
        <form action="{{ route('articles.unfavorite', ['article' => $article->id]) }}" method="POST" class="mb-4">
            @csrf
            @method('DELETE')
            <input type="hidden" name="article_id" value="{{ $article->id }}">
            <button type="submit">
                お気に入り解除
            </button>
        </form>
    @else
        <form action="{{ route('articles.favorite', ['article' => $article->id]) }}" method="POST" class="mb-4">
            @csrf
            <input type="hidden" name="article_id" value="{{ $article->id }}">
            <button type="submit">
                お気に入り
            </button>
        </form>
    @endif
	@else
	<p>お気に入り機能を利用するにはログインしてください。</p>
@endif
		</favorite-button>

        {{-- <div id="likeButtonContainer">
            @if(Auth::user()->isLiked($article->id))
                <button onclick="unlike({{ $article->id }})" class="btn unlike-btn">いいね解除</button>
            @else
                <button onclick="like({{ $article->id }})" class="btn like-btn">いいね</button>
            @endif
        </div>
        <div id="likeCountContainer">
            @if (!$article->is_deleted)
            {{ $article->likes->where('is_deleted', false)->count() }} いいね
            @endif
                </div>
        <br> --}}

 <!-- ボタンの表示を切り替える部分 -->
<div id="likeButtonContainer">
    @if(Auth::user()->isLiked($article->id))
        <button onclick="unlike({{ $article->id }})" class="btn unlike-btn">いいね解除</button>
    @else
        <button onclick="like({{ $article->id }})" class="btn like-btn">いいね</button>
    @endif
</div>

<!-- いいねの総数表示部分 -->
<div id="likeCountContainer">
    <span id="likeCount">{{ $article->likes->where('is_deleted', false)->count() }}</span> いいね
</div>





		<div class="pull-right article-user-link">
			@if($article->user_id === Auth::id())
				<li><a class="bg-primary" href="{{ route('articles.myblog', Auth::id()) }}">マイブログへ</a></li>
			@else
				<a href="{{ route('articles.myblog', ['id' => $article->user_id]) }}"><span>{{ $article->user->name }}</span>さんのブログ一覧へ</a>
			@endif
		</div>    

<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white pt-2 pl-3 overflow-hidden shadow-sm sm:rounded-lg">
            <!-- コメントフォーム -->
<form action="{{ route('articles.commentStore', ['article' => $article->id]) }}" method="POST">
    @csrf
    @error("comment")
    <div class="text-red-500">{{ $message }}</div>
    @enderror
    <div class="form-group">
        <textarea name="comment" rows="3" class="form-input"></textarea>
        <button type="submit" class="comment-button">コメントする</button>
    </div>
</form>
<style>
    .form-group {
        display: flex;
        margin-bottom: 10px;
    }

    .form-input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        resize: vertical;
    }

    .comment-button {
        margin-left: 10px;
        padding: 8px 12px;
        background-color: #1a202c;
        color: #fff;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }
</style>
<!-- コメント一覧 -->
<h2>コメント一覧</h2>
<hr>
<div>
    <ul>
        @forelse ($article->articleComments as $comment)
        @if (!$comment->is_deleted)
        <li>
            <div class="comment-wrapper" id="comment-{{ $comment->id }}">
                <div class="comment-content">
                    <p>{{ $comment->comment }}</p>
                </div>
                @if (Auth::check() && Auth::user()->id === $comment->user->id)
                <!-- コメント編集フォーム -->
                <div class="edit-comment-form">
                    <form id="edit-comment-form-{{ $comment->id }}" action="{{ route('articles.commentUpdate', ['comment' => $comment->id, 'article' => $article->id]) }}" method="POST">
                        @csrf
                        @method('POST')
                        <input type="hidden" name="_method" value="PATCH">
                        <div class="text-red-500" id="edit-comment-error-{{ $comment->id }}"></div>
                        <div class="flex items-center">
                            <textarea id="edit-comment-{{ $comment->id }}" name="comment" rows="2" cols="40" class="form-input">{{ $comment->comment }}</textarea>
                            <div>
                                <button type="button" class="update-comment-button inline-block rounded ml-2 px-4 py-2 text-xs font-medium uppercase leading-normal text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" data-comment-id="{{ $comment->id }}">
                                    更新
                                </button>
                                <button type="button" class="cancel-comment-button inline-block rounded ml-2 px-4 py-2 text-xs font-medium uppercase leading-normal text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300" data-comment-id="{{ $comment->id }}">
                                    キャンセル
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <button type="button" class="edit-comment-button inline-block rounded ml-2 px-4 py-2 text-xs font-medium uppercase leading-normal text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" data-comment-id="{{ $comment->id }}">
                    編集する
                </button>
                <form action="{{ route('articles.commentDestroy', ['article' => $article->id, 'comment' => $comment->id]) }}" method="POST" class="inline-block delete-comment-form">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="rounded ml-2 px-4 py-2 text-xs font-medium uppercase leading-normal text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300" onclick="return confirm('本当に削除しますか?')">
                        削除する
                    </button>
                </form>
                @endif
        </li>
        @endif
        @empty
        <li>コメントはありません</li>
        @endforelse
    </ul>
</div>

<style>
    .comment-wrapper {
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 10px;
    }
    
    .comment-content {
        margin-bottom: 10px;
    }
    .form-input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        resize: vertical;
    }
    .like-btn, .unlike-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        color: #ffffff;
    }

    .like-btn {
        background-color: #2196F3;
    }

    .unlike-btn {
        background-color: #f44336;
    }
</style>

<!-- 必要なスクリプトの読み込み -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<script>
    // マークダウンをHTMLに変換して表示する関数
    function displayMarkdownContent(markdown) {
        const html = marked(markdown);
        document.getElementById('markdownContent').innerHTML = html;
    }

    // ページの読み込み完了時にマークダウンを表示する処理を実行
    window.addEventListener('DOMContentLoaded', () => {
        const markdownContent = "{{ $article->body ?? '' }}"; // Laravelの変数からマークダウンを取得
        displayMarkdownContent(markdownContent);
    });
</script>


<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    $(document).ready(function() {
        $('.edit-comment-form').hide();

        // 編集ボタンのクリックイベント
        $('.edit-comment-button').click(function() {
            var commentId = $(this).data('comment-id');
            var commentText = $('#comment-' + commentId + ' .comment-content p').text().trim();

            // 編集フォームを表示してコメントテキストをセット
            $('#comment-' + commentId + ' .comment-content').hide();
            $('#edit-comment-' + commentId).val(commentText);
            $('#comment-' + commentId + ' .edit-comment-form').show();
            $(this).hide();
            $('#comment-' + commentId + ' .delete-comment-form').hide();
        });

        // キャンセルボタンのクリックイベント
        $('.cancel-comment-button').click(function() {
            var commentId = $(this).data('comment-id');

            // 編集フォームを非表示にしてコメントテキストを表示
            $('#comment-' + commentId + ' .comment-content').show();
            $('#comment-' + commentId + ' .edit-comment-form').hide();
            $('#comment-' + commentId + ' .edit-comment-button').show();
            $('#comment-' + commentId + ' .delete-comment-form').show();
        });

        // 更新ボタンのクリックイベント
        $('.update-comment-button').click(function() {
            var commentId = $(this).data('comment-id');
            var updatedComment = $('#edit-comment-' + commentId).val();

            // Ajaxリクエストを送信
            $.ajax({
                url: '/articles/{{ $article->id }}/comments/' + commentId,
                type: 'POST', // POSTメソッドに変更
                data: {
                    _method: 'PATCH', // _methodフィールドを追加
                    comment: updatedComment,
                    _token: '{{ csrf_token() }}'
                },
                success: function(response) {
                    // ページをリロードして更新したコメントを表示
                    location.reload();
                },
                error: function(xhr) {
                    var errorMessage = xhr.responseJSON.errors.comment[0];
                    $('#edit-comment-error-' + commentId).text(errorMessage);
                }
            });
        });
    });

    let isLiked = {{ (Auth::check() && $article->isLikedByUser(Auth::user()->id)) ? 'true' : 'false' }};
    let likeCount = {{ $article->likes->where('is_deleted', false)->count() }};
    let isProcessing = false;

    // いいねの処理
    function like(articleId) {
        if (!isProcessing && !isLiked) {
            isProcessing = true;
            $.ajax({
                url: `/like/${articleId}`,
                type: 'POST',
                data: {
                    _token: '{{ csrf_token() }}'
                },
                success: function (response) {
                    console.log(response.message);
                    updateLikeButton(true); // いいね解除ボタンに切り替える
                    updateLikeCount(response.likeCount); // 総数を更新する
                    isLiked = true;
                    likeCount = response.likeCount;
                    isProcessing = false;
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                    isProcessing = false;
                }
            });
        }
    }

    // いいね解除の処理
    function unlike(articleId) {
        if (!isProcessing && isLiked) {
            isProcessing = true;
            $.ajax({
                url: `/unlike/${articleId}`,
                type: 'POST',
                data: {
                    _token: '{{ csrf_token() }}'
                },
                success: function (response) {
                    console.log(response.message);
                    updateLikeButton(false); // いいねボタンに切り替える
                    updateLikeCount(response.likeCount); // 総数を更新する
                    isLiked = false;
                    likeCount = response.likeCount;
                    isProcessing = false;
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                    isProcessing = false;
                }
            });
        }
    }

    // いいねボタンの表示を切り替える関数
    function updateLikeButton(isLiked) {
        const likeButtonContainer = document.getElementById('likeButtonContainer');
        if (isLiked) {
            likeButtonContainer.innerHTML = '<button onclick="unlike({{ $article->id }})" class="btn unlike-btn">いいね解除</button>';
        } else {
            likeButtonContainer.innerHTML = '<button onclick="like({{ $article->id }})" class="btn like-btn">いいね</button>';
        }
    }

    // 総数を更新する関数
    function updateLikeCount(likeCount) {
        const likeCountContainer = document.getElementById('likeCount');
        likeCountContainer.innerText = likeCount;
    }

</script>



{{-- <x-answerpanel></x-answerpanel> --}}

        </div>
    </div>
</div>
</x-app-layout>

