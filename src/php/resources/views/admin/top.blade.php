<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        管理者画面TOP
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


          </div>
        </div>
      </section>
</x-app-layout>
