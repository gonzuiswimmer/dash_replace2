<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        お知らせ一覧
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

            <div class="w-2/3 py-2 sm:px-2 lg:px-2 mx-auto">
                <div class="overflow-hidden">
                    @if ($announcements->isEmpty())
                    <p class="text-center">登録されているお知らせはありません。</p>
                    @endif
                    <table class="min-w-full text-left text-sm">
                    <tbody>
                        @foreach ($announcements as $announcement )
                        <tr
                        class="border-b">
                        <td class="whitespace-nowrap px-2 py-2 font-medium"><span class="px-2">{{$announcement->created_at->format('Y-m-d')}}</span><span class="px-2">{{$announcement->title}}</span></td>
                        @endforeach
                        </tr>
                    </tbody>
                    </table>
                </div>
                {{$announcements->appends(request()->query())->links()}}
            </div>

          </div>
        </div>
      </section>
</x-app-layout>
