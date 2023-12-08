<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            @if (is_null($filteredBy))
                質問一覧
            @else
                {{ $filteredBy }}に合致する質問一覧
            @endif
        </h2>
    </x-slot>

    <section class="text-gray-600 body-font overflow-hidden">
        @if (session('status'))
            <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                role="alert">
                <p class="font-bold">{{ session('status') }}</p>
            </div>
        @endif
        <div class="container px-5 py-24 mx-auto flex">
            <div class="w-3/4">

                @foreach ($questions as $question)
                    <div class="mb-12 items-start">
                        <div class="inline-flex items-center w-full">
                            <img alt="blog" src="https://dummyimage.com/104x104"
                                class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
                            <div class="">
                                【<button type="submit" form="searchForm" name="hiredMonth"
                                    value="{{ $question->user->entry_date }}"
                                    class="inline-box text-blue-700 text-xs tracking-widest mt-0.5 hover:text-blue-500 hover:border-blue-500 hover:border-b-2">{{ \Carbon\Carbon::parse($question->user->entry_date)->format('Y-m') }}</button>
                                <button type="submit" form="searchForm" name="department"
                                    value="{{ $question->user->department->id }}"
                                    class="inline-box text-blue-700 text-xs tracking-widest mt-0.5 hover:text-blue-500 hover:border-blue-500 hover:border-b-2">{{ $question->user->department->name }}</button>】
                                <a href="{{ route('profile.show', $question->user->id) }}"><span
                                        class="title-font font-medium text-blue-700 hover:text-blue-500 hover:border-blue-500 hover:border-b-2">{{ $question->user->name }}</span></a>
                                が{{ $question->created_at->format('Y-m-d') }}に投稿
                            </div>
                        </div>
                        @foreach ($question->tags as $tag)
                            <button type="submit" form="searchForm" name="tag" value="{{ $tag->name }}"
                                class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest hover:bg-indigo-100">{{ $tag->name }}</button>
                        @endforeach
                        <div class="flex items-center flex-wrap border-b-2 border-gray-100 w-full">
                            <span
                                class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>1.2K
                            </span>
                            <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                                <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <path
                                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                                    </path>
                                </svg>{{ $question->questionAnswers->count() }}
                            </span>
                        </div>
                        <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900"><a
                                href="{{ route('questions.show', ['question' => $question->id]) }}"
                                class="hover:text-blue-500 hover:border-blue-500 hover:border-b-2">{{ $question->title }}</a>
                        </h2>
                    </div>
                @endforeach

                {{ $questions->appends(request()->query())->links() }}
            </div>

            <div class="w-1/5 ml-auto">
                <form id="searchForm" action="{{ route('questions.index') }}" method="GET">
                    <div class="mb-3">
                        <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                            <input type="search" name="keyword"
                                class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                placeholder="Search" aria-label="Search" aria-describedby="button-addon1" />

                            <!--Search button-->
                            <button
                                class="relative z-[2] flex items-center rounded-r bg-blue-400 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg"
                                type="submit" id="button-addon1" data-te-ripple-init data-te-ripple-color="light">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    class="h-5 w-5">
                                    <path fill-rule="evenodd"
                                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        @foreach ($departments as $department)
                            <button type="submit" name="department" value="{{ $department->id }}"
                                class="text-blue-700 hover:text-blue-500 hover:border-blue-500 hover:border-b-2">【{{ $department->name }}】</button>
                        @endforeach
                    </div>
                </form>
                <a href="{{ route('questions.noAnswers') }}"
                    class="text-lg text-rose-600 border-b border-rose-600 font-bold hover:text-blue-500 hover:border-blue-500 hover:border-b-2">回答募集中の質問一覧</a>
            </div>

        </div>

    </section>
</x-app-layout>
