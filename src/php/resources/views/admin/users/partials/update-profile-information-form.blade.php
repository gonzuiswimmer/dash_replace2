<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900">
            {{ __('基本情報') }}
        </h2>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('admin.users.update', ['id' => $user->id]) }}" class="mt-6 space-y-6">
        @csrf
        @method('patch')

        <input id="id" type="hidden" class="form-control" name="id" value="{{ $user->id }}">

        <div>
            <x-input-label for="name" :value="__('氏名')" />
            <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $user->name)"
                required autofocus autocomplete="name" />
            <x-input-error class="mt-2" :messages="$errors->get('name')" />
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
            <select id="beginner_flg" name="beginner_flg" type="boolean" class="mt-1 block w-full">
                <option value="" @if ($user->beginner_flg === null) selected @endif>指定なし</option>
                <option value="true" @if ($user->beginner_flg === true) selected @endif>アサイン中</option>
                <option value="false" @if ($user->beginner_flg === false) selected @endif>待機中</option>
            </select>
        </div>

        <div>
            <x-input-label for="email" :value="__('メールアドレス')" />
            <x-text-input id="email" name="email" type="email" class="mt-1 block w-full" :value="old('email', $user->email)"
                required autocomplete="username" />
            <x-input-error class="mt-2" :messages="$errors->get('email')" />

            @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && !$user->hasVerifiedEmail())
                <div>
                    <p class="text-sm mt-2 text-gray-800">
                        {{ __('Your email address is unverified.') }}

                        <button form="send-verification"
                            class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {{ __('Click here to re-send the verification email.') }}
                        </button>
                    </p>

                    @if (session('status') === 'verification-link-sent')
                        <p class="mt-2 font-medium text-sm text-green-600">
                            {{ __('A new verification link has been sent to your email address.') }}
                        </p>
                    @endif
                </div>
            @endif
        </div>

        <div>
            <x-input-label for="entry_date" :value="__('入社日')" />
            <x-text-input id="entry_date" name="entry_date" type="date" class="mt-1 block w-full" :value="old('entry_date', $user->entry_date)"
                required autofocus autocomplete="entry_date" />
            <x-input-error class="mt-2" :messages="$errors->get('entry_date')" />
        </div>

        <div>
            <label for="gender">性別</label><br>
            <input id="gender" name="gender" type="radio" value="1"
                @if ($user->gender == 1) checked @endif>男性<br>
            <input id="gender" name="gender" type="radio" value="2"
                @if ($user->gender == 2) checked @endif>女性
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
