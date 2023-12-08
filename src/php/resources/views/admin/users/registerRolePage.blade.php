<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        管理者登録
        </h2>
    </x-slot>
    <section class="text-gray-600 body-font overflow-hidden">
        @if (session('status'))
        <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
            <p class="font-bold">{{ session('status') }}</p>
        </div>
        @endif
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-12">

            {{-- 検索フォーム --}}
            <div class="border w-2/3 border-gray-300 p-6 grid grid-cols-1 gap-6 bg-white shadow-lg rounded-lg mb-10 mx-auto">
                <form action="{{route('admin.users.registerNewRole')}}" method="GET">

                <div class="border border-gray-200 p-2 rounded mb-4">
                    <div class="flex border rounded items-center p-2 my-1 mx-auto">
                        <svg class="fill-current text-gray-800 mr-2 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path class="heroicon-ui"
                                d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"/>
                        </svg>
                        <input type="text" placeholder="氏名" name="name"
                            class="w-full focus:outline-none text-gray-700"/>
                    </div>
                </div>
                <div class="flex justify-around">
                    <button class="p-2 border w-1/4 rounded-md bg-sky-400 text-white" type="submit">検索</button>
                </div>
                </form>
            </div>

            {{-- 社員一覧 --}}
            <div class="w-2/3 py-2 sm:px-2 lg:px-2 mx-auto">
                @if ($users->isEmpty())
                <p class="text-center">該当のユーザーは存在しません。</p>
                @elseif ($users->isNotEmpty())
                <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm">
                        <tbody>
                            @foreach ($users as $user )
                            <tr
                            class="border-b">
                            <td class="whitespace-nowrap px-2 py-2 font-medium">
                                <form method="post" class="flex" action="{{route('admin.users.storeNewRole',$user->id)}}">
                                    @csrf
                                <span class="px-2">{{$user->name}}</span>
                                <span class="text-gray-400 px-2 text-xs mt-0.5">入社日：{{ $user->entry_date  }}</span>
                                <span class="px-2">【{{$user->department->name}}】</span>
                                <button type="submit" name="addRole" value="{{$user->id}}" class="ml-auto bg-green-500 text-white px-2 py-1 rounded justify-end">追加
                                </button>
                                </form>
                            </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                 {{$users->appends(request()->query())->links()}}
                @endif
            </div>

          </div>
        </div>
      </section>
</x-app-layout>
