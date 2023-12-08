<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900">
            {{ __('基本情報') }}
        </h2>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('profile.update') }}" class="mt-6 space-y-6">
        @csrf
        @method('patch')

        <div>
            <label for="name">氏名</label>
            <div id="name" name="name" type="text" class="mt-1 block w-full" required autofocus
                autocomplete="name">{{ $user->name }}
            </div class="mt-2" :messages="$errors - > get('name')">
        </div>

        <div>
            <label for="department_id">所属</label>
            <select id="department_id" name="department_id" type="text" class="mt-1 block w-full">
                @foreach ($departments as $department)
                    <option value={{ $department->id }} @if ($user->department_id == $department->id) selected @endif>
                        {{ $department->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div>
            <label for="beginner_flg">アサイン状況</label>
            <div id="beginner_flg" name="beginner_flg" type="text" class="mt-1 block w-full" required autofocus
                autocomplete="beginner_flg">{{ $allocation }}
            </div class="mt-2" :messages="$errors - > get('beginner_flg')">
        </div>

        <div>
            <label for="email">メールアドレス</label>
            <div id="email" name="email" type="text" class="mt-1 block w-full" required autofocus
                autocomplete="email">{{ $user->email }}
            </div class="mt-2" :messages="$errors - > get('email')">
        </div>

        <div>
            <label for="entry_date">入社日</label>
            <div id="entry_date" name="entry_date" type="text" class="mt-1 block w-full" required autofocus
                autocomplete="entry_date">{{ $entry_date }}
            </div class="mt-2" :messages="$errors - > get('entry_date')">
        </div>

        <div>
            <label for="gender">性別</label>
            <div id="gender" name="gender" type="text" class="mt-1 block w-full" required autofocus
                autocomplete="gender">{{ $gender }}
            </div class="mt-2" :messages="$errors - > get('gender')">
        </div>

        <div>
            <label for="blood_type">血液型</label>
            <select id="blood_type" name="blood_type" type="text" class="mt-1 block w-full">
                <option value="0" @if ($user_profile->blood_type === 0) selected @endif>未設定</option>
                <option value="1" @if ($user_profile->blood_type === 1) selected @endif>A型</option>
                <option value="2" @if ($user_profile->blood_type === 2) selected @endif>B型</option>
                <option value="3" @if ($user_profile->blood_type === 3) selected @endif>AB型</option>
                <option value="4" @if ($user_profile->blood_type === 4) selected @endif>O型</option>
            </select>
        </div>

        <div>
            <x-input-label for="birthday" :value="__('誕生日')" />
            <x-text-input id="birthday" name="birthday" type="date" class="mt-1 block w-full" :value="old('birthday', $user_profile->birthday)"
                required autofocus autocomplete="birthday" />
            <x-input-error class="mt-2" :messages="$errors->get('birthday')" />
        </div>

        <div>
            <x-input-label for="github_url" :value="__('GitHubアカウント')" />
            <x-text-input id="github_url" name="github_url" type="text" class="mt-1 block w-full" :value="old('github_url', $user_profile->github_url)"
                required autofocus autocomplete="github_url" />
            <x-input-error class="mt-2" :messages="$errors->get('github_url')" />
        </div>

        <div>
            <x-input-label for="qiita_url" :value="__('Qiitaアカウント')" />
            <x-text-input id="qiita_url" name="qiita_url" type="text" class="mt-1 block w-full" :value="old('qiita_url', $user_profile->qiita_url)"
                required autofocus autocomplete="qiita_url" />
            <x-input-error class="mt-2" :messages="$errors->get('qiita_url')" />
        </div>

        <div>
            <x-input-label for="self_introduction" :value="__('自己紹介')" />
            <x-text-input id="self_introduction" name="self_introduction" type="text" class="mt-1 block w-full"
                :value="old('self_introduction', $user_profile->self_introduction)" required autofocus autocomplete="self_introduction" />
            <x-input-error class="mt-2" :messages="$errors->get('self_introduction')" />
        </div>

        <div class="flex items-center gap-4">
            <x-primary-button>{{ __('保存') }}</x-primary-button>

            @if (session('status') === 'profile-updated')
                <p x-data="{ show: true }" x-show="show" x-transition x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600">{{ __('Saved.') }}</p>
            @endif
        </div>
    </form>
</section>
