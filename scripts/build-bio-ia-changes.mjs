/**
 * Generates public/projects/biofidence/ia-changes.svg
 * 개선 3가지를 AS-IS → TO-BE 대비 도식으로 표현
 * Run: node scripts/build-bio-ia-changes.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "public/projects/biofidence/ia-changes.svg";

const C = {
  old: "#8A8F9E",      // AS-IS 회색
  oldBg: "#F2F3F6",
  new: "#2A3DF0",      // TO-BE 파랑
  newBg: "#EDF0FE",
  accent: "#E8593C",   // 강조(코랄)
  ink: "#0E1226",
  gray: "#6B7183",
  line: "#D8DCE8",
};
const FONT =
  "Pretendard, 'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function textWidth(str, fs) {
  let u = 0;
  for (const ch of String(str))
    u += /[\u3131-\uD79D\u4E00-\u9FFF]/.test(ch) ? 1.0 : 0.55;
  return u * fs;
}
function fitSize(str, fs, maxW, min = 8) {
  let s = fs;
  while (s > min && textWidth(str, s) > maxW) s -= 0.25;
  return Math.round(s * 4) / 4;
}

const out = [];
const push = (s) => out.push(s);

/* ---------- primitives ---------- */
function label(x, y, txt, { size = 12, color = C.ink, weight = 400, anchor = "start" } = {}) {
  push(
    `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(txt)}</text>`
  );
}

/** menu box */
function box(x, y, w, h, txt, side, { size = 12, weight = 600, dim = false } = {}) {
  const isOld = side === "old";
  const stroke = isOld ? C.old : C.new;
  const bg = isOld ? C.oldBg : C.newBg;
  const fs = fitSize(txt, size, w - 14);
  push(
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${bg}" stroke="${stroke}" stroke-width="1.2"${dim ? ' opacity="0.55"' : ""}/>` +
      `<text x="${x + w / 2}" y="${y + h / 2}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="${fs}" font-weight="${weight}" fill="${stroke}"${dim ? ' opacity="0.75"' : ""}>${esc(txt)}</text>`
  );
  return y + h;
}

/** stacked list inside a container */
function stack(x, y, w, items, side, { lh = 19, size = 10.5 } = {}) {
  const stroke = side === "old" ? C.old : C.new;
  const h = items.length * lh + 14;
  push(
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${side === "old" ? C.oldBg : C.newBg}" stroke="${stroke}" stroke-opacity="0.5" stroke-width="1"/>`
  );
  items.forEach((t, i) => {
    const fs = fitSize(t, size, w - 14);
    push(
      `<text x="${x + w / 2}" y="${y + 7 + lh * i + lh / 2}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="${fs}" fill="${stroke}">${esc(t)}</text>`
    );
  });
  return y + h;
}

/** vertical connector */
function vline(x, y1, y2, side) {
  push(
    `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${side === "old" ? C.old : C.new}" stroke-opacity="0.55" stroke-width="1.2"/>`
  );
}

/** big arrow between panels */
function arrow(cx, cy) {
  push(
    `<circle cx="${cx}" cy="${cy}" r="17" fill="${C.accent}"/>` +
      `<path d="M${cx - 6} ${cy} H${cx + 5} M${cx + 1} ${cy - 5} L${cx + 6} ${cy} L${cx + 1} ${cy + 5}" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`
  );
}

/* ---------- layout constants ---------- */
const W = 1180;
const PAD = 44;
const CARD_W = W - PAD * 2;
const PANEL_W = 470;
const LX = PAD + 26;                       // AS-IS panel x
const RX = PAD + CARD_W - 26 - PANEL_W;    // TO-BE panel x
const MIDX = (LX + PANEL_W + RX) / 2;

let cursorY = 0;

/** card wrapper */
function card(no, title, problem, solution, bodyFn, bodyH) {
  const y0 = cursorY;
  const headH = 78;
  const h = headH + bodyH + 58;

  push(
    `<rect x="${PAD}" y="${y0}" width="${CARD_W}" height="${h}" rx="14" fill="#fff" stroke="${C.line}" stroke-width="1"/>`
  );

  // badge + title
  push(`<circle cx="${PAD + 30}" cy="${y0 + 34}" r="13" fill="${C.accent}"/>`);
  push(
    `<text x="${PAD + 30}" y="${y0 + 34}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="12" font-weight="800" fill="#fff">${no}</text>`
  );
  label(PAD + 52, y0 + 39, title, { size: 16, weight: 700 });

  // problem → solution line
  label(PAD + 52, y0 + 62, "문제", { size: 10.5, weight: 700, color: C.accent });
  label(PAD + 78, y0 + 62, problem, { size: 11.5, color: C.gray });
  const pw = textWidth(problem, 11.5);
  label(PAD + 90 + pw, y0 + 62, "→  해결", { size: 10.5, weight: 700, color: C.new });
  label(PAD + 138 + pw, y0 + 62, solution, { size: 11.5, color: C.gray });

  // panel headers
  const py = y0 + headH;
  label(LX, py - 6, "AS-IS", { size: 10.5, weight: 800, color: C.old });
  label(RX, py - 6, "TO-BE", { size: 10.5, weight: 800, color: C.new });

  bodyFn(py + 8);

  cursorY = y0 + h + 22;
}

/* ---------- title ---------- */
push(
  `<text x="${PAD}" y="40" font-family="${FONT}" font-size="20" font-weight="800" fill="${C.ink}">IA 개선 포인트</text>`
);
push(
  `<text x="${PAD}" y="62" font-family="${FONT}" font-size="12" fill="${C.gray}">바이오피던스 홈페이지 리뉴얼 — AS-IS 구조의 문제를 3가지로 정의하고 재설계했습니다.</text>`
);
push(
  `<line x1="${PAD}" y1="80" x2="${PAD + CARD_W}" y2="80" stroke="${C.line}" stroke-width="1"/>`
);
cursorY = 100;

/* ================= CARD 1 ================= */
card(
  "1",
  "ABOUT 대분류 해체 — 목적별로 분리",
  "회사 정보와 제품 지식이 ABOUT 한 곳에 15개 항목으로 뭉쳐 있음",
  "알고 싶은 대상에 따라 GNB에서 바로 진입",
  (y) => {
    const bw = 190;
    // AS-IS
    box(LX + 20, y, bw, 30, "ABOUT", "old");
    vline(LX + 20 + bw / 2, y + 30, y + 44, "old");
    let ay = y + 44;
    box(LX + 20, ay, bw, 26, "About 환", "old", { size: 11 });
    stack(LX + 20, ay + 32, bw, ["환의 역사와 유래", "환의 종류 · 원료 · 품질", "환 제조 과정 · 설비", "환 시장 가능성"], "old");
    let by = ay + 32 + 4 * 19 + 14 + 12;
    box(LX + 20, by, bw, 26, "About 바이오피던스", "old", { size: 11 });
    stack(LX + 20, by + 32, bw, ["회사소개 · 브랜드비전", "핵심가치 · 연혁 · 역량", "파트너스 · 오시는 길"], "old");
    label(LX + 20 + bw / 2, by + 32 + 3 * 19 + 14 + 20, "2뎁스 진입 · 목적 혼재", {
      size: 11, color: C.accent, weight: 600, anchor: "middle",
    });

    arrow(MIDX, y + 120);

    // TO-BE
    const tw = 200;
    box(RX + 10, y, tw, 32, "회사소개", "new", { size: 13, weight: 700 });
    stack(RX + 10, y + 38, tw, ["바이오피던스 소개", "브랜드비전 · 핵심가치", "연혁 · 역량 · 파트너스", "오시는 길"], "new");
    box(RX + 10 + tw + 24, y, tw, 32, "환 이야기", "new", { size: 13, weight: 700 });
    stack(RX + 10 + tw + 24, y + 38, tw, ["환의 역사와 유래", "환의 종류 · 원료 · 품질", "환 제조 과정 · 설비", "환의 미래와 비전"], "new");
    label(RX + 10 + tw + 12, y + 38 + 4 * 19 + 14 + 20, "GNB 상위 · 1뎁스 진입", {
      size: 11, color: C.new, weight: 700, anchor: "middle",
    });
  },
  250
);

/* ================= CARD 2 ================= */
card(
  "2",
  "회원 전용 공간 신설 — 마이 바이오피던스",
  "회원 영역이 멤버십 하위 '로그인' 수준에 머물러 재방문 이유가 없음",
  "로그인 후 지속 이용하는 공간으로 승격",
  (y) => {
    const bw = 190;
    box(LX + 20, y, bw, 30, "멤버십", "old");
    vline(LX + 20 + bw / 2, y + 30, y + 44, "old");
    box(LX + 20, y + 44, bw, 26, "MY BIOFIDENCE", "old", { size: 11 });
    stack(LX + 20, y + 76, bw, ["멤버십 소개", "로그인"], "old");
    label(LX + 20 + bw / 2, y + 76 + 2 * 19 + 14 + 22, "가입 후 할 일이 없음", {
      size: 11, color: C.accent, weight: 600, anchor: "middle",
    });

    arrow(MIDX, y + 78);

    const tw = 200;
    box(RX + 10, y, tw, 32, "마이 바이오피던스", "new", { size: 13, weight: 700 });
    label(RX + 10 + tw / 2, y + 46, "GNB 상위 대분류로 신설", { size: 10, color: C.gray, anchor: "middle" });
    const cells = ["대시보드", "헬프데스크", "공지사항", "미디어&스토리", "자료실", "바이오피던스 100 활용"];
    cells.forEach((t, i) => {
      const cx = RX + 10 + (i % 2) * (tw + 24);
      const cy = y + 56 + Math.floor(i / 2) * 38;
      box(cx, cy, tw, 30, t, "new", { size: 11, weight: 600 });
    });
    label(RX + 10 + tw + 12, y + 56 + 3 * 38 + 22, "재방문 동기 확보", {
      size: 11, color: C.new, weight: 700, anchor: "middle",
    });
  },
  212
);

/* ================= CARD 3 ================= */
card(
  "3",
  "뎁스 축소와 전환 동선 상시 노출",
  "하위 정보가 페이지마다 흩어져 클릭이 깊고, 신청 메뉴가 안에 묻힘",
  "탭으로 뎁스 축소 + 전환 버튼 전역 배치",
  (y) => {
    const bw = 190;
    // AS-IS: deep clicks
    const steps = ["스토리 & 미디어", "미디어", "언론보도"];
    steps.forEach((t, i) => {
      box(LX + 20 + i * 12, y + i * 44, bw, 30, t, "old", { size: 11 });
      if (i < steps.length - 1) vline(LX + 20 + i * 12 + bw / 2, y + i * 44 + 30, y + (i + 1) * 44, "old");
    });
    label(LX + 20 + bw / 2, y + 3 * 44 + 8, "3번 클릭해야 도달", {
      size: 11, color: C.accent, weight: 600, anchor: "middle",
    });
    box(LX + 20, y + 3 * 44 + 26, bw, 28, "문의 및 신청 (메뉴 안)", "old", { size: 10.5, dim: true });

    arrow(MIDX, y + 74);

    // TO-BE: tabs + floating
    const tw = 200;
    box(RX + 10, y, tw * 2 + 24, 30, "미디어", "new", { size: 12, weight: 700 });
    ["언론보도", "트렌드 인사이트"].forEach((t, i) => {
      box(RX + 10 + i * (tw + 24), y + 40, tw, 28, t, "new", { size: 11, weight: 600 });
    });
    label(RX + 10 + tw + 12, y + 84, "tap(2) — 한 화면에서 전환", {
      size: 11, color: C.new, weight: 700, anchor: "middle",
    });

    // floating button
    const fy = y + 104;
    push(
      `<rect x="${RX + 10}" y="${fy}" width="${tw * 2 + 24}" height="66" rx="12" fill="${C.new}"/>`
    );
    label(RX + 10 + tw + 12, fy + 18, "플로팅 버튼 — 모든 페이지 고정", {
      size: 11, color: "#fff", weight: 700, anchor: "middle",
    });
    ["뉴스레터 구독하기", "방문 투어 신청"].forEach((t, i) => {
      const bx = RX + 22 + i * (tw + 2);
      push(
        `<rect x="${bx}" y="${fy + 30}" width="${tw - 22}" height="24" rx="12" fill="#fff"/>` +
          `<text x="${bx + (tw - 22) / 2}" y="${fy + 42}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="10.5" font-weight="700" fill="${C.new}">${esc(t)}</text>`
      );
    });
  },
  200
);

/* ---------- footnote ---------- */
label(PAD, cursorY + 4, "* 전체 정보구조는 다음 이미지에서 확인할 수 있습니다.", {
  size: 10.5,
  color: C.gray,
});

const H = cursorY + 30;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d">
<title id="t">바이오피던스 IA 개선 포인트 3가지</title>
<desc id="d">ABOUT 대분류 해체, 회원 전용 공간 신설, 뎁스 축소와 전환 동선 강화를 AS-IS와 TO-BE 구조로 비교한 도식</desc>
<rect width="${W}" height="${H}" fill="#FBFBFD"/>
${out.join("\n")}
</svg>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, svg, "utf8");
console.log(`✅ ${OUT}  (${W}×${H}, ${(svg.length / 1024).toFixed(1)} KB)`);
