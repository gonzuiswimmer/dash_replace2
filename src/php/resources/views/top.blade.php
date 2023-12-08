<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            TOP
        </h2>
    </x-slot>

    <section class="text-gray-600 body-font overflow-hidden">
        @if (session('status'))
        <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
            <p class="font-bold">{{ session('status') }}</p>
        </div>
        @endif

        <!--お知らせ-->
        <div class="container px-5 py-3 mx-auto">
            <div class="w-2/3 py-2 sm:px-2 lg:px-2 mx-auto">
                <h3 class="pl-3 mb-2 font-semibold text-xl text-gray-800 leading-tight">お知らせ</h3>
                <div class="overflow-hidden">
                    @if ($announcements->isEmpty())
                    <p class="text-center">登録されているお知らせはありません。</p>
                    @endif
                    <table class="min-w-full text-left text-sm border-2">
                    <tbody>
                        @foreach ($announcements as $announcement )
                        <tr
                        class="border-b-2">
                        <td class="whitespace-nowrap px-2 py-2 font-medium"><span class="px-2">{{$announcement->created_at->format('Y-m-d')}}</span><span class="px-2">{{$announcement->title}}</span></td>
                        @endforeach
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div class="text-right mt-4">
                <a href="{{route('announcements')}}" class="font-medium text-blue-400 dark:text-blue-300 hover:underline">お知らせ一覧はこちら</a>
                </div>
            </div>
          </div>

        <!--最近の月報一覧-->
        <div class="container px-5 py-3 mx-auto">
            <div class="w-2/3 py-2 sm:px-2 lg:px-2 mx-auto">
                <h3 class="pl-3 mb-2 font-semibold text-xl text-gray-800 leading-tight">最近投稿された月報</h3>
                <div class="overflow-hidden">
                    @if ($recentReports->isEmpty())
                    <p class="text-center">最近投稿された月報はありません。</p>
                    @endif
                    <table class="min-w-full text-left text-sm border-2">
                        <tbody>
                            @foreach ($recentReports as $report )
                            <tr class="border-b-2 hover:bg-gray-200 w-full">
                                <td class="px-2 py-2">
                                    <a href="{{route('profile.show',$report->user->id)}}">
                                    {{-- 月報一覧 --}}
                                    <div class="">
                                        <span class="inline-box text-gray-900">【{{$report->user->department->name}}</span>
                                        <span class="inline-box text-gray-900">{{ \Carbon\Carbon::parse($report->user->entry_date)->format('Y年m月')}}入社】</span>
                                        <img alt="blog" src="https://dummyimage.com/104x104" class="inline-block w-8 h-8 rounded-full flex-shrink-0 object-cover object-center">
                                        <span class="inline-box text-gray-900">{{ $report->user->name }}</span>
                                        <span class="inline-box text-gray-900">{{ $report->target_month->format('Y')}}年{{ $report->target_month->format('m')}}月分</span>
                                    </div>
                                    <div class="text-right">
                                        @foreach ($report->tags as $tag )
                                        <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">{{ $tag->name }}</span>
                                        @endforeach
                                        <span class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                        <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                            <path d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>いいね数
                                        </span>
                                        <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                                        <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>コメント数
                                    </div>
                                    @endforeach
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="text-right mt-4">
                <a href="{{route('monthlyReport.index')}}" class="font-medium text-blue-400 dark:text-blue-300 hover:underline">月報一覧はこちら</a>
                </div>
            </div>
          </div>

        <!--フォローしているユーザーの月報一覧-->
        <div class="container px-5 py-3 mx-auto">
            <div class="w-2/3 py-2 sm:px-2 lg:px-2 mx-auto">
                <h3 class="pl-3 mb-2 font-semibold text-xl text-gray-800 leading-tight">フォローしているユーザーの月報</h3>
                <div class="overflow-hidden">
                    @if ($reportsOfFollowingUser->isEmpty())
                    <p class="text-center">最近投稿された月報はありません。</p>
                    @endif
                    <table class="min-w-full text-left text-sm border-2">
                        <tbody>
                            @foreach ($reportsOfFollowingUser as $report )
                            <tr class="border-b-2 hover:bg-gray-200 w-full">
                                <td class="px-2 py-2">
                                    <a href="{{route('profile.show',$report->user->id)}}">
                                    {{-- 月報一覧 --}}
                                    <div class="">
                                        <span class="inline-box text-gray-900">【{{$report->user->department->name}}</span>
                                        <span class="inline-box text-gray-900">{{ \Carbon\Carbon::parse($report->user->entry_date)->format('Y年m月')}}入社】</span>
                                        <img alt="blog" src="https://dummyimage.com/104x104" class="inline-block w-8 h-8 rounded-full flex-shrink-0 object-cover object-center">
                                        <span class="inline-box text-gray-900">{{ $report->user->name }}</span>
                                        <span class="inline-box text-gray-900">{{ $report->target_month->format('Y')}}年{{ $report->target_month->format('m')}}月分</span>
                                    </div>
                                    <div class="text-right">
                                        @foreach ($report->tags as $tag )
                                        <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">{{ $tag->name }}</span>
                                        @endforeach
                                        <span class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                        <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                            <path d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>いいね数
                                        </span>
                                        <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                                        <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>コメント数
                                    </div>
                                    @endforeach
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="text-right mt-4">
                <a href="{{route('monthlyReport.index')}}" class="font-medium text-blue-400 dark:text-blue-300 hover:underline">月報一覧はこちら</a>
                </div>
            </div>
          </div>

      </section>
</x-app-layout>
