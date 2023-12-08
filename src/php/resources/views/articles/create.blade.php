<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        ブログ投稿
        </h2>
    </x-slot>

    <x-errorbar :errors="$errors"></x-errorbar>
    <x-messagebar></x-messagebar>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="mt-8 mx-auto block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <form method="POST" action="{{ route('articles.store') }}">
                        @include('articles.form')
                        <!--Submit button-->
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
                        name="create"
                        value="create"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        style="background-color: #1da1f2">
                        登録する
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
