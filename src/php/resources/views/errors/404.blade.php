<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.6/flowbite.min.css" rel="stylesheet" />
        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans antialiased">
        <div class="min-h-screen bg-gray-100">

            <!-- Page Content -->
            <main>
                <!-- 本文 -->
                <div class="bg-gradient-to-r from-purple-300 to-blue-200">
                    <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                        <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                            <div class="border-t border-gray-200 text-center pt-8">
                                <h1 class="text-9xl font-bold text-purple-400">404</h1>
                                <h1 class="text-6xl font-medium py-8">oops! Page not found</h1>
                                <p class="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                                <button onclick="location.href='{{ route('top') }}'" class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                                HOME
                                </button>
                                <button type="button" data-modal-toggle="authentication-modal" class="bg-gradient-to-r from-red-400 to-red-500 hover:from-blue-300 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-md">
                                Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <x-modal-component :user="Auth::id()"></x-modal-component>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.6/flowbite.min.js"></script>
    </body>
</html>




