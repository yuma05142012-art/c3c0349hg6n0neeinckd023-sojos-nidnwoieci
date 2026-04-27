// script.js - 時間割完全版（左右メニュー上から順スライド対応）

// お知らせカード
const EVENTS = [
    // {day:27, title:'水曜授業', desc:'', tags:['時間割変更']},
];

// 時間割データ
const TIMETABLE = [
  ["理科2","理科1","数学2","理科2","国語2"],
  ["保健","国語2","聖書","社会A","英語A"],
  ["英語A","社会B","英語B","社会B","体育"],
  ["数学2","社会A","音楽","国語1","技別"],
  ["国語1","美術","体育","理科1","数学1"],
  ["英語C","数学1","技術","HR","英語B"],
  ["部活 ","部活","部活","部活","部活"]
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

// ======================
// お知らせカード生成（曜日計算付き）
// ======================
const year = 2026;
const month = 4; // 4月の設定

EVENTS.forEach(ev => {
  // 曜日を計算するロジック
  const dateObj = new Date(year, month - 1, ev.day);
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][dateObj.getDay()];
  
  // 土日の場合にクラスをつける（CSSで色を変える用）
  let dayClass = '';
  if (dateObj.getDay() === 0) dayClass = 'sun';
  if (dateObj.getDay() === 6) dayClass = 'sat';

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="date ${dayClass}">${ev.day}日(${dayOfWeek})</div>
    <div class="content">
      <h3>${ev.title}</h3>
      <p>${ev.desc}</p>
      ${ev.tags.map(t=>`<span class="tag">${t}</span>`).join(' ')}
    </div>`;
  eventsEl.appendChild(card);
});

// ======================
// 時間割生成
// ======================

// SHR/礼拝行
const specialRow = document.createElement('tr');
specialRow.innerHTML = `
  <td></td>
  <td class="shr"></td>
  <td class="shr"></td>
  <td class="reihai">礼拝</td>
  <td class="shr"></td>
  <td class="reihai">礼拝</td>
  <td>月火木: ${TIME_LABELS[0]}<br>水金: ${WED_THU_TIME_LABELS[0]}</td>`;
tbody.appendChild(specialRow);

// 授業行
for (let i=0; i<7; i++) {
  if (i===4) { // 昼休憩
    const breakRow = document.createElement('tr');
    breakRow.innerHTML = `
      <td>昼休憩</td>
      <td class="hiru"></td><td class="hiru"></td><td class="hiru"></td><td class="hiru"></td><td class="hiru"></td>
      <td>${BREAK_TIME_LABELS.normal}<br>水: ${BREAK_TIME_LABELS.wedThu}</td>`;
    tbody.appendChild(breakRow);
  }

  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${i+1}時間目</td>`;
  TIMETABLE[i].forEach(subject => {
    let cls = '';
    if(subject.includes('国語1')) cls='kokugo1';
    else if(subject.includes('国語2')) cls='kokugo2';
    else if(subject.includes('数学1')) cls='sugaku1';
    else if(subject.includes('数学2')) cls='sugaku2';
    else if(subject.includes('社会A')) cls='shakaiA';
    else if(subject.includes('社会B')) cls='shakaiB';
    else if(subject.includes('英語A')) cls='eigoA';
    else if(subject.includes('英語C')) cls='eigoC';
    else if(subject.includes('理科2')) cls='rika2';
    else if(subject.includes('理科1')) cls='rika';
    else if(subject.includes('音楽')) cls='ongaku';
    else if(subject.includes('体育')) cls='taiiku';
    else if(subject.includes('美術')) cls='bijutsu';
    else if(subject.includes('HR')) cls='hr';
    else if(subject.includes('聖書')) cls='seisho';
    else if(subject.includes('技術')) cls='gijutsu';
    else if(subject.includes('部活')) cls='bukatsu';
    else if(subject.includes('保健')) cls='hokenn';
    else if(subject.includes('英語B')) cls='eigoB';
    else if(subject.includes('技別')) cls='gibetu';
    tr.innerHTML += `<td class="${cls}">${subject}</td>`;
  });
  tr.innerHTML += `<td>${TIME_LABELS[i+1] || ''}<br>水: ${WED_THU_TIME_LABELS[i+1] || ''}</td>`;
  tbody.appendChild(tr);
}

// ======================
// 掲示板
// ======================
const BULLETIN_ITEMS = [
  {title:'4月号', desc:'', tags:['山野先生からの言葉']},
];
bulletinBoard.innerHTML = `<h3>保護者の方に向けて（学級通信）</h3>
<ul>
${BULLETIN_ITEMS.map(item => `<li>
  <span>${item.title}: ${item.desc}</span>
  ${item.tags.map(tag=>`<span class="tag">${tag}</span>`).join(' ')}
</li>`).join('')}
</ul>`;

// ======================
// 左メニュー（順スライド可変）
// ======================
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  const links = menuOptions.querySelectorAll('a');
  if(menuOpen){
    menuOptions.classList.add('show');
    links.forEach((link,i)=>{
      link.style.animation = 'slideDownFade 0.4s forwards';
      link.style.animationDelay = `${i*0.1}s`;
    });
  } else {
    menuOptions.classList.remove('show');
    links.forEach(link => link.style.animation = '');
  }
});

// 外クリックで閉じる
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !menuOptions.contains(e.target) && menuOpen) {
    menuOptions.classList.remove('show');
    menuOpen = false;
    menuOptions.querySelectorAll('a').forEach(link => link.style.animation='');
  }
});

// ======================
// 右上「その他」メニュー（順スライド可変・スマホ縦表示対応）
// ======================
document.addEventListener('DOMContentLoaded', () => {
  const otherMenuBtn = document.getElementById('otherMenuBtn');
  const otherMenuOptions = document.getElementById('otherMenuOptions');
  let otherMenuOpen = false;

  otherMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    otherMenuOpen = !otherMenuOpen;
    const links = otherMenuOptions.querySelectorAll('a');

    if(otherMenuOpen){
      otherMenuOptions.classList.add('show');
      links.forEach((link,i)=>{
        link.style.animation = 'slideDownFade 0.4s forwards';
        link.style.animationDelay = `${i*0.1}s`;
      });
    } else {
      otherMenuOptions.classList.remove('show');
      links.forEach(link => link.style.animation = '');
    }
  });

  document.addEventListener('click', (e) => {
    if(otherMenuOpen && !otherMenuBtn.contains(e.target) && !otherMenuOptions.contains(e.target)){
      otherMenuOptions.classList.remove('show');
      otherMenuOpen = false;
      otherMenuOptions.querySelectorAll('a').forEach(link => link.style.animation = '');
    }
  });
});