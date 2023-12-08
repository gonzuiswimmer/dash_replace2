<section>
    <header>
        <h2 class="text-lg font-medium text-gray-900">
            {{ __('ユーザー情報削除') }}
        </h2>
    </header>

    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <form method="post" action="{{ route('admin.users.destroy', ['id' => $user->id]) }}" class="mt-6 space-y-6">
        @csrf
        @method('patch')

        <div class="flex items-center gap-4">
            <x-primary-button>{{ __('退職') }}</x-primary-button>

            @if (session('status') === 'profile-updated')
                <p x-data="{ show: true }" x-show="show" x-transition x-init="setTimeout(() => show = false, 2000)"
                    class="text-sm text-gray-600">{{ __('Saved.') }}</p>
            @endif
        </div>
    </form>
</section>
