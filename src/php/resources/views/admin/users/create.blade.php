<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            ユーザー登録
        </h2>
    </x-slot>
    <section class="text-gray-600 body-font overflow-hidden">
        @if (session('status'))
            <div class="w-2/3 mx-auto container mt-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                role="alert">
                <p class="font-bold">{{ session('status') }}</p>
            </div>
        @endif
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div class="max-w-xl">
                        <form method="POST" action="{{ route('admin.users.store') }}" class="mt-6 space-y-6"
                            enctype="multipart/form-data">
                            @csrf

                            <div>
                                <x-input-label for="name" :value="__('氏名')" />
                                <x-text-input id="name" class="block mt-1 w-full" type="text" name="name"
                                    :value="old('name')" required autofocus autocomplete="name" />
                                <x-input-error :messages="$errors->get('name')" class="mt-2" />
                            </div>

                            <div class="mt-4">
                                <x-input-label for="email" :value="__('メールアドレス')" />
                                <x-text-input id="email" class="block mt-1 w-full" type="email" name="email"
                                    :value="old('email')" required autocomplete="username" />
                                <x-input-error :messages="$errors->get('email')" class="mt-2" />
                            </div>

                            <div class="mt-4">
                                <x-input-label for="password" :value="__('パスワード')" />

                                <x-text-input id="password" class="block mt-1 w-full" type="password" name="password"
                                    required autocomplete="new-password" />

                                <x-input-error :messages="$errors->get('password')" class="mt-2" />
                            </div>

                            <div class="mt-4">
                                <x-input-label for="password_confirmation" :value="__('パスワード確認')" />

                                <x-text-input id="password_confirmation" class="block mt-1 w-full" type="password"
                                    name="password_confirmation" required autocomplete="new-password" />

                                <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
                            </div>

                            <div>
                                <label for="department_id">所属</label>
                                <select id="department_id" name="department_id" type="text"
                                    class="mt-1 block w-full">
                                    @foreach ($departments as $department)
                                        <option value={{ $department->id }}
                                            {{ old('department_id') == $department->id ? 'checked' : '' }}>
                                            {{ $department->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label for="beginner_flg">アサイン状況</label>
                                <select id="beginner_flg" name="beginner_flg" type="boolean" class="mt-1 block w-full">
                                    <option value="" {{ old('beginner_flg') == '' ? 'checked' : '' }}>指定なし
                                    </option>
                                    <option value="true" {{ old('beginner_flg') == true ? 'checked' : '' }}>アサイン中
                                    </option>
                                    <option value="false" {{ old('beginner_flg') == false ? 'checked' : '' }}>待機中
                                    </option>
                                </select>
                            </div>

                            <div>
                                <x-input-label for="entry_date" :value="__('入社日')" />
                                <x-text-input id="entry_date" name="entry_date" type="date" class="mt-1 block w-full"
                                    required autofocus autocomplete="entry_date" />
                                <x-input-error class="mt-2" :messages="$errors->get('entry_date')" />
                            </div>

                            <div>
                                <label for="gender">性別</label><br>
                                <input id="gender" name="gender" type="radio" value="1"
                                    {{ old('gender') == 1 ? 'checked' : '' }}>男性<br>
                                <input id="gender" name="gender" type="radio" value="2"
                                    {{ old('gender') == 2 ? 'checked' : '' }}>女性
                            </div>

                            <div class="flex items-center gap-4">

                                <x-primary-button>
                                    {{ __('Register') }}
                                </x-primary-button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</x-app-layout>
