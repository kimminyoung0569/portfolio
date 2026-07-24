import ScrollEffects from "./ScrollEffects";
import IaChanges from "./IaChanges";

type GalleryImage = {
  src: string;
  alt: string;
  label: string;
  wide?: boolean;
  compact?: boolean;
  size?: "short" | "support";
  annotation?: "bio-ia";
  component?: "ia-changes";
  url?: string;
};

type GallerySection = {
  eyebrow: string;
  copy: string;
  helper?: string;
  images?: GalleryImage[];
  workflow?: {
    steps: { title: string; text: string }[];
    channels: { title: string; text: string; image?: GalleryImage }[];
  };
};

const projects = [
  {
    number: "01", title: "우리금융 기후포털", englishTitle: "Woori Climate Finance Portal",
    category: "금융 / 데이터 포털", accent: "green",
    period: "2024.10 — 2025.05", role: "UX/UI 기획", contribution: "기획 100%",
    summary: "복잡하고 낯선 정보를 사용자가 쉽게 찾고 이해할 수 있도록 검색과 탐색 흐름을 설계한 정보 포털입니다.",
    description: "메인 프리뷰와 검색 기능으로 탐색을 돕고, 메인 중간에 환기형 콘텐츠를 배치해 이탈률을 낮추고자 했습니다.",
    roles: ["뉴스/리서치/마켓 등 콘텐츠 IA와 검색 플로우 설계", "화면별 와이어프레임/SB 작성 및 메인 프리뷰 기획", "디자인/개발 QA와 오픈 후 운영 이슈 개선"],
    outcomes: ["기후금융 종합정보포털 구축 및 서비스 오픈", "제목/출처/날짜 기반 상세 검색과 탐색 체계 구축", "ICT AWARD KOREA 2025 Grand Prize 부문 대상"],
    metric: "GRAND PRIZE", metricLabel: "ICT AWARD KOREA 2025",
    metricIcon: "/awards/ict-awards.png",
    tags: ["UX FLOW", "WIREFRAME", "INTERACTION", "QA"],
    galleryCopy: "복잡한 기후금융 정보를 쉽게 이해하고, 필요한 데이터까지 바로 찾아갈 수 있도록 탐색 경험을 설계했습니다.",
    gallerySections: [
      {
        eyebrow: "PROJECT DETAILS",
        copy: "복잡한 기후금융 정보를 쉽게 이해하고, 필요한 데이터까지 바로 찾아갈 수 있도록 탐색 경험을 설계했습니다.",
        helper: "주요 화면을 통해 문제를 구조화하고 실제 서비스로 구현한 과정을 확인할 수 있습니다.",
        images: [
          { src: "/projects/woori-climate/detail-1.jpg", alt: "우리금융 기후포털 검색 및 데이터 화면 구성", label: "SEARCH & DATA EXPERIENCE" },
          { src: "/projects/woori-climate/detail-2.jpg", alt: "우리금융 기후포털 주요 화면 구성", label: "MAIN & CONTENT EXPERIENCE" },
        ],
      },
      {
        eyebrow: "QA PROCESS",
        copy: "Figma 시안과 실제 CSS 적용값을 대조해 여백/크기/폰트 등 화면 구현의 정확도를 검수했습니다.",
        helper: "디자인 기준과 구현 화면의 차이를 확인하며 오픈 전 완성도를 높였습니다.",
        images: [
          { src: "/projects/woori-climate/qa-figma-css.jpg", alt: "우리금융 기후포털 Figma 시안과 CSS 적용값 비교 QA 화면", label: "FIGMA–CSS COMPARISON", wide: true },
        ],
      },
    ],
    galleryImages: [
      { src: "/projects/woori-climate/detail-1.jpg", alt: "우리금융 기후포털 검색 및 데이터 화면 구성", label: "SEARCH & DATA EXPERIENCE" },
      { src: "/projects/woori-climate/detail-2.jpg", alt: "우리금융 기후포털 주요 화면 구성", label: "MAIN & CONTENT EXPERIENCE" },
      { src: "/projects/woori-climate/qa-figma-css.jpg", alt: "우리금융 기후포털 Figma 시안과 CSS 적용값 비교 QA 화면", label: "FIGMA–CSS COMPARISON", wide: true },
    ],
    url: "https://www.climatefinance.co.kr/",
  },
  {
    number: "02", title: "바이오피던스", titleSecondLine: "대표 홈페이지 리뉴얼", englishTitle: "Biofidence Renewal",
    category: "B2B / OEM·ODM 플랫폼", accent: "blue",
    period: "2025.08 — 2025.10", role: "UX/UI 기획 / PM", contribution: "기획 100%",
    summary: "AI 견적 문의부터 문진형 문의, 샘플/방문 신청과 관리까지 복잡한 연구 의뢰 과정을 하나의 흐름으로 연결했습니다.",
    description: "요구사항 분석부터 사용자/관리자 IA 및 스토리보드 설계, 고객사 커뮤니케이션, 디자인/개발 일정 관리와 QA까지 프로젝트 전반의 프로젝트 관리 업무를 수행했습니다.",
    roles: ["사용자 페이지와 관리자 페이지의 요구사항을 함께 정리하고, 기능 간 우선순위와 연관 관계를 기준으로 작업 범위 구체화", "문진형 견적문의/방문/프로젝트 플로우와 관리자 페이지/회원 권한/운영 정책 설계", "고객사 피드백을 디자인/개발 업무로 전환하고 진행 상황을 확인하며 서비스 오픈까지 일정 관리"],
    outcomes: ["문진형 견적문의/방문 신청/프로젝트 관리 기능 고도화", "계약 고객 전용 My Biofidence 서비스 구축", "관리자 운영 정책 수립 및 고객사 최종 발표 진행"],
    metric: "100%", metricLabel: "UX/UI 기획 기여도",
    tags: ["IA", "ADMIN", "POLICY", "PROJECT MANAGEMENT", "COMMUNICATION", "STORYBOARD", "WBS", "QA"],
    galleryCopy: "문진형 문의와 신청 절차를 카테고리별 Step으로 묶어 설계하고, 프로그레스바로 이동 가능한 단계와 작성 완료 상태를 시각적으로 확인할 수 있게 했습니다.",
    gallerySections: [
      {
        eyebrow: "ENQUIRY EXPERIENCE",
        copy: "문진형 문의와 신청 절차를 카테고리별 Step으로 묶어 설계하고, 프로그레스바로 이동 가능한 단계와 작성 완료 상태를 시각적으로 확인할 수 있게 했습니다.",
        helper: "주요 문의 화면을 통해 단계별 입력 흐름과 신청 경험을 확인할 수 있습니다.",
        images: [
          { src: "/projects/biofidence/enquiry-form.jpg", alt: "바이오피던스 제품 유형 및 타겟 고객 문의 폼", label: "Enquiry Form" },
          { src: "/projects/biofidence/application.jpg", alt: "바이오피던스 방문 신청 인원 및 일정 선택 화면", label: "application" },
        ],
      },
      {
        eyebrow: "PROJECT MANAGEMENT",
        copy: "사용자/관리자 요구사항을 구조화하고, 고객사와 디자인/개발 간 협업 및 일정을 조율해 서비스 오픈까지 관리했습니다.",
        helper: "WBS와 주요 산출물을 통해 요구사항을 실제 화면과 운영 가능한 서비스로 연결한 과정을 정리했습니다.",
        images: [
          { src: "/projects/biofidence/wbs.png", alt: "바이오피던스 프로젝트 WBS 일정표", label: "WBS", wide: true },
          { src: "", alt: "바이오피던스 IA 개선 포인트", label: "IA 개선 포인트", wide: true, component: "ia-changes" as const },
          { src: "/projects/biofidence/ia-diagram.svg", alt: "바이오피던스 전체 정보구조 TO-BE", label: "INFORMATION ARCHITECTURE (전체 구조)", wide: true },
          { src: "/projects/biofidence/detail-3.jpg", alt: "바이오피던스 사용자 기능 상세", label: "ADMIN STORYBOARD" },
          { src: "/projects/biofidence/detail-4.jpg", alt: "바이오피던스 관리자 기능 상세", label: "ADMIN STORYBOARD" },
        ],
      },
    ],
    galleryImages: [
      { src: "/projects/biofidence/enquiry-form.jpg", alt: "바이오피던스 제품 유형 및 타겟 고객 문의 폼", label: "Enquiry Form" },
      { src: "/projects/biofidence/application.jpg", alt: "바이오피던스 방문 신청 인원 및 일정 선택 화면", label: "application" },
      { src: "/projects/biofidence/wbs.png", alt: "바이오피던스 프로젝트 WBS 일정표", label: "WBS", wide: true },
      { src: "", alt: "바이오피던스 IA 개선 포인트", label: "IA 개선 포인트", wide: true, component: "ia-changes" as const },
      { src: "/projects/biofidence/ia-diagram.svg", alt: "바이오피던스 전체 정보구조 TO-BE", label: "INFORMATION ARCHITECTURE (전체 구조)", wide: true },
      { src: "/projects/biofidence/detail-3.jpg", alt: "바이오피던스 사용자 기능 상세", label: "ADMIN STORYBOARD" },
      { src: "/projects/biofidence/detail-4.jpg", alt: "바이오피던스 관리자 기능 상세", label: "ADMIN STORYBOARD" },
    ],
    url: "https://www.biofidence.com/user/index.php",
  },
  {
    number: "03", title: "LG GEO 개선 프로젝트", englishTitle: "LG GEO Content Experience",
    category: "콘텐츠 / 커머스 UX", accent: "coral",
    period: "2026.04 — ING", role: "PM / 콘텐츠 기획 / 운영", contribution: "기획 50%, 운영 80%",
    summary: "구매가이드, PDP, PLP, FAQ를 GEO 관점에서 고도화하고 AI 검색 수집에 유리하도록 외부 채널 리패키징 콘텐츠를 제작하였습니다.",
    description: "콘텐츠 개선 요구사항을 분석하고 작업 범위를 구체화했으며, 디자이너/퍼블리셔와의 일정 조율부터 구현 검수, 운영 반영까지 전 과정을 관리했습니다.",
    roles: ["구매가이드/FAQ의 GEO 기반 콘텐츠 개선과 AI 활용 리패키징 양식 설계", "여러 콘텐츠가 동시에 진행되는 운영 환경에서 우선순위와 담당자별 일정을 WBS로 관리", "고객사가 정한 방향을 바탕으로 구체적인 화면과 운영 정책으로 구현하고, Figma 시안과 구현 화면을 비교 검수해 운영 사이트에 안정적으로 반영"],
    outcomes: ["3개월간 약 300건의 콘텐츠 발행 운영", "AI 활용으로 콘텐츠 제작 시간 약 60% 이상 단축", "티스토리/네이버 블로그용 리패키징 및 발행 체계 구축"],
    metric: "60%+", metricLabel: "AI 활용으로 콘텐츠 제작 시간 단축",
    tags: ["CONTENT UX", "GEO", "CMS", "OPERATIONS", "WBS", "QA"],
    galleryCopy: "AI 검색에서 LG 콘텐츠로 연결되도록 정보를 구조화하고, 구매 여정과 채널별 경험을 개선했습니다.",
    gallerySections: [
      {
        eyebrow: "PROJECT DETAILS",
        copy: "AI 검색에서 LG 콘텐츠로 연결되도록 정보를 구조화하고, 구매 여정과 채널별 경험을 개선했습니다.",
        helper: "콘텐츠 개선 범위와 운영 일정을 WBS 중심으로 정리했습니다.",
        images: [
          { src: "/projects/lge/wbs.jpg", alt: "LG GEO 콘텐츠 제작 일정 WBS", label: "WBS", wide: true, size: "short" as const },
        ],
      },
      {
        eyebrow: "BUYING GUIDE IMPROVEMENT",
        copy: "고객사 개선안을 바탕으로 콘텐츠 구조와 표기 방식이 정확히 반영되도록 협업하고, 작성/검수/운영 반영을 진행했습니다.",
        helper: "사용 환경/핵심 특징/추천 상황과 지원 여부가 구매가이드에 명확히 드러나도록 적용 과정을 관리했습니다.",
        images: [
          { src: "/projects/lge/buying-guide-as-is.png", alt: "LG 구매가이드 개선 전 비교표", label: "AS-IS" },
          { src: "/projects/lge/buying-guide-to-be.png", alt: "LG 구매가이드 개선 후 비교표", label: "TO-BE" },
        ],
      },
      {
        eyebrow: "AI WORKFLOW",
        copy: "반복되는 콘텐츠 구성과 작성 기준을 템플릿화하고 GPT와 Claude를 초안 제작에 활용해, 콘텐츠 기획/운영 업무의 효율을 높였습니다.",
        helper: "제품 링크나 구성안을 입력하면 AI가 채널별 초안을 만들고, 저는 정보 정확도와 표현을 검수한 뒤 발행 방식에 맞춰 반영했습니다.",
        workflow: {
          steps: [
            { title: "Template", text: "반복되는 구성/문장 톤/필수 항목을 양식화" },
            { title: "Input", text: "제품 링크 또는 구성안과 발행 채널 전달" },
            { title: "AI Draft", text: "학습된 양식에 맞춰 채널별 초안 생성" },
            { title: "Review", text: "정보 정확도와 브랜드 톤만 집중 검수" },
            { title: "Publish", text: "채널별 에디터 방식에 맞춰 빠르게 반영" },
          ],
          channels: [
            { title: "Tistory", text: "HTML 모드용 코드까지 생성해 복사/붙여넣기 중심으로 발행 시간을 단축", image: { src: "/projects/lge/tistory.png", alt: "LG GEO 티스토리 콘텐츠 화면", label: "TISTORY CONTENT", url: "https://lgecom-kr.tistory.com/273" } },
            { title: "Naver Blog", text: "텍스트 초안을 빠르게 만든 뒤 네이버 블로그 에디터에서 스타일만 정리", image: { src: "/projects/lge/naver-blog.jpg", alt: "LGE.COM 네이버 블로그 리패키징 콘텐츠", label: "CONTENT EXPERIENCE", url: "https://blog.naver.com/lgelectronics-kr/224299883105" } },
          ],
        },
      },
    ],
    galleryImages: [
      { src: "/projects/lge/wbs.jpg", alt: "LG GEO 콘텐츠 제작 일정 WBS", label: "WBS", wide: true, size: "short" as const },
      { src: "/projects/lge/buying-guide-as-is.png", alt: "LG 구매가이드 개선 전 비교표", label: "AS-IS" },
      { src: "/projects/lge/buying-guide-to-be.png", alt: "LG 구매가이드 개선 후 비교표", label: "TO-BE" },
    ],
    url: "https://www.lge.co.kr/story",
  },
];

const skills = [
  { name: "PowerPoint", level: 100, icon: "P", color: "#d35230" },
  { name: "Slack", level: 100, icon: "S", color: "#4a154b" },
  { name: "Figma", level: 80, icon: "Fi", color: "#a259ff" },
  { name: "Premiere Pro", level: 80, icon: "Pr", color: "#6c5ce7" },
  { name: "Notion", level: 80, icon: "N", color: "#191919" },
  { name: "AI TOOL", level: 70, icon: "AI", color: "#111827" },
  { name: "Adobe Illustrator", level: 60, icon: "Ai", color: "#ff9a00" },
  { name: "Photoshop", level: 50, icon: "Ps", color: "#087ea4" },
  { name: "Excel", level: 40, icon: "X", color: "#217346" },
  { name: "After Effects", level: 30, icon: "Ae", color: "#5b55c8" },
  { name: "Jira", level: 30, icon: "J", color: "#1d7afc" },
];

const participatedProjects = [
  { year: "2024—25", title: "코오롱 코스모스", role: "예약 플로우 / 관리자 / 전체 QA", contribution: "기여도 50%", url: "https://www.thekosmos.co.kr/" },
  { year: "2025", title: "SENSSE × CJ 슈퍼레이스", role: "이벤트 UX / 반응형 / 관리자", contribution: "기여도 80%", url: "https://benevolent-froyo-3227bc.netlify.app/" },
  { year: "2025", title: "LGE.COM 오픈마켓 PDP", role: "정보 구조 / Summary / 플랫폼 최적화", contribution: "기여도 100%", url: "https://www.lge.co.kr/" },
  { year: "2025—26", title: "LGE.COM 홈스타일", role: "콘텐츠 기획 / 제품 큐레이션 / 운영", contribution: "기여도 100%", url: "https://homestyle.lge.co.kr/home" },
  { year: "2025", title: "한화생명 킵어스", role: "ESG 리서치 / 콘텐츠 제안 / 현장 운영", contribution: "기여도 20%", url: "https://www.instagram.com/keepearth_official/" },
  { year: "2025", title: "롯데손해보험 AI 교육 영상", role: "시스템 리서치 / AI 나레이션 제안", contribution: "기여도 40%", url: "https://www.lotteins.co.kr/" },
  { year: "2026", title: "동원 대표 홈페이지 제안 수주", role: "경쟁사 리서치 / IA 제안", contribution: "기여도 20%", url: "https://www.dongwon.com/kr" },
];

const personalWorks = [
  { no: "01", title: "데일리샷 UX 리뉴얼", type: "UX RESEARCH / 60%", text: "휴리스틱 평가와 사용자 인터뷰를 기반으로 개인화 추천과 입문자 탐색 경험을 개선했습니다.", note: "SWOT / INTERVIEW / AFFINITY DIAGRAM / PROTOTYPE", image: "/personal/dailyshot.png", url: "https://www.behance.net/gallery/205811197/%28DailySHOT%29-UXUI-Renewal-project" },
  { no: "02", title: "2024 한국감성과학회 하계학술대회 발표 및 논문 게재", type: "UX RESEARCH / 70%", text: "데일리샷의 사용성 이슈를 분석하고 인터뷰/여정맵을 통해 개인화 추천과 입문자 가이드를 제안했습니다.", note: "한국감성과학회 우수상 / 논문 게재", image: "/personal/dailyshot-paper.png", url: "https://db.koreascholar.com/Article/Detail/443335" },
  { no: "03", title: "트립비토즈 UX 리뉴얼", type: "UX STUDY / 60%", text: "사용자 여정을 분석해 여행 상품 탐색부터 예약까지의 흐름을 재설계했습니다.", note: "IA / PERSONA / USER JOURNEY MAP", image: "/personal/tripbtoz.png", url: "https://www.behance.net/gallery/205811417/%28Tripbtoz%29-UXUI-Redesign-project" },
  { no: "04", title: "숏폼 유형 분류 연구 논문_대학 졸업 논문", type: "RESEARCH / 100%", text: "숏폼 콘텐츠 유형에 따른 사용자 반응과 경험 차이를 조사하고 데이터를 분석해 시사점을 도출했습니다.", note: "RESEARCH / DATA ANALYSIS", image: "/personal/shortform-study.png", url: "https://www.behance.net/gallery/205811757/_" },
  { no: "05", title: "유미의 세포들 오프닝", type: "MOTION / 100%", text: "작품의 핵심 메시지를 중심으로 영상 흐름과 타이포그래피, 화면 전환을 설계했습니다.", note: "AFTER EFFECTS / PREMIERE", image: "/personal/yumi-cells.png", url: "https://blog.naver.com/alalalsdud/223321323149" },
  { no: "06", title: "아동 미술 전시 영상", type: "CLIENT WORK / 100%", text: "아이들의 작품 제작 과정과 생각이 전달되도록 기획/촬영/편집 전 과정을 담당했습니다.", note: "PLAN / SHOOT / EDIT", image: "/personal/art-exhibition.png", url: "https://blog.naver.com/alalalsdud/223321355361" },
  { no: "07", title: "환경 캠페인 숏폼", type: "CONTEST / 70%", text: "미세섬유 문제를 선택형 게임 구조로 풀어 복잡한 정보를 쉽게 이해하도록 구성했습니다.", note: "CONCEPT / EDIT", image: "/personal/environment-campaign.png", url: "https://blog.naver.com/alalalsdud/223321287376" },
  { no: "08", title: "간접흡연 예방 숏폼", type: "CONTEST / 70%", text: "무거운 공익 메시지의 진입 장벽을 낮추면서도 문제의 심각성을 놓치지 않도록 기획했습니다.", note: "CONTENT FLOW / PREMIERE", image: "/personal/smoking-campaign.png", url: "https://blog.naver.com/alalalsdud/223321287376" },
];

function ProjectVisual({ accent, number }: { accent: string; number: string }) {
  if (number === "01" || number === "02" || number === "03") {
    const projectName = number === "01" ? "우리금융 기후포털" : number === "02" ? "바이오피던스" : "LGE.COM";
    const imagePath = number === "01" ? "/projects/woori-climate/cover.jpg" : number === "02" ? "/projects/biofidence/cover.jpg" : "/projects/lge/cover.png";
    return (
      <figure className={`project-visual project-image-visual ${number === "03" ? "project-image-lge" : ""}`}>
        <img src={imagePath} alt={`${projectName} 대표 화면`} />
      </figure>
    );
  }

  return (
    <div className={`project-visual visual-${accent}`} aria-hidden="true">
      <div className="visual-topbar"><span /><span /><span /><b>{number}</b></div>
      {number === "01" && <div className="climate-ui"><div className="climate-copy"><i /><strong>Climate<br />Finance</strong><em /></div><div className="globe"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="dot dot-one" /><span className="dot dot-two" /></div></div>}
      {number === "02" && <div className="bio-ui"><div className="bio-sidebar"><i /><i /><i /><i /></div><div className="bio-main"><span className="bio-label" /><strong>Project flow</strong><div className="flow-row"><i>1</i><b /><i>2</i><b /><i>3</i></div><div className="bio-cards"><span /><span /><span /></div></div></div>}
      {number === "03" && <div className="geo-ui"><div className="geo-heading"><i /><strong>Better content,<br />better decisions.</strong></div><div className="geo-grid"><span className="geo-card large"><i /></span><span className="geo-card"><i /></span><span className="geo-card"><i /></span></div></div>}
    </div>
  );
}

function GalleryFigure({ image, index }: { image: GalleryImage; index: number }) {
  if (image.component === "ia-changes") {
    return (
      <figure className="wide" key="ia-changes">
        <IaChanges />
        <figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{image.label}</strong></figcaption>
      </figure>
    );
  }
  if (image.annotation === "bio-ia") return <BioIaFigure image={image} index={index} />;

  const imageUrl = image.url;
  const imageClassName = [
    image.wide ? "wide" : "",
    image.compact ? "compact" : "",
    image.size ? `image-${image.size}` : "",
    imageUrl ? "linked-content" : "",
  ].filter(Boolean).join(" ");

  return (
    <figure className={imageClassName} key={image.src}>
      <a href={imageUrl ?? image.src} target="_blank" rel="noreferrer" aria-label={`${image.alt} ${imageUrl ? "상세 콘텐츠" : "원본"}으로 보기`}><img src={image.src} alt={image.alt} />{imageUrl && <span className="content-link-overlay" aria-hidden="true"><b><span>VIEW CONTENT</span><small>VIEW</small></b><i>↗</i></span>}</a>
      <figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{image.label}</strong><em>{imageUrl ? "VIEW CONTENT ↗" : "VIEW ORIGINAL ↗"}</em></figcaption>
    </figure>
  );
}

function BioIaFigure({ image, index }: { image: GalleryImage; index: number }) {
  const notes = [
    {
      no: "1",
      title: "ABOUT 대분류 해체, 목적별 재편",
      text: "ABOUT 하위에 15개 항목이 뭉쳐 있던 구조를 회사소개(기업 정보)와 환 이야기(제품 지식)로 분리해 GNB 상위로 승격했습니다. 알고 싶은 대상에 따라 바로 진입할 수 있습니다.",
    },
    {
      no: "2",
      title: "회원 전용 공간 신설",
      text: "멤버십 하위 로그인 수준이던 회원 영역을 마이 바이오피던스로 독립시키고 대시보드·헬프데스크·자료실을 배치해, 일회성 신청에서 지속 이용하는 서비스로 전환했습니다.",
    },
    {
      no: "3",
      title: "뎁스 축소와 전환 동선 강화",
      text: "하위 항목을 tap(2)·tap(3)으로 제공해 클릭 뎁스를 줄이고, 뉴스레터 구독과 방문 투어 신청을 플로팅 버튼으로 전역 배치해 어느 페이지에서든 전환할 수 있게 했습니다.",
    },
  ];

  return (
    <figure className="wide bio-ia-figure" key={image.src}>
      <div className="bio-ia-board">
        <a className="bio-ia-visual" href={image.src} target="_blank" rel="noreferrer" aria-label={`${image.alt} 원본으로 보기`}>
          <img src={image.src} alt={image.alt} />
        </a>
        <div className="bio-ia-notes" aria-label="IA 개선 포인트">
          {notes.map((note) => (
            <article key={note.no}>
              <span>{note.no}</span>
              <div>
                <h5>{note.title}</h5>
                <p>{note.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{image.label}</strong><em>VIEW ORIGINAL ↗</em></figcaption>
    </figure>
  );
}

function AiWorkflow({ workflow }: { workflow: NonNullable<GallerySection["workflow"]> }) {
  return (
    <div className="ai-workflow">
      <div className="ai-flow-steps" aria-label="AI 업무 효율화 프로세스">
        {workflow.steps.map((step, index) => (
          <article key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h5>{step.title}</h5>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
      <div className="ai-channel-grid" aria-label="채널별 발행 방식">
        {workflow.channels.map((channel) => (
          <article key={channel.title}>
            {channel.image && (
              <figure className="ai-channel-thumb">
                <img src={channel.image.src} alt={channel.image.alt} />
                <span>{channel.image.label}</span>
              </figure>
            )}
            <h5>{channel.title}</h5>
            <p>{channel.text}</p>
            {channel.image?.url && <a className="ai-channel-link" href={channel.image.url} target="_blank" rel="noreferrer">VIEW PAGE ↗</a>}
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <ScrollEffects />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="페이지 맨 위로 이동">KIM MIN YOUNG PORTFOLIO<span>®</span></a>
        <nav aria-label="주요 메뉴"><a href="#projects">PROJECTS</a><a href="#experience">EXPERIENCE</a><a href="#about">ABOUT</a></nav>
        <span className="header-note">UX PLANNER / PM</span>
      </header>
      <nav className="section-anchor" aria-label="페이지 섹션 이동">
        <a href="#why-sbs">
          <span className="desktop-label">지원동기</span>
          <span className="mobile-label">지원동기</span>
        </a>
        <a href="#projects">
          <span className="desktop-label">대표 프로젝트</span>
          <span className="mobile-label">대표<br />프로젝트</span>
        </a>
        <a href="#experience">
          <span className="desktop-label">스킬&참여 프로젝트</span>
          <span className="mobile-label">스킬&<br />참여프로젝트</span>
        </a>
        <a href="#personal">
          <span className="desktop-label">개인 작업물</span>
          <span className="mobile-label">개인<br />작업물</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-kicker"><span>SELECTED WORK</span><span>2024—2026</span></div>
        <h1><span>STABLE FLOWS,</span><span className="outline-text">BETTER EXPERIENCES.</span></h1>
        <div className="hero-bottom">
          <p>사용자 흐름부터 운영 정책까지 설계하며<br /><strong>일정 안에서 안정적인 서비스를 완성하는 기획자, 김민영입니다.</strong></p>
          <a className="round-link" href="#projects" aria-label="프로젝트 목록으로 이동"><span>VIEW<br />PROJECTS</span><b>↘</b></a>
        </div>
        <div className="hero-marquee" aria-hidden="true"><span>USER FLOW</span><i>◆</i><span>POLICY</span><i>◆</i><span>WIREFRAME</span><i>◆</i><span>QA</span></div>
      </section>

      <section className="motivation-section" id="why-sbs">
        <div className="motivation-kicker"><span>00 — MOTIVATION</span><span>CONTENT / SERVICE / UX</span></div>
        <div className="motivation-layout">
          <div className="motivation-title">
            <h2>WHY SBS</h2>
            <p>콘텐츠를 이해하는<br />서비스 기획자</p>
          </div>
          <div className="motivation-copy">
            <p>SBS 예능국에서 FD로 근무하며 콘텐츠 제작 현장을 경험한 이후, 콘텐츠가 만들어지는 과정뿐 아니라 사용자가 이를 탐색하고 경험하는 방식에도 관심을 갖게 되었습니다. 대학에서는 앱 서비스의 사용자 리뷰 데이터를 수집/분석하고, 페르소나와 사용자 여정지도를 설계하며 사용자가 느끼는 불편 지점을 데이터로 짚어내는 기초를 쌓았습니다. 또한 데일리샷, 트립비토즈 등 모바일 앱을 대상으로 IA와 사용자 흐름, 프로토타입을 설계하며 앱 환경의 탐색 구조와 화면 전환 경험도 꾸준히 학습했습니다.</p>
            <p>이후 UX 기획자로 근무하며 요구사항 분석과 IA, 스토리보드 설계부터 고객사 커뮤니케이션, 일정 관리, QA까지 서비스 구현 전반에 참여했습니다. 콘텐츠에 대한 이해와 데이터로 사용자 관점을 읽어온 분석적 태도, 그리고 복잡한 요구사항을 실제 화면과 운영 체계로 안정적으로 완성해 온 실무 역량을 바탕으로, SBS play의 방향을 구체적인 서비스로 흔들림 없이 만들어가는 데 기여하고 싶습니다.</p>
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="section-heading"><p>01 — SELECTED PROJECTS</p><h2>정보 구조 설계, 스토리보드부터<br />구현까지 참여한 프로젝트</h2><span>대표 프로젝트 3개를 소개/역할/성과 기준으로 정리했습니다.</span></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.number}>
              <div className="project-meta"><span>{project.number}</span><p>{project.category}</p><dl><div><dt>PERIOD</dt><dd>{project.period}</dd></div><div><dt>ROLE</dt><dd>{project.role}</dd></div><div><dt>CONTRIBUTION</dt><dd>{project.contribution}</dd></div></dl></div>
              <div className="project-intro"><p>{project.englishTitle}</p><h3>{project.title}{project.titleSecondLine && <><br />{project.titleSecondLine}</>}</h3><strong>{project.summary}</strong><p className="project-description">{project.description}</p><a className="project-link" href={project.url} target="_blank" rel="noreferrer">VIEW PROJECT ↗</a><div className="tag-list" aria-label="프로젝트 핵심 역량">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-metric">{project.metricIcon && <img src={project.metricIcon} alt="ICT AWARD KOREA 아이콘" />}<strong>{project.metric}</strong><span>{project.metricLabel}</span></div></div>
              <ProjectVisual accent={project.accent} number={project.number} />
              <div className="project-details"><div><h4>ROLE</h4><ul>{project.roles.map((role) => <li key={role}>{role}</li>)}</ul></div><div><h4>OUTCOME</h4><ul>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div></div>
              {project.galleryImages ? (
                <div className="artifact-area project-gallery">
                  {("gallerySections" in project && project.gallerySections) ? (
                    project.gallerySections.map((section: GallerySection) => (
                      <section className="gallery-section" key={section.eyebrow}>
                        <div className="gallery-intro"><span>{section.eyebrow}</span><h4>{section.copy}</h4><p>{section.helper}</p></div>
                        {section.images && (
                          <div className={`project-detail-images gallery-count-${section.images.length}`}>
                            {section.images.map((image, index) => <GalleryFigure image={image} index={index} key={image.src} />)}
                          </div>
                        )}
                        {section.workflow && <AiWorkflow workflow={section.workflow} />}
                      </section>
                    ))
                  ) : (
                    <section className="gallery-section">
                      <div className="gallery-intro"><span>PROJECT DETAILS</span><h4>{project.number === "01" ? <>복잡한 기후금융 정보를 한눈에 이해하고,<br />필요한 데이터까지 자연스럽게 도달하도록 탐색 경험을 설계했습니다.</> : project.galleryCopy}</h4><p>{project.number === "03" ? "주요 산출물을 통해 개선 방향과 운영 흐름을 확인할 수 있습니다." : "주요 화면을 통해 문제를 구조화하고 실제 서비스로 구현한 과정을 확인할 수 있습니다."}</p></div>
                      <div className={`project-detail-images gallery-count-${project.galleryImages.length}`}>
                        {project.galleryImages.map((image, index) => <GalleryFigure image={image} index={index} key={image.src} />)}
                      </div>
                    </section>
                  )}
                </div>
              ) : (
                <div className="artifact-area">
                  <div className="artifact-heading"><h4>PLANNING DOCUMENTS</h4><p>실제 산출물 이미지가 들어갈 영역입니다.</p></div>
                  <div className="artifact-placeholders">
                    <div><span>01</span><strong>WBS / SCHEDULE</strong><em>이미지 추가 영역</em></div>
                    <div><span>02</span><strong>STORYBOARD / FLOW</strong><em>이미지 추가 영역</em></div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="page-title"><p>02 — SKILLS & EXPERIENCE</p><h2>도구를 다루는 것보다<br />일을 연결하는 방식</h2><span>서비스 구조를 문서로 구체화하고, 협업과 QA를 거쳐 실제 화면까지 완성합니다.</span></div>
        <div className="experience-grid">
          <div className="skill-panel">
            <div className="panel-heading"><h3>SKILLS</h3><span>NOTION PORTFOLIO DATA</span></div>
            <div className="skill-bars">{skills.map((skill) => <div className="skill-row" key={skill.name}><div><strong><i className="skill-icon" style={{ background: skill.color }}>{skill.icon}</i>{skill.name}</strong><span>{skill.level}%</span></div><i><b style={{ width: `${skill.level}%` }} /></i></div>)}</div>
            <div className="knowledge-list"><span>IA</span><span>USER FLOW</span><span>STORYBOARD</span><span>ADMIN</span><span>SERVICE POLICY</span><span>QA</span><span>DEVTOOLS</span><span>AI PROCESS</span></div>
          </div>
          <div className="participation-panel">
            <div className="panel-heading"><h3>PARTICIPATED PROJECTS</h3><span>SELECTED 07</span></div>
            <p className="section-link-hint">프로젝트명을 클릭하면 상세 내용을 확인할 수 있습니다. ↗</p>
            <div className="compact-projects">{participatedProjects.map((item, index) => <a href={item.url} target="_blank" rel="noreferrer" key={item.title}><article><span>{String(index + 1).padStart(2, "0")}</span><div><h4>{item.title}</h4><p>{item.role}</p></div><time><span>{item.year}</span><b>{item.contribution}</b></time></article></a>)}</div>
          </div>
        </div>
      </section>

      <section className="personal-section" id="personal">
        <div className="page-title light-title"><p>03 — PERSONAL WORKS</p><h2>관찰하고 구조화해<br />경험으로 만드는 과정</h2><span>데이터 분석과 앱 UX 리뉴얼 연구, 영상 콘텐츠 기획을 통해 매체별 사용자 경험을 설계하고 결과물로 구체화했습니다.</span></div>
        <p className="section-link-hint personal-link-hint">VIEW PROJECT를 클릭하면 상세 작업물을 확인할 수 있습니다. ↗</p>
        <div className="personal-grid">{personalWorks.map((work) => <article key={work.no}><div className="work-top"><span>{work.no}</span><em>{work.type}</em></div><figure className="work-image"><img src={work.image} alt={`${work.title} 대표 이미지`} /></figure><h3>{work.title}</h3><p>{work.text}</p><a className="work-link" href={work.url} target="_blank" rel="noreferrer">VIEW PROJECT ↗</a><strong>{work.note}</strong></article>)}</div>
      </section>

      <section className="profile-section">
        <div className="page-title"><p>04 — MORE ABOUT ME</p><h2>함께 일할 때<br />기대할 수 있는 것</h2><span>SBSi 서비스 기획 직무와 연결되는 경험과 일하는 태도를 한 장에 모았습니다.</span></div>
        <div className="profile-grid">
          <div className="award-block"><h3>AWARDS</h3><ol><li><span>2025</span><strong>ICT AWARD KOREA<br />GRAND PRIZE</strong></li><li><span>2024</span><strong>한국감성과학회<br />논문 우수상</strong></li><li><span>2021</span><strong>기후시민 3.5 캠페인<br />홍보 영상 채택</strong></li></ol></div>
          <div className="promise-block"><h3>WORK PRINCIPLES</h3><ul><li><span>01</span><div><strong>안정적인 일정 관리</strong><p>지연 가능성을 먼저 파악하고 필요한 커뮤니케이션을 선제적으로 진행합니다.</p></div></li><li><span>02</span><div><strong>다양한 경우의 수</strong><p>사용자 흐름과 예외 상황을 함께 검토해 안정적인 서비스를 설계합니다.</p></div></li><li><span>03</span><div><strong>원활한 협업</strong><p>고객사/디자이너/개발자와 지속적으로 소통하며 요구사항을 구체화합니다.</p></div></li><li><span>04</span><div><strong>끝까지 책임지는 태도</strong><p>기획에서 끝내지 않고 QA와 운영 과정까지 확인해 완성도를 높입니다.</p></div></li></ul></div>
          <div className="future-block"><h3>NEXT</h3><p>앞으로 만들고 싶은 서비스</p><ul><li>사용자가 자연스럽게 이해하는 서비스</li><li>예상하지 못한 상황까지 고려한 서비스</li><li>운영하는 사람도 관리하기 편한 서비스</li><li>시간이 지나도 안정적으로 유지되는 서비스</li></ul><p>화려한 한 번의 기획보다, 오래 안정적으로 운영될 수 있는 서비스를 만드는 기획자가 되고 싶습니다.</p><blockquote>기본기를 바탕으로<br /><strong>완성도를 만들어가는 기획자</strong></blockquote></div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-label">05 — HOW I WORK</div>
        <div className="about-copy"><p>화려한 한 번의 아이디어보다</p><h2>모든 경우의 수를 살피고,<br />흔들리지 않는 흐름을<br />설계합니다.</h2></div>
        <div className="principles">
          <article><span>01</span><h3>STRUCTURE</h3><p>복잡한 요구사항을 정보 구조와 사용자 흐름으로 명확하게 정리합니다.</p></article>
          <article><span>02</span><h3>ALIGNMENT</h3><p>디자인/개발/운영의 관점을 연결해 같은 목표를 바라보게 합니다.</p></article>
          <article><span>03</span><h3>DETAIL</h3><p>예외 케이스와 구현 결과까지 꼼꼼하게 확인해 서비스의 안정성을 높입니다.</p></article>
        </div>
        <footer><div><p>UX PLANNER / PM</p><strong>KIM MIN YOUNG</strong></div><a href="#top">BACK TO TOP ↑</a><span>PORTFOLIO DRAFT © 2026</span></footer>
      </section>
    </main>
  );
}
