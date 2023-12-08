<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            月報トップ
        </h2>
    </x-slot>

    <section class="text-gray-600 body-font overflow-hidden">
        @if (session('status'))
        <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
            <p class="font-bold">{{ session('status') }}</p>
        </div>
        @endif

        <div class="container px-5 py-24 mx-auto flex">
            <div class="w-3/4">

                {{-- 検索フォーム --}}
                <div class="border my-12 mx-auto border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg mb-10">
                    <form action="{{route('monthlyReport.index')}}" method="GET">

                    <div class="border border-gray-200 p-2 rounded mb-4">
                        <div class="flex border rounded items-center p-2 my-1">
                            <svg class="fill-current text-gray-800 mr-2 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path class="heroicon-ui"
                                    d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"/>
                            </svg>
                            <input type="text" placeholder="氏名" name="name"
                                class="w-full focus:outline-none text-gray-700"/>
                        </div>
                        <div class="flex border rounded items-center p-2 my-1">
                            <svg  class="fill-current text-gray-800 mr-2 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path class="heroicon-ui"
                                    d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM5.68 7.1A7.96 7.96 0 0 0 4.06 11H5a1 1 0 0 1 0 2h-.94a7.95 7.95 0 0 0 1.32 3.5A9.96 9.96 0 0 1 11 14.05V9a1 1 0 0 1 2 0v5.05a9.96 9.96 0 0 1 5.62 2.45 7.95 7.95 0 0 0 1.32-3.5H19a1 1 0 0 1 0-2h.94a7.96 7.96 0 0 0-1.62-3.9l-.66.66a1 1 0 1 1-1.42-1.42l.67-.66A7.96 7.96 0 0 0 13 4.06V5a1 1 0 0 1-2 0v-.94c-1.46.18-2.8.76-3.9 1.62l.66.66a1 1 0 0 1-1.42 1.42l-.66-.67zM6.71 18a7.97 7.97 0 0 0 10.58 0 7.97 7.97 0 0 0-10.58 0z"/>
                            </svg>
                            <input type="month" placeholder="入社日" name="hiredMonth"
                                class="w-full focus:outline-none text-gray-700"/>
                        </div>
                        <div class="flex border rounded items-center p-2 my-1">
                            <svg class="fill-current text-gray-800 mr-2 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path class="heroicon-ui"
                                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
                            </svg>
                            <select type="text" placeholder="所属" name="department" class="w-full focus:outline-none text-gray-700">
                                <option value="">---</option>
                                @foreach ($departments as $department )
                                <option value="{{$department->id}}">{{$department->name}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="flex border rounded items-center p-2 my-1">
                            <svg  class="fill-current text-gray-800 mr-2 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path class="heroicon-ui"
                                    d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM5.68 7.1A7.96 7.96 0 0 0 4.06 11H5a1 1 0 0 1 0 2h-.94a7.95 7.95 0 0 0 1.32 3.5A9.96 9.96 0 0 1 11 14.05V9a1 1 0 0 1 2 0v5.05a9.96 9.96 0 0 1 5.62 2.45 7.95 7.95 0 0 0 1.32-3.5H19a1 1 0 0 1 0-2h.94a7.96 7.96 0 0 0-1.62-3.9l-.66.66a1 1 0 1 1-1.42-1.42l.67-.66A7.96 7.96 0 0 0 13 4.06V5a1 1 0 0 1-2 0v-.94c-1.46.18-2.8.76-3.9 1.62l.66.66a1 1 0 0 1-1.42 1.42l-.66-.67zM6.71 18a7.97 7.97 0 0 0 10.58 0 7.97 7.97 0 0 0-10.58 0z"/>
                            </svg>対象月～
                            <input type="month" placeholder="対象月" name="fromMonth"
                                class="w-full focus:outline-none text-gray-700"/>
                        </div>
                        <div class="flex border rounded items-center p-2 my-1">
                            <svg  class="fill-current text-gray-800 mr-2 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path class="heroicon-ui"
                                d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM5.68 7.1A7.96 7.96 0 0 0 4.06 11H5a1 1 0 0 1 0 2h-.94a7.95 7.95 0 0 0 1.32 3.5A9.96 9.96 0 0 1 11 14.05V9a1 1 0 0 1 2 0v5.05a9.96 9.96 0 0 1 5.62 2.45 7.95 7.95 0 0 0 1.32-3.5H19a1 1 0 0 1 0-2h.94a7.96 7.96 0 0 0-1.62-3.9l-.66.66a1 1 0 1 1-1.42-1.42l.67-.66A7.96 7.96 0 0 0 13 4.06V5a1 1 0 0 1-2 0v-.94c-1.46.18-2.8.76-3.9 1.62l.66.66a1 1 0 0 1-1.42 1.42l-.66-.67zM6.71 18a7.97 7.97 0 0 0 10.58 0 7.97 7.97 0 0 0-10.58 0z"/>
                            </svg>対象月
                            <input type="month" placeholder="対象月" name="toMonth"
                            class="w-full focus:outline-none text-gray-700"/>
                        </div>
                        <!-- 投稿月の状況 -->
                        <div class="flex border rounded items-center p-2 my-1">
                            <label>
                            <input type="radio" name="assign" value="2" id="assign"
                                class=""/><span>アサイン中</span>
                            </label>
                            <label>
                            <input type="radio" name="assign" value="1" id="assign"
                                class=""/><span>待機中</span>
                            </label>
                            <label>
                            <input type="radio" name="assign" value="" id="assign"
                                class=""/><span>指定なし</span>
                            </label>
                        </div>
                        <!-- 担当した行程 -->
                        <div class="flex border rounded items-center p-2 my-1">
                            <label>
                            <input type="checkbox" name="workingProcess" value="definition"
                                class=""/><span>要件定義</span>
                            </label>
                            <label>
                            <input type="checkbox" name="workingProcess" value="design"
                                class=""/><span>設計</span>
                            </label>
                            <label>
                            <input type="checkbox" name="workingProcess" value="implementation"
                                class=""/><span>実装</span>
                            </label>
                            <label>
                            <input type="checkbox" name="workingProcess" value="test"
                                class=""/><span>テスト</span>
                            </label>
                            <label>
                            <input type="checkbox" name="workingProcess" value="operation"
                                class=""/><span>運用保守</span>
                            </label>
                            <label>
                            <input type="checkbox" name="workingProcess" value="analysis"
                                class=""/><span>分析</span>
                            </label>
                            <label>
                            <input type="checkbox" name="workingProcess" value="training"
                                class=""/><span>研修</span>
                            </label>
                            <label>
                            <input type="checkbox" name="workingProcess" value="structure"
                                class=""/><span>構築</span>
                            </label>
                            <label>
                            <input type="checkbox" name="workingProcess" value="trouble"
                                class=""/><span>障害対応</span>
                            </label>
                            <label>
                            <input type="checkbox" name="workingProcess" value="definition"
                                class=""/><span>要件定義</span>
                            </label>
                        </div>
                        <!-- タグ -->
                        <div class="flex border rounded items-center p-2 my-1" id="tagForm">
                            <button type="button" id="addTagBtn" class="rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg text-white" style="background-color:rgba(107, 159, 29, 0.89)">タグを増やす</button><br>
                            <div class="tag-item flex">
                                <label>タグ：
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-around">
                        <button class="p-2 border w-1/4 rounded-md bg-sky-400 text-white" type="submit">検索</button>
                        <button class="p-2 border w-1/4 rounded-md bg-sky-400 text-white">リセット</button>
                    </div>
                    </form>
                </div>

                {{-- 月報一覧 --}}
                @foreach ( $reports as $report )
                <div class=" items-start">
                    <a class="inline-flex items-center">
                    <img alt="blog" src="https://dummyimage.com/104x104" class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
                    <span class="flex-grow flex flex-col pl-4">
                        <span class="title-font font-medium text-gray-900"><a href="{{ route('profile.show', $report->user->id) }}">{{ $report->user->name }}</a></span>
                        <span class="title-font font-medium text-gray-900">{{ $report->target_month->format('Y')}}年{{ $report->target_month->format('m')}}月分</span>
                        <button type="submit" form="searchForm" name="department" value="{{$report->user->department->id}}">【{{$report->user->department->name}}】</button>
                        <button type="submit" form="searchForm" name="hiredMonth" value="{{$report->created_at->format('Y-m') }}" class="text-gray-400 text-xs tracking-widest mt-0.5">{{ \Carbon\Carbon::parse($report->user->entry_date)->format('Y年m月')}}入社</button>
                    </span>
                    </a>
                    @foreach ($report->tags as $tag )
                    <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">{{ $tag->name }}</span>
                    @endforeach
                </div>
                <div class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 w-full">
                    <a class="text-indigo-500 inline-flex items-center">Learn More
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                    </a>
                    <span class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                    </span>
                    <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                    {{$report->comments_count}}
                    </span>
                </div>
                <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4"><a href="{{route('monthlyReport.show',['monthlyReport' => $report->id])}}">{{ $report->project_summary }}</a></h2>
                @endforeach

                {{$reports->appends(request()->query())->links()}}
                </div>

                <!--サイドバー-->
                <div class="w-1/5 ml-auto">
                {{-- いいね別投稿数ランキング（月報） --}}
                <x-ranking-of-monthly-report :monthlyReportRanking="$monthlyReportRanking">
                </x-ranking-of-monthly-report>
                </div>
            </div>
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
            newForm.required = true;

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
</x-app-layout>
