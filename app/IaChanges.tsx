type Node = { label: string; kind?: "head" | "list" };
type Side = { nodes?: Node[]; groups?: { head: string; items: string[] }[]; tag: string };

type Change = {
  no: string;
  title: string;
  problem: string;
  solution: string;
  before: Side;
  after: Side;
};

const CHANGES: Change[] = [
  {
    no: "1",
    title: "ABOUT 대분류 해체",
    problem: "회사 정보와 제품 지식이 ABOUT 한 곳에 15개 항목으로 뭉쳐 있음",
    solution: "알고 싶은 대상별로 GNB에서 바로 진입",
    before: {
      nodes: [
        { label: "ABOUT", kind: "head" },
        { label: "About 환" },
        { label: "About 바이오피던스" },
        { label: "환의 역사·종류·원료 / 회사소개·연혁·역량 … 총 15개 항목", kind: "list" },
      ],
      tag: "2뎁스 진입 · 목적 혼재",
    },
    after: {
      groups: [
        { head: "회사소개", items: ["브랜드비전", "연혁 · 역량", "오시는 길"] },
        { head: "환 이야기", items: ["환의 원료·품질", "제조 과정", "미래와 비전"] },
      ],
      tag: "GNB 상위 · 1뎁스 진입",
    },
  },
  {
    no: "2",
    title: "회원 전용 공간 신설",
    problem: "회원 영역이 멤버십 하위 로그인 수준이라 재방문할 이유가 없음",
    solution: "로그인 후 지속 이용하는 공간으로 승격",
    before: {
      nodes: [
        { label: "멤버십", kind: "head" },
        { label: "MY BIOFIDENCE" },
        { label: "멤버십 소개 / 로그인", kind: "list" },
      ],
      tag: "가입 후 할 일이 없음",
    },
    after: {
      groups: [
        {
          head: "마이 바이오피던스",
          items: ["대시보드", "헬프데스크", "공지사항", "미디어&스토리", "자료실", "100 활용"],
        },
      ],
      tag: "재방문 동기 확보",
    },
  },
  {
    no: "3",
    title: "뎁스 축소",
    problem: "하위 정보에 도달하기까지 페이지를 세 번 거쳐야 함",
    solution: "탭으로 제공해 한 화면에서 전환",
    before: {
      nodes: [
        { label: "스토리 & 미디어", kind: "head" },
        { label: "미디어" },
        { label: "언론보도" },
      ],
      tag: "3번 클릭해야 도달",
    },
    after: {
      groups: [{ head: "미디어", items: ["언론보도", "트렌드 인사이트"] }],
      tag: "tap(2) · 1번 클릭",
    },
  },
];

function Chevron() {
  return (
    <span className="iac-chev" aria-hidden="true">
      <svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.5 2 6 6.5 10.5 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Arrow() {
  return (
    <div className="iac-arrow" aria-hidden="true">
      <svg viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 6h24M20 1.5 25.5 6 20 10.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function IaChanges() {
  return (
    <div className="ia-changes">
      <header className="iac-head">
        <h4>IA 개선 포인트</h4>
        <p>AS-IS 구조의 문제를 세 가지로 정의하고 재설계했습니다.</p>
      </header>

      <div className="iac-grid">
        {CHANGES.map((c) => (
          // 모바일에서는 제목 줄을 눌러 접고 펼친다(기본 접힘).
          // 데스크톱에서는 CSS로 항상 펼친 상태로 고정한다.
          <details className="iac-card" key={c.no}>
            <summary className="iac-title">
              <span className="iac-no">{c.no}</span>
              <h5>{c.title}</h5>
              <Chevron />
            </summary>

            <dl className="iac-meta">
              <div>
                <dt className="is-problem">문제</dt>
                <dd>{c.problem}</dd>
              </div>
              <div>
                <dt className="is-solution">해결</dt>
                <dd>{c.solution}</dd>
              </div>
            </dl>

            <div className="iac-compare">
              <div className="iac-side is-before">
                <span className="iac-label">AS-IS</span>
                <div className="iac-stack">
                  {c.before.nodes?.map((n, i) => (
                    <div
                      key={i}
                      className={`iac-node${n.kind === "head" ? " is-head" : ""}${
                        n.kind === "list" ? " is-list" : ""
                      }`}
                    >
                      {n.label}
                    </div>
                  ))}
                </div>
                <span className="iac-tag is-before">{c.before.tag}</span>
              </div>

              <Arrow />

              <div className="iac-side is-after">
                <span className="iac-label">TO-BE</span>
                <div className={`iac-groups${c.after.groups!.length > 1 ? " is-split" : ""}`}>
                  {c.after.groups!.map((g, i) => (
                    <div className="iac-group" key={i}>
                      <div className="iac-node is-head">{g.head}</div>
                      <ul className={g.items.length > 3 ? "is-grid" : ""}>
                        {g.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <span className="iac-tag is-after">{c.after.tag}</span>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
