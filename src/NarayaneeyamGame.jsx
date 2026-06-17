import { useState, useCallback } from "react";
import { D1, D1B, D2, D2B } from "./data/dasakams.js";
import guruvayurImg from "./guruvayur-krishna.jpg";

// ── DATA ──────────────────────────────────────────────────────────────────────
const ALL = [...D1, ...D1B, ...D2, ...D2B].flatMap(d =>
  (d.qs || []).map((q, qi) => ({ ...d, ...q, qid: `${d.n}-${qi}`, qs: undefined }))
);

// ── DASAKAM 100 — VERSE BY VERSE ─────────────────────────────────────────────
const DASAKAM_100 = [
{v:1,title:"The Divine Radiance",
sk:"अग्रे पश्यामि तेजो निबिडतरकलायावलीलोभनीयं\nपीयूषाप्लावितोऽहं तदनु तदुदरे दिव्यकैशोरवेषं\nतारुण्यारम्भरम्यं परमसुखरसास्वादरोमाञ्चिताङ्गै-\nर्आवीतं नारदाद्यैर्विलसदुपनिषत्सुन्दरीमण्डलैश्च ॥",
en:"Before me I behold a radiance, enchanting with dense clusters of divine splendour. I am drenched in nectar! Within that radiance I see a divine youthful form, beautiful with the first bloom of adolescence, surrounded by Narada and other sages whose limbs thrill with supreme bliss, and by the beautiful assembly of the Upanishads personified."},
{v:2,title:"The Divine Hair & Forehead",
sk:"नीलाभं कुञ्चिताग्रं घनममलतरं सम्यतं चारुभङ्ग्या\nरत्नोत्तंसाभिरामं वलयितमुदयच्चन्द्रकैर्बर्हपुङ्खैः ।\nसीमन्ते मौक्तिकश्रीरपि च तिलकिता भालभूमिर्ललाटे\nकस्तूरीपत्ररेखा तिलकयति भवत् लोचनानन्दलक्ष्मीम् ॥",
en:"The hair is dark blue, curly at the tips, thick and pure, parted beautifully, adorned with gem-studded ornaments, decorated with peacock feathers that gleam like rising moons. Pearls grace the parting line, and on the forehead, a kasturi tilaka in the form of a leaf-design enhances the beauty that delights the eyes."},
{v:3,title:"The Eyes & Smile",
sk:"हृद्यं पूर्णानुकम्पार्णवमृदुलहरीचञ्चलं भ्रूविलासै-\nरानीलस्निग्धपक्ष्मावलिपरिलसितं नेत्रयुग्मं विभो ते ।\nमन्दस्मेरप्रभापूरपरिमृदितसन्तान मौक्तिकश्रीः\nसौन्दर्यैकनिधानं तव वदनमिदं मन्दहासस्य शोभाम् ॥",
en:"O Lord! Your pair of eyes, swimming in an ocean of overflowing compassion, playful with the dancing of eyebrows, adorned with dark, soft eyelashes — and Your face, the sole treasure-house of beauty, with the radiance of a gentle smile that outshines a stream of pearls — I behold this vision."},
{v:4,title:"The Ears, Cheeks & Nose",
sk:"कर्णद्वन्द्वे लसन्मत्तमकरमणिकुण्डलचक्रचक्रे\nगण्डभित्तिस्तवासीदतुलकमनीयद्युतिस्ताम्रशोभा ।\nनासामौक्तिकमुक्ता मणिरचितमहामौक्तिकं ते विराज-\nत्याभिर्मुग्धस्मितश्रीमधुरिमलहरीपूरिते वक्त्रपद्मे ॥",
en:"On both ears shine magnificent makara-shaped gem-studded earrings. Your cheeks glow with an incomparably beautiful coppery radiance. A pearl on Your nose, fashioned from precious gems, gleams upon Your lotus face that overflows with the sweet waves of an enchanting smile."},
{v:5,title:"The Arms & Chest",
sk:"बाहुद्वन्द्वे समुज्ज्वलन्मणिवलय शोभे विचित्राङ्गुलीक-\nव्राजत्कल्पानुकल्पप्रतिनवमणि श्रेणिकापूर्वकल्पे ।\nउत्तुङ्गोरस्थलीं ते मणिमयनवशृङ्गानि माणिक्यजाला-\nन्याकल्पं वैजयन्तीरचितवनमालोपशोभामुदारम् ॥",
en:"Your two arms shine with gem-studded bracelets and wonderful rings whose jewels rival those of the Kalpa tree. Your broad, elevated chest bears gem-crested ornaments, ruby necklaces, the Vaijayanti garland, and the forest-flower garland — all radiating magnificent splendour."},
{v:6,title:"Kaustubha & Yellow Silk",
sk:"कौस्तुभश्रीपरीतां तव हि वपुषि मे दृष्टिरत्यन्तदीप्ता\nश्रीवत्सं चारुभासं तदधिविलसितं कोमलं वन्यमालाम् ।\nमुक्ताहारांश्च हारावलिमणिकटकान् केतकारोचनं च\nन्यस्तं तच्छ्रीविमुग्धं तव तनुविलसत्पीतचेलं दधानम् ॥",
en:"My gaze is intensely drawn to the Kaustubha gem on Your chest, the beautiful Srivatsa mark, the delicate forest garland above it, pearl necklaces, rows of gem-studded ornaments, and ketaka flowers with saffron paste — all upon Your enchanting form draped in shimmering yellow silk."},
{v:7,title:"The Lotus Feet",
sk:"अत्युद्दाम्रैर्मयूखैरुदयमनुभवन्नूपुरश्रीर्विदूरात्\nमञ्जीरं मञ्जुनादं तव पदयुगलं पद्मजातं दधानम् ।\nपादाब्जद्वन्द्वमेतत् प्रणमत सकलं शार्ङ्गचक्रादिसर्व-\nश्रीरूपं श्रीनिवासं तव पदकमलं नौमि नारायणं त्वाम् ॥",
en:"Your anklets blaze with intense reddish rays, Your tinkling toe-rings make sweet music, and Your pair of lotus feet — bearing the marks of the conch, discus, and other auspicious signs — I bow to those lotus feet of Yours. O Narayana, O abode of Lakshmi, I salute You!"},
{v:8,title:"The Fruit of Hearing",
sk:"एवं शृण्वन्ति ये ते चरितमिदमनन्तस्य विष्णोः पठन्ति\nपापैर्मुक्तास्सुपुण्या भवभयरहिता ध्यानसिद्धिं लभन्ते ।\nसर्वस्वं मे शरण्यं तव हि चरणयोर्नित्यभक्तिर्भवेन्नः\nत्वत्कारुण्ये न किञ्चित्कुशलमपि जनान्पालयत्यन्तमन्तः ॥",
en:"Those who hear and recite these exploits of the infinite Vishnu are freed from sins, become greatly meritorious, are released from the fear of worldly existence, and attain perfection in meditation. You are my everything, O refuge! May we have eternal devotion at Your feet. Your compassion protects people from within, needing no other merit."},
{v:9,title:"Praise of the Lord of Guruvāyūr",
sk:"एवं तावद् विधातः स्तुतिभिरभिनुतं वायुगेहे वसन्तं\nमारुत्या सूक्तिपुष्पैर्मुनिजनहृदये दीपयन्तं प्रभावम् ।\nकारुण्येनार्द्रचित्तं पवनपुरपतिं भक्तलोकैकबन्धुं\nश्रेयो वो भूयसेऽस्तु स्तवनमिदमिहापातितं सद्गुरोस्तत् ॥",
en:"Thus praised by hymns, the Lord who dwells in the temple of Vayu, who illumines the hearts of sages with the flowers of the Marut hymns, whose heart is moist with compassion, the Lord of Guruvayur, the sole kinsman of devotees — may this praise, inspired by the grace of the Sadguru, bring you supreme good!"},
{v:10,title:"Prayer for Devotion & Healing",
sk:"भक्तप्रेम्णा समेतो गुरुपवनपुरे साम्प्रतं संवसन् मां\nभक्तानां भक्तिपूर्णं कुरु कुरु कृपया स्वान्तचिन्तातपं मे ।\nरोगान् शोकांश्च हित्वा सकलमपि शुभं देहि मे देव विष्णो\nतुभ्यं सर्वात्मने ते विततमनुदिनं सन्नमामो नमामः ॥",
en:"O Lord, who dwells now in Guruvayur, filled with love for Your devotees — fill me too with devotion! By Your grace, remove the burning anguish of my mind. O Vishnu, taking away all diseases and sorrows, grant me all that is auspicious. To You, the Self of all, I bow again and again, every day!"},
{v:11,title:"Āyur Ārogya Saukhyam",
sk:"आयुरारोग्यसौख्यं प्रदिशतु भगवान् वातगेहालयो नः ।\nइति नारायणीयं संपूर्णम् ॥",
en:"May the Lord who dwells in the temple of Vayu grant us long life, health, and happiness. Thus ends the Narayaneeyam."},
];

// ── STYLES ────────────────────────────────────────────────────────────────────
const G = "#d4a844", DG = "#b8922e", BG = "#0a0a0a";
const PA = "rgba(255,255,255,0.04)", BO = "rgba(180,140,60,0.3)";
const SAFFRON = "#e8943a", LOTUS = "#e06888", TEAL = "#3ab8a8", VIOLET = "#9a8acc", RUBY = "#e05050";
const OPT_COLORS = ["#d4a844","#3ab8a8","#e06888","#9a8acc"];

const s = {
  root:{minHeight:"100vh",background:BG,fontFamily:"Georgia,serif",color:"#e8e0d0",position:"relative"},
  bg:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"radial-gradient(ellipse at 20% 10%, rgba(220,170,60,0.08) 0%, transparent 40%), radial-gradient(ellipse at 80% 90%, rgba(120,80,180,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(40,140,130,0.04) 0%, transparent 60%)",pointerEvents:"none",zIndex:0},
  wrap:{position:"relative",zIndex:1,maxWidth:640,margin:"0 auto",padding:"20px 16px 60px"},
  om:{fontSize:72,lineHeight:1,color:SAFFRON,textShadow:"0 0 40px rgba(212,122,46,0.25)",textAlign:"center"},
  h1:{fontSize:28,fontWeight:"bold",textAlign:"center",color:G,margin:"8px 0 0"},
  sub:{fontSize:15,color:"#a89878",textAlign:"center",margin:"4px 0"},
  byline:{fontSize:12,color:"#8a7a9a",textAlign:"center",fontStyle:"italic",margin:0},
  statsBar:{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",margin:"16px 0"},
  statBox:{borderRadius:10,padding:"8px 14px",textAlign:"center",minWidth:65},
  sv:{fontSize:20,fontWeight:"bold"},
  sl:{fontSize:10,marginTop:2},
  btnP:{background:`linear-gradient(135deg,${SAFFRON},${G})`,color:"#fff",border:"none",borderRadius:12,padding:"13px 28px",fontSize:14,fontWeight:"bold",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 16px rgba(212,122,46,0.25)"},
  btnS:{background:"rgba(255,255,255,0.05)",color:G,border:`1px solid ${BO}`,borderRadius:12,padding:"11px 20px",fontSize:13,cursor:"pointer",fontFamily:"Georgia,serif"},
  row:{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",margin:"4px 0"},
  foot:{fontSize:12,color:"#7a7060",textAlign:"center",marginTop:12},
  back:{background:"transparent",color:G,border:`1px solid ${BO}`,borderRadius:8,padding:"7px 14px",fontSize:12,cursor:"pointer",fontFamily:"Georgia,serif",marginBottom:14},
  ptit:{fontSize:22,color:G,textAlign:"center",margin:"0 0 14px"},
  inp:{width:"100%",background:"#1a1a1a",border:`1px solid ${BO}`,borderRadius:10,padding:"9px 14px",color:"#e8e0d0",fontSize:13,fontFamily:"Georgia,serif",boxSizing:"border-box",marginBottom:10,outline:"none"},
  frow:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10},
  fb:{background:PA,border:`1px solid ${BO}`,borderRadius:16,padding:"5px 12px",fontSize:11,color:"#a89878",cursor:"pointer",fontFamily:"Georgia,serif"},
  fba:{background:G,color:"#fff",borderColor:G,fontWeight:"bold"},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:8},
  card:{background:"#141414",border:`1px solid ${BO}`,borderRadius:10,padding:"10px",cursor:"pointer",textAlign:"left",display:"flex",flexDirection:"column",gap:3,position:"relative",fontFamily:"Georgia,serif",color:"#e8e0d0"},
  cdone:{background:"rgba(42,138,130,0.1)",borderColor:"rgba(42,138,130,0.3)"},
  hdr:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14},
  chip:{background:"rgba(122,106,170,0.1)",border:"1px solid rgba(122,106,170,0.25)",borderRadius:16,padding:"5px 12px",fontSize:12,color:VIOLET},
  banner:{background:"linear-gradient(135deg, rgba(212,122,46,0.1), rgba(122,106,170,0.06))",border:`1px solid ${BO}`,borderRadius:12,padding:"14px 16px",marginBottom:10},
  vbtn:{background:"rgba(42,138,130,0.06)",border:"1px solid rgba(42,138,130,0.2)",borderRadius:8,padding:"7px 14px",fontSize:12,color:TEAL,cursor:"pointer",fontFamily:"Georgia,serif",marginBottom:8},
  vbox:{background:"rgba(42,138,130,0.04)",border:"1px solid rgba(42,138,130,0.15)",borderRadius:10,padding:"14px",marginBottom:12,borderLeft:`4px solid ${TEAL}`},
  qbox:{background:"#141414",border:"1px solid rgba(255,255,255,0.1)",borderRadius:14,padding:"18px",boxShadow:"0 2px 12px rgba(0,0,0,0.3)"},
  qt:{fontSize:15,lineHeight:1.7,color:"#e8e0d0",marginBottom:16,fontWeight:"500"},
  opts:{display:"flex",flexDirection:"column",gap:8},
  opt:{background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px 14px",textAlign:"left",cursor:"pointer",color:"#d0c8b8",fontSize:13,display:"flex",gap:10,alignItems:"center",fontFamily:"Georgia,serif",transition:"all 0.15s"},
  oc:{background:"rgba(42,138,80,0.15)",borderColor:"rgba(42,138,80,0.5)",color:"#4aea80"},
  ow:{background:"rgba(192,64,64,0.15)",borderColor:"rgba(192,64,64,0.4)",color:"#ff6060"},
  ol:{fontSize:11,width:24,height:24,minWidth:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"},
  rbox:{marginTop:16,background:"linear-gradient(135deg, rgba(212,122,46,0.08), rgba(122,106,170,0.06))",border:`1px solid ${BO}`,borderRadius:12,padding:"16px"},
  rh:{fontSize:16,fontWeight:"bold",marginBottom:8},
  exp:{fontSize:13,color:"#c0b8a0",lineHeight:1.7,marginBottom:10},
  ff:{background:"rgba(42,138,130,0.08)",border:"1px solid rgba(42,138,130,0.2)",borderRadius:8,padding:"9px 12px",marginBottom:12},
  hi:{background:"#141414",border:"1px solid rgba(255,255,255,0.08)",borderRadius:9,padding:"10px 14px",display:"flex",flexDirection:"column",gap:3},
  groupBtn:{background:"#141414",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"10px 12px",cursor:"pointer",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center",gap:3,transition:"all 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.3)"},
  groupBtnOpen:{background:"rgba(184,134,11,0.1)",border:`1px solid ${BO}`},
  listCard:{width:"100%",background:"#141414",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:"9px 12px",cursor:"pointer",textAlign:"left",fontFamily:"Georgia,serif",color:"#e8e0d0",transition:"all 0.15s"},
  listCardDone:{background:"rgba(42,138,130,0.08)",borderColor:"rgba(42,138,130,0.2)"},
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function NarayaniyamGame() {
  const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const [screen, setScreen] = useState("title");
  const [sel, setSel] = useState(null);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(() => load("nm_score", 0));
  const [total, setTotal] = useState(() => load("nm_total", 0));
  const [streak, setStreak] = useState(() => load("nm_streak", 0));
  const [done, setDone] = useState(() => new Set(load("nm_done", [])));
  const [hist, setHist] = useState(() => load("nm_hist", []));
  const [filter, setFilter] = useState("all");
  const [selDasakam, setSelDasakam] = useState(null);
  const [selVerse, setSelVerse] = useState(null);
  const [search, setSearch] = useState("");
  const [verse, setVerse] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const EXTRA = {};

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const ranges = ["all","1-10","11-20","21-30","31-40","41-50","51-60","61-70","71-80","81-90","91-100"];

  const filtered = ALL.filter(d => {
    if (filter !== "all") {
      const [lo,hi] = filter.split("-").map(Number);
      if (d.n < lo || d.n > hi) return false;
    }
    if (search && !d.t.toLowerCase().includes(search.toLowerCase()) && !String(d.n).includes(search)) return false;
    return true;
  });

  const [qKey, setQKey] = useState(0);

  function pick(d) {
    const correctText = d.o[d.a];
    const shuffled = [...d.o].sort(() => Math.random() - 0.5);
    setAns(null);
    setVerse(false);
    setSel({ ...d, o: shuffled, a: shuffled.indexOf(correctText) });
    setQKey(k => k + 1);
    setScreen("play");
  }
  function rand() { pick(ALL[Math.floor(Math.random()*ALL.length)]); }
  function next() { const i = ALL.findIndex(x=>x.qid===sel.qid); pick(ALL[(i+1)%ALL.length]); }
  function cont() { pick(sel); }

  function choose(i) {
    if (ans !== null) return;
    setAns(i);
    const ok = i === sel.a;
    const newScore = score + (ok ? 1 : 0);
    const newTotal = total + 1;
    const newStreak = ok ? streak + 1 : 0;
    const newDone = ok ? new Set([...done, sel.qid]) : done;
    const newHist = [{n:sel.n,t:sel.t,qid:sel.qid,ok}, ...hist].slice(0, 100);
    setScore(newScore); setTotal(newTotal); setStreak(newStreak);
    setDone(newDone); setHist(newHist);
    save("nm_score", newScore); save("nm_total", newTotal);
    save("nm_streak", newStreak); save("nm_done", [...newDone]);
    save("nm_hist", newHist);
  }

  const acc = total > 0 ? Math.round(score/total*100) : 0;

  // TITLE
  if (screen === "title") return (
    <div style={s.root}><div style={s.bg}/>
      <div style={{...s.wrap,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",gap:24,paddingTop:0}}>
        <img src={guruvayurImg} alt="Guruvāyūrappan" style={{width:220,borderRadius:14,boxShadow:"0 4px 30px rgba(212,122,46,0.2)",border:`3px solid ${BO}`}} />
        <h1 style={{fontSize:36,fontWeight:"bold",textAlign:"center",color:G,margin:0,lineHeight:1.3}}>Śrīman Nārāyaṇīyam</h1>
        <p style={{fontSize:16,color:"#b8a888",textAlign:"center",margin:0,fontStyle:"italic"}}>The Quintessence of Śrīmad Bhāgavatam</p>
        <div style={{background:"rgba(212,122,46,0.06)",border:`1px solid ${BO}`,borderRadius:12,padding:"16px 20px",maxWidth:480,marginTop:8}}>
          <p style={{fontSize:16,color:"#e8d8b0",lineHeight:2.2,margin:0,textAlign:"center",fontFamily:"serif"}}>
            सान्द्रानन्दावबोधात्मकमनुपमितं कालदेशावधिभ्यां<br/>
            निर्मुक्तं नित्यमुक्तं निगमशतसहस्रेण निर्भास्यमानम् ।<br/>
            अस्पष्टं दृष्टमात्रे पुनरुरुपुरुषार्थात्मकं ब्रह्म तत्त्वं<br/>
            तत्तावद्भाति साक्षाद् गुरुपवनपुरे हन्त भाग्यं जनानाम् ॥
          </p>
        </div>
        <button style={{...s.btnP,marginTop:12,padding:"15px 40px",fontSize:16}} onClick={()=>setScreen("about")}>Continue →</button>
      </div>
    </div>
  );

  // ABOUT THE BOOK (screen 2)
  if (screen === "about") return (
    <div style={s.root}><div style={s.bg}/>
      <div style={{...s.wrap,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",gap:20,paddingTop:0}}>
        <div style={{fontSize:48,lineHeight:1,color:SAFFRON}}>ॐ</div>
        <h2 style={{fontSize:24,fontWeight:"bold",textAlign:"center",color:G,margin:0}}>About the Śrīman Nārāyaṇīyam</h2>
        <div style={{background:"linear-gradient(135deg, rgba(212,122,46,0.1), rgba(122,106,170,0.06), rgba(42,138,130,0.05))",border:`1px solid ${BO}`,borderRadius:14,padding:"20px",maxWidth:480}}>
          <p style={{fontSize:14,color:"#e0d8c8",lineHeight:1.9,margin:"0 0 12px",textAlign:"center"}}>
            Composed in <span style={{color:SAFFRON,fontWeight:"bold"}}>1586 CE</span> by <span style={{color:SAFFRON,fontWeight:"bold"}}>Melapathur Nārāyaṇa Bhaṭṭathiri</span> at the sacred <span style={{color:G,fontWeight:"bold"}}>Guruvāyūr</span> temple in Kerala, the Śrīman Nārāyaṇīyam condenses the 18,000 verses of the Śrīmad Bhāgavatam into <span style={{color:TEAL,fontWeight:"bold"}}>1,036 verses</span> across <span style={{color:TEAL,fontWeight:"bold"}}>100 Daśakams</span>.
          </p>
          <p style={{fontSize:14,color:"#e0d8c8",lineHeight:1.9,margin:"0 0 12px",textAlign:"center"}}>
            Written as a prayer for healing while suffering from severe paralysis, it journeys from the Lord's cosmic nature through all His avatāras to the sweetness of Kṛṣṇa's līlās — a masterpiece of <span style={{color:VIOLET,fontWeight:"bold"}}>bhakti</span>, <span style={{color:LOTUS,fontWeight:"bold"}}>darśana</span>, and <span style={{color:TEAL,fontWeight:"bold"}}>kāvya</span>.
          </p>
          <p style={{fontSize:13,color:"#b8a888",lineHeight:1.8,margin:0,textAlign:"center",fontStyle:"italic"}}>
            Tradition holds that when Bhaṭṭathiri completed the 100th Daśakam, the Lord of Guruvāyūr appeared before him and his disease was cured.
          </p>
        </div>
        <div style={{display:"flex",gap:12}}>
          <button style={s.btnS} onClick={()=>setScreen("title")}>← Back</button>
          <button style={{...s.btnP,padding:"15px 40px",fontSize:16}} onClick={()=>setScreen("home")}>Begin the Quiz →</button>
        </div>
      </div>
    </div>
  );

  // HOME (screen 3 — dasakam groups + stats + controls)
  if (screen === "home") {
    const groupRanges = ranges.filter(r => r !== "all");
    const groupTints = ["#b8860b","#2e8b57","#3a7ec0","#c05070","#7a6a40","#2a8a82","#c87830","#7a6aaa","#8a7a30","#3a8a6a"];
    return (
    <div style={s.root}><div style={s.bg}/>
      <div style={{...s.wrap,display:"flex",flexDirection:"column",alignItems:"center",gap:14,paddingTop:40}}>
        <div style={{position:"absolute",top:16,left:16,right:16,display:"flex",justifyContent:"space-between"}}>
          <button style={{fontSize:11,color:G,background:"transparent",border:`1px solid ${BO}`,borderRadius:8,padding:"5px 12px",cursor:"pointer",fontFamily:"Georgia,serif"}} onClick={()=>setScreen("about")}>← Back</button>
          <button onClick={toggleFullScreen} style={{fontSize:11,color:G,background:"transparent",border:`1px solid ${BO}`,borderRadius:8,padding:"5px 12px",cursor:"pointer",fontFamily:"Georgia,serif"}}>⛶ Full Screen</button>
        </div>
        <div style={s.om}>ॐ</div>
        <h1 style={s.h1}>Śrīman Nārāyaṇīyam</h1>
        <p style={{...s.ptit,fontSize:18,marginBottom:2,marginTop:12}}>Choose a Daśakam Group</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,width:"100%"}}>
          {groupRanges.map((r,ri) => {
            const [lo,hi] = r.split("-").map(Number);
            const group = ALL.filter(d => d.n >= lo && d.n <= hi);
            const doneCount = group.filter(d => done.has(d.qid)).length;
            const tint = groupTints[ri] || G;
            return (
              <button key={r} style={s.groupBtn} onClick={()=>{setFilter(r);setScreen("group")}}>
                <span style={{fontSize:13,fontWeight:"bold",color:tint}}>{r}</span>
                <div style={{width:"100%",height:3,borderRadius:2,background:"rgba(255,255,255,0.1)",overflow:"hidden"}}>
                  <div style={{width:`${doneCount/group.length*100}%`,height:"100%",borderRadius:2,background:tint,opacity:0.5,transition:"width 0.3s"}}/>
                </div>
                <span style={{fontSize:9,color:"#888"}}>{doneCount}/{group.length}</span>
              </button>
            );
          })}
        </div>
        <div style={s.statsBar}>
          {[["Questions",total,SAFFRON,"rgba(212,122,46,0.08)","rgba(212,122,46,0.2)"],["Correct",score,TEAL,"rgba(42,138,130,0.08)","rgba(42,138,130,0.2)"],["Accuracy",acc+"%",VIOLET,"rgba(122,106,170,0.08)","rgba(122,106,170,0.2)"],["Streak",streak,LOTUS,"rgba(192,80,112,0.08)","rgba(192,80,112,0.2)"]].map(([l,v,c,bg,bd])=>(
            <div key={l} style={{...s.statBox,background:bg,border:`1px solid ${bd}`}}><div style={{...s.sv,color:c}}>{v}</div><div style={{...s.sl,color:c,opacity:0.6}}>{l}</div></div>
          ))}
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
          <button style={s.btnS} onClick={rand}>🎲 Random</button>
          {hist.length>0 && <button style={s.btnS} onClick={()=>setScreen("hist")}>View History</button>}
          {total>0 && <button style={{...s.btnS,fontSize:11,color:"#c0a0b0",border:"1px solid rgba(160,100,130,0.3)",padding:"8px 16px"}} onClick={()=>{ if(window.confirm("Reset all scores and history?")){ setScore(0);setTotal(0);setStreak(0);setDone(new Set());setHist([]); ["nm_score","nm_total","nm_streak","nm_done","nm_hist"].forEach(k=>localStorage.removeItem(k)); } }}>Reset Progress</button>}
        </div>
        <p style={s.foot}>Guruvāyūrappan Śaraṇam 🙏</p>
      </div>
    </div>
    );
  }

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
              <span style={{fontSize:13,color:"#f0ece4"}}>{h.t}</span>
              <span style={{fontSize:12,fontWeight:"bold",color:h.ok?G:"#e74c3c"}}>{h.ok?"✓ Correct":"✗ Wrong"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // GROUP — shows 10 dasakams with title and key verse (clickable)
  if (screen === "group" && filter !== "all") {
    const groupRanges = ranges.filter(r => r !== "all");
    const groupTints = ["#b8860b","#2e8b57","#3a7ec0","#c05070","#7a6a40","#2a8a82","#c87830","#7a6aaa","#8a7a30","#3a8a6a"];
    const ri = groupRanges.indexOf(filter);
    const tint = groupTints[ri] || G;
    const [lo,hi] = filter.split("-").map(Number);
    const group = ALL.filter(d => d.n >= lo && d.n <= hi);
    const doneCount = group.filter(d => done.has(d.qid)).length;
    const dasakamNums = [...new Set(group.map(d => d.n))];
    return (
    <div style={s.root}><div style={s.bg}/>
      <div style={{...s.wrap,maxWidth:960}}>
        <button style={s.back} onClick={()=>setScreen("home")}>← Back</button>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <p style={{...s.ptit,fontSize:20,margin:0,color:tint}}>Dasakams {filter}</p>
          <span style={{fontSize:12,color:"#888"}}>{doneCount}/{group.length}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {dasakamNums.map(n => {
            const qs = group.filter(d => d.n === n);
            const d0 = qs[0];
            const qsDone = qs.filter(d => done.has(d.qid)).length;
            const allDone = qsDone === qs.length;
            return (
            <div key={n} style={{background:allDone?"rgba(42,138,130,0.06)":"#141414",border:`1px solid ${allDone?"rgba(42,138,130,0.3)":"rgba(255,255,255,0.08)"}`,borderRadius:12,padding:"12px 14px",borderLeft:`4px solid ${tint}`,cursor:"pointer",boxShadow:"0 1px 6px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column",gap:6}} onClick={()=>{setSelDasakam(n);setScreen("dasakam")}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:16,fontWeight:"bold",color:tint}}>{n}</span>
                <span style={{fontSize:13,color:"#f0ece4",fontWeight:"bold",flex:1}}>{d0.t}</span>
                <span style={{fontSize:10,color:allDone?TEAL:"#666"}}>{allDone?"✓":qsDone+"/"+qs.length}</span>
              </div>
              <p style={{fontSize:14,color:"#b8a888",lineHeight:1.8,margin:0,fontFamily:"serif",fontStyle:"italic"}}>{d0.vs}</p>
              <p style={{fontSize:11,color:"#908878",lineHeight:1.5,margin:0}}>{d0.vt}</p>
            </div>
            );
          })}
        </div>
      </div>
    </div>
    );
  }

  // DASAKAM — shows 3 question cards for the selected dasakam
  if (screen === "dasakam" && selDasakam) {
    const groupRanges = ranges.filter(r => r !== "all");
    const groupTints = ["#b8860b","#2e8b57","#3a7ec0","#c05070","#7a6a40","#2a8a82","#c87830","#7a6aaa","#8a7a30","#3a8a6a"];
    const ri = groupRanges.indexOf(filter);
    const tint = groupTints[ri] || G;
    const qs = ALL.filter(d => d.n === selDasakam);
    const d0 = qs[0];
    if (!d0) return null;
    const qsDone = qs.filter(d => done.has(d.qid)).length;
    return (
    <div style={s.root}><div style={s.bg}/>
      <div style={s.wrap}>
        <button style={s.back} onClick={()=>setScreen("group")}>← Back</button>
        <div style={{background:"linear-gradient(135deg, rgba(212,122,46,0.1), rgba(122,106,170,0.06))",border:`1px solid ${BO}`,borderRadius:12,padding:"16px",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontSize:20,fontWeight:"bold",color:tint}}>{d0.n}</span>
            <span style={{fontSize:16,color:"#f0ece4",fontWeight:"bold",flex:1}}>{d0.t}</span>
            <span style={{fontSize:12,color:qsDone===qs.length?TEAL:"#888"}}>{qsDone}/{qs.length}</span>
          </div>
          <p style={{fontSize:16,color:"#c8b898",lineHeight:1.9,margin:"0 0 10px",fontFamily:"serif",fontStyle:"italic"}}>{d0.vs}</p>
          <p style={{fontSize:13,color:"#a09080",lineHeight:1.7,margin:0}}>{d0.vt}</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {qs.map(d => {
            const qNum = +d.qid.split("-")[1] + 1;
            const isDone = done.has(d.qid);
            return (
            <div key={d.qid} style={{background:isDone?"rgba(42,138,130,0.06)":"#141414",border:`1px solid ${isDone?"rgba(42,138,130,0.3)":"rgba(255,255,255,0.08)"}`,borderRadius:10,padding:"14px 16px",borderLeft:`3px solid ${isDone?TEAL:tint}`,cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}} onClick={()=>pick(d)}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:13,color:tint,fontWeight:"bold",minWidth:24}}>Q{qNum}</span>
                <span style={{fontSize:13,color:"#d0c8b8",flex:1,lineHeight:1.5}}>{d.q}</span>
                {isDone&&<span style={{color:TEAL,fontSize:13}}>✓</span>}
              </div>
            </div>
            );
          })}
        </div>
        {selDasakam===100 && qsDone===qs.length && (
          <button style={{...s.btnP,width:"100%",marginTop:16,padding:"14px",fontSize:15}} onClick={()=>setScreen("d100verses")}>
            ✨ Read all 11 verses of Dasakam 100 with meaning
          </button>
        )}
      </div>
    </div>
    );
  }

  // DASAKAM 100 VERSES — list of 11 clickable cards
  if (screen === "d100verses") {
    return (
    <div style={s.root}><div style={s.bg}/>
      <div style={s.wrap}>
        <button style={s.back} onClick={()=>{setSelDasakam(100);setScreen("dasakam")}}>← Back</button>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:36,color:SAFFRON,marginBottom:8}}>ॐ</div>
          <h2 style={{fontSize:22,color:G,margin:"0 0 4px",fontWeight:"bold"}}>Dasakam 100 — Phala Shruti</h2>
          <p style={{fontSize:13,color:"#a09080",margin:0,fontStyle:"italic"}}>The Vision of Guruvāyūrappan — 11 Verses</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {DASAKAM_100.map(v => (
            <div key={v.v} style={{background:"#141414",border:`1px solid rgba(255,255,255,0.08)`,borderRadius:10,padding:"14px",borderLeft:`4px solid ${SAFFRON}`,cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,0.2)",display:"flex",flexDirection:"column",gap:6}} onClick={()=>{setSelVerse(v.v);setScreen("d100verse")}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:14,fontWeight:"bold",color:SAFFRON,background:"rgba(212,122,46,0.1)",borderRadius:"50%",width:26,height:26,minWidth:26,display:"flex",alignItems:"center",justifyContent:"center"}}>{v.v}</span>
                <span style={{fontSize:13,color:"#f0ece4",fontWeight:"bold"}}>{v.title}</span>
              </div>
              <p style={{fontSize:11,color:"#908878",lineHeight:1.4,margin:0}}>{v.sk.split("\n")[0].slice(0,45)}…</p>
            </div>
          ))}
        </div>
        <p style={{textAlign:"center",color:G,fontSize:14,marginTop:24,fontStyle:"italic"}}>॥ इति नारायणीयं सम्पूर्णम् ॥</p>
        <p style={{textAlign:"center",color:"#7a7060",fontSize:12,marginTop:4}}>Guruvāyūrappan Śaraṇam 🙏</p>
      </div>
    </div>
    );
  }

  // SINGLE VERSE DETAIL — Sanskrit + meaning
  if (screen === "d100verse" && selVerse) {
    const v = DASAKAM_100.find(x => x.v === selVerse);
    if (!v) return null;
    const prevV = selVerse > 1 ? selVerse - 1 : null;
    const nextV = selVerse < 11 ? selVerse + 1 : null;
    return (
    <div style={s.root}><div style={s.bg}/>
      <div style={s.wrap}>
        <button style={s.back} onClick={()=>setScreen("d100verses")}>← Back</button>
        <div style={{textAlign:"center",marginBottom:16}}>
          <span style={{fontSize:12,color:SAFFRON,letterSpacing:2,textTransform:"uppercase"}}>Dasakam 100 — Verse {v.v} of 11</span>
        </div>
        <div style={{background:"#141414",border:`1px solid ${BO}`,borderRadius:14,padding:"20px",borderLeft:`4px solid ${SAFFRON}`,boxShadow:"0 2px 10px rgba(0,0,0,0.3)",marginBottom:16}}>
          <p style={{fontSize:18,color:"#e8d8b0",lineHeight:2.2,margin:0,fontFamily:"serif",whiteSpace:"pre-line",textAlign:"center"}}>{v.sk}</p>
        </div>
        <div style={{background:"linear-gradient(135deg, rgba(212,122,46,0.08), rgba(122,106,170,0.05))",border:`1px solid ${BO}`,borderRadius:12,padding:"18px",marginBottom:16}}>
          <p style={{fontSize:12,color:SAFFRON,fontWeight:"bold",letterSpacing:1,marginBottom:8}}>MEANING</p>
          <p style={{fontSize:14,color:"#d0c8b0",lineHeight:1.9,margin:0}}>{v.en}</p>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center"}}>
          {prevV&&<button style={s.btnS} onClick={()=>setSelVerse(prevV)}>← Verse {prevV}</button>}
          {nextV&&<button style={s.btnP} onClick={()=>setSelVerse(nextV)}>Verse {nextV} →</button>}
          {!nextV&&<button style={s.btnP} onClick={()=>setScreen("d100verses")}>✦ All Verses</button>}
        </div>
      </div>
    </div>
    );
  }

  // PLAY
  if (screen === "play" && sel) return (
    <div style={s.root}><div style={s.bg}/>
      <div style={s.wrap}>
        <div style={s.hdr}>
          <button style={s.back} onClick={()=>selDasakam?setScreen("dasakam"):setScreen("home")}>← Back</button>
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
            <p style={{fontSize:13,color:"#c0b8a0",lineHeight:1.8,margin:0,fontStyle:"italic"}}>{sel.vt}</p>
          </div>
        )}
        <div key={qKey} style={s.qbox}>
          <p style={s.qt}>{sel.q}</p>
          <div style={s.opts}>
            {sel.o.map((opt,i)=>{
              let style = s.opt;
              if (ans!==null) {
                if (i===sel.a) style={...s.opt,...s.oc};
                else if (i===ans) style={...s.opt,...s.ow};
                else style={...s.opt,opacity:0.4};
              }
              const optColor = OPT_COLORS[i];
              return (
                <button key={i} style={style} onClick={()=>choose(i)}>
                  <span style={{...s.ol,background:`${optColor}20`,color:optColor}}>{["A","B","C","D"][i]}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {ans!==null&&(
            <div style={s.rbox}>
              <div style={{...s.rh,color:ans===sel.a?TEAL:SAFFRON}}>{ans===sel.a?"✨ Excellent!":"📖 Learn & Grow"}</div>
              <p style={s.exp}>{sel.exp}</p>
              {sel.vs&&<div style={{background:"linear-gradient(135deg, rgba(212,122,46,0.1), rgba(122,106,170,0.06))",border:"1px solid rgba(212,122,46,0.15)",borderLeft:`4px solid ${SAFFRON}`,borderRadius:8,padding:"12px 14px",marginBottom:10}}>
                <div style={{fontSize:10,color:SAFFRON,letterSpacing:1,marginBottom:8}}>✦ Key Verse {sel.kv}</div>
                <p style={{fontSize:16,color:"#e0d0b0",lineHeight:2,margin:"0 0 8px",fontFamily:"serif"}}>{sel.vs}</p>
                <p style={{fontSize:11,color:"#b0a888",lineHeight:1.6,margin:0,fontStyle:"italic"}}>{sel.vt}</p>
              </div>}
              <div style={s.ff}>
                <span style={{color:TEAL,fontSize:12,fontWeight:"bold"}}>💡 Insight: </span>
                <span style={{color:"#c0b8a0",fontSize:12}}>{sel.fact}</span>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button style={s.btnP} onClick={cont}>↺ Try Again</button>
                <button style={s.btnP} onClick={next}>Next →</button>
                <button style={s.btnS} onClick={rand}>🎲</button>
                <button style={s.btnS} onClick={()=>setScreen("home")}>≡</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return null;
}
