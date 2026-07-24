/**
 * Generates public/projects/biofidence/ia-diagram.svg
 * Run: node scripts/build-bio-ia-svg.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "public/projects/biofidence/ia-diagram.svg";

/* ---------- tokens ---------- */
const C = {
  keep: "#2A3DF0",
  add: "#229E59",
  mod: "#F2991A",
  del: "#D9383F",
  ink: "#0E1226",
  gray: "#73788F",
  line: "#C9D0E6",
  bg: "#FFFFFF",
};
const FONT =
  "Pretendard, 'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";

const COL_W = 172;
const GAP_X = 214;
const X0 = 60;
const HOME_Y = 150;
const BUS_Y = HOME_Y + 34 + 22;
const COL_TOP = BUS_Y + 26;

/* ---------- helpers ---------- */
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const out = [];
const push = (s) => out.push(s);

/** rough advance width: CJK ~1.0em, latin/space ~0.55em */
function textWidth(str, fs) {
  let u = 0;
  for (const ch of String(str)) u += /[\u3131-\uD79D\u4E00-\u9FFF]/.test(ch) ? 1.0 : 0.55;
  return u * fs;
}
/** shrink font size until the label fits the available width */
function fitSize(str, fs, maxW, min = 8.5) {
  let s2 = fs;
  while (s2 > min && textWidth(str, s2) > maxW) s2 -= 0.25;
  return Math.round(s2 * 4) / 4;
}

/** solid pill (depth-1 / home) */
function pill(x, y, label, kind, { solid = true, w = COL_W, h = 34, fs = 12.5 } = {}) {
  // fs auto-fitted below
  const c = C[kind];
  const fill = solid ? c : "#fff";
  const tc = solid ? "#fff" : c;
  fs = fitSize(label, fs, w - 18);
  push(
    `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${c}" stroke-width="${solid ? 2 : 1.6}"/>` +
      `<text x="${x + w / 2}" y="${y + h / 2}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="${fs}" font-weight="700" fill="${tc}">${esc(label)}</text></g>`
  );
  return y + h;
}

/** tinted pill (depth-2) */
function pillSoft(x, y, label, kind, { w = COL_W, h = 32, fs = 11.5 } = {}) {
  const c = C[kind];
  fs = fitSize(label, fs, w - 16);
  push(
    `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}" fill-opacity="0.10" stroke="${c}" stroke-width="1.4"/>` +
      `<text x="${x + w / 2}" y="${y + h / 2}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="${fs}" font-weight="600" fill="${c}">${esc(label)}</text></g>`
  );
  return y + h;
}

/** grouped leaf list box */
function group(x, y, labels, kind, { w = COL_W } = {}) {
  const c = C[kind];
  const padY = 13,
    lh = 20;
  const gfs = (L) => fitSize(L, 11, w - 16);
  const h = padY * 2 + labels.length * lh;
  push(
    `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${c}" fill-opacity="0.08" stroke="${c}" stroke-opacity="0.42" stroke-width="1"/>` +
      labels
        .map(
          (L, i) =>
            `<text x="${x + w / 2}" y="${y + padY + lh * i + lh / 2}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="${gfs(L)}" fill="${c}">${esc(L)}</text>`
        )
        .join("") +
      `</g>`
  );
  return y + h;
}

/** small left-side annotation */
function tapNote(x, y, text) {
  push(
    `<text x="${x}" y="${y}" text-anchor="end" font-family="${FONT}" font-size="10" fill="${C.gray}">${esc(text)}</text>`
  );
}

/** AS-IS before label under a changed node */
function before(x, y, txt, { w = COL_W } = {}) {
  const fs = fitSize(txt, 9.5, w + 30);
  push(
    `<text x="${x + w / 2}" y="${y}" text-anchor="middle" font-family="${FONT}" font-size="${fs}" fill="${C.gray}">${esc(txt)}</text>`
  );
  return y;
}

/** numbered red badge */
function badge(cx, cy, n) {
  push(
    `<g><circle cx="${cx}" cy="${cy}" r="11" fill="${C.del}"/>` +
      `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="11" font-weight="800" fill="#fff">${n}</text></g>`
  );
}

/** highlight box around a region */
function highlight(x, y, w, h) {
  push(
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="${C.del}" stroke-width="1.8"/>`
  );
}

/* ---------- diagram content ---------- */
const colX = (i) => X0 + GAP_X * i;
let maxBottom = 0;
const mark = (v) => { maxBottom = Math.max(maxBottom, v); return v; };

// title
push(
  `<text x="${X0}" y="52" font-family="${FONT}" font-size="21" font-weight="800" fill="${C.ink}">BIOFIDENCE IA_리뉴얼</text>`
);
push(
  `<text x="${colX(7) + COL_W}" y="52" text-anchor="end" font-family="${FONT}" font-size="16" font-weight="800" fill="${C.ink}">AS-IS → TO-BE</text>`
);
push(
  `<line x1="${X0}" y1="72" x2="${colX(7) + COL_W}" y2="72" stroke="${C.line}" stroke-width="1"/>`
);

// legend
const legendItems = [
  ["신규 추가", C.add],
  ["명칭·구조 변경", C.mod],
  ["기존 유지", C.keep],
];
let lx = X0;
push(
  `<text x="${lx}" y="103" font-family="${FONT}" font-size="12" font-weight="800" fill="${C.ink}">범례</text>`
);
lx += 44;
for (const [label, c] of legendItems) {
  push(
    `<rect x="${lx}" y="92" width="26" height="15" rx="7.5" fill="${c}" fill-opacity="0.18" stroke="${c}" stroke-width="1.8"/>`
  );
  push(
    `<text x="${lx + 33}" y="103" font-family="${FONT}" font-size="11.5" font-weight="600" fill="${c}">${esc(label)}</text>`
  );
  lx += 33 + textWidth(label, 11.5) + 30;
}
push(
  `<text x="${lx + 4}" y="103" font-family="${FONT}" font-size="11" fill="${C.gray}">← 회색 글씨 = AS-IS 당시 명칭·위치</text>`
);

// HOME + connector bus
pill(colX(0), HOME_Y, "홈", "keep");
push(
  `<path d="M${colX(0) + COL_W / 2} ${HOME_Y + 34} V${BUS_Y} H${colX(7) + COL_W / 2}" fill="none" stroke="${C.keep}" stroke-opacity="0.5" stroke-width="1.4"/>`
);
for (let i = 0; i < 8; i++) {
  push(
    `<line x1="${colX(i) + COL_W / 2}" y1="${BUS_Y}" x2="${colX(i) + COL_W / 2}" y2="${COL_TOP}" stroke="${C.keep}" stroke-opacity="0.5" stroke-width="1.4"/>`
  );
}

/* --- column 0: 홈 직속 --- */
let y = COL_TOP;
let x = colX(0);
y = pill(x, y, "히어로 페이지", "keep", { solid: false }) + 12;
y = pill(x, y, "환을 잘 아는 사람들", "keep", { solid: false }) + 12;
y = pill(x, y, "품질관리 및 생산설비", "keep", { solid: false });
tapNote(x - 14, y + 34, "tap(2) 제공");
y = group(x, y + 10, ["품질관리", "생산설비"], "keep") + 16;
y = pill(x, y, "특허 및 인증현황", "keep", { solid: false });
tapNote(x - 14, y + 34, "tap(2) 제공");
y = group(x, y + 10, ["특허", "인증현황"], "keep") + 16;
y = pill(x, y, "고객서비스", "keep", { solid: false }) + 12;
y = pill(x, y, "제품소개", "keep", { solid: false }) + 12;
y = pill(x, y, "고객 스토리", "keep", { solid: false });
const col0Bottom = mark(y);

/* --- column 1: 회사소개 (ADDED) --- */
x = colX(1);
y = pill(x, COL_TOP, "회사소개", "add");
before(x, y + 13, "AS-IS: ABOUT > About 바이오피던스");
y += 26;
y = group(
  x,
  y,
  ["바이오피던스 소개", "브랜드비전", "핵심가치", "연혁", "역량", "바이오피던스 파트너스", "오시는 길"],
  "add"
);
highlight(x - 9, COL_TOP - 9, COL_W + 18, y - COL_TOP + 18);
badge(x + COL_W + 4, COL_TOP - 6, "1");
mark(y + 12);

/* --- column 2: 사업소개 (MODIFIED children) --- */
x = colX(2);
y = pill(x, COL_TOP, "사업소개", "keep") + 16;
y = pillSoft(x, y, "사업영역", "mod");
before(x, y + 12, "AS-IS: 사업소개 직속 (그룹 없음)");
y += 12;
tapNote(x - 14, y + 34, "tap(2) 제공");
y = group(x, y + 10, ["OEM / ODM", "제형 및 포장", "펫 영양제", "고객사"], "mod") + 18;
y = pillSoft(x, y, "주요활동", "keep");
tapNote(x - 14, y + 34, "tap(2) 제공");
y = group(x, y + 10, ["환마스터 제도", "방문투어", "환 연구소", "유기견 보호 캠페인"], "mod");
mark(y);

/* --- column 3: 환 이야기 (ADDED) --- */
x = colX(3);
y = pill(x, COL_TOP, "환 이야기", "add");
before(x, y + 13, "AS-IS: ABOUT > About 환");
y += 26;
y = group(
  x,
  y,
  ["환의 역사와 유래", "환의 종류", "환의 원료", "환의 품질", "환 제조 과정", "환 제조 설비 및 기술", "환의 미래와 비전"],
  "add"
);
highlight(x - 9, COL_TOP - 9, COL_W + 18, y - COL_TOP + 18);
badge(x + COL_W + 4, COL_TOP - 6, "1");
mark(y + 12);

/* --- column 4: 스토리 & 미디어 --- */
x = colX(4);
y = pill(x, COL_TOP, "스토리 & 미디어", "keep") + 16;
y = pillSoft(x, y, "스토리", "keep");
tapNote(x - 14, y + 38, "tap(3) 제공");
y = group(x, y + 10, ["고객후기", "성공스토리", "바이오피던스 스토리"], "mod") + 18;
y = pillSoft(x, y, "미디어", "keep");
tapNote(x - 14, y + 32, "tap(2) 제공");
const mediaGroupTop = y + 10;
y = group(x, mediaGroupTop, ["언론보도", "트렌드 인사이트"], "mod");
// badge 3 on "트렌드 인사이트" row
y += 18;
y = pillSoft(x, y, "바이오피던스 100% 활용하기", "keep", { fs: 10.5 });
mark(y);

/* --- column 5: 고객지원 (MODIFIED) --- */
x = colX(5);
y = pill(x, COL_TOP, "고객지원", "mod");
before(x, y + 13, "AS-IS: 문의 및 신청");
y += 28;
y = pillSoft(x, y, "문의 및 신청", "keep");
tapNote(x - 14, y + 38, "tap(3) 제공");
y = group(x, y + 10, ["AI 맞춤견적", "문의 통합", "방문 및 미팅 신청"], "keep") + 18;
y = pillSoft(x, y, "FAQ", "keep");
mark(y);

/* --- column 6: 멤버십 (MODIFIED) --- */
x = colX(6);
y = pill(x, COL_TOP, "멤버십", "mod");
before(x, y + 13, "AS-IS: 뉴스레터·MY BIOFIDENCE 하위 5개");
y += 26;
y = group(x, y, ["뉴스레터 신청", "MY BIOFIDENCE"], "mod");
mark(y);

/* --- column 7: 마이 바이오피던스 (ADDED) --- */
x = colX(7);
y = pill(x, COL_TOP, "마이 바이오피던스", "add");
badge(x + COL_W + 4, COL_TOP - 6, "2");
before(x, y + 13, "AS-IS: 없음 (멤버십 하위 로그인만 존재)");
y += 26;
for (const L of ["대시보드", "헬프데스크", "공지사항", "미디어&스토리", "자료실", "바이오피던스 100 활용"]) {
  y = pillSoft(x, y, L, "add") + 11;
}

// floating button block
const fbY = y + 22;
push(
  `<rect x="${x}" y="${fbY}" width="${COL_W}" height="104" rx="14" fill="${C.add}"/>` +
    `<text x="${x + COL_W / 2}" y="${fbY + 22}" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="800" fill="#fff">플로팅 버튼 (전역)</text>`
);
["뉴스레터 구독하기", "방문 투어 신청"].forEach((L, i) => {
  const by = fbY + 36 + i * 32;
  push(
    `<rect x="${x + 12}" y="${by}" width="${COL_W - 24}" height="26" rx="13" fill="#fff"/>` +
      `<text x="${x + COL_W / 2}" y="${by + 13}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="11" font-weight="700" fill="${C.add}">${esc(L)}</text>`
  );
});
badge(x + COL_W + 4, fbY - 4, "3");
const col7Bottom = mark(fbY + 104);

/* --- deleted / merged panel --- */
const delItems = [
  "ABOUT 대분류 — 해체 후 '회사소개'와 '환 이야기'로 분리, GNB 상위로 승격",
  "정기발행 콘텐츠 → 트렌드 인사이트 (명칭 변경)",
  "환 시장 가능성 → 환의 미래와 비전 (명칭 변경)",
  "기발송 리스트 · 뉴스레터 신청 → '뉴스레터 신청' 1개로 통합",
];
const dpY = maxBottom + 46;
const dpH = 30 + delItems.length * 19 + 16;
const dpW = Math.ceil(Math.max(...delItems.map((L) => textWidth("· " + L, 10.8))) + 40);
push(
  `<rect x="${X0}" y="${dpY}" width="${dpW}" height="${dpH}" rx="12" fill="${C.del}" fill-opacity="0.06" stroke="${C.del}" stroke-width="1.4" stroke-dasharray="6 4"/>`
);
push(
  `<text x="${X0 + 18}" y="${dpY + 26}" font-family="${FONT}" font-size="12.5" font-weight="800" fill="${C.del}">AS-IS 대비 사라지거나 이름이 바뀐 메뉴</text>`
);
delItems.forEach((L, i) => {
  push(
    `<text x="${X0 + 18}" y="${dpY + 48 + i * 19}" font-family="${FONT}" font-size="10.8" fill="${C.del}">· ${esc(L)}</text>`
  );
});

/* --- footnote --- */
const footY = dpY + dpH + 34;
push(
  `<text x="${X0}" y="${footY}" font-family="${FONT}" font-size="10.5" fill="${C.gray}">* 사용자 액션이 발생하는 영역(예: 버튼 클릭, 입력 작성 등)은 IA 상에 굵은 스트로크를 적용했습니다.</text>`
);
push(
  `<text x="${X0}" y="${footY + 17}" font-family="${FONT}" font-size="10.5" fill="${C.gray}">* 색상은 AS-IS 대비 변경 유형을 나타냅니다. 최종 메뉴명은 콘텐츠 개발 단계에서 카피라이팅을 통해 변경될 수 있습니다.</text>`
);

/* ---------- assemble ---------- */
const W = colX(7) + COL_W + X0;
const H = footY + 40;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="ia-title ia-desc">
<title id="ia-title">바이오피던스 정보구조(IA) TO-BE</title>
<desc id="ia-desc">AS-IS 대비 추가·수정·삭제된 메뉴를 색상으로 구분한 바이오피던스 홈페이지 정보구조도</desc>
<rect width="${W}" height="${H}" fill="${C.bg}"/>
${out.join("\n")}
</svg>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, svg, "utf8");
console.log(`✅ ${OUT}  (${W}×${H}, ${(svg.length / 1024).toFixed(1)} KB)`);
