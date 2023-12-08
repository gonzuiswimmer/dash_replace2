<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        お問い合わせ一覧
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

            <div class="w-3/4 py-2 sm:px-2 lg:px-2 mx-auto">
                <div class="overflow-hidden">
                    @if ($inquiries->isEmpty())
                    <p class="text-center">登録されているお知らせはありません。</p>
                    @endif
                    <table class="min-w-full text-left text-sm">
                    <tbody class="border-2">
                        @foreach ($inquiries as $inquiry )
                        <tr
                        class="border-b-2">
                        <td class="whitespace-normal px-2 py-2">
                            <span class="px-2 text-sm">{{$inquiry->user->name}}</span>
                            <span class="px-2 text-xs text-gray-400">{{$inquiry->created_at->format('Y-m-d')}}</span>
                            <div class="px-2 text-base font-medium">{{$inquiry->body}}</div>
                        </td>
                        @endforeach
                        </tr>
                    </tbody>
                    </table>
                </div>
                {{$inquiries->appends(request()->query())->links()}}
            </div>

          </div>
        </div>
      </section>
</x-app-layout>
