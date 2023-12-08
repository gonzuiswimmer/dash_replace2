<!-- component -->
<div class="container mx-auto w-3/5 mb-10">
    <!-- Card -->
    {{-- @if ($answers === null) --}}
    <div class="h-50 rounded-lg ">
        <!-- Header -->
        <div class="flex items-center justify-between border-b bg-green-100">
            <div class="p-3 text-gray-700"><span>Write</span></div>
                <div class="p-3 flex">
                    <button class="text-slate-800 hover:text-blue-600 text-sm bg-green-350 hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center" form="question-form">
                        <span>Post</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Body -->
        <form action="{{ route('top') }}" method="POST" class="p-3 text-lg text-gray-600 bg-white h-36" id="question-form">
            @csrf
            <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">質問内容</label>
            <textarea id="content" name="content" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </form>
    </div>

    {{-- @else
        @foreach ($answers as $answer )
        <div class="h-50 rounded-lg ">
            <!-- Header -->
            <div class="flex items-center justify-between border-b bg-green-100">
                <div class="p-3 text-gray-700">{{$answer->user()->name}}さんのコメント（{{ $answer->created_at->format('Y-m-d')  }}）</div>
                <div class="p-3 flex">
                    <button class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                        </span>
                        <span>reply</span>
                    </button>
                </div>
            </div>
            <!-- Body -->
            <div class="p-3 text-lg text-gray-600 bg-white h-36">
                {{$answer->answer}}
            </div>
        </div>
        @endforeach
    @endif --}}

</div>

<script>

</script>
