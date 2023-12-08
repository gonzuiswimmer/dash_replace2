<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            ユーザー検索・一覧
        </h2>
    </x-slot>
    <section class="text-gray-600 body-font overflow-hidden">
        @if (session('status'))
            <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                role="alert">
                <p class="font-bold">{{ session('status') }}</p>
            </div>
        @endif
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap flex justify-center items-center p-2 -m-12">

                <!-- SearchComponent -->
                <x-search-form :departments="$departments">
                    {{ route('admin.users') }}
                </x-search-form>


                <div class="w-2/3 py-2 sm:px-2 lg:px-2">
                    <div class="overflow-hidden">
                        @if ($users->isEmpty())
                            <p class="text-center">該当のユーザーは存在しません。</p>
                        @endif
                        <table class="min-w-full text-left text-sm">
                            <tbody>
                                @foreach ($users as $user)
                                    <tr class="border-b">
                                        <td class="whitespace-nowrap px-2 py-2 font-medium"><span class="px-2"><a
                                                    class="text-blue-500"
                                                    href="{{ route('admin.users.edit', ['id' => $user->id]) }}">{{ $user->name }}</a></span><span
                                                class="text-gray-400 px-2 text-xs mt-0.5">入社日：{{ $user->entry_date }}</span><span
                                                class="px-2">【{{ $user->department->name }}】</span></td>
                                @endforeach
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {{ $users->appends(request()->query())->links() }}
                </div>

            </div>
        </div>
    </section>
</x-app-layout>
