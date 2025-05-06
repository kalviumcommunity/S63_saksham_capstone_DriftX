import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Advanced Fashion Advisor AI Bot
const FashionAdvisorBot = ({ memory }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I am your Fashion Advisor. Ask me about white fashion, style tips, or color suggestions.' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const quickReplies = [
    'Suggest a white outfit',
    'What color goes with white?',
    'How to style a white blazer?',
    'Best shoes for white dress?'
  ];
  const colorSuggestions = [
    { name: 'Gold', color: '#FFD700' },
    { name: 'Black', color: '#111' },
    { name: 'Ivory', color: '#FFFFF0' },
    { name: 'Silver', color: '#C0C0C0' },
    { name: 'Navy', color: '#001F3F' }
  ];

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (msg) => {
    const text = typeof msg === 'string' ? msg : input;
    if (!text.trim()) return;
    setMessages([...messages, { from: 'user', text }]);
    setInput('');
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { from: 'bot', text: getBotResponse(text) }
      ]);
    }, 700);
  };

  const getBotResponse = (text) => {
    // Simple AI logic for demo
    const lower = text.toLowerCase();
    if (lower.includes('outfit')) return 'Try a white blazer with gold accessories and black trousers for a chic look!';
    if (lower.includes('color')) return 'White pairs beautifully with gold, black, navy, and pastel shades.';
    if (lower.includes('blazer')) return 'Style a white blazer with a silk top and tailored pants. Add gold jewelry for elegance!';
    if (lower.includes('shoes')) return 'For a white dress, gold or nude heels are timeless. Black boots add edge.';
    if (lower.includes('suggest')) return 'How about a monochrome white look with a pop of gold?';
    if (lower.includes('thank')) return "You're welcome! Need more tips?";
    return 'Ask me anything about white fashion, styling, or color matching!';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="w-80 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border-2 border-gold flex flex-col" style={{ borderColor: '#FFD700' }}>
            <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-white via-gold to-black rounded-t-2xl border-b-2 border-gold" style={{ borderColor: '#FFD700' }}>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-gold to-black flex items-center justify-center font-bold text-lg text-white" style={{ background: 'linear-gradient(135deg, #FFD700 60%, #111 100%)' }}>FA</span>
                <span className="font-semibold text-black">Fashion Advisor</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-gold hover:text-black font-bold" style={{ color: '#FFD700' }}>✕</button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2" style={{ maxHeight: 300 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-xl text-sm max-w-[80%] ${msg.from === 'user' ? 'bg-black text-white' : 'bg-gold/10 text-black border border-gold'}`} style={msg.from === 'user' ? {} : { borderColor: '#FFD700', background: 'rgba(255,215,0,0.08)' }}>{msg.text}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="flex flex-wrap gap-2 px-3 pb-2">
              {quickReplies.map(q => (
                <button key={q} onClick={() => handleSend(q)} className="px-3 py-1 rounded-full bg-gold/80 text-black text-xs font-semibold hover:bg-black hover:text-gold transition" style={{ background: '#FFD700' }}>{q}</button>
              ))}
            </div>
            <div className="flex items-center border-t-2 border-gold px-2 py-2 bg-white/80 rounded-b-2xl" style={{ borderColor: '#FFD700' }}>
              <input
                className="flex-1 px-3 py-2 rounded-lg border border-gold focus:outline-none focus:ring-2 focus:ring-gold text-sm bg-white text-black"
                placeholder="Ask me about style..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                style={{ borderColor: '#FFD700' }}
              />
              <button onClick={handleSend} className="ml-2 px-3 py-2 bg-black text-gold rounded-lg hover:bg-gold hover:text-black text-sm font-bold transition" style={{ color: '#FFD700', background: '#111' }}>Send</button>
            </div>
            <div className="flex gap-2 px-4 py-2 border-t border-gold bg-gradient-to-r from-white via-gold/10 to-white">
              {colorSuggestions.map(c => (
                <span key={c.name} className="w-6 h-6 rounded-full border-2 border-gold flex items-center justify-center font-bold text-xs" style={{ background: c.color, borderColor: '#FFD700', color: c.color === '#111' ? '#FFD700' : '#111' }}>{c.name[0]}</span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.button initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={() => setOpen(true)} className="bg-gradient-to-br from-gold to-black text-white rounded-full shadow-lg p-4 flex items-center gap-2 hover:bg-black hover:text-gold border-2 border-gold font-bold" style={{ background: 'linear-gradient(135deg, #FFD700 60%, #111 100%)', borderColor: '#FFD700' }}>
            <span className="w-6 h-6 rounded-full bg-gold flex items-center justify-center font-bold text-black" style={{ background: '#FFD700' }}>FA</span>
            <span className="hidden md:inline">Ask Fashion Advisor</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

// Advanced Interactive Sections (no images)
const colorPalette = [
  { name: 'Gold', color: '#FFD700' },
  { name: 'Black', color: '#111' },
  { name: 'Ivory', color: '#FFFFF0' },
  { name: 'Silver', color: '#C0C0C0' },
  { name: 'Navy', color: '#001F3F' },
  { name: 'Rose', color: '#F6C1C7' },
  { name: 'Emerald', color: '#50C878' },
];

const quizQuestions = [
  {
    q: 'What is your preferred vibe?',
    a: ['Classic', 'Modern', 'Romantic', 'Minimalist']
  },
  {
    q: 'Which accent color do you like with white?',
    a: ['Gold', 'Black', 'Navy', 'Rose']
  },
  {
    q: 'What is your go-to occasion?',
    a: ['Work', 'Party', 'Casual', 'Formal']
  },
];

const videoSections = [
  {
    id: 1,
    title: "PURE ELEGANCE",
    subtitle: "SIGNATURE WHITE",
    overlayColor: "rgba(255, 255, 255, 0.2)",
    video: "/videos/sameer1.mp4",
    buttonText: "DISCOVER NOW",
    link: "/collection/pure-elegance",
    textColor: "text-black",
    buttonStyle: "bg-black text-white hover:bg-gray-800"
  },
  {
    id: 2,
    title: "ETHEREAL GRACE",
    subtitle: "WHITE COLLECTION",
    overlayColor: "rgba(255, 255, 255, 0.2)",
    video: "/videos/sameer2.mp4",
    buttonText: "EXPLORE MORE",
    link: "/collection/ethereal",
    textColor: "text-black",
    buttonStyle: "bg-black text-white hover:bg-gray-800"
  },
  {
    id: 3,
    title: "TIMELESS WHITE",
    subtitle: "PREMIUM SELECTION",
    overlayColor: "rgba(255, 255, 255, 0.2)",
    video: "/videos/sameer.mp4",
    buttonText: "VIEW COLLECTION",
    link: "/collection/timeless-white",
    textColor: "text-black",
    buttonStyle: "bg-black text-white hover:bg-gray-800"
  }
];

// Add trending keywords for Trend Highlights
const trendingKeywords = [
  'Monochrome', 'Gold Accents', 'Minimalist', 'Layered Whites', 'Statement Blazer', 'Ivory', 'Runway', 'Texture Play', 'Seasonal White', 'Luxury', 'Sustainable', 'Tailored', 'Bold Contrast', 'Soft Knit', 'Crisp Cotton'
];

// Add fabric options for Fabric Focus
const fabricOptions = [
  { name: 'Cotton', desc: 'Crisp, breathable, and perfect for summer.', pattern: 'repeating-linear-gradient(135deg, #fff 0 10px, #f3f3f3 10px 20px)' },
  { name: 'Silk', desc: 'Smooth, lustrous, and elegant for evening wear.', pattern: 'linear-gradient(120deg, #fff 60%, #f7e7ce 100%)' },
  { name: 'Linen', desc: 'Lightweight, textured, and effortlessly chic.', pattern: 'repeating-linear-gradient(90deg, #fff 0 8px, #eaeaea 8px 16px)' },
  { name: 'Wool', desc: 'Warm, soft, and ideal for winter whites.', pattern: 'repeating-linear-gradient(45deg, #fff 0 12px, #e0e0e0 12px 24px)' }
];

// Add luxury tips for randomization and saving
const luxuryTips = [
  'Layer a white turtleneck under a blazer for instant sophistication.',
  'Pair white with metallic gold jewelry for a luxe finish.',
  'Mix textures: combine silk, cotton, and wool in one outfit.',
  'Opt for off-white shades for a softer, more modern look.',
  'Add a bold black belt to break up an all-white ensemble.'
];

// Add runway inspiration options
const runwayInspo = [
  'Minimalist white suit with gold buttons',
  'Ivory slip dress with dramatic sleeves',
  'Layered white knits for winter',
  'White tailored trousers with a statement belt',
  'Crisp white shirt dress with structured shoulders'
];

// Add statement pieces
const statementPieces = [
  'White trench coat with gold hardware',
  'Oversized white blazer',
  'White wide-leg pants',
  'Ivory wrap dress',
  'White cropped jacket with black piping'
];

// Add pro tips quiz
const proTipQuiz = [
  {
    q: 'What is the best way to keep your whites bright?',
    a: ['Wash with similar colors', 'Use bleach every time', 'Store in sunlight', 'Mix with darks'],
    correct: 0,
    explanation: 'Always wash whites with similar colors and avoid mixing with darks or using bleach too often.'
  },
  {
    q: 'Which accent color is timeless with white?',
    a: ['Neon Green', 'Gold', 'Purple', 'Orange'],
    correct: 1,
    explanation: 'Gold is a classic, timeless accent for white.'
  }
];

const ElegantWhite = () => {
  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorPalette[0].color);
  const [styleSuggestion, setStyleSuggestion] = useState('');
  const [userInput, setUserInput] = useState('');

  // Add state for all interactive features
  const [trendIndex, setTrendIndex] = useState(0);
  const [trendVotes, setTrendVotes] = useState(Array(trendingKeywords.length).fill(0));
  const [fabric, setFabric] = useState(fabricOptions[0]);
  const [luxTip, setLuxTip] = useState(luxuryTips[0]);
  const [savedTips, setSavedTips] = useState(() => JSON.parse(localStorage.getItem('savedTips') || '[]'));
  const [runwayIdx, setRunwayIdx] = useState(0);
  const [runwayRating, setRunwayRating] = useState([0,0,0,0,0]);
  const [season, setSeason] = useState('Spring');
  const [statement, setStatement] = useState(statementPieces[0]);
  const [proQuizStep, setProQuizStep] = useState(0);
  const [proQuizAnswer, setProQuizAnswer] = useState(null);
  const [proQuizReveal, setProQuizReveal] = useState(false);

  // Add state for personalized style generator and fashion memory
  const [personalStyleInput, setPersonalStyleInput] = useState('');
  const [personalStyleResult, setPersonalStyleResult] = useState('');
  const [fashionMemory, setFashionMemory] = useState({ color: '', tips: [], quiz: [], statement: '', season: '' });

  // Style generator logic
  const handleStyleGenerate = () => {
    if (!userInput.trim()) return;
    setStyleSuggestion(`For "${userInput}", try a white base with ${colorPalette[Math.floor(Math.random()*colorPalette.length)].name.toLowerCase()} accents and gold jewelry for a luxe touch!`);
  };

  // Quiz logic
  const handleQuizAnswer = (answer) => {
    const nextAnswers = [...quizAnswers, answer];
    setQuizAnswers(nextAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setShowResult(true);
    }
  };
  const handleQuizRestart = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setShowResult(false);
  };

  // Trend ticker animation
  useEffect(() => {
    const interval = setInterval(() => setTrendIndex(i => (i + 1) % trendingKeywords.length), 2000);
    return () => clearInterval(interval);
  }, []);

  // Save tip to localStorage
  const saveTip = (tip) => {
    if (!savedTips.includes(tip)) {
      const newTips = [...savedTips, tip];
      setSavedTips(newTips);
      localStorage.setItem('savedTips', JSON.stringify(newTips));
    }
  };

  // Update memory on user actions
  useEffect(() => {
    setFashionMemory(mem => ({ ...mem, color: colorPalette.find(c => c.color === selectedColor)?.name || mem.color }));
  }, [selectedColor]);
  useEffect(() => {
    setFashionMemory(mem => ({ ...mem, tips: savedTips }));
  }, [savedTips]);
  useEffect(() => {
    setFashionMemory(mem => ({ ...mem, quiz: quizAnswers }));
  }, [quizAnswers]);
  useEffect(() => {
    setFashionMemory(mem => ({ ...mem, statement }));
  }, [statement]);
  useEffect(() => {
    setFashionMemory(mem => ({ ...mem, season }));
  }, [season]);

  // Personalized style generator logic
  const handlePersonalStyle = () => {
    if (!personalStyleInput.trim()) return;
    setPersonalStyleResult(`For "${personalStyleInput}", try a white base with ${fashionMemory.color || 'gold'} accents, ${fashionMemory.season ? `styled for ${fashionMemory.season}` : ''}, and a statement piece like: ${fashionMemory.statement || 'white blazer'}.`);
  };

  // Fashion memory summary
  const fashionMemorySummary = () => `Your style memory: Color - ${fashionMemory.color || 'N/A'}, Tips - ${fashionMemory.tips.join(', ') || 'N/A'}, Quiz - ${fashionMemory.quiz.join(', ') || 'N/A'}, Statement - ${fashionMemory.statement || 'N/A'}, Season - ${fashionMemory.season || 'N/A'}`;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-[#FFD700]/10 to-black/90 flex flex-col items-center justify-start pb-32">
      {/* Video Hero Sections */}
      <div className="flex flex-row min-h-screen w-full">
        {videoSections.map((section, index) => (
          <motion.div 
            key={section.id}
            className="relative w-1/3 h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(1.1) contrast(1.05)' }}
            >
              <source src={section.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay */}
            <div className="absolute inset-0" style={{ backgroundColor: section.overlayColor }} />
            {/* Content */}
            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-center items-start pl-12">
              <motion.p 
                className={`text-sm uppercase tracking-widest mb-3 ${section.textColor} font-medium`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              >
                {section.subtitle}
              </motion.p>
              <motion.h2 
                className={`text-4xl font-light mb-6 ${section.textColor} max-w-[280px] leading-tight`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              >
                {section.title}
              </motion.h2>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              >
                <Link
                  to={section.link}
                  className={`inline-block px-6 py-3 text-sm transition-all duration-300 ${section.buttonStyle} hover:scale-105`}
                >
                  {section.buttonText}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Advanced Interactive Sections (color palette, quiz, style generator, AI bot) follow here... */}
      {/* Animated Glassmorphism/Parallax Header */}
      <motion.header initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="w-full py-16 px-4 md:px-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-2xl rounded-b-3xl shadow-xl border-b-4 border-gold" style={{ borderColor: '#FFD700' }}>
        <h1 className="text-5xl md:text-7xl font-extrabold text-black tracking-tight mb-4" style={{ letterSpacing: '-0.04em' }}>Elegant White</h1>
        <p className="text-xl md:text-2xl text-black/80 font-medium mb-2">Discover the power of white fashion with advanced style tools and your personal AI Fashion Advisor.</p>
        <div className="flex gap-3 mt-4">
          {colorPalette.map(c => (
            <button key={c.name} onClick={() => setSelectedColor(c.color)} className="w-10 h-10 rounded-full border-2 border-gold shadow-lg transition-all duration-300" style={{ background: c.color, borderColor: '#FFD700', boxShadow: selectedColor === c.color ? '0 0 0 4px #FFD70055' : '' }} />
          ))}
        </div>
        <span className="mt-2 text-sm text-black/60">Selected color: <span className="font-bold" style={{ color: selectedColor }}>{colorPalette.find(c => c.color === selectedColor)?.name}</span></span>
      </motion.header>

      {/* Animated Style Quiz */}
      <motion.section initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="w-full max-w-xl mt-16 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border-2 border-gold p-8 flex flex-col items-center" style={{ borderColor: '#FFD700' }}>
        <h2 className="text-2xl font-bold mb-4 text-black">Find Your White Style</h2>
        {!showResult ? (
          <>
            <p className="mb-6 text-lg text-black/80 font-medium">{quizQuestions[quizStep].q}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              {quizQuestions[quizStep].a.map(a => (
                <button key={a} onClick={() => handleQuizAnswer(a)} className="px-6 py-2 rounded-full bg-gold/80 text-black font-semibold border-2 border-gold shadow hover:bg-black hover:text-gold transition" style={{ background: '#FFD700', borderColor: '#FFD700' }}>{a}</button>
              ))}
            </div>
            <div className="w-full h-2 bg-gold/20 rounded-full overflow-hidden mb-2">
              <motion.div className="h-2 bg-gold rounded-full" style={{ background: '#FFD700', width: `${((quizStep+1)/quizQuestions.length)*100}%` }} />
            </div>
            <span className="text-xs text-black/50">Step {quizStep+1} of {quizQuestions.length}</span>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-lg text-black/80 font-medium mb-2">Your style: <span className="font-bold text-black">{quizAnswers.join(', ')}</span></p>
            <button onClick={handleQuizRestart} className="mt-2 px-4 py-2 rounded-full bg-black text-gold font-bold border-2 border-gold hover:bg-gold hover:text-black transition" style={{ borderColor: '#FFD700', color: '#FFD700' }}>Restart Quiz</button>
          </div>
        )}
      </motion.section>

      {/* AI-powered Style Generator */}
      <motion.section initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="w-full max-w-xl mt-16 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border-2 border-gold p-8 flex flex-col items-center" style={{ borderColor: '#FFD700' }}>
        <h2 className="text-2xl font-bold mb-4 text-black">AI Style Generator</h2>
        <input
          className="w-full px-4 py-2 rounded-lg border-2 border-gold focus:outline-none focus:ring-2 focus:ring-gold text-lg mb-4 bg-white text-black"
          placeholder="Describe your occasion or mood..."
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          style={{ borderColor: '#FFD700' }}
        />
        <button onClick={handleStyleGenerate} className="px-6 py-2 rounded-full bg-black text-gold font-bold border-2 border-gold hover:bg-gold hover:text-black transition mb-4" style={{ borderColor: '#FFD700', color: '#FFD700' }}>Generate Style</button>
        {styleSuggestion && <div className="mt-2 text-black/90 font-medium text-center bg-gold/10 p-4 rounded-xl border border-gold" style={{ borderColor: '#FFD700' }}>{styleSuggestion}</div>}
      </motion.section>

      {/* Advanced Deep Styling Scroll Sections */}
      <div className="w-full flex flex-col gap-16 py-24 px-4 md:px-16 max-w-6xl mx-auto">
        {/* Trend Highlights */}
        <motion.section className="rounded-3xl shadow-2xl bg-gradient-to-r from-white via-[#FFD700]/30 to-black p-10 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg tracking-tight">Trend Highlights</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-lg font-bold text-gold">Trending:</span>
            <motion.span key={trendIndex} animate={{ x: [40, 0], opacity: [0, 1] }} transition={{ duration: 0.5 }} className="text-xl font-semibold px-4 py-1 rounded-full bg-gold/20 text-black shadow-lg">{trendingKeywords[trendIndex]}</motion.span>
            <button onClick={() => setTrendVotes(v => { const nv = [...v]; nv[trendIndex]++; return nv; })} className="ml-4 px-3 py-1 rounded-full bg-black text-gold font-bold hover:bg-gold hover:text-black transition">Vote</button>
            <span className="ml-2 text-black/60">Votes: {trendVotes[trendIndex]}</span>
          </div>
        </motion.section>

        {/* Fabric Focus */}
        <motion.section className="rounded-3xl shadow-2xl bg-gradient-to-l from-[#FFD700]/10 via-white to-black/10 p-10 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg tracking-tight">Fabric Focus</h2>
          <div className="flex gap-4 mb-4">
            {fabricOptions.map(f => (
              <button key={f.name} onClick={() => setFabric(f)} className={`px-4 py-2 rounded-full border-2 font-bold ${fabric.name === f.name ? 'bg-gold text-black border-gold' : 'bg-white text-black border-black'} transition`}>{f.name}</button>
            ))}
          </div>
          <div className="w-full max-w-md h-24 rounded-xl shadow-inner mb-2" style={{ background: fabric.pattern }} />
          <p className="text-lg text-black/80 font-medium text-center">{fabric.desc}</p>
        </motion.section>

        {/* Luxury Styling Tips */}
        <motion.section className="rounded-3xl shadow-2xl bg-gradient-to-br from-white via-[#FFD700]/20 to-black/20 p-10 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg tracking-tight">Luxury Styling Tips</h2>
          <motion.p key={luxTip} animate={{ opacity: [0, 1] }} transition={{ duration: 0.5 }} className="text-lg md:text-xl text-black/80 font-medium mb-4 text-center max-w-2xl">{luxTip}</motion.p>
          <div className="flex gap-4">
            <button onClick={() => setLuxTip(luxuryTips[Math.floor(Math.random()*luxuryTips.length)])} className="px-4 py-2 rounded-full bg-black text-gold font-bold hover:bg-gold hover:text-black transition">New Tip</button>
            <button onClick={() => saveTip(luxTip)} className="px-4 py-2 rounded-full bg-gold text-black font-bold hover:bg-black hover:text-gold transition">Save Tip</button>
          </div>
          {savedTips.length > 0 && <div className="mt-4 text-black/70 text-sm">Saved: {savedTips.join(' | ')}</div>}
        </motion.section>

        {/* Color Harmony */}
        <motion.section className="rounded-3xl shadow-2xl bg-gradient-to-tr from-[#FFD700]/10 via-white to-black/5 p-10 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg tracking-tight">Color Harmony</h2>
          <div className="flex gap-4 mb-4">
            {colorPalette.map(c => (
              <button key={c.name} onClick={() => setSelectedColor(c.color)} className="w-12 h-12 rounded-full border-4 border-gold shadow-lg transition-all duration-300" style={{ background: c.color, borderColor: '#FFD700', boxShadow: selectedColor === c.color ? '0 0 0 6px #FFD70055' : '' }} />
            ))}
            <span className="ml-4 text-lg font-bold" style={{ color: selectedColor }}>{colorPalette.find(c => c.color === selectedColor)?.name}</span>
          </div>
          {/* Live CSS outfit preview */}
          <div className="w-40 h-40 rounded-2xl flex flex-col items-center justify-center border-4 border-gold shadow-inner" style={{ background: `linear-gradient(135deg, white 60%, ${selectedColor} 100%)`, borderColor: '#FFD700' }}>
            <span className="text-black font-bold">White +</span>
            <span className="text-lg font-bold" style={{ color: selectedColor }}>{colorPalette.find(c => c.color === selectedColor)?.name}</span>
          </div>
        </motion.section>

        {/* Runway Inspiration */}
        <motion.section className="rounded-3xl shadow-2xl bg-gradient-to-r from-white via-[#FFD700]/10 to-black/10 p-10 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg tracking-tight">Runway Inspiration</h2>
          <motion.div key={runwayIdx} animate={{ x: [-200, 0], opacity: [0, 1] }} transition={{ duration: 0.7 }} className="text-xl font-semibold px-6 py-3 rounded-full bg-gold/20 text-black shadow-lg mb-4">{runwayInspo[runwayIdx]}</motion.div>
          <div className="flex gap-2 mb-2">
            {[1,2,3,4,5].map(star => (
              <button key={star} onClick={() => setRunwayRating(r => { const nr = [...r]; nr[runwayIdx] = star; return nr; })} className={`text-2xl ${runwayRating[runwayIdx] >= star ? 'text-gold' : 'text-black/30'}`}>★</button>
            ))}
          </div>
          <div className="flex gap-4">
            <button onClick={() => setRunwayIdx(i => (i + 1) % runwayInspo.length)} className="px-4 py-2 rounded-full bg-black text-gold font-bold hover:bg-gold hover:text-black transition">Next Look</button>
          </div>
        </motion.section>

        {/* Seasonal Style */}
        <motion.section className="rounded-3xl shadow-2xl bg-gradient-to-l from-[#FFD700]/20 via-white to-black/5 p-10 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg tracking-tight">Seasonal Style</h2>
          <div className="flex gap-4 mb-4">
            {['Spring','Summer','Fall','Winter'].map(s => (
              <button key={s} onClick={() => setSeason(s)} className={`px-4 py-2 rounded-full border-2 font-bold ${season === s ? 'bg-gold text-black border-gold' : 'bg-white text-black border-black'} transition`}>{s}</button>
            ))}
          </div>
          <motion.p key={season} animate={{ opacity: [0, 1] }} transition={{ duration: 0.5 }} className="text-lg md:text-xl text-black/80 font-medium text-center max-w-2xl">
            {season === 'Spring' && 'Try a white linen dress with gold sandals for a fresh look.'}
            {season === 'Summer' && 'Opt for a white cotton shirt and shorts, paired with metallic accessories.'}
            {season === 'Fall' && 'Layer a white knit sweater with ivory trousers and a statement belt.'}
            {season === 'Winter' && 'Go for a white wool coat and boots for cozy elegance.'}
          </motion.p>
        </motion.section>

        {/* Statement Pieces */}
        <motion.section className="rounded-3xl shadow-2xl bg-gradient-to-br from-white via-[#FFD700]/10 to-black/10 p-10 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg tracking-tight">Statement Pieces</h2>
          <motion.div key={statement} animate={{ scale: [0.9, 1], opacity: [0, 1] }} transition={{ duration: 0.5 }} className="text-xl font-semibold px-6 py-3 rounded-full bg-gold/20 text-black shadow-lg mb-4">{statement}</motion.div>
          <button onClick={() => setStatement(statementPieces[Math.floor(Math.random()*statementPieces.length)])} className="px-4 py-2 rounded-full bg-black text-gold font-bold hover:bg-gold hover:text-black transition">New Statement</button>
        </motion.section>

        {/* Pro Tips Quiz */}
        <motion.section className="rounded-3xl shadow-2xl bg-gradient-to-tr from-[#FFD700]/10 via-white to-black/10 p-10 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg tracking-tight">Pro Tips</h2>
          <p className="text-lg md:text-xl text-black/80 font-medium mb-4 text-center max-w-2xl">{proTipQuiz[proQuizStep].q}</p>
          <div className="flex gap-4 mb-4">
            {proTipQuiz[proQuizStep].a.map((a, i) => (
              <button key={a} onClick={() => { setProQuizAnswer(i); setProQuizReveal(true); }} className={`px-4 py-2 rounded-full border-2 font-bold ${proQuizAnswer === i && proQuizReveal ? (i === proTipQuiz[proQuizStep].correct ? 'bg-gold text-black border-gold' : 'bg-black text-gold border-gold') : 'bg-white text-black border-black'} transition`}>{a}</button>
            ))}
          </div>
          {proQuizReveal && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-black/80 font-medium text-center mb-2">
              {proQuizAnswer === proTipQuiz[proQuizStep].correct ? 'Correct!' : 'Not quite.'} {proTipQuiz[proQuizStep].explanation}
            </motion.div>
          )}
          <button onClick={() => { setProQuizStep((proQuizStep+1)%proTipQuiz.length); setProQuizAnswer(null); setProQuizReveal(false); }} className="mt-2 px-4 py-2 rounded-full bg-black text-gold font-bold border-2 border-gold hover:bg-gold hover:text-black transition">Next Tip</button>
        </motion.section>

        {/* Personalized Style Generator */}
        <motion.section className="rounded-3xl shadow-2xl bg-gradient-to-br from-white via-[#FFD700]/20 to-black/20 p-10 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg tracking-tight">Personalized Style Generator</h2>
          <input
            className="w-full max-w-md px-4 py-2 rounded-lg border-2 border-gold focus:outline-none focus:ring-2 focus:ring-gold text-lg mb-4 bg-white text-black"
            placeholder="Describe your occasion, mood, or style..."
            value={personalStyleInput}
            onChange={e => setPersonalStyleInput(e.target.value)}
            style={{ borderColor: '#FFD700' }}
          />
          <button onClick={handlePersonalStyle} className="px-6 py-2 rounded-full bg-black text-gold font-bold border-2 border-gold hover:bg-gold hover:text-black transition mb-4" style={{ borderColor: '#FFD700', color: '#FFD700' }}>Generate My Style</button>
          {personalStyleResult && <div className="mt-2 text-black/90 font-medium text-center bg-gold/10 p-4 rounded-xl border border-gold" style={{ borderColor: '#FFD700' }}>{personalStyleResult}</div>}
        </motion.section>

        {/* Fashion Memory */}
        <motion.section className="rounded-3xl shadow-2xl bg-gradient-to-tr from-[#FFD700]/10 via-white to-black/10 p-10 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg tracking-tight">Fashion Memory</h2>
          <div className="text-lg md:text-xl text-black/80 font-medium mb-4 text-center max-w-2xl">{fashionMemorySummary()}</div>
          <button onClick={() => setFashionMemory({ color: '', tips: [], quiz: [], statement: '', season: '' })} className="px-4 py-2 rounded-full bg-black text-gold font-bold border-2 border-gold hover:bg-gold hover:text-black transition">Clear Memory</button>
        </motion.section>
      </div>

      {/* Floating AI Fashion Advisor Bot */}
      <FashionAdvisorBot memory={fashionMemory} />
    </div>
  );
};

export default ElegantWhite; 