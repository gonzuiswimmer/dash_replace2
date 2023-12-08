<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            質問詳細画面
        </h2>
    </x-slot>

    @if (session('status'))
        <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
            <p class="font-bold">{{ session('status') }}</p>
        </div>
    @endif

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white pt-2 pl-3 overflow-hidden shadow-sm sm:rounded-lg">
                {{-- 自分の質問だったら編集ができる --}}
                @if ($question->user->id === Auth::id())
                    @if (isset($question->shipped_at))
                        <div class="rounded mb-2 rounded px-6 py-2.5 text-s text-center font-medium uppercase text-white" style="background-color:rgb(11, 146, 51)">公開済み</div>
                    @else
                        <div class="rounded mb-2 rounded px-6 py-2.5 text-s text-center font-medium uppercase text-white" style="background-color:rgb(142, 11, 146)">下書き</div>
                    @endif

                    <div>
                        <button type="button" onclick="location.href='{{ route('questions.edit',$question->id) }}'" class="inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg" style="background-color:rgb(11, 146, 51)" data-te-ripple-init data-te-ripple-color="light">
                            編集する
                        </button>
                        <form action="{{ route('questions.destroy',$question->id) }}" method="POST" class="inline-block">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg" style="background-color:rgb(241, 45, 45)" data-te-ripple-init data-te-ripple-color="light" onclick="return confirm('本当に削除しますか?')">
                                削除する
                            </button>
                        </form>
                    </div>
                @endif

                <div>
                    <a class="inline-flex items-center">
                        <img alt="blog" src="https://dummyimage.com/104x104" class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
                        <span class="flex-grow flex flex-col pl-4">
                            <span class="title-font font-medium text-gray-900">{{ $question->user->name }}</span>
                            <span class="text-gray-400 text-xs tracking-widest mt-0.5">{{ $question->created_at->format('Y-m-d') }}</span>
                            <span>【{{ $question->user->department->name }}】</span>
                        </span>
                    </a>
                </div>
                <h3 class="text-center font-semibold text-xl text-gray-800 leading-tight">{{ $question->title }}</h3>
                <div class="mx-auto block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    @foreach ($question->tags as $tag)
                        <span class="bg-cyan-400 text-white">{{ $tag->name }}</span>
                    @endforeach
                    <div>{{ $question->body }}</div>
                </div>
                <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>{{ $question->questionAnswers->count() }}
                </span>
            </div>

            <div class="w-2/3 mx-auto my-6">
                <h3 class="mt-4 mb-6 ml-3 text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                    {{ $question->questionAnswers->count() }}件の回答
                </h3>

<!-- コメントフォーム -->
<form action="{{ route('questions.commentStore', ['question' => $question->id]) }}" method="POST">
    @csrf
    <textarea name="answer" rows="3" cols="50"></textarea>
    <input type="hidden" name="is_reply" value="false">
    <input type="hidden" name="reply_parent_id" value="0">
    <button type="submit">コメントする</button>
</form>

<!-- コメント一覧 -->
<h2>コメント一覧</h2>
<hr>
<div>
    <ul>
        @forelse ($question->questionAnswers->where('reply_parent_id', null) as $comment)
            @if (!$comment->is_deleted)
                <li>
                    <strong><h3 id="comment-{{ $comment->id }}-name">{{ $comment->user->name }}</h3></strong>
                    <p id="comment-{{ $comment->id }}-answer">{{ $comment->answer }}</p>
                    <hr>
                    <br>
                    @if (Auth::check() && Auth::user()->id === $comment->user->id)
                        <!-- コメント編集フォーム -->
                        <form id="edit-comment-form-{{ $comment->id }}" class="edit-comment-form comment-form" action="{{ route('questions.commentUpdate', ['question' => $question->id, 'comment' => $comment->id]) }}" method="POST" style="display: none;">
                            @csrf
                            @method('PATCH')
                            <textarea id="edit-comment-{{ $comment->id }}-answer" name="answer" rows="2" cols="40">{{ $comment->answer }}</textarea>
                            <button type="button" class="update-comment-button inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg" data-comment-id="{{ $comment->id }}" style="background-color: rgb(11, 146, 51)" data-te-ripple-init data-te-ripple-color="light">
                                更新
                            </button>
                            <button type="button" class="cancel-comment-button inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg" data-comment-id="{{ $comment->id }}" style="background-color: rgb(241, 45, 45)" data-te-ripple-init data-te-ripple-color="light">
                                キャンセル
                            </button>
                        </form>
                        <button type="button" class="edit-comment-button inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg" data-comment-id="{{ $comment->id }}" style="background-color: rgb(11, 146, 51)" data-te-ripple-init data-te-ripple-color="light">
                            編集する
                        </button>
                        <form action="{{ route('questions.commentDestroy', ['question' => $question->id, 'comment' => $comment->id]) }}" method="POST" class="inline-block">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg" style="background-color:rgb(241, 45, 45)" data-te-ripple-init data-te-ripple-color="light" onclick="return confirm('本当に削除しますか?')">
                                削除する
                            </button>
                        </form>
                    @endif
           <!-- リプライボタン -->
<button type="button" class="reply-comment-button inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg" style="background-color:rgb(59, 130, 246)" data-comment-id="{{ $comment->id }}" data-te-ripple-init data-te-ripple-color="light">
    リプライする
</button>
<!-- リプライフォーム -->
<form id="reply-comment-form-{{ $comment->id }}" class="reply-comment-form comment-form" action="{{ route('questions.replyStore', ['question' => $question->id, 'comment' => $comment->id]) }}" method="POST" style="display: none;">
    @csrf
    <textarea name="answer" rows="2" cols="40" placeholder="リプライコメントを入力してください"></textarea>
    <button type="submit" class="reply-comment-submit inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg" style="background-color:rgb(11, 146, 51)" data-comment-id="{{ $comment->id }}" data-te-ripple-init data-te-ripple-color="light">
        送信する
    </button>
</form>

<!-- リプライコメント一覧 -->
@if ($comment->replies()->count() > 0)
    <ul class="reply-list">
        @foreach ($comment->replies as $reply)
            @if (!$reply->is_deleted)
                <li>
                    <div class="comment-wrapper" id="comment-{{ $reply->id }}">
                        <div class="comment-content">
                            <p>{{ $reply->answer }}</p>
                        </div>
                        @if (Auth::check() && Auth::user()->id === $reply->user->id)
                            <!-- リプライ編集フォーム -->
                            <div class="edit-reply-form comment-form" style="display: none;">
                                <form id="edit-reply-form-{{ $reply->id }}" action="{{ route('questions.replyUpdate', ['question' => $question->id, 'reply' => $reply->id]) }}" method="POST">
                                    @csrf
                                    @method('PATCH')
                                    <input type="hidden" name="_method" value="PATCH">
                                    <div class="text-red-500" id="edit-reply-error-{{ $reply->id }}"></div>
                                    <div class="flex items-center">
                                        <textarea id="edit-reply-{{ $reply->id }}" name="answer" rows="2" cols="40" class="form-input">{{ $reply->answer }}</textarea>
                                        <div>
                                            <button type="button" class="update-reply-button inline-block rounded ml-2 px-4 py-2 text-xs font-medium uppercase leading-normal text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" data-reply-id="{{ $reply->id }}">
                                                更新
                                            </button>
                                            <button type="button" class="cancel-reply-button inline-block rounded ml-2 px-4 py-2 text-xs font-medium uppercase leading-normal text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300" data-reply-id="{{ $reply->id }}">
                                                キャンセル
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {{-- <button type="button" class="edit-reply-button inline-block rounded ml-2 px-4 py-2 text-xs font-medium uppercase leading-normal text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" data-reply-id="{{ $reply->id }}">
                                編集する
                            </button> --}}
                            <form action="{{ route('questions.replyDestroy', ['question' => $question->id, 'reply' => $reply->id]) }}" method="POST" class="inline-block delete-reply-form">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="rounded ml-2 px-4 py-2 text-xs font-medium uppercase leading-normal text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300" onclick="return confirm('本当に削除しますか?')">
                                    削除する
                                </button>
                            </form>
                        @endif
                    </div>
                </li>
            @endif
        @endforeach
    </ul>
@endif

</li>
@endif
@empty
<p>まだコメントがありません。</p>
@endforelse
</ul>
</div>
</div>
</div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    $(document).ready(function() {
        $('.comment-form').hide(); // 全てのコメントフォームを非表示にする
        $('.reply-comment-form').hide(); // 全てのリプライフォームを非表示にする
        $('.edit-comment-form').hide(); // 全てのコメント編集フォームを非表示にする
        $('.edit-reply-form').hide(); // 全てのリプライ編集フォームを非表示にする

        // コメント編集ボタンのクリックイベント
        $('.edit-comment-button').click(function() {
            var commentId = $(this).data('comment-id');

            // 編集フォームを表示してコメントテキストを非表示にする
            $('.comment-form').hide();
            $('.edit-comment-form').hide();
            $('#comment-' + commentId + '-answer').hide();
            $('#edit-comment-' + commentId + '-answer').val($('#comment-' + commentId + '-answer').text().trim());
            $('#edit-comment-form-' + commentId).show();
        });

        // コメント更新ボタンのクリックイベント
        $('.update-comment-button').click(function() {
            var commentId = $(this).data('comment-id');
            var updatedComment = $('#edit-comment-' + commentId + '-answer').val();

            // Ajaxリクエストを送信
            $.ajax({
                url: '/questions/' + {{ $question->id }} + '/comments/' + commentId,
                type: 'POST',
                data: {
                    _method: 'PATCH',
                    answer: updatedComment,
                    _token: '{{ csrf_token() }}'
                },
                success: function(response) {
                    // ページをリロードして更新したコメントを表示
                    location.reload();
                },
                error: function(xhr) {
                    console.log(xhr.responseText);
                }
            });
        });

        // コメントキャンセルボタンのクリックイベント
        $('.cancel-comment-button').click(function() {
            var commentId = $(this).data('comment-id');

            // 編集フォームを非表示にしてコメントテキストを表示する
            $('#comment-' + commentId + '-answer').show();
            $('#edit-comment-form-' + commentId).hide();
        });

        // リプライボタンのクリックイベント
        $('.reply-comment-button').click(function() {
            var commentId = $(this).data('comment-id');

            // リプライフォームを表示
            $('.reply-comment-form').hide();
            $('#reply-comment-form-' + commentId).show();
        });

        // リプライ送信ボタンのクリックイベント
        $('.reply-comment-submit').click(function() {
            var commentId = $(this).data('comment-id');
            var replyText = $('#reply-comment-form-' + commentId + ' textarea[name="answer"]').val();

            // Ajaxリクエストを送信
            $.ajax({
                url: '/questions/' + {{ $question->id }} + '/replyStore/' + commentId,
                type: 'POST',
                data: {
                    answer: replyText,
                    _token: '{{ csrf_token() }}'
                },
                success: function(response) {
                    // ページをリロードして返信を表示
                    location.reload();
                },
                error: function(xhr) {
                    console.log(xhr.responseText);
                }
            });
        });

        // リプライ編集ボタンのクリックイベント
        $('.edit-reply-button').click(function() {
            var replyId = $(this).data('reply-id');

            // 編集フォームを表示してリプライテキストを非表示にする
            $('.edit-reply-form').hide();
            $('#comment-' + replyId + ' p').hide();
            $('#edit-reply-' + replyId).val($('#comment-' + replyId + ' p').text().trim());
            $('#edit-reply-form-' + replyId).show();
        });

        // リプライ更新ボタンのクリックイベント
        $('.update-reply-button').click(function() {
            var replyId = $(this).data('reply-id');
            var updatedReply = $('#edit-reply-' + replyId).val();

            // Ajaxリクエストを送信
            $.ajax({
                url: '/questions/' + {{ $question->id }} + '/replies/' + replyId,
                type: 'POST',
                data: {
                    _method: 'PATCH',
                    answer: updatedReply,
                    _token: '{{ csrf_token() }}'
                },
                success: function(response) {
                    // ページをリロードして更新したリプライを表示
                    location.reload();
                },
                error: function(xhr) {
                    console.log(xhr.responseText);
                }
            });
        });

        // リプライキャンセルボタンのクリックイベント
        $('.cancel-reply-button').click(function() {
            var replyId = $(this).data('reply-id');

            // 編集フォームを非表示にしてリプライテキストを表示する
            $('#comment-' + replyId + ' p').show();
            $('#edit-reply-form-' + replyId).hide();
        });
    });

</script>



</x-app-layout>

