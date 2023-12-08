<x-app-layout>

    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        {{$user->name}}さんの下書き中の月報一覧
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
              <div class="w-full">
                <button
                type="button"
                onclick="location.href='{{ route('monthlyReport.showMyReports', $user->id) }}' "
                class="inline-block rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                style="background-color:rgb(178, 106, 245)"
                data-te-ripple-init
                data-te-ripple-color="light">
                公開済みの月報一覧へ
                </button>
              </div>

              @if ($reports->count() === 0)
              <div class="w-full">表示する月報はありません</div>
              @else

              @foreach ($reports as $report)
              <div class="flex w-2/3 flex-col items-start mb-6">
                  <span class="text-red-500 text-base font-medium"> - {{ $report->target_month->format('Y')}}年{{ $report->target_month->format('m')}}月分</span>
                  <small class="monthly-report-shipped-at text-muted hidden-xs">最終更新日: {{ $report->updated_at->format('Y-m-d') }}</small>
                  <div class="pull-right">

                      @foreach($report->tags as $tag)
                      <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">{{ $tag->name }}</span>
                      @endforeach
                  </div>
                  <!-- プロジェクト概要 10文字以上の場合、9文字目まで表示させて、それ以降は「...」と表示 -->
                  <h4><a class="text-lg font-medium" href="{{ route('monthlyReport.show', $report->id)}}">{{ Str::limit($report->project_summary, 30, '...') }}</a></h4>
                      <!-- それ以外は普通に表示 -->
                </div>
                @endforeach
              {{ $reports->links() }}
              @endif

            </div>
        </div>
    </section>
</x-app-layout>
