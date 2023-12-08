<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        管理者一覧
        </h2>
    </x-slot>
    <section class="text-gray-600 body-font overflow-hidden">
        @if (session('status'))
        <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
            <p class="font-bold">{{ session('status') }}</p>
        </div>
        @endif
        <div class="container px-5 py-24 mx-auto">
            <div class="w-2/3 mx-auto py-2 sm:px-2 lg:px-2">
                <div class="overflow-hidden">
                    <table class="min-w-full text-left text-sm">
                        <tbody>
                            @foreach ($users as $user )
                            <tr
                            class="border-2 rounded">
                                <td class="whitespace-nowrap px-2 py-2 font-medium">
                                    <form method="post" class="flex" action="{{route('admin.users.delete',$user->id)}}">
                                        @csrf
                                        @method('DELETE')
                                    <span class="px-2">{{$user->name}}</span>
                                    <span class="text-gray-400 px-2 text-xs mt-0.5">入社日：{{ $user->entry_date  }}</span>
                                    <span class="px-2">【{{$user->department->name}}】</span>
                                    <button type="submit" name="deleteRole" value="{{$user->id}}"  class="ml-auto bg-red-500 text-white px-2 py-1 rounded justify-end">×
                                    </button>
                                    </form>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </section>
</x-app-layout>
