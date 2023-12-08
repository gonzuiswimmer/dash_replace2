<section class="w-full">
    <header>
        <h2 class="text-lg font-medium text-gray-900">
            ブログバッジ
        </h2>

        <p class="mt-1 text-sm text-gray-600">
            ブログの投稿数に応じてもらえるメダルが変わります。たくさん投稿してメダルを獲得しましょう！
        </p>
    </header>

    <div class="flex flex-wrap">
        @foreach($badges as $badge)
        <div class="px-6 py-4 space-y-6 w-1/4">
            <img src="/storage/images/post{{$badge->badge_id}}.png" alt="">
        </div>
        @endforeach
    </div>
</section>
