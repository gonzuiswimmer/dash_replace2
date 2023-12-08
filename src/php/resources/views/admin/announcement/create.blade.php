<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        お知らせ登録
        </h2>
    </x-slot>
    <section class="text-gray-600 body-font overflow-hidden">
        @if (session('status'))
        <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
            <p class="font-bold">{{ session('status') }}</p>
        </div>
        @endif

        <div class="">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="container px-5 py-12 mx-auto">
                    <div class="">
                        <div class="pt-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div class="mx-auto block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">

                                {{-- form --}}
                                <form method="POST" action="{{ route('admin.announcement.store') }}">
                                    @csrf
                                    <div class="grid grid-cols-1 gap-4">
                                    <!--Title input-->
                                    <div class="mb-6">
                                        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">タイトル</label>
                                        <input type="text" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                    </div>

                                    <!--Body-->
                                    <div
                                        class="mb-6 min-h-[1.5rem] items-center justify-center">
                                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">本文</label>
                                        <textarea id="message" name="body" rows="30" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                    </div>

                                    <!--Submit button-->
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
            </div>
        </div>
      </section>
</x-app-layout>
