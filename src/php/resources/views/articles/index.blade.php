<x-app-layout>
		<x-slot name="header">
			<h2 class="font-semibold text-xl text-gray-800 leading-tight">
				ブログ一覧
				@if (!empty($keyword))
					: キーワード「{{ $keyword }}」に関する結果
				@endif
				@if (!empty($department_id))
					: 所属「{{ App\Models\Department::find($department_id)->name }}」に関する結果
				@endif
				@if (!empty($tagId))
					: タグ「{{ App\Models\Tag::find($tagId)->name }}」に関する結果
				@endif
				@if (!empty($article_category_id))
					: カテゴリー「{{ App\Models\ArticleCategories::find($article_category_id)->name }}」に関する結果
				@endif
				@if (!empty($entryDate))
					: 入社年月日「{{ $entryDate }}」に関する結果
				@endif
			</h2>
			
		</x-slot>
		<section class="text-gray-600 body-font overflow-hidden">
			@if (session('status'))
			<div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
				<p class="font-bold">{{ session('status') }}</p>
			</div>
			@endif
						
			<div class="container px-5 py-24 mx-auto">
				<!-- side content -->
				<div class="m-search sticky">
					<div>
						<div class="text-center" style="padding-bottom:1.5rem">
						<form action="{{ route('articles.index') }}" method="GET">
							<input type="text" name="keyword" value="{{ $keyword }}">
							<input type="submit" value="検索" class="text-white bg-blue-400 p-1 rounded">
							<br>
							<div class="text-center" style="margin-bottom:1.5rem">
							</div>
							<span>
								<a class="text-info side-dep" href="/articles?department_id=1">【 WEB 】</a>
							</span><span>
								<a class="text-info side-dep" href="/articles?department_id=2">【 CL 】</a>
							</span><span>
								<a class="text-info side-dep" href="/articles?department_id=3">【 ML 】</a>
							</span><span>
								<a class="text-info side-dep" href="/articles?department_id=4">【 内勤 】</a>
							</span><span>
								<a class="text-info side-dep" href="/articles?department_id=6">【 FR 】</a>
							</span><span>
								<a class="text-info side-dep" href="/articles?department_id=7">【 QA 】</a>
							</span><span>
								<a class="text-info side-dep" href="/articles?department_id=8">【 PHP 】</a>
							</span>
							</div>
							<div class="text-center" style="padding-bottom:1.5rem">
							<span>
								<a class="btn btn-sm btn-outline-primary btn-primary side-category" href="/articles?article_category_id=1">備忘録</a>
							</span><span>
								<a class="btn btn-sm btn-outline-primary btn-primary side-category" href="/articles?article_category_id=2">技術共有</a>
							</span><span>
								<a class="btn btn-sm btn-outline-primary btn-primary side-category" href="/articles?article_category_id=3">体験共有</a>
							</span><span>
								<a class="btn btn-sm btn-outline-primary btn-primary side-category" href="/articles?article_category_id=4">その他</a>
							</span>
							</div>
						</form>
					</div>
				</div>
				<hr>
				<br>
			  <div class="flex flex-wrap -m-12">
				@foreach($articles as $article) 
				@if ($article->shipped_at)
				<div class="p-12 md:w-1/2 flex flex-col items-start">
					<a class="inline-flex items-center">
					<img alt="blog" src="https://dummyimage.com/104x104" class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
					<span class="flex-grow flex flex-col pl-4">
						<a class="text-info" href="/articles?articleEntryDate={{ \Carbon\Carbon::parse($article->user->entry_date)->format('Y-m') }}">{{ $article->user->entry_date }}</a>
						<span class="title-font font-medium text-gray-900">
							<a class="text-info" href="{{ $article->user->id === auth()->user()->id ? route('profile.edit') : route('profile.show', ['id' => $article->user->id]) }}">{{ $article->user->name }}</a>
						</span>
							<span>
								<a class="text-info" href="/articles?department_id={{ $article->user->department->id }}">【{{$article->user->department->name}}】</a>
							</span>
						<span class="text-gray-400 text-xs tracking-widest mt-0.5">{{ $article->created_at->format('Y-m-d')  }}に作成</span>
					@foreach ($article->tags as $tag)
    <a class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest" href="/articles?tag_id={{ $tag->id }}">
        {{ $tag->name }}
    </a>
					@endforeach
				  <div class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 w-full">
					{{-- <a class="text-indigo-500 inline-flex items-center">Learn More
					  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path d="M5 12h14"></path>
						<path d="M12 5l7 7-7 7"></path>
					  </svg>
					</a> --}}
					<span class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
					  <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
						<circle cx="12" cy="12" r="3"></circle>
					  </svg>1.2K
					</span>
					<span class="text-gray-400 inline-flex items-center leading-none text-sm">
					  <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
						<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
					  </svg>
					  {{ $article->comments_count }}
					</span>
				  </div>
				  
				  @if ($article->articleCategory)
				  <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
					  <a class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4" href="/articles?article_category_id={{ $article->articleCategory->id }}">【{{ $article->articleCategory->name }}】</a>
				  </span>
			  @endif
				  <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4"><a href="{{route('articles.show',['article' => $article->id])}}">{{Str::limit($article->title, 35, '...')}}</a></h2>
				  {{ Str::limit($article->body, 150, '...') }}
				</div>
				@endif
				@endforeach
	
			</div>
			<br>
			<hr>
				<div class="flex justify-center my-4">
					{{ $articles->links() }}
				</div>
				<hr>
			<!-- side content -->
             {{-- いいね獲得ランキング（ブログ） --}}
			 <hr>
            <x-ranking-of-article-likes :articleRanking="$articleRanking">
            </x-ranking-of-article-likes>
            {{-- タグ別投稿数ランキング --}}
			<hr>
            <x-ranking-of-count-by-tags :rankingByNumberOfArticlesPerTag="$rankingByNumberOfArticlesPerTag">
            </x-ranking-of-count-by-tags>
            </div>
        </div>
    </section>
</x-app-layout>
