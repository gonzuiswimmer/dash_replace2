<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('プロフィール') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div class="max-w-xl">
                    <section class="mt-6 space-y-6">
                        <header>
                            <h2 class="text-lg font-medium text-gray-900">
                                {{ __('基本情報') }}
                            </h2>
                        </header>

                        <div>
                            <x-input-label for="name" :value="__('氏名')" />
                            <div id="name" name="name" type="text" class="mt-1 block w-full" required autofocus
                                autocomplete="name">{{ $user->name }}</div>
                            <x-input-error class="mt-2" :messages="$errors->get('name')" />
                        </div>

                        {{-- @if ($user->isFollowing(Auth::user()))
                            <form action="{{ route('profile.unfollow', [$user->id]) }}" method="POST">
                                @csrf
                                <button type="submit">フォロー解除する</button>
                            </form>
                        @else
                            <form action="{{ route('profile.follow', [$user->id]) }}" method="POST">
                                @csrf
                                <button type="submit">フォローする</button>
                            </form>
                        @endif --}}

                        <div>
                            <x-input-label for="department_id" :value="__('所属')" />
                            <div id="department_id" name="department_id" type="text" class="mt-1 block w-full"
                                required autofocus autocomplete="department_id">{{ $department->name }}</div>
                            <x-input-error class="mt-2" :messages="$errors->get('department_id')" />
                        </div>

                        <div>
                            <x-input-label for="beginner_flg" :value="__('アサイン状況')" />
                            <div id="beginner_flg" name="beginner_flg" type="text" class="mt-1 block w-full" required
                                autofocus autocomplete="beginner_flg">{{ $allocation }}</div>
                            <x-input-error class="mt-2" :messages="$errors->get('beginner_flg')" />
                        </div>

                        <div>
                            <x-input-label for="email" :value="__('メールアドレス')" />
                            <div id="email" name="email" type="email" class="mt-1 block w-full" required
                                autofocus autocomplete="email">{{ $user->email }}</div>
                            <x-input-error class="mt-2" :messages="$errors->get('email')" />
                        </div>

                        <div>
                            <x-input-label for="entry_date" :value="__('入社日')" />
                            <div id="entry_date" name="entry_date" type="text" class="mt-1 block w-full" required
                                autofocus autocomplete="entry_date">{{ $entry_date }}</div>
                            <x-input-error class="mt-2" :messages="$errors->get('entry_date')" />
                        </div>

                        <div>
                            <x-input-label for="gender" :value="__('性別')" />
                            <div id="gender" name="gender" type="text" class="mt-1 block w-full" required
                                autofocus autocomplete="gender">{{ $gender }}</div>
                            <x-input-error class="mt-2" :messages="$errors->get('gender')" />
                        </div>

                        <div>
                            <x-input-label for="blood_type" :value="__('血液型')" />
                            <div id="blood_type" name="blood_type" type="text" class="mt-1 block w-full" required
                                autofocus autocomplete="blood_type">{{ $blood_type }}</div>
                            <x-input-error class="mt-2" :messages="$errors->get('blood_type')" />
                        </div>

                        <div>
                            <x-input-label for="birthday" :value="__('誕生日')" />
                            @if (isset($user_profile->birthday))
                                <div id="birthday" name="birthday" type="text" class="mt-1 block w-full" required
                                    autofocus autocomplete="birthday">{{ $birthday }}
                                </div>
                            @else
                                <div id="birthday" name="birthday" type="text" class="mt-1 block w-full" required
                                    autofocus autocomplete="birthday">未設定</div>
                            @endif
                            <x-input-error class="mt-2" :messages="$errors->get('birthday')" />
                        </div>

                        <div>
                            <x-input-label for="github_url" :value="__('GitHubアカウント')" />
                            @if (isset($user_profile->github_url))
                                <div id="github_url" name="github_url" type="text" class="mt-1 block w-full" required
                                    autofocus autocomplete="github_url">{{ $user_profile->github_url }}</div>
                            @else
                                <div id="github_url" name="github_url" type="text" class="mt-1 block w-full" required
                                    autofocus autocomplete="github_url">未設定</div>
                            @endif
                            <x-input-error class="mt-2" :messages="$errors->get('github_url')" />
                        </div>

                        <div>
                            <x-input-label for="qiita_url" :value="__('Qiitaアカウント')" />
                            @if (isset($user_profile->qiita_url))
                                <div id="qiita_url" name="qiita_url" type="text" class="mt-1 block w-full" required
                                    autofocus autocomplete="qiita_url">{{ $user_profile->qiita_url }}</div>
                            @else
                                <div id="qiita_url" name="qiita_url" type="text" class="mt-1 block w-full" required
                                    autofocus autocomplete="qiita_url">未設定</div>
                            @endif
                            <x-input-error class="mt-2" :messages="$errors->get('qiita_url')" />
                        </div>

                        <div>
                            <x-input-label for="self_introduction" :value="__('自己紹介')" />
                            @if (isset($user_profile->self_introduction))
                                <div id="self_introduction" name="self_introduction" type="text"
                                    class="mt-1 block w-full" required autofocus autocomplete="self_introduction">
                                    {{ $user_profile->self_introduction }}
                                </div>
                            @else
                                <div id="self_introduction" name="self_introduction" type="text"
                                    class="mt-1 block w-full" required autofocus autocomplete="self_introduction">未設定
                                </div>
                            @endif
                            <x-input-error class="mt-2" :messages="$errors->get('self_introduction')" />
                        </div>

                        <div class="flex flex-wrap">
                            <p class="w-full text-lg font-medium text-gray-900">
                                ブログバッジ
                            </p>
                            @foreach ($badges as $badge)
                                <div class="px-6 py-4 space-y-6 w-1/4">
                                    <img src="/storage/images/post{{ $badge->badge_id }}.png" alt="">
                                </div>
                            @endforeach
                        </div>
                </div>
            </div>
        </div>
        </section>
</x-app-layout>
