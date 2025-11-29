window.addEventListener('load', () => {
  const modal = document.getElementById('importantModal');
  const closeBtn = document.getElementById('closeModal');

  // ---------------------------
  // ▼ 新しく追加する部分（バージョン検知）
  // ---------------------------

  const metaTag = document.querySelector('meta[name="site-version"]');
  const currentVersion = metaTag ? metaTag.content : null;

  const LAST_SEEN_KEY = 'site-last-seen-version';
  const lastSeenVersion = localStorage.getItem(LAST_SEEN_KEY);

  // ★ デプロイが更新された場合
  if (currentVersion && lastSeenVersion !== currentVersion) {
    modal.classList.add('show'); // 強制表示
    localStorage.setItem(LAST_SEEN_KEY, currentVersion);
    // セッション閉じ状態をリセットしておくと自然
    sessionStorage.removeItem('importantModalClosed');
    // return; // ここで終了すれば従来ロジックとは衝突しない
  }

  // ---------------------------
  // ▼ ここから先はあなたの元のロジック
  // ---------------------------

  // ★ セッション中に閉じていないなら表示
  if (!sessionStorage.getItem('importantModalClosed')) {
    modal.classList.add('show'); // ふわっと表示
  }

  closeBtn.addEventListener('click', () => {
    console.log('おk')
    modal.classList.remove('show');
    sessionStorage.setItem('importantModalClosed', 'true');
  });
});

