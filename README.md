# 手順

-前提-
クローン（コピー）後、src/php ディレクトリは削除する
.env のプロジェクト名「test0612」は好きに変えてください(コンテナ名がかぶらないように)

1. docker-compose.yml をもとに docker compose build で docker を立ち上げ
2. docker up -d でコンテナを作成。docker compose exec php bash でコンテナの中に入る
3. ls コマンドで laravel プロジェクトが同期されているかを確認
4. localhost (laravel)につながることを確認(この段階ではエラーが出ます)
5. composer install を実行
6. permission denied が出る場合は、 (cd ../)chmod -R 777 html/ を実行
7. 500 server Error が出たら、laravel プロジェクトの中の .env.sample をコピーして、.env ファイルを作成する
   その後、php artisan key:gererate コマンドで appKey を作成し、localhost に接続確認する
8. DB と接続する

### ≪ プロジェクトの compose.yml と同じ階層でコマンドをうち、 postgres に接続する ≫

psql -U postgres -d postgres -h localhost

### プロジェクト直下の.env ファイルは要修正！
