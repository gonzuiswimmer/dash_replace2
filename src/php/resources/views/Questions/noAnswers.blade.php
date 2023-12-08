<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        回答募集中の質問一覧
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

            @foreach ( $questions as $question )
            <div class="p-12 md:w-1/2 flex flex-col items-start">
                <div class="inline-flex items-center w-full">
                <img alt="blog" src="https://dummyimage.com/104x104" class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
                    <div class="">
                        <span class="title-font font-medium text-gray-900">{{ $question->user->name }}</span>
                        <span class="text-gray-400 text-xs tracking-widest mt-0.5">{{ $question->created_at->format('Y-m-d')  }}</span><span>【{{$question->user->department->name}}】</span>
                    </div>
                </div>
                <div class="flex">
                    @foreach ($question->tags as $tag )
                    <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">{{ $tag->name }}</span>
                    @endforeach
                </div>
              <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4"><a href="{{route('questions.show',['question' => $question->id])}}" class="hover:text-blue-500 hover:border-blue-500 hover:border-b-2">{{$question->title}}</a></h2>
            </div>
            @endforeach

          </div>
        </div>
      </section>
</x-app-layout>
