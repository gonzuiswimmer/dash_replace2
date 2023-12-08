<div class="">
<section class="text-gray-600 body-font">
    <div class="container px-0.5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-4">
        <h3 class="font-medium title-font mb-2 text-gray-900">タグ別投稿数ランキング</h3>
      </div>
      <div class="lg:w-2/3 w-full mx-auto overflow-auto">
        <table class="table-auto w-full text-left whitespace-no-wrap">
          <tbody>
            @foreach ($rankingByNumberOfArticlesPerTag as $item )
            <tr>
              <td class="px-3 py-2"><span class="mr-2">{{$loop->iteration}}.</span><a href="#">{{$item->name}}</a></td>
              <td class="px-3 py-2 text-base text-gray-900">{{$item->articles_count}}</td>
            </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
  </section>
</div>
