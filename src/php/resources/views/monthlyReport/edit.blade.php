<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        月報編集
        </h2>
    </x-slot>

    <x-input-error class="mb-4" :messages="$errors->all()"/>

	<div class="py-12">
		<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
				<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
					<div class="text-right">※セッションの有効期限は60分です。</div>
					<div class="mt-8 mx-auto w-2/3 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
						<form class="form-horizontal" id="new_monthly_report" action="{{ route('monthlyReport.update', $report) }}" accept-charset="UTF-8" method="post">
                            @csrf
                            @method('PATCH')
							<div class="mb-4">
								<label class="control-label col-sm-3" for="target_month">対象月</label>
                                <input type="month" placeholder="対象月" name="target_month"
                                class="w-full focus:outline-none text-gray-700" value="{{ old('target_month', $report->target_month) }}"/>
							</div>
								<div class="mb-4">
									<label class="control-label col-sm-3" for="assign">今月のアサイン状況</label>
									<div class="col-sm-9 btn-group" data-toggle="buttons">
  										<label class="btn btn-default">
    										<input type="radio" name="assign" id="assigned" autocomplete="off" value="2" @if(old('assign', $report->assign) == '2') checked @endif>アサイン中
 										</label>
										<label class="btn btn-default">
   											 <input type="radio" name="assign" id="waiting" autocomplete="off" value="1" @if(old('assign', $report->assign) == '1') checked @endif> 待機中
 										</label>
									</div>
								</div>
								<div class="mb-4">
								<div class="control-label col-sm-3" >
									<label for="project_summary">プロジェクト概要</label>
								</div>
									<div class="col-sm-9">
										<div class="markdown-editor">
											<div class="tab-content markdown-content">
												<div class="tab-pane active" id="project_summary-write">
													<textarea rows="15" cols="30" class=" w-full" placeholder="例）# 英語学習アプリ開発" name="project_summary" id="project_summary">{{old('project_summary', $report->project_summary)}}</textarea>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="mb-4">

									<!--Tag input-->
									<div id="tagForm" class="mb-6">
										<label for="title" class="block mb-2">使用した技術</label>
										<div class="flex flex-wrap relative mb-6 flex justify-center" data-te-input-wrapper-init>
											<!--$tagsがあればcheckboxを表示-->
											@if (isset( $tags ))
												@foreach ($tags as $tag )
												<div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
													<input
													class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
													name="tags[]"
													type="checkbox"
													id="inlineCheckbox1"
													value="{{$tag->name}}"
													checked/>
													<label
													class="inline-block pl-[0.15rem] hover:cursor-pointer"
													for=""
													>{{$tag->name}}</label
													>
												</div>
												@endforeach
											@endif
										</div>

										<button type="button" id="addTagBtn" class="rounded mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg text-white" style="background-color:rgba(107, 159, 29, 0.89)">タグを増やす</button><br>
										<div class="tag-item">
											<label>使用した技術：
											{{-- <input type="text" name="tags[]" id="tag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required> --}}
											</label>
										</div>
									</div>

								</div>
								<div class="mb-4">
									<label class="control-label col-sm-3">担当した工程</label>
									<div class="col-sm-9 btn-group" data-toggle="buttons">
										<label class="btn btn-default">
											<input type="checkbox" name="workingProcess[]" id="working_process_" value="definition" autocomplete="off" checked="checked"/><input type="hidden" name="_workingProcess" value="on" checked="checked"/>
											<span>要件定義</span>
										</label>
										<label class="btn btn-default">
											<input type="checkbox" name="workingProcess[]" id="working_process_" value="design" autocomplete="off" /><input type="hidden" name="_workingProcess" value="on"/>
											<span>設計</span>
										</label>
										<label class="btn btn-default">
											<input type="checkbox" name="workingProcess[]" id="working_process_" value="implementation" autocomplete="off" /><input type="hidden" name="_workingProcess" value="on"/>
											<span>実装</span>
										</label>
										<label class="btn btn-default">
											<input type="checkbox" name="workingProcess[]" id="working_process_" value="test" autocomplete="off" /><input type="hidden" name="_workingProcess" value="on"/>
											<span>テスト</span>
										</label>
										<label class="btn btn-default">
											<input type="checkbox" name="workingProcess[]" id="working_process_" value="operation" autocomplete="off" /><input type="hidden" name="_workingProcess" value="on"/>
											<span>運用保守</span>
										</label>
										<label class="btn btn-default">
											<input type="checkbox" name="workingProcess[]" id="working_process_" value="analysis" autocomplete="off" /><input type="hidden" name="_workingProcess" value="on"/>
											<span>分析</span>
										</label>
										<label class="btn btn-default">
											<input type="checkbox" name="workingProcess[]" id="working_process_" value="training" autocomplete="off" /><input type="hidden" name="_workingProcess" value="on"/>
											<span>研修</span>
										</label>
										<label class="btn btn-default">
											<input type="checkbox" name="workingProcess[]" id="working_process_" value="structure" autocomplete="off" /><input type="hidden" name="_workingProcess" value="on"/>
											<span>構築</span>
										</label>
										<label class="btn btn-default">
											<input type="checkbox" name="workingProcess[]" id="working_process_" value="trouble" autocomplete="off" /><input type="hidden" name="_workingProcess" value="on"/>
											<span>障害対応</span>
										</label>
									</div>
								</div>
								<div class="mb-4">
									<div class="control-label col-sm-3" >
										<label for="business_content">業務内容</label>
									</div>
									<div class="col-sm-9">
										<div class="markdown-editor">
											<div class="tab-content markdown-content">
												<div class="tab-pane active" id="business_content-write">
													<textarea rows="15" cols="30" class=" w-full" placeholder=
"例）
#### API仕様を整理する
既に利用しているAPIに関するドキュメントが散らばっている＆欠けている状態だったので、GithubのIssuesに整理したドキュメントを書いた。
進捗 100%"
														name="business_content" id="business_content">{{old('business_content', $report->business_content)}}</textarea>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="mb-4">
									<label class="control-label col-sm-3" for="this_month_goals">今月の目標</label>
									<div class="col-sm-9">
										<div class="-static">
											<div class="markdown-view">
												<textarea class="hidden">先月の月報が入力されていません。
先月の月報の「来月の目標」が表示されます。</textarea>
												<div class="markdown-body"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="mb-4">
									<div class="control-label col-sm-3" >
										<label for="looking_back">今月の振り返り</label>
									</div>
									<div class="col-sm-9">
										<div class="markdown-editor">

											<div class="tab-content markdown-content">
												<div class="tab-pane active" id="looking_back-write">
													<textarea rows="15" cols="30" class=" w-full" placeholder=
"例）
1. ・・・・のでできた。
2. ・・・・なのであまりできなかった。
3. ・・・・のでできなかった。"
													 	name="looking_back" id="looking_back">{{old('looking_back', $report->looking_back)}}</textarea>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="mb-4">
									<div class="control-label col-sm-3">
										<label for="next_month_goals">来月の目標</label>
									</div>
									<div class="col-sm-9">
										<div class="markdown-editor">
										<div class="tab-content markdown-content">
											<div class="tab-pane active" id="next_month_goals-write">
												<textarea rows="15" cols="30" class=" w-full" placeholder=
"例）
1.
2.
3."
													 name="next_month_goals" id="next_month_goals">{{old('next_month_goals', $report->next_month_goals)}}</textarea>
											</div>
										</div>
									</div>
								</div>
							</div>
                            @if (isset($report->shipped_at))
                            <button name="update" value="update" type="submit" class="mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                            style="background-color: #1da1f2">更新する</button>
                            @else
							<button name="saveAsDraft" value="saveAsDraft" type="submit" class="mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                            style="background-color: #f21dab">Save as WIP（下書き保存）</button>
							<button name="saveAsPublicReport" value="saveAsPublicReport" type="submit" class="mb-2 rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                            style="background-color: #1da1f2">Ship（保存して公開）</button>
                            @endif
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>


    {{-- タグ機能のjs --}}
    <script>
        const addTagBtn = document.getElementById('addTagBtn');
        const form = document.getElementById('tagForm');
        const closeIcons = document.querySelectorAll('.close-icon');
        const tagItems = document.querySelectorAll('.tag-item');

        function createNewForm(){
            const newDiv = document.createElement('div');
            newDiv.classList.add('tag-item');

            const newForm = document.createElement('input');
            newForm.type = 'text';
            newForm.className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
            newForm.setAttribute('name','tags[]');
            newForm.required = true;

            const newLabel = document.createElement('label');
            newLabel.textContent = '使用した技術：';

            const newSpan = document.createElement('span');
            newSpan.classList.add('close-icon', 'text-white', 'rounded-full', 'bg-red-600', 'hover:bg-red-500', 'px-2', 'py-1');
            newSpan.textContent = '✖';

            newLabel.appendChild(newForm);
            newDiv.appendChild(newLabel);
            newDiv.appendChild(newSpan);

            // 「✖」をクリックしたときの処理を追加
            newSpan.addEventListener('click', () => {
                newDiv.remove();
            });

            return newDiv;
        }

        // 「✖」をクリックしたときの処理
        for (let j = 0; j < closeIcons.length; j++) {
        closeIcons[j].addEventListener('click', () => {
            tagItems[j].remove();
        });
        }

        // ボタンをクリックしたときの処理
        addTagBtn.addEventListener('click', () => {
        form.appendChild(createNewForm());
        });
    </script>
    </x-app-layout>
