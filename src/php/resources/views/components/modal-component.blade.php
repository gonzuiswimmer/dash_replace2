<!-- This is an example component -->
<div class="max-w-2xl mx-auto">

    <!-- Main modal -->
    <div id="authentication-modal" aria-hidden="true" class="hidden overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
        <div class="relative w-full max-w-md px-4 h-full md:h-auto">
            <!-- Modal content -->
            <div class="bg-white rounded-lg shadow relative dark:bg-gray-700">
                <div class="flex justify-end p-2">
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <form class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" method="POST" action="{{ route('profile.submitInquiry') }}">
                    @csrf
                    <h3 class="text-xl font-medium text-gray-900 dark:text-white">お問い合わせフォーム</h3>
                    <p class="text-sm">お問い合わせや不具合に関する報告、要望等を投稿してください。(1000文字以内)</p>
                    <div>
                        <label for="inquiry" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">お問い合わせ内容</label>
                        <textarea name="inquiry" id="inquiry"  rows="10" cols="60" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="ここに記入してください（最大1000文字）" required=""></textarea>
                        <input type="hidden" name="user_id" value="{{$user}}">
                        <input type="hidden" name="referer" value="{{url()->current()}}">
                    </div>
                    <button type="submit" class="w-full text-white bg-green-300 hover:bg-green-400 focus:ring-4 focus:ring-green-100 font-medium rounded-lg text-lg px-3 py-2.5 text-center dark:bg-green-300 dark:hover:bg-green-400 dark:focus:ring-green-500">送信</button>
                    <button type="button" class="w-full text-white bg-orange-100 hover:bg-orange-200 focus:ring-4 focus:ring-orange-200 font-medium rounded-lg text-lg px-3 py-2.5 text-center dark:bg-orange-200 dark:hover:bg-orange-200 dark:focus:ring-orange-300" data-modal-toggle="authentication-modal">
                       閉じる
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<script src="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js"></script>
