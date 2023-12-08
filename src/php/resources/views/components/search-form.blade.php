<div class="border w-2/3 border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg mb-10">
    <form action="{{ $slot }}" method="GET">
    {{-- 管理者画面でのユーザー検索では現役or退職済みか選べる --}}
    @if (Auth::user()->role->role === 0)
    <div class="pt-6 md:pt-0 mb-4">
        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-3">
                    <input id="vue-checkbox-list" name="status" type="radio" value="working" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="vue-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">在籍</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-3">
                    <input id="react-checkbox-list" name="status" type="radio" value="retired" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="react-checkbox-list" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">退職済み</label>
                </div>
            </li>
        </ul>
    </div>
    @endif

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
            <input type="month" placeholder="入社日" name="hireMonth"
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
    </div>
    <div class="flex justify-around">
        <button class="p-2 border w-1/4 rounded-md bg-sky-400 text-white" type="submit">検索</button>
        <button class="p-2 border w-1/4 rounded-md bg-sky-400 text-white">リセット</button>
    </div>
    </form>
</div>
