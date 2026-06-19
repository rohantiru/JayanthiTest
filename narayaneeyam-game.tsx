import { useState } from "react";

// ── DATA ────────────────────────────────────────────────────────────��[...]
const D1 = [
{n:1,t:"Swaroopa Mahathvam",kv:"1.8",vt:"namrāṇāṃ sannidhatte — You always appear before those who bow to You, granting even unasked boons. You are the Parijata tree available to all, oh Ha[...]
{n:2,t:"Swarupa Madhurya",kv:"2.1",vt:"sāndrānanda — The form of the Lord shines with concentrated bliss: dark as a rain-cloud, eyes like lotus petals, the Kaustubha gem blazing on His chest.",[...]
{n:3,t:"Bhakta Swarupa",kv:"3.10",vt:"āyurarōgyaṃ — Grant me health and long life, O Lord of Guruvayur, so I may sing Your glories. Drive away the disease that torments this body.",q:"Bhattat[...]
{n:4,t:"Yoga Abhyasa",kv:"4.1",vt:"kalyatāṃ mama — O bestower of auspiciousness, grant me health so I may master the eight-limbed yoga and quickly attain Your grace.",q:"How many limbs does As[...]
{n:5,t:"Virat Purusha Utpatti",kv:"5.7",vt:"tvayi vibhāti — In You the entire universe shines like a city reflected in a mirror. You are the witness, the substratum on which all creation dances.[...]
{n:6,t:"Virat Swarupa Varnana",kv:"6.1",vt:"pādau yasya — Whose feet are the earth, whose navel is the sky, whose eyes are the sun and moon — that Virat Purusha is You, O Lord of Guruvayur.",[...]
{n:7,t:"Srishti Krama",kv:"7.5",vt:"ambhasi śayānaṃ — Reclining on the causal waters, the great serpent Ananta as Your bed, the lotus sprouting from Your navel — in this form You hold all [...]
{n:8,t:"Pralaya and Birth of Brahma",kv:"8.3",vt:"padmabhavaḥ — When Brahma dove into the lotus stalk seeking the origin and could not find it, You appeared before him and commanded him to cre[...]
{n:9,t:"Nava Yogendra Upadesha",kv:"9.4",vt:"śravaṇaṃ kīrtanaṃ — Hearing, chanting, remembering, serving the feet, worshipping, saluting, being a servant, being a friend, and self-surren[...]
{n:10,t:"Bhagavan Mahima",kv:"10.8",vt:"tvaṃ śaraṇam — You alone are my refuge, O Guruvayurappa. Even Brahma and Shiva bow before You. Remove all my afflictions and grant me the vision of Y[...]
{n:11,t:"Varaha Avatara",kv:"11.5",vt:"kṣoṇīṃ niṣkramya — Lifting the earth on Your tusk, dripping with the cosmic waters, You emerged like the sun rising from the ocean, O Varaha.",q:"[...]
{n:12,t:"Kapila Avatara",kv:"12.6",vt:"bhakti-yogena — By the yoga of devotion, O Kapila, You taught Your mother the means of liberation. She crossed the ocean of birth and death through Your gr[...]
{n:13,t:"Narada Avatara and Daksha",kv:"13.3",vt:"haryaśvāḥ — When the Haryashvas were about to create progeny, Narada taught them the truth of the Self. They never returned — attaining li[...]
{n:14,t:"Nara-Narayana Avatara",kv:"14.4",vt:"ūrūdbhavāṃ — When Indra sent celestial dancers to disturb the penance, You manifested from Your own thigh a beauty surpassing all apsaras — t[...]
{n:15,t:"Rishabha and Bharata",kv:"15.5",vt:"jaDabharataḥ — Though born as a brahmin, Jadabharata acted as if ignorant. Carried as a palanquin-bearer, he taught King Rahugana the supreme truth[...]
{n:16,t:"Dhruva Charitra",kv:"16.5",vt:"om namo bhagavate — Narada taught Dhruva the twelve-syllable mantra and the form of Vishnu to meditate upon. The young boy performed tapas so intense that[...]
{n:17,t:"Prithu Avatara",kv:"17.6",vt:"dharā dohena — When Prithu threatened to pierce the earth-cow, she yielded and was milked of all crops, herbs, and prosperity that sustain all living bein[...]

const D2 = [
{n:51,t:"Rasa Leela Prelude",kv:"51.6",vt:"veṇu nāda — The flute sang in the autumn moonlight, the Gopis forgot everything. They ran through the dark forest toward that sound. Even the t[...]
{n:52,t:"Rasa Leela",kv:"52.8",vt:"rāsa maṇḍala — In that moonlit circle, You stood between each Gopi as if there were only one pair. Each Gopi felt You were hers alone. The celestials rain[...]
{n:53,t:"Gopi Gita",kv:"53.5",vt:"gopi gīta — O Krishna, we do not ask for heaven or liberation. We ask only that the lotus feet we have placed in our hearts never be removed. This is the Gopi [...]
{n:54,t:"Rukmini Haran",kv:"54.4",vt:"rukmiṇī haraṇa — Rukmini's letter reached You in Dwaraka: I am Yours from birth. If You do not come, I will give up my life. And You came — alone, in[...]
{n:55,t:"Syamantaka Mani",kv:"55.6",vt:"jāmbavatī — After 28 days of battle in the dark cave, Jambavan recognized You as Rama, his beloved Lord. He surrendered with tears, offered his daughter[...]
{n:56,t:"Narakasura Vadha",kv:"56.7",vt:"naraka vadha — From Narakasura's citadel You freed 16,000 women — accepting them all as queens, giving each her dignity, each her palace, and Your pres[...]
{n:57,t:"Marriages and Dwaraka",kv:"57.5",vt:"dvarakā — Narada visited each of the 16,108 palaces. In each one he found You fully present. He fell at Your feet and wept: In all my wander[...]
{n:58,t:"Shishupaala Vadha",kv:"58.6",vt:"śiśupāla vadha — You bore a hundred insults patiently. On the 101st, the Sudarshana flew. In death, Shishupaala's soul rose as a radiant light and mer[...]
{n:59,t:"Draupadi Vastraharan",kv:"59.6",vt:"draupadi rakṣaṇa — When Draupadi raised both hands to You in total surrender, abandoning the grip on her sari — in that moment of complete surr[...]
{n:60,t:"Kuchela (Sudama) Charitra",kv:"60.7",vt:"kucela dāna — Sudama came with a handful of beaten rice — too ashamed to offer it. But You snatched it and ate it with relish, declaring each[...]
{n:61,t:"Kurukshetra — Bhagavad Gita Context",kv:"61.4",vt:"sārathi — You who hold the universe chose to hold the reins of a chariot. Arjuna's charioteer — not the general, not the king, bu[...]
{n:62,t:"Bhagavad Gita — Karma Yoga",kv:"62.6",vt:"karmaṇyevādhikāras te — You have a right to action alone, never to its fruits. Do not let the fruit be your motive, nor let there be any [...]
{n:63,t:"Bhagavad Gita — Vishwarupa",kv:"63.7",vt:"viśvarūpa — At Arjuna's prayer You revealed the Vishvarūpa — a million suns blazing at once. Arjuna trembled and begged: Show me again th[...]
{n:64,t:"Bhagavad Gita — Surrender",kv:"64.8",vt:"sarva dharmān — Abandon all paths and surrender unto Me alone. I shall liberate you from all sins — do not grieve. This final promise of th[...]
{n:65,t:"Ashwatthama and Parikshit",kv:"65.5",vt:"parikṣit rakṣā — I composed this summary of the Bhagavata at Your feet, O Guruvayurappa. My body is broken, my nerves fail. But my mind sees only[...]
{n:66,t:"Parikshit and Shuka Muni",kv:"67.4",vt:"kim ekaṃ — King Parikshit asked: What is the one thing a man facing death should do? Shuka answered without hesitation: Hear the glories of Vis[...]

const ALL = [...D1, ...D2];

// ── STYLES ───────────────────────────────────────────────────────────�[...]
const G = "#e8b86d", DG = "#c49a3c", BG = "#0d0a06";
const PA = "rgba(255,255,255,0.05)", BO = "rgba(232,184,109,0.25)";

const s = {
  root:{minHeight:"100vh",background:BG,fontFamily:"Georgia,serif",color:"#f0e6d0",position:"relative"},
  bg:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"radial-gradient(ellipse at 20% 10%, rgba(180,120,30,0.12) 0%, transparent 60%)",pointerEvents:"none",zIndex:0},
  wrap:{position:"relative",zIndex:1,maxWidth:640,margin:"0 auto",padding:"20px 16px 60px"},
  om:{fontSize:72,lineHeight:1,color:G,textShadow:"0 0 40px rgba(232,184,109,0.6)",textAlign:"center"},
  h1:{fontSize:28,fontWeight:"bold",textAlign:"center",color:"#FFFFFF",margin:"8px 0 0"},
  sub:{fontSize:15,color:"#c8b89a",textAlign:"center",margin:"4px 0"},
  byline:{fontSize:12,color:"#6a5a4a",textAlign:"center",fontStyle:"italic",margin:0},
  statsBar:{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",margin:"16px 0"},
  statBox:{background:PA,border:`1px solid ${BO}`,borderRadius:10,padding:"8px 14px",textAlign:"center",minWidth:65},
  sv:{fontSize:20,fontWeight:"bold",color:G},
  sl:{fontSize:10,color:"#7a6a5a",marginTop:2},
  btnP:{background:`linear-gradient(135deg,${G},${DG})`,color:"#1a0f00",border:"none",borderRadius:10,padding:"13px 28px",fontSize:14,fontWeight:"bold",cursor:"pointer",fontFamily:"Georgia,serif"[...]
  btnS:{background:"transparent",color:G,border:`1px solid ${BO}`,borderRadius:10,padding:"11px 20px",fontSize:13,cursor:"pointer",fontFamily:"Georgia,serif"},
  row:{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",margin:"4px 0"},
  foot:{fontSize:12,color:"#4a3a2a",textAlign:"center",marginTop:12},
  back:{background:"transparent",color:G,border:`1px solid ${BO}`,borderRadius:8,padding:"7px 14px",fontSize:12,cursor:"pointer",fontFamily:"Georgia,serif",marginBottom:14},
  ptit:{fontSize:22,color:G,textAlign:"center",margin:"0 0 14px"},
  inp:{width:"100%",background:PA,border:`1px solid ${BO}`,borderRadius:10,padding:"9px 14px",color:"#f0e6d0",fontSize:13,fontFamily:"Georgia,serif",boxSizing:"border-box",marginBottom:10,outline[...]
  frow:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10},
  fb:{background:PA,border:`1px solid ${BO}`,borderRadius:16,padding:"5px 12px",fontSize:11,color:"#b8a88a",cursor:"pointer",fontFamily:"Georgia[...]
  fba:{background:G,color:"#1a0f00",borderColor:G,fontWeight:"bold"},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:8},
  card:{background:PA,border:`1px solid ${BO}`,borderRadius:10,padding:"10px",cursor:"pointer",textAlign:"left",display:"flex",flexDirection:"column",gap:3,position:"relative",fontFamily:"Georgia[...]
  cdone:{background:"rgba(232,184,109,0.1)",borderColor:"rgba(232,184,109,0.5)"},
  hdr:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14},
  chip:{background:PA,border:`1px solid ${BO}`,borderRadius:16,padding:"5px 12px",fontSize:12,color:G},
  banner:{background:"rgba(232,184,109,0.1)",border:`1px solid ${BO}`,borderRadius:10,padding:"12px 16px",marginBottom:10},
  vbtn:{background:"transparent",border:`1px solid ${BO}`,borderRadius:8,padding:"7px 14px",fontSize:12,color:"#b8a88a",cursor:"pointer",fontFamily:"Georgia,serif",marginBottom:8},
  vbox:{background:"rgba(100,70,20,0.2)",border:`1px solid ${BO}`,borderRadius:10,padding:"14px",marginBottom:12,borderLeft:`4px solid ${G}`},
  qbox:{background:PA,border:`1px solid ${BO}`,borderRadius:14,padding:"18px"},
  qt:{fontSize:15,lineHeight:1.7,color:"#f0e6d0",marginBottom:16,fontWeight:"500"},
  opts:{display:"flex",flexDirection:"column",gap:8},
  opt:{background:"rgba(255,255,255,0.04)",border:`1px solid ${BO}`,borderRadius:9,padding:"11px 14px",textAlign:"left",cursor:"pointer",color:"#d8c8b0",fontSize:13,display:"flex",gap:10,alignIte[...]
  oc:{background:"rgba(80,160,80,0.25)",borderColor:"#6ab06a",color:"#b0f0b0"},
  ow:{background:"rgba(180,50,50,0.25)",borderColor:"#c06060",color:"#f0b0b0"},
  ol:{fontSize:11,width:22,height:22,minWidth:22,borderRadius:"50%",background:"rgba(232,184,109,0.15)",color:G,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"},
  rbox:{marginTop:16,background:"rgba(232,184,109,0.07)",border:`1px solid ${BO}`,borderRadius:10,padding:"16px"},
  rh:{fontSize:16,color:G,fontWeight:"bold",marginBottom:8},
  exp:{fontSize:13,color:"#d0c0a0",lineHeight:1.7,marginBottom:10},
  ff:{background:"rgba(100,70,20,0.2)",borderRadius:7,padding:"9px 12px",marginBottom:12},
  hi:{background:PA,borderRadius:9,padding:"10px 14px",display:"flex",flexDirection:"column",gap:3},
};

// ── COMPONENT ──────────────────────────────────────────────────────────�[...]
export default function App() {
  const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const [screen, setScreen] = useState("home");
  const [sel, setSel] = useState(null);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(() => load("nm_score", 0));
  const [total, setTotal] = useState(() => load("nm_total", 0));
  const [streak, setStreak] = useState(() => load("nm_streak", 0));
  const [done, setDone] = useState(() => new Set(load("nm_done", [])));
  const [hist, setHist] = useState(() => load("nm_hist", []));
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [verse, setVerse] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const EXTRA = {};


  const ranges = ["all","1-10","11-20","21-30","31-40","41-50","51-60","61-70","71-80","81-90","91-100"];

  const filtered = ALL.filter(d => {
    if (filter !== "all") {
      const [lo,hi] = filter.split("-").map(Number);
      if (d.n < lo || d.n > hi) return false;
    }
    if (search && !d.t.toLowerCase().includes(search.toLowerCase()) && !String(d.n).includes(search)) return false;
    return true;
  });

  function pick(d) {
    const correctText = d.o[d.a];
    const shuffled = [...d.o].sort(() => Math.random() - 0.5);
    setSel({ ...d, o: shuffled, a: shuffled.indexOf(correctText) });
    setAns(null); setVerse(false); setScreen("play");
  }
  function rand() { pick(ALL[Math.floor(Math.random()*ALL.length)]); }
  function next() { const i = ALL.findIndex(x=>x.n===sel.n); pick(ALL[(i+1)%ALL.length]); }
  function cont() { pick(sel); }  // same dasakam, new shuffle

  function choose(i) {
    if (ans !== null) return;
    setAns(i);
    const ok = i === sel.a;
    const newScore = score + (ok ? 1 : 0);
    const newTotal = total + 1;
    const newStreak = ok ? streak + 1 : 0;
    const newDone = ok ? new Set([...done, sel.n]) : done;
    const newHist = [{n:sel.n,t:sel.t,ok}, ...hist].slice(0, 100);
    setScore(newScore); setTotal(newTotal); setStreak(newStreak);
    setDone(newDone); setHist(newHist);
    save("nm_score", newScore); save("nm_total", newTotal);
    save("nm_streak", newStreak); save("nm_done", [...newDone]);
    save("nm_hist", newHist);
  }

  const acc = total > 0 ? Math.round(score/total*100) : 0;

  // HOME
  if (screen === "home") return (
    <div style={s.root}><div style={s.bg}/>
      <div style={{...s.wrap,display:"flex",flexDirection:"column",alignItems:"center",gap:12,paddingTop:40}}>
        <p style={{position:"absolute",top:16,right:16,fontSize:10,color:"#6a5a4a",fontFamily:"Georgia,serif"}}>↗ Open in new tab for full screen</p>
        <div style={s.om}>ॐ</div>
        <h1 style={s.h1}>Śrīman Nārāyaṇīyam</h1>
        <p style={s.sub}>Quiz — All 100 Dasakams</p>
        <p style={s.byline}>Explore the 100 Dasakams of Bhattathiri</p>
        <div style={s.statsBar}>
          {[["Questions",total],["Correct",score],["Accuracy",acc+"%"],["🔥 Streak",streak]].map(([l,v])=>(
            <div key={l} style={s.statBox}><div style={s.sv}>{v}</div><div style={s.sl}>{l}</div></div>
          ))}
        </div>
        <div style={s.row}>
          <button style={s.btnP} onClick={()=>setScreen("select")}>Begin Journey</button>
          <button style={s.btnS} onClick={rand}>🎲 Random</button>
        </div>
        {hist.length>0 && <button style={s.btnS} onClick={()=>setScreen("hist")}>View History</button>}
        {total>0 && <button style={{...s.btnS,fontSize:11,color:"#8a6a4a",border:"1px solid rgba(180,120,60,0.2)",padding:"8px 16px"}} onClick={()=>{ if(window.confirm("Reset all scores and histo[...] ) { setScore(0); setTotal(0); setStreak(0); setDone(new Set()); setHist([]); save("nm_score",0); save("nm_total",0); save("nm_streak",0); save("nm_done",[]); save("nm_hist",[]); } }}>Reset</button>}
        <p style={s.foot}>Guruvayurappan Sharanam 🙏</p>
      </div>
    </div>
  );

  // HISTORY
  if (screen === "hist") return (
    <div style={s.root}><div style={s.bg}/>
      <div style={s.wrap}>
        <button style={s.back} onClick={()=>setScreen("home")}>← Back</button>
        <p style={s.ptit}>Session History</p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {hist.map((h,i)=>(
            <div key={i} style={{...s.hi,borderLeft:`4px solid ${h.ok?G:"#c0392b"}`}}>
              <span style={{fontSize:10,color:G}}>Dasakam {h.n}</span>
              <span style={{fontSize:13,color:"#d8c8b0"}}>{h.t}</span>
              <span style={{fontSize:12,fontWeight:"bold",color:h.ok?G:"#e74c3c"}}>{h.ok?"✓ Correct":"✗ Wrong"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // SELECT
  if (screen === "select") return (
    <div style={s.root}><div style={s.bg}/>
      <div style={s.wrap}>
        <button style={s.back} onClick={()=>setScreen("home")}>← Home</button>
        <p style={s.ptit}>Choose a Dasakam</p>
        <input style={s.inp} placeholder="Search by name or number..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <div style={s.frow}>
          {ranges.map(r=>(
            <button key={r} style={{...s.fb,...(filter===r?s.fba:{})}} onClick={()=>setFilter(r)}>
              {r==="all"?"All":r}
            </button>
          ))}
        </div>
        <div style={s.grid}>
          {filtered.map(d=>(
            <button key={d.n} style={{...s.card,...(done.has(d.n)?s.cdone:{})}} onClick={()=>pick(d)}>
              <span style={{fontSize:20,fontWeight:"bold",color:G}}>{d.n}</span>
              <span style={{fontSize:10,color:"#b8a88a",lineHeight:1.3}}>{d.t}</span>
              {done.has(d.n)&&<span style={{position:"absolute",top:7,right:9,color:G,fontSize:12}}>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // PLAY
  if (screen === "play" && sel) return (
    <div style={s.root}><div style={s.bg}/>
      <div style={s.wrap}>
        <div style={s.hdr}>
          <button style={s.back} onClick={()=>setScreen("select")}>← Dasakams</button>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={s.chip}>🔥 {streak} | ✓ {score}/{total}</div>

          </div>
        </div>
        <div style={s.banner}>
          <div style={{fontSize:10,color:DG,letterSpacing:2,textTransform:"uppercase"}}>Dasakam {sel.n}</div>
          <div style={{fontSize:17,color:G,fontWeight:"bold"}}>{sel.t}</div>
        </div>
        <button style={s.vbtn} onClick={()=>setVerse(v=>!v)}>
          {verse?"Hide":"✨ Show"} Key Verse ({sel.kv})
        </button>
        {verse&&(
          <div style={s.vbox}>
            <div style={{fontSize:10,color:G,letterSpacing:1,marginBottom:7}}>✦ Key Verse {sel.kv}</div>
            <p style={{fontSize:13,color:"#d8c8b0",lineHeight:1.8,margin:0,fontStyle:"italic"}}>{sel.vt}</p>
          </div>
        )}
        <div style={s.qbox}>
          <p style={s.qt}>{sel.q}</p>
          <div style={s.opts}>
            {sel.o.map((opt,i)=>{
              let style = s.opt;
              if (ans!==null) {
                if (i===sel.a) style={...s.opt,...s.oc};
                else if (i===ans) style={...s.opt,...s.ow};
                else style={...s.opt,opacity:0.4};
              }
              return (
                <button key={i} style={style} onClick={()=>choose(i)}>
                  <span style={s.ol}>{["A","B","C","D"][i]}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {ans!==null&&(
            <div style={s.rbox}>
              <div style={s.rh}>{ans===sel.a?"✨ Excellent!":"📖 Learn & Grow"}</div>
              <p style={s.exp}>{sel.exp}</p>
              {sel.vs&&<div style={{background:"rgba(80,50,10,0.3)",border:`1px solid ${BO}`,borderLeft:`4px solid ${G}`,borderRadius:8,padding:"12px 14px",marginBottom:10}}>
                <div style={{fontSize:10,color:G,letterSpacing:1,marginBottom:8}}>✦ Key Verse {sel.kv}</div>
                <p style={{fontSize:16,color:"#f5e8b0",lineHeight:2,margin:"0 0 8px",fontFamily:"serif"}}>{sel.vs}</p>
                <p style={{fontSize:11,color:"#a09080",lineHeight:1.6,margin:0,fontStyle:"italic"}}>{sel.vt}</p>
              </div>}
              <div style={s.ff}>
                <span style={{color:G,fontSize:12,fontWeight:"bold"}}>💡 Insight: </span>
                <span style={{color:"#b8a88a",fontSize:12}}>{sel.fact}</span>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button style={s.btnP} onClick={cont}>↺ Try Again</button>
                <button style={s.btnP} onClick={next}>Next →</button>
                <button style={s.btnS} onClick={rand}>🎲</button>
                <button style={s.btnS} onClick={()=>setScreen("select")}>≡</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return null;
}
