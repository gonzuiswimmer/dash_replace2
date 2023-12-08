<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        月報詳細画面
        </h2>
    </x-slot>

    @if (session('status'))
    <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p class="font-bold">{{ session('status') }}</p>
    </div>
    @endif


    <div class="py-12">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                @if(isset($report->shipped_at))
                <div class="rounded mb-2 rounded px-6 py-2.5 text-s text-center font-medium uppercase text-white" style="background-color:rgb(11, 146, 51)">登録済み</div>
                @else
                <div class="rounded mb-2 rounded px-6 py-2.5 text-s text-center font-medium uppercase text-white" style="background-color:rgb(142, 11, 146)">下書き</div>
                @endif

                <div class="mt-8 mx-auto w-2/3 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div class="mx-auto w-full text-center text-lg font-bold mb-6">
                        <label class="control-label col-sm-3" for="target_month">対象月</label>
                        <span>{{ $report->target_month->format('Y')}}年{{ $report->target_month->format('m')}}月の月報</span>
                    </div>

                    <div class="mb-4">
                        <label class="control-label col-sm-3" for="assign">今月のアサイン状況</label>
                        <a class="btn btn-default none-pointer">
                            @if ($report->assign == 1)
                            <button type="button" class="text-white bg-amber-400 p-1">待機中</button>
                            @elseif ($report->assign == 2)
                            <button type="button" class="text-white bg-amber-400 p-1">アサイン中</button>
                            @endif
                        </a>
                    </div>

                    <div class="mb-4">
                        <div class="control-label col-sm-3" >
                            <label for="project_summary">プロジェクト概要</label>
                        </div>
                        <div class="tab-pane active" id="project_summary-write">
                            <textarea rows="15" cols="30" class=" w-full" placeholder="{{ $report->project_summary }}" name="project_summary" id="project_summary" readonly>{{ $report->project_summary }}</textarea>
                        </div>
                    </div>

                    <!--Tag input-->
                    <div class="mb-4">
                        <div class="tag-item">
                            <label for="title" class="block">使用した技術</label>
                            @if (isset( $report->tags ))
                            <div id="report-tag-list" class="tag-list">
                                @foreach ($report->tags as $tag )
                                <span class="bg-cyan-400 text-white p-1">{{$tag->name}}</span>
                                @endforeach
                            </div>
                            @endif
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="control-label col-sm-3">担当した工程</label>
                        <div class="col-sm-9 form-control-static btn-group">
                            @if ($report->monthlyWorkingProcesses->process_definition == true)
                            <button type="button" class="text-white bg-amber-400 p-1">要件定義</button>
                            @endif
                            @if ($report->monthlyWorkingProcesses->process_design == true)
                            <button type="button" class="text-white bg-amber-400 p-1">設計</button>
                            @endif
                            @if ($report->monthlyWorkingProcesses->process_implementation == true)
                            <button type="button" class="text-white bg-amber-400 p-1">実装</button>
                            @endif
                            @if ($report->monthlyWorkingProcesses->process_test == true)
                            <button type="button" class="text-white bg-amber-400 p-1">テスト</button>
                            @endif
                            @if ($report->monthlyWorkingProcesses->process_operation == true)
                            <button type="button" class="text-white bg-amber-400 p-1">運用保守</button>
                            @endif
                            @if ($report->monthlyWorkingProcesses->process_analysis == true)
                            <button type="button" class="text-white bg-amber-400 p-1">分析</button>
                            @endif
                            @if ($report->monthlyWorkingProcesses->process_training == true)
                            <button type="button" class="text-white bg-amber-400 p-1">研修</button>
                            @endif
                            @if ($report->monthlyWorkingProcesses->process_structure == true)
                            <button type="button" class="text-white bg-amber-400 p-1">構築</button>
                            @endif
                            @if ($report->monthlyWorkingProcesses->process_trouble == true)
                            <button type="button" class="text-white bg-amber-400 p-1">障害対応</button>
                            @endif
                        </div>
                    </div>

                    <div class="mb-4">
                        <div class="control-label col-sm-3" >
                            <label for="business_content">業務内容</label>
                        </div>
                        <div class="tab-pane active" id="business_content-write">
                            <textarea rows="15" cols="30" class=" w-full" placeholder="{{ $report->business_content }}"
                                name="business_content" id="business_content" readonly>{{ $report->business_content }}
                            </textarea>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="control-label col-sm-3" for="this_month_goals">今月の目標</label>
                        <div class="col-sm-9">
                            @if(is_null($previousMonthlyReport))
                            <span class="text-red-500 font-base">前月の月報が入力されていません。前月の月報の「来月の目標」が表示されます。</span>
                            @else
                            <textarea rows="15" cols="30" class=" w-full" placeholder="{{ $report->business_content }}" readonly>
                            {{ $previousMonthlyReport->next_month_goals }}
                            @endif
                            </textarea>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div class="control-label col-sm-3" >
                            <label for="looking_back">今月の振り返り</label>
                        </div>
                        <div class="tab-pane active" id="looking_back-write">
                            <textarea rows="15" cols="30" class=" w-full" placeholder="{{ $report->looking_back }}"
                                name="looking_back" id="looking_back" readonly>{{ $report->looking_back }}</textarea>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div class="control-label col-sm-3">
                            <label for="next_month_goals">来月の目標</label>
                        </div>
                        <div class="tab-pane active" id="next_month_goals-write">
                            <textarea rows="15" cols="30" class=" w-full" placeholder="{{ $report->next_month_goals }}"
                                    name="next_month_goals" id="next_month_goals" readonly>{{ $report->next_month_goals }}</textarea>
                        </div>
                    </div>

                    {{-- 自分の質問だったら編集ができる --}}
                    <div>
                        @if ($report->user->id === Auth::id())
                        <button
                        type="button"
                        onclick="location.href='{{ route('monthlyReport.edit',$report->id) }}' "
                        class="inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style="background-color:rgb(11, 146, 51)"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                        編集する
                        </button>
                        <form action="{{ route('monthlyReport.destroy',$report->id) }}" method="POST" class="inline-block " >
                        @csrf
                        @method('DELETE')
                        <button
                        type="submit"
                        class="rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style="background-color:rgb(241, 45, 45)"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onclick="return confirm('本当に削除しますか?')"
                        >
                        削除する
                        </button>
                        </form>
                        @endif
                    </div>
                </div>

                <div class="w-2/3 mx-auto my-6">
                    <div id="comment" class="w-full"></div>
                    <h3>コメント</h3>
                    <!-- 		直前の処理の完了通知-->

                    {{-- ブログ流用のコメント機能 --}}
                    <!-- コメントフォーム -->
                    <form action="{{ route('monthlyReport.commentStore', ['monthlyReport' => $monthlyReport->id]) }}" method="POST">
                        {{-- <form action="{{ route('monthlyReport.commentStore', ['monthlyReport' => $monthlyReport]) }}" method="POST"> --}}
                        @csrf
                        <textarea name="comment" rows="3" cols="50"></textarea>
                        <button type="submit" class="bg-green-400 text-white p-1 rounded">コメントする</button>
                    </form>

                    <!-- コメント一覧 -->
                    <h3>コメント一覧</h3>
                    <hr>
                    <div>
                        <ul>
                        @forelse ($monthlyReport->monthlyReportComments as $comment)
                            <li>
                            <p id="comment-{{ $comment->id }}">{{ $comment->comment }}</p>
                            @if (Auth::check() && Auth::user()->id === $comment->user->id)
                                <!-- コメント編集フォーム -->
                                <form id="edit-comment-form-{{ $comment->id }}" class="edit-comment-form" action="{{ route('monthlyReport.commentUpdate', ['comment' => $comment->id, 'monthlyReport' => $monthlyReport->id]) }}" method="POST">
                                    @csrf
                                    @method('POST')
                                    <input type="hidden" name="_method" value="PATCH">
                                    <textarea id="edit-comment-{{ $comment->id }}" name="comment" rows="2" cols="40"></textarea>
                                    <button type="button" class="update-comment-button inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg" data-comment-id="{{ $comment->id }}" style="background-color: rgb(11, 146, 51)" data-te-ripple-init data-te-ripple-color="light">
                                        更新
                                    </button>
                                </form>
                                <button type="button" class="edit-comment-button inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg" data-comment-id="{{ $comment->id }}" style="background-color: rgb(11, 146, 51)" data-te-ripple-init data-te-ripple-color="light">
                                    編集する
                                </button>
                                <form action="{{ route('monthlyReport.commentDestroy', ['monthlyReport' => $monthlyReport->id, 'comment' => $comment->id]) }}" method="POST" class="inline-block">
                                @csrf
                                @method('DELETE')
                                <button type="submit"
                                    class="rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                    style="background-color:rgb(241, 45, 45)"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    onclick="return confirm('本当に削除しますか?')">
                                    削除する
                                </button>
                                </form>
                            @endif
                        </li>
                        @empty
                        <li>コメントはありません</li>
                        @endforelse
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            $('.edit-comment-form').hide();

            // 編集ボタンのクリックイベント
            $('.edit-comment-button').click(function() {
                var commentId = $(this).data('comment-id');
                var commentText = $('#comment-' + commentId).text().trim();

                // 編集フォームを表示してコメントテキストをセット
                $('#comment-' + commentId).hide();
                $('#edit-comment-' + commentId).val(commentText);
                $('#edit-comment-form-' + commentId).show();
            });

            // 更新ボタンのクリックイベント
            $('.update-comment-button').click(function() {
                var commentId = $(this).data('comment-id');
                var updatedComment = $('#edit-comment-' + commentId).val();

                // Ajaxリクエストを送信
                $.ajax({
                    url: '/monthly_reports/{{ $monthlyReport->id }}/comments/' + commentId,
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
                        console.log(xhr.responseText);
                    }
                });
            });
        });
    </script>
</x-app-layout>

