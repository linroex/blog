# 三語文章 SEO 回歸檢查

使用 Python 3.11 以上及部署流程指定的 Hugo 版本，在儲存庫根目錄執行：

```sh
python3 -m unittest discover -s scripts -p 'test_check_seo.py' -v
hugo --gc --minify --environment production --cleanDestinationDir
python3 scripts/check_seo.py
```

自訂輸出目錄或 base URL 時，建置及檢查必須使用相同設定：

```sh
hugo --gc --minify --environment production --destination /tmp/blog-seo --baseURL https://example.test/blog/
python3 scripts/check_seo.py --public-dir /tmp/blog-seo --base-url https://example.test/blog/
```

檢查器以 `hugo list published` 取得非草稿、非未來、非過期的文章清單，
再依本儲存庫的翻譯檔名（`index.md`、`index.en.md`、`index.ja.md`）建立預期翻譯群組。
因此預期結果不取自被測的 canonical、hreflang 或 sitemap，也不假設各語言的 slug 相同。
新增文章會自動納入；只有一種或兩種已發布語言的文章亦可通過。
若改用 `translationKey` 跨檔名關聯翻譯，須一併更新此群組規則。

檢查範圍：

- 三語設定與網址前綴：繁中維持 `/posts/`，英文 `/en/posts/`，日文 `/ja/posts/`。
- 每個已發布文章頁的 head 恰有一個指向自己的 canonical。
- HTML hreflang 包含自己及所有已發布翻譯，且每個譯本的關聯一致。
- 根 `sitemap.xml` 包含每個已發布文章及相同的翻譯關聯，沒有重複 loc、草稿或舊文章轉址網址。
- 根 sitemap 的所有 loc 及 alternate 都指向實際輸出的 HTML 頁面，並排除 refresh 轉址及 noindex 頁。
- `robots.txt` 宣告此根 sitemap。

HTML 的 `zh-tw`、`en`、`ja` 與 sitemap 的 `zh-TW`、`en-US`、`ja-JP` 保持原樣。
測試使用明確的語系對照表比對目標，不任意移除地區代碼，例如不會把 `en-GB` 視為 `en-US`。
未翻譯文章保留 Hugo 在 HTML 列出自己、在 sitemap 不產生 alternate 的行為。
這些測試驗證建置成品，不查詢線上 HTTP 狀態、搜尋引擎索引狀態、語言選單或 404 畫面。

依據 [Google 多語頁面文件](https://developers.google.com/search/docs/specialty/international/localized-versions)，
翻譯版本需包含自身與雙向對應，HTML 與 sitemap 均可用來宣告翻譯關聯。
`test_check_seo.py` 透過刻意破壞輸出資料驗證檢查器能攔截這些回歸。

GitHub Actions 在 PR 執行建置及檢查；main 推送及手動執行也會在上傳 Pages artifact 前檢查，失敗即停止部署。
PR 不設定 Pages、不上傳部署成品，也不執行 deploy job。

本次以 Hugo 0.165.0 驗證 `0600d661` 的正式環境建置：406 組、1,218 個文章頁，
根 sitemap 共 1,935 個網址全部通過。當次新增的 403 組，加上先前發布的 3 組，均納入檢查。
未發現需要修改 SEO 模板的連結錯誤；測試亦確認英文 canonical 若誤指繁中頁，CLI 會回傳失敗狀態。
