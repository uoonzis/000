import React, { useState } from "react";
import {
  Home,
  MessageCircle,
  Bell,
  User,
  Bookmark,
  Archive,
  Edit,
  Pin,
  Heart,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* Card / CardContent (내장) */
function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-gray-700 bg-gray-900 shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default function EmpathyApp() {
  const [tab, setTab] = useState("home");
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState("공감러123");
  const [interest, setInterest] = useState("주거, 젠더");
  const [selectedForum, setSelectedForum] = useState(null);

  // 코인 & 이벤트
  const [coins, setCoins] = useState(80);
  const [eventPots, setEventPots] = useState({ starbucks: 0, cvs: 0, cgv: 0 });
  const [eventInput, setEventInput] = useState({ starbucks: 0, cvs: 0, cgv: 0 });

  const putCoins = (key) => {
    const v = Math.floor(eventInput[key] || 0);
    if (v <= 0) return alert("1개 이상 넣어주세요");
    if (v > coins) return alert("코인이 부족합니다");
    setCoins((c) => c - v);
    setEventPots((p) => ({ ...p, [key]: p[key] + v }));
    setEventInput((i) => ({ ...i, [key]: 0 }));
  };

  // 게시판
  const favoriteForums = ["정치 공론장", "경제 공론장", "트렌드 공론장", "세계 공론장"];
  const allForums = [
    ...favoriteForums,
    "사회 공론장",
    "AI/테크 공론장",
    "커리어 공론장",
    "노동 공론장",
    "환경 공론장",
    "인권 공론장",
    "문화 공론장",
    "라이프 공론장",
    "기타 공론장",
  ];
  const newBadgeForums = new Set([
    "정치 공론장",
    "경제 공론장",
    "트렌드 공론장",
    "세계 공론장",
    "사회 공론장",
    "노동 공론장",
  ]);

  // 더미 기사
  const articlesByForum = {
    "정치 공론장": [
      {
        id: 1,
        title: "“속옷 차림으로 저항했다” SNS 확산 논란?",
        snippet: "구치소 CCTV 영상 유출 논쟁과 해석 공방 요약...",
        source: "뉴스",
        date: "2025.09.02",
        likes: 128,
        comments: 54,
        scraps: 19,
      },
      {
        id: 2,
        title: "반려고프 목걸이 논란(feat. 특검) 🔥",
        snippet: "조사 과정에서 제기된 의혹과 해명 정리...",
        source: "뉴스",
        date: "2025.09.01",
        likes: 96,
        comments: 31,
        scraps: 22,
      },
      {
        id: 3,
        title: "여당 대표, 회동 제안 — 조건은?",
        snippet: "교섭단체 회동 추진 배경과 조건을 한눈에...",
        source: "정치",
        date: "2025.08.29",
        likes: 77,
        comments: 40,
        scraps: 15,
      },
      {
        id: 4,
        title: "차별금지 논쟁의 실제 쟁점은?",
        snippet: "청문회에서 불거진 '찬반' 구도에 대한 팩트체크...",
        source: "정책",
        date: "2025.09.03",
        likes: 58,
        comments: 18,
        scraps: 12,
      },
      {
        id: 5,
        title: "유엔총회 가는 대통령 — 외교 의제는?",
        snippet: "정상외교 핵심 의제와 국내 영향 전망...",
        source: "국제",
        date: "2025.09.02",
        likes: 83,
        comments: 27,
        scraps: 17,
      },
    ],
  };

  // 챌린지
  const [calendarMonth, setCalendarMonth] = useState(8);
  const monthsKo = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
  const completedByMonth = { 7: [1,2,3,5,6,7,8,9,10,12,13,15,16,18,20,21,23,25,27,29], 8: [1,3,4] };

  const computeStreakInfo = (days) => {
    const set = new Set(days);
    let longestLen = 0, longestEnd = 0, cur = 0;
    for (let d = 1; d <= 30; d++) {
      if (set.has(d)) { cur++; if (cur > longestLen) { longestLen = cur; longestEnd = d; } }
      else cur = 0;
    }
    const streakSet = new Set();
    cur = 0;
    for (let d = 1; d <= 30; d++) {
      if (set.has(d)) cur++;
      else { if (cur >= 5) for (let k = d - cur; k < d; k++) streakSet.add(k); cur = 0; }
    }
    if (cur >= 5) for (let k = 30 - cur + 1; k <= 30; k++) streakSet.add(k);
    return { streakSet, longestLen, longestEnd };
  };

  // 전시관
  const [exhibit, setExhibit] = useState({
    bestChallenges: [
      { id: 1, title: "반대 입장 요약 후 공감 멘트 — 탁월한 시도", likes: 24, comments: 6 },
      { id: 2, title: "가짜뉴스 팩트체크 + 존중 댓글 사례", likes: 18, comments: 3 },
    ],
    bestMoments: [
      { id: 3, title: "주거비 토론에서의 합의안 도출 순간", likes: 31, comments: 11 },
      { id: 4, title: "젠더 이슈에서 공감 스위칭 성공 사례", likes: 27, comments: 7 },
    ],
    topComments: [
      { id: 5, title: "'상대의 맥락을 먼저 묻는 태도'가 바꾼 흐름", likes: 45, comments: 19 },
      { id: 6, title: "감정비용을 줄이는 표현법 정리", likes: 39, comments: 9 },
    ],
  });
  const bump = (section, id, field) =>
    setExhibit((prev) => ({
      ...prev,
      [section]: prev[section].map((it) => (it.id === id ? { ...it, [field]: it[field] + 1 } : it)),
    }));

  // 시각화
  const topicOptions = ["청년 주거", "젠더/돌봄", "AI와 일자리"];
  const [vizTopic, setVizTopic] = useState(topicOptions[0]);
  const vizData = {
    "청년 주거": {
      sentiment: [{ name: "찬성", value: 48 }, { name: "반대", value: 27 }, { name: "중립", value: 25 }],
      keywords: [{ text: "주거", weight: 10 }, { text: "전세", weight: 9 }, { text: "월세", weight: 7 }, { text: "보증금", weight: 6 }, { text: "청년", weight: 8 }, { text: "기숙사", weight: 5 }, { text: "공공임대", weight: 8 }, { text: "대출", weight: 6 }, { text: "규제", weight: 7 }, { text: "세제", weight: 4 }],
      points: [{ x: -60, y: -30 }, { x: -30, y: -10 }, { x: -10, y: 0 }, { x: 20, y: 15 }, { x: 40, y: 30 }, { x: 60, y: 45 }, { x: -20, y: 35 }, { x: 10, y: -20 }, { x: 45, y: -15 }],
    },
    "젠더/돌봄": {
      sentiment: [{ name: "찬성", value: 35 }, { name: "반대", value: 45 }, { name: "중립", value: 20 }],
      keywords: [{ text: "돌봄", weight: 9 }, { text: "군복무", weight: 8 }, { text: "평등", weight: 10 }, { text: "육아", weight: 7 }, { text: "휴가", weight: 6 }, { text: "차별", weight: 8 }, { text: "분담", weight: 5 }, { text: "정책", weight: 6 }, { text: "갈등", weight: 4 }, { text: "대화", weight: 5 }],
      points: [{ x: -80, y: -20 }, { x: -50, y: -10 }, { x: -20, y: 0 }, { x: 0, y: 20 }, { x: 30, y: 40 }, { x: 70, y: 60 }, { x: 40, y: -20 }, { x: 10, y: -40 }, { x: -10, y: 50 }],
    },
    "AI와 일자리": {
      sentiment: [{ name: "찬성", value: 40 }, { name: "반대", value: 30 }, { name: "중립", value: 30 }],
      keywords: [{ text: "AI", weight: 10 }, { text: "자동화", weight: 9 }, { text: "일자리", weight: 10 }, { text: "재교육", weight: 7 }, { text: "안전망", weight: 6 }, { text: "생산성", weight: 5 }, { text: "윤리", weight: 4 }, { text: "창업", weight: 6 }, { text: "규제", weight: 5 }, { text: "보조금", weight: 4 }],
      points: [{ x: -30, y: -30 }, { x: -10, y: -10 }, { x: 10, y: 10 }, { x: 30, y: 20 }, { x: 50, y: 30 }, { x: 70, y: 40 }, { x: -10, y: 40 }, { x: 20, y: -30 }, { x: 45, y: -10 }],
    },
  };
  const PIE_COLORS = ["#22c55e", "#ef4444", "#94a3b8"];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <span className="text-lg font-bold">공공공</span>
        <div className="flex gap-4 items-center">
          <button onClick={() => setTab("notifications")}>
            <Bell className="w-5 h-5" />
          </button>
          <button onClick={() => setTab("profile")}>
            <User className="w-6 h-6 rounded-full bg-gray-600 p-1" />
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-gray-100">
        {tab === "home" && (
          <>
            <Card><CardContent>
              <h2 className="font-bold text-lg mb-2 text-white">오늘의 공감 이슈</h2>
              <p className="text-sm text-gray-200">“청년 주거 문제에 대한 다양한 의견을 나눠보세요.”</p>
            </CardContent></Card>

            <Card>
              <CardContent className="space-y-2">
                <h2 className="font-bold text-lg text-white">내 활동 피드</h2>
                <ul className="flex justify-between text-sm text-gray-200 border-b border-gray-700 pb-2">
                  <li>총 댓글 수: 332</li><li>총 답글 수: 22</li><li>받은 공감 수: 2,998</li>
                </ul>
                <div className="space-y-3 mt-3">
                  {[
                    { t:"2025.05.18 09:47", b:"요즘 정부에서 한일외교도 왜 우호적으로 하는지 모르겠고, 남북 관계 개선 의지도 안 보이는데... 뭐가 문제지", g:"정치 공론장", up:"0 0" },
                    { t:"2025.05.14 09:27", b:"국방의 의무를 여자도 지는 것은 현실적으로 너무 어려울 것 같고, 대신 여자는 국방의 의무를 다하는 남성에게 감사한 마음을 지니는 것은 어떨까?", g:"젠더 공론장", up:"1 0" },
                    { t:"2025.04.21 00:03", b:"문체부가 6000원으로 영화관람료를 배포해도 영화값 자체를 내리지 않으면 바뀌는 건 없을 것 같은데....", g:"문화 공론장", up:"0 0" },
                  ].map((x,i)=>(
                    <Card key={i}><CardContent className="p-3">
                      <p className="text-xs text-gray-400">{x.t}</p>
                      <p className="text-sm text-gray-200 mt-1">{x.b}</p>
                      <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>{x.g}</span><span>👍 {x.up.split(" ")[0]} 👎 {x.up.split(" ")[1]}</span>
                      </div>
                    </CardContent></Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card><CardContent>
              <h2 className="font-bold text-lg text-white mb-2">즐겨찾기 토론 게시판</h2>
              <ul className="space-y-2 text-sm text-gray-200">
                {favoriteForums.map((f)=>(<li key={f} className="flex justify-between items-center"><span>{f}</span><span className="text-xs text-gray-400">📌</span></li>))}
              </ul>
            </CardContent></Card>

            <Card><CardContent>
              <h2 className="font-bold text-lg text-white mb-2">실시간 인기 주제</h2>
              <ul className="space-y-2 text-sm text-gray-200">
                <li className="flex justify-between items-center"><span>정치 갈등</span><span className="text-xs text-gray-400">152명 참여 중 🔥</span></li>
                <li className="flex justify-between items-center"><span>대학생 주거비</span><span className="text-xs text-gray-400">87명 참여 중 N</span></li>
                <li className="flex justify-between items-center"><span>젠더 토론</span><span className="text-xs text-gray-400">203명 참여 중 N</span></li>
              </ul>
            </CardContent></Card>
          </>
        )}

        {tab === "forum" && (
          <div>
            {!selectedForum ? (
              <>
                <h2 className="text-lg font-bold mb-4 text-white">토론 게시판</h2>
                <ul className="space-y-3 text-sm text-gray-200">
                  {allForums.filter((f)=>favoriteForums.includes(f)).map((f)=>(
                    <li key={`fav-${f}`} className="flex items-center gap-2 cursor-pointer hover:bg-gray-800/60 rounded px-2 py-2" onClick={()=>setSelectedForum(f)}>
                      <Pin className="w-5 h-5 text-gray-100" /><span className="text-gray-100">{f}</span>
                      {newBadgeForums.has(f)&&(<span className="ml-1 px-1.5 py-0.5 text-[10px] leading-none bg-red-500 text-white rounded-full font-bold">N</span>)}
                    </li>
                  ))}
                  {allForums.filter((f)=>!favoriteForums.includes(f)).map((f)=>(
                    <li key={f} className="flex items-center gap-2 cursor-pointer hover:bg-gray-800/40 rounded px-2 py-2" onClick={()=>setSelectedForum(f)}>
                      <Pin className="w-5 h-5 text-gray-600" /><span className="text-gray-300">{f}</span>
                      {newBadgeForums.has(f)&&(<span className="ml-1 px-1.5 py-0.5 text-[10px] leading-none bg-red-500 text-white rounded-full font-bold">N</span>)}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-white">{selectedForum}</h2>
                  <button className="text-xs text-gray-400 hover:text-gray-200" onClick={()=>setSelectedForum(null)}>← 목록으로</button>
                </div>

                {(articlesByForum[selectedForum] || []).length === 0 ? (
                  <p className="text-sm text-gray-400">콘텐츠가 준비 중입니다.</p>
                ) : (
                  <div className="space-y-3">
                    {/* 여기!  TS의 ! 제거하고 ?.map 로 안전하게 */}
                    {articlesByForum[selectedForum]?.map((a)=>(
                      <Card key={a.id} className="bg-gray-900 border-gray-700">
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <div className="w-24 h-16 rounded bg-gray-700 flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-100 line-clamp-2">{a.title}</p>
                              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{a.snippet}</p>
                              <div className="flex items-center justify-between mt-2 text-[11px] text-gray-400">
                                <span>{a.source} · {a.date}</span>
                                <div className="flex items-center gap-3">
                                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{a.likes}</span>
                                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{a.comments}</span>
                                  <span className="flex items-center gap-1"><Bookmark className="w-3.5 h-3.5" />{a.scraps}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {tab === "challenge" && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-white">공감 챌린지</h2>
            <Card className="mb-2"><CardContent>
              <p className="text-sm text-gray-200">오늘의 미션: 상대 의견에 공감 멘트 남기기</p>
              <div className="mt-3 p-3 bg-gray-800 rounded">
                <p className="text-sm text-gray-100">상대 의견: "거주가 아닌 투기 목적의 부동산 구입 행위는 규제되어야 한다"</p>
                <textarea className="w-full mt-2 p-2 text-sm bg-gray-900 border border-gray-700 rounded text-gray-100" placeholder="주제와 무관한 의견 작성 시 챌린지 미션 완료가 취소될 수 있습니다"></textarea>
                <button className="mt-2 px-3 py-1 bg-red-500 text-white rounded-full text-sm">챌린지 완료</button>
              </div>
            </CardContent></Card>

            <Card><CardContent>
              {(() => {
                const list = completedByMonth[calendarMonth] || [];
                const { streakSet, longestLen, longestEnd } = computeStreakInfo(list);
                const completedSet = new Set(list);
                return (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-white">30일 챌린지 달력</h3>
                      <div className="flex items-center gap-2">
                        <button className="px-2 py-1 rounded hover:bg-gray-800 text-gray-400" onClick={()=>setCalendarMonth((m)=>(m+11)%12)} aria-label="이전 달">◀</button>
                        <span className="text-sm font-semibold text-white">{monthsKo[calendarMonth]}</span>
                        <button className="px-2 py-1 rounded hover:bg-gray-800 text-gray-400" onClick={()=>setCalendarMonth((m)=>(m+1)%12)} aria-label="다음 달">▶</button>
                      </div>
                      <span className="text-xs text-gray-400">
                        완료 {list.length}/30 {longestLen>=5 && <span className="ml-2">| 🔥 최장 스트릭 {longestLen}일</span>}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {Array.from({length:30}, (_,i)=>i+1).map((d)=>{
                        const completed = completedSet.has(d);
                        const inStreak = streakSet.has(d);
                        const isStreakEnd = longestLen>=5 && d===longestEnd;
                        const isToday = calendarMonth===8 && d===7;
                        const showConnector = streakSet.has(d) && streakSet.has(d+1) && d%5!==0;
                        return (
                          <div key={d} className={`relative h-16 rounded-md border ${isToday ? "border-red-400 ring-2 ring-red-400/40" : inStreak ? "border-red-500/60 ring-1 ring-red-500/40 bg-red-500/5" : "border-gray-700"} bg-gray-950`}>
                            <span className="absolute top-1 left-1 text-xs text-gray-400">{String(d).padStart(2,"0")}</span>
                            {showConnector && <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-0.5 bg-red-500/60"></div>}
                            {completed && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="border-2 border-red-500 text-red-500 rounded-full px-2 py-1 text-[10px] font-bold opacity-80 -rotate-12">미션완료</div>
                              </div>
                            )}
                            {isStreakEnd && <div className="absolute top-1 right-1 text-[10px] px-1.5 py-0.5 rounded bg-red-600/80">🔥{longestLen}</div>}
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </CardContent></Card>
          </div>
        )}

        {tab === "archive" && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-white">디지털 전시관</h2>

            <Card className="mb-4"><CardContent>
              <h3 className="font-semibold text-white mb-3">공감 챌린지 우수작</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exhibit.bestChallenges.map((it)=>(
                  <div key={it.id} className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
                    <div className="text-sm text-gray-100 line-clamp-2">{it.title}</div>
                    <div className="flex items-center gap-4 text-xs text-gray-300">
                      <button className="flex items-center gap-1 hover:text-white" onClick={()=>bump("bestChallenges", it.id, "likes")}><Heart className="w-4 h-4" /> {it.likes}</button>
                      <button className="flex items-center gap-1 hover:text-white" onClick={()=>bump("bestChallenges", it.id, "comments")}><MessageCircle className="w-4 h-4" /> {it.comments}</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 px-3 py-1 bg-red-500 text-white rounded-full text-sm">내 글 전시 신청</button>
            </CardContent></Card>

            <Card className="mb-4"><CardContent>
              <h3 className="font-semibold text-white mb-3">토론 명장면</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exhibit.bestMoments.map((it)=>(
                  <div key={it.id} className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
                    <div className="text-sm text-gray-100 line-clamp-2">{it.title}</div>
                    <div className="flex items-center gap-4 text-xs text-gray-300">
                      <button className="flex items-center gap-1 hover:text-white" onClick={()=>bump("bestMoments", it.id, "likes")}><Heart className="w-4 h-4" /> {it.likes}</button>
                      <button className="flex items-center gap-1 hover:text-white" onClick={()=>bump("bestMoments", it.id, "comments")}><MessageCircle className="w-4 h-4" /> {it.comments}</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent></Card>

            <Card><CardContent>
              <h3 className="font-semibold text-white mb-3">이달의 베스트 댓글</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exhibit.topComments.map((it)=>(
                  <div key={it.id} className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
                    <div className="text-sm text-gray-100 line-clamp-2">{it.title}</div>
                    <div className="flex items-center gap-4 text-xs text-gray-300">
                      <button className="flex items-center gap-1 hover:text-white" onClick={()=>bump("topComments", it.id, "likes")}><Heart className="w-4 h-4" /> {it.likes}</button>
                      <button className="flex items-center gap-1 hover:text-white" onClick={()=>bump("topComments", it.id, "comments")}><MessageCircle className="w-4 h-4" /> {it.comments}</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 시각화 */}
              <Card className="mt-4"><CardContent>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">시각화</h3>
                  <div className="flex gap-2">
                    {topicOptions.map((t)=>(
                      <button key={t} onClick={()=>setVizTopic(t)} className={`px-2 py-1 rounded text-xs ${vizTopic===t ? "bg-red-500 text-white" : "bg-gray-800 text-gray-300"}`}>{t}</button>
                    ))}
                  </div>
                </div>

                {(() => {
                  const cur = vizData[vizTopic];
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-100 mb-2">찬반 분포 차트</div>
                        <div className="w-full h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={cur.sentiment} dataKey="value" nameKey="name" outerRadius={70} label>
                                {cur.sentiment.map((_, i)=>(<Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />))}
                              </Pie>
                              <Tooltip /><Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-100 mb-2">키워드 클라우드</div>
                        <div className="flex flex-wrap gap-2 items-end">
                          {cur.keywords.map((k,i)=>{
                            const size = k.weight>=9 ? "text-5xl" : k.weight>=7 ? "text-3xl" : k.weight>=5 ? "text-xl" : "text-sm";
                            return <span key={i} className={`text-gray-200 ${size} font-extrabold tracking-tight`}>#{k.text}</span>;
                          })}
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-100 mb-2">의견 분포 차트</div>
                        <div className="w-full h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" dataKey="x" domain={[-100,100]} tick={{fontSize:10}} label={{ value:'보수 ← 정치(좌/우) → 진보', position:'bottom', fill:'#94a3b8', fontSize:10 }} />
                              <YAxis type="number" dataKey="y" domain={[-100,100]} tick={{fontSize:10}} label={{ value:'전통 ← 젠더관점 → 평등', angle:-90, position:'insideLeft', fill:'#94a3b8', fontSize:10 }} />
                              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                              <Scatter data={cur.points} fill="#60a5fa" />
                            </ScatterChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent></Card>
            </CardContent></Card>
          </div>
        )}

        {tab === "notifications" && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-white">알림센터</h2>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>어제 남긴 질문에 답변이 달렸습니다.</li>
              <li>이번 주 공감률 15% 상승!</li>
              <li>오늘의 공감 챌린지를 완료하세요.</li>
            </ul>
          </div>
        )}

        {tab === "profile" && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-white">내 프로필</h2>
            {!editing ? (
              <Card className="mb-2"><CardContent>
                <p className="text-sm text-gray-200">닉네임: {nickname}</p>
                <p className="text-sm text-gray-200">관심사: {interest}</p>
                <p className="text-sm text-gray-200">획득 코인 수: {coins}개</p>
                <p className="text-sm text-gray-200">획득 배지:</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-amber-300/90 text-black text-xs rounded-full font-semibold">LFUO</span>
                  <span className="px-2 py-1 bg-red-400/70 text-xs rounded-full">공감 탐험가</span>
                  <span className="px-2 py-1 bg-blue-400/70 text-xs rounded-full">반대 의견 이해자</span>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-white mb-2">코인 이벤트 응모</h3>
                  <p className="text-xs text-gray-400 mb-3">코인을 원하는 만큼 넣으면, 누적 코인이 많은 순서대로 당첨돼요. (잔여 코인: {coins}개)</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { key:"starbucks", label:"스타벅스 상품권" },
                      { key:"cvs", label:"편의점 5000원권" },
                      { key:"cgv", label:"CGV 영화 티켓" },
                    ].map((it)=>(
                      <div key={it.key} className="bg-gray-800 rounded-lg p-3 flex flex-col gap-2">
                        <div className="text-sm text-gray-100">{it.label}</div>
                        <div className="text-xs text-gray-400">현재 누적: {eventPots[it.key]}개</div>
                        <div className="flex items-center gap-2">
                          <input type="number" min={0} value={eventInput[it.key]} onChange={(e)=>setEventInput((v)=>({ ...v, [it.key]: Math.max(0, Number(e.target.value)) }))} className="w-20 px-2 py-1 bg-gray-900 border border-gray-700 rounded text-sm" />
                          <button onClick={()=>putCoins(it.key)} className="px-2 py-1 bg-red-500 rounded text-sm">코인 넣기</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={()=>setEditing(true)} className="mt-6 px-3 py-1 bg-gray-700 text-white rounded-full text-sm flex items-center gap-1">
                  <Edit className="w-4 h-4" /> 프로필 편집
                </button>
              </CardContent></Card>
            ) : (
              <Card className="mb-2"><CardContent className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400">닉네임</label>
                  <input value={nickname} onChange={(e)=>setNickname(e.target.value)} className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded text-gray-100" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400">관심사</label>
                  <input value={interest} onChange={(e)=>setInterest(e.target.value)} className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded text-gray-100" />
                </div>
                <button onClick={()=>setEditing(false)} className="mt-2 px-3 py-1 bg-red-500 text-white rounded-full text-sm">저장</button>
              </CardContent></Card>
            )}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around py-2 border-t border-gray-800 bg-gray-950">
        <button onClick={()=>setTab("home")} className={tab==="home" ? "text-red-400" : "text-gray-300"}>
          <Home className="w-6 h-6 mx-auto" /><span className="text-xs">홈</span>
        </button>
        <button onClick={()=>setTab("forum")} className={tab==="forum" ? "text-red-400" : "text-gray-300"}>
          <MessageCircle className="w-6 h-6 mx-auto" /><span className="text-xs">공론장</span>
        </button>
        <button onClick={()=>setTab("challenge")} className={tab==="challenge" ? "text-red-400" : "text-gray-300"}>
          <Bookmark className="w-6 h-6 mx-auto" /><span className="text-xs">공감 챌린지</span>
        </button>
        <button onClick={()=>setTab("archive")} className={tab==="archive" ? "text-red-400" : "text-gray-300"}>
          <Archive className="w-6 h-6 mx-auto" /><span className="text-xs">공간</span>
        </button>
      </div>
    </div>
  );
}
