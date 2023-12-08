<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        ユーザー検索
        </h2>
    </x-slot>
    <section class="text-gray-600 body-font overflow-hidden">
        @if (session('status'))
        <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
            <p class="font-bold">{{ session('status') }}</p>
        </div>
        @endif
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap flex justify-center items-center p-2 -m-12">

            <!-- 検索フォーム -->
            <div class="border w-2/3 border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg mb-10">
                <form action="{{route('searchUser')}}" method="GET">
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
                    </div>
                    <div class="flex justify-around">
                        <button class="p-2 border w-1/4 rounded-md bg-sky-400 text-white" type="submit">検索</button>
                        <button class="p-2 border w-1/4 rounded-md bg-sky-400 text-white">リセット</button>
                    </div>
                </form>
            </div>



            <div class="w-2/3 py-2 sm:px-2 lg:px-2">
                <div class="overflow-hidden">
                    @if ($users->isEmpty())
                    <p class="text-center">該当のユーザーは存在しません。</p>
                    @endif
                    <table class="min-w-full text-left text-sm">
                    <tbody>
                        @foreach ($users as $user )
                        <tr class="border-b hover:bg-sky-200">
                            <td class="whitespace-nowrap px-2 py-2 font-medium">
                                <a href="{{route('profile.show',$user->id)}}">
                                <span class="px-2">{{$user->name}}</span>
                                <span class="text-gray-400 px-2 text-xs mt-0.5">入社日：{{ $user->entry_date  }}</span>
                                <span class="px-2">【{{$user->department->name}}】</span>
                                </a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                    </table>
                </div>
                {{$users->appends(request()->query())->links()}}
            </div>

          </div>
        </div>
      </section>
</x-app-layout>
