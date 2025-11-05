// script.js - 時間割完全版

// お知らせカード
const EVENTS = [
  {day:13, title:'漢字テスト', desc:'第6回目の漢字テストp50下', tags:['テスト']},
  {day:20, title:'漢字テスト', desc:'第7回目の漢字テストp54上', tags:['テスト']},
  {day:20, title:'漢字テスト', desc:'第8回目の漢字テストp54下', tags:['テスト']},
];

// 時間割データ
const TIMETABLE = [
  ["社会A","国語1","理科","体育","数学1"],
  ["探求","体育","美術","国語1","音楽"],
  ["社会B","英語A","数学1","英語C","英語A"],
  ["音楽","数学2","保健","社会A","国語2"],
  ["国語2","理科","社会B","英語A","数学2"],
  ["理科","技術","聖書","HR","家庭"],
  ["部活","部活","部活","部活","部活"]
];

// 通常時間
const TIME_LABELS = [
  "9:00 - 9:05","9:15 - 10:00","10:10 - 10:55","11:10 - 11:55",
  "12:05 - 12:50","13:40 - 14:25","14:35 - 15:20","15:35 - 16:45"
];

// 水曜・木曜用時間
const WED_THU_TIME_LABELS = [
  "8:50 - 9:05","9:20 - 10:05","10:15 - 11:00","11:15 - 12:00",
  "12:10 - 12:55","13:45 - 14:30","14:40 - 15:25","15:30 - 16:00"
];

// 昼休憩用時間
const BREAK_TIME_LABELS = {
  normal: "12:50 - 13:40",
  wedThu: "12:55 - 13:45"
};

const eventsEl = document.getElementById('events');
const tbody = document.getElementById('timetable-body');
const bulletinBoard = document.getElementById('bulletin-board');
const menuBtn = document.getElementById('menuBtn');
const menuOptions = document.getElementById('menuOptions');

// お知らせカード生成
EVENTS.forEach(ev=>{
  const card=document.createElement('div');
  card.className='card';
  card.innerHTML=`<div class="date">${ev.day}日</div>
    <div class="content"><h3>${ev.title}</h3><p>${ev.desc}</p>${ev.tags.map(t=>`<span class="tag">${t}</span>`).join(' ')}</div>`;
  eventsEl.appendChild(card);
});

// SHR/礼拝行
const specialRow = document.createElement('tr');
specialRow.innerHTML = `<td></td>
<td class="shr">SHR</td>
<td class="shr">SHR</td>
<td class="reihai">礼拝</td>
<td class="reihai">礼拝</td>
<td class="shr">SHR</td>
<td>月火金: ${TIME_LABELS[0]}<br>水木: ${WED_THU_TIME_LABELS[0]}</td>`;
tbody.appendChild(specialRow);

// 授業行（昼休憩含む）
for(let i=0;i<7;i++){
  // 4時間目と5時間目の間に昼休憩
  if(i==4){
    const breakRow=document.createElement('tr');
    breakRow.innerHTML = `<td>昼休憩</td>
      <td class="hiru"></td><td class="hiru"></td><td class="hiru"></td><td class="hiru"></td><td class="hiru"></td>
      <td>${BREAK_TIME_LABELS.normal}<br>水: ${BREAK_TIME_LABELS.wedThu}</td>`;
    tbody.appendChild(breakRow);
  }

  const tr=document.createElement('tr');
  tr.innerHTML = `<td>${i+1}時間目</td>`;
  TIMETABLE[i].forEach(subject=>{
    let cls='';
    if(subject.includes('国語1')) cls='kokugo1';
    else if(subject.includes('国語2')) cls='kokugo2';
    else if(subject.includes('数学1')) cls='sugaku1';
    else if(subject.includes('数学2')) cls='sugaku2';
    else if(subject.includes('社会A')) cls='shakaiA';
    else if(subject.includes('社会B')) cls='shakaiB';
    else if(subject.includes('英語A')) cls='eigoA';
    else if(subject.includes('英語C')) cls='eigoC';
    else if(subject.includes('理科')) cls='rika';
    else if(subject.includes('音楽')) cls='ongaku';
    else if(subject.includes('体育')) cls='taiiku';
    else if(subject.includes('美術')) cls='bijutsu';
    else if(subject.includes('HR')) cls='hr';
    else if(subject.includes('聖書')) cls='seisho';
    else if(subject.includes('技術')) cls='gijutsu';
    else if(subject.includes('部活')) cls='bukatsu';
    else if(subject.includes('探求')) cls='tannkyu';
    else if(subject.includes('保健')) cls='hokenn';
    else if(subject.includes('家庭')) cls='kateika';
    tr.innerHTML += `<td class="${cls}">${subject}</td>`;
  });
  // 時刻（通常・水木用）
  tr.innerHTML += `<td>${TIME_LABELS[i+1] || ''}<br>水: ${WED_THU_TIME_LABELS[i+1] || ''}</td>`;
  tbody.appendChild(tr);
}

// 掲示板（1つにまとめる）
const BULLETIN_ITEMS = [
  {title:'11月号', desc:'今まだ届いておりません。', tags:['山野先生からの言葉']},
];
bulletinBoard.innerHTML = `<h3>保護者の方に向けて（学級通信）</h3><ul>
${BULLETIN_ITEMS.map(item => `<li><span>${item.title}: ${item.desc}</span> ${item.tags.map(tag=>`<span class="tag">${tag}</span>`).join(' ')}</li>`).join('')}
</ul>`;

// メニューアニメーション
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if(menuOpen){
    menuOptions.classList.add('show');
  } else {
    menuOptions.classList.remove('show');
  }
});

// メニュー外クリックで閉じる
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !menuOptions.contains(e.target) && menuOpen) {
    menuOptions.classList.remove('show');
    menuOpen = false;
  }
});

// ==============================
// 右上「その他」メニュー専用スクリプト
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const otherMenuBtn = document.getElementById('otherMenuBtn');
  const otherMenuOptions = document.getElementById('otherMenuOptions');
  let otherMenuOpen = false;

  // ボタンをクリックしたときの表示切替
  otherMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    otherMenuOpen = !otherMenuOpen;
    if (otherMenuOpen) {
      otherMenuOptions.classList.add('show');
    } else {
      otherMenuOptions.classList.remove('show');
    }
  });

  // メニュー外をクリックしたら閉じる
  document.addEventListener('click', (e) => {
    if (
      otherMenuOpen &&
      !otherMenuBtn.contains(e.target) &&
      !otherMenuOptions.contains(e.target)
    ) {
      otherMenuOptions.classList.remove('show');
      otherMenuOpen = false;
    }
  });
});
