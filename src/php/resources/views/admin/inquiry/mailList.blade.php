<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        メーリングリスト
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
            <div class="container px-5 py-24 mx-auto">
                <div class="w-2/3 mx-auto py-2 sm:px-2 lg:px-2">
                    <div class="overflow-hidden">

                        {{-- メーリングリストテーブル(To) --}}
                        @foreach ($users as $user )
                        @if($user->role->inquiry_send === 1)
                        <table class="min-w-full text-left text-sm">
                            <tbody>
                                    <tr
                                    class="border-2 rounded">
                                        <td class="whitespace-nowrap px-2 py-2 font-medium">
                                            <form method="post" class="flex" action="{{route('admin.inquiry.update')}}">
                                                @csrf
                                                @method('PATCH')
                                            <span class="px-2 font-bold">To:</span>
                                            <span class="px-2">{{$user->name}}</span>
                                            <span class="px-2">{{$user->email}}</span>
                                            <button type="submit" name="deleteRole" value="{{$user->id}}"  class="ml-auto bg-red-500 text-white px-2 py-1 rounded justify-end">削除
                                            </button>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        @endif
                        @endforeach

                        {{-- メーリングリストテーブル(Cc) --}}
                        @foreach ($users as $user )
                        @if($user->role->inquiry_send === 2)
                        <table class="min-w-full text-left text-sm">
                            <tbody>
                                    <tr
                                    class="border-2 rounded">
                                        <td class="whitespace-nowrap px-2 py-2 font-medium">
                                            <form method="post" class="flex" action="{{route('admin.inquiry.update')}}">
                                                @csrf
                                                @method('PATCH')
                                            <span class="px-2 font-bold">Cc:</span>
                                            <span class="px-2">{{$user->name}}</span>
                                            <span class="px-2">{{$user->email}}</span>
                                            <button type="submit" name="deleteRole" value="{{$user->id}}"  class="ml-auto bg-red-500 text-white px-2 py-1 rounded justify-end">削除
                                            </button>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        @endif
                        @endforeach


                        {{-- メーリングリスト候補者テーブル --}}
                        @foreach ($users as $user )
                        @if($user->role->inquiry_send === 0)
                        <table class="min-w-full text-left text-sm">
                            <tbody>
                                    <tr
                                    class="border-2 rounded">
                                        <td class="whitespace-nowrap px-2 py-2 font-medium">
                                            <form method="post" class="flex" action="{{route('admin.inquiry.update',$user->id)}}">
                                                @csrf
                                                @method('PATCH')
                                            <span class="px-2">{{$user->name}}</span>
                                            <span class="px-2">{{$user->email}}</span>
                                            <button type="submit" name="addRoleTo" value="{{$user->id}}"  class="ml-auto bg-red-500 text-white px-2 py-1 rounded justify-end">Toに追加
                                            <button type="submit" name="addRoleCc" value="{{$user->id}}"  class="ml-auto bg-red-500 text-white px-2 py-1 rounded justify-end">Ccに追加
                                            </button>
                                            </form>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                        @endif
                        @endforeach

                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>
</x-app-layout>
