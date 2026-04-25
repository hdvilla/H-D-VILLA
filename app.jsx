const { useState, useEffect, useRef } = React;

// --- Lucide icon helper -------------------------------------------------
const Icon = ({ name, className = "", strokeWidth = 1.4, size = 20 }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const svg = window.lucide.createElement(window.lucide.icons[name] || window.lucide.icons.Circle);
      svg.setAttribute("stroke-width", strokeWidth);
      svg.setAttribute("width", size);
      svg.setAttribute("height", size);
      ref.current.appendChild(svg);
    }
  }, [name, strokeWidth, size]);
  return <span ref={ref} className={`inline-flex ${className}`} />;
};

// --- Real villa images --------------------------------------------------
const IMG = {
  heroDay:        "images/exterior-day-front.jpg",
  heroDay2:       "images/exterior-day-angle.jpg",
  heroDayStreet:  "images/exterior-street.jpg",
  heroNight:      "images/exterior-night-hero.jpg",
  heroNightSt:    "images/exterior-night-street.jpg",
  poolDay:        "images/pool-day.jpg",
  poolNight:      "images/pool-night.jpg",
  patioDay:       "images/patio-day.jpg",
  billiard:       "images/billiard-dining.jpg",
  diningBilliard: "images/dining-billiard.jpg",
  kitchen:        "images/kitchen.jpg",
  kitchen2:       "images/kitchen-2.jpg",
  living:         "images/living-room.jpg",
  living2:        "images/living-room-2.jpg",
  bathroom:       "images/bathroom.jpg",
  cornerChair:    "images/corner-chair.jpg",
  roomBlue:       "images/room-blue.jpg",
  roomSmall:      "images/room-small.jpg",
  roomKids:       "images/room-kids.jpg",
  roomTwin:       "images/room-twin.jpg",
  roomMusic:      "images/room-music.jpg",
  roomWood:       "images/room-wood.jpg",
};

// ================= NAV =================
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#gioi-thieu", label: "Giới thiệu" },
    { href: "#noi-bat",    label: "Nổi bật" },
    { href: "#phong",      label: "Phòng" },
    { href: "#vi-tri",     label: "Vị trí" },
    { href: "#lien-he",    label: "Liên hệ" },
  ];
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
      ${scrolled ? "bg-ivory-50/90 backdrop-blur-md border-b hairline" : "bg-gradient-to-b from-ivory-50/40 to-transparent"}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-3">
          <span className="font-display italic text-[28px] text-ink-900 leading-none">H&amp;D</span>
          <span className="font-display italic text-[22px] text-ink-900 leading-none tracking-wide">VILLA</span>
        </a>
        <ul className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-[11px] tracking-widest-x uppercase text-ink-800 hover:text-terracotta-500 transition">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#lien-he"
          className="px-5 py-2.5 btn-terra rounded-full text-[11px] tracking-widest-x uppercase transition">
          Đặt phòng
        </a>
      </div>
    </nav>
  );
}

// ================= HERO =================
function Hero() {
  const heroImgs = [
    "images/hero-01.jpg",
    "images/hero-02.jpg",
    "images/hero-03.jpg",
    "images/hero-04.jpg",
    "images/hero-05.jpg",
    "images/hero-06.jpg",
    "images/hero-07.jpg",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v+1) % heroImgs.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="top" className="relative min-h-screen bg-ivory-50 overflow-hidden pt-20 pb-36 md:pb-44">
      <div className="grid lg:grid-cols-[1fr_1.25fr] min-h-[calc(100vh-5rem)]">
        {/* LEFT pane — editorial copy */}
        <div className="relative flex flex-col justify-between px-6 md:px-10 lg:px-14 py-10">
          <div className="flex items-center gap-3 text-[10px] tracking-widest-x uppercase text-ink-500 reveal">
            Villa nghỉ dưỡng · Vũng Tàu
          </div>

          <div className="max-w-xl">
            <h1 className="font-display text-[64px] md:text-[92px] leading-[0.92] text-ink-800/90 reveal" style={{animationDelay:"120ms"}}>
              H&amp;D VILLA
              <span className="block">VŨNG TÀU</span>
            </h1>
            <p className="mt-7 text-ink-800/80 text-[15.5px] leading-[1.8] max-w-md reveal" style={{animationDelay:"220ms"}}>
              Không gian nghỉ dưỡng riêng tư, nơi buổi sáng bắt đầu bằng ánh nắng tràn qua cửa kính,
              và buổi tối kết thúc bên hồ bơi lấp lánh ánh đèn. Chỉ 150 mét là tới biển.
            </p>

            <div className="mt-10 flex items-center gap-4 reveal" style={{animationDelay:"320ms"}}>
              <a href="#lien-he" className="btn-terra px-7 py-3.5 rounded-full text-[11px] tracking-widest-x uppercase flex items-center gap-2">
                Kiểm tra phòng trống
                <Icon name="ArrowRight" size={14} strokeWidth={2}/>
              </a>
              <a href="#phong" className="text-[11px] tracking-widest-x uppercase text-ink-800 border-b hairline-strong pb-1 hover:text-terracotta-500">
                Xem các phòng
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-md reveal" style={{animationDelay:"420ms"}}>
              {[
                { k: "15", u: "khách tiêu chuẩn" },
                { k: "06", u: "phòng ngủ riêng" },
                { k: "150m", u: "tới bãi biển" },
              ].map(f => (
                <div key={f.u} className="border-t hairline pt-3">
                  <div className="font-display text-3xl text-ink-900">{f.k}</div>
                  <div className="text-[10px] tracking-widest-x uppercase text-ink-500 mt-1">{f.u}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end text-[10px] tracking-widest-x uppercase text-ink-500">
          </div>
        </div>

        {/* RIGHT pane — hero image slideshow */}
        <div className="relative min-h-[70vh] lg:min-h-[calc(100vh-5rem)] overflow-hidden border-l hairline">
          {heroImgs.map((src, idx) => (
            <img key={idx} src={src} alt="H&D Villa"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms]"
              style={{opacity: idx === i ? 1 : 0}}/>
          ))}
          <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/20 via-transparent to-transparent pointer-events-none"/>

          {/* Corner tag */}
          <div className="absolute top-6 left-6 px-4 py-2 bg-ivory-50/90 backdrop-blur rounded-full border hairline flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 live-dot"/>
            <span className="text-[11px] tracking-widest-x uppercase text-ink-800">Villa số 10</span>
          </div>

          {/* progress dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
            {heroImgs.map((_, idx) => (
              <button key={idx} onClick={()=>setI(idx)}
                className={`h-0.5 transition-all ${idx === i ? "w-10 bg-ivory-50" : "w-4 bg-ivory-50/40"}`}/>
            ))}
          </div>
        </div>
      </div>

      <BookingWidget />
    </section>
  );
}

// BookingWidget is defined in booking.jsx and loaded globally

// ================= SECTION EYEBROW =================
function Eyebrow({ num, label, center }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] tracking-widest-x uppercase text-ink-500 ${center ? "justify-center":""}`}>
      <span className="font-mono text-terracotta-500">{num}</span>
      <span className="h-px w-10 bg-ink-900/20"/>
      {label}
    </div>
  );
}

// ================= INTRO =================
function Intro() {
  return (
    <section id="gioi-thieu" className="relative py-32 md:py-44 px-6 md:px-12 mt-24 md:mt-32">
      <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[1fr_1.05fr] gap-16 lg:gap-24 items-center">
        <div>
          <Eyebrow num="01" label="Chào mừng đến H&D"/>
          <h2 className="font-display text-[56px] md:text-[84px] leading-[0.95] text-ink-900 mt-6">
            Nơi cả gia đình<br/>
            <span className="italic">cùng dừng lại</span>
          </h2>
          <div className="mt-8 space-y-5 text-ink-800/85 text-[15.5px] leading-[1.85] max-w-xl">
            <p>
              H&amp;D Villa Vũng Tàu là không gian nghỉ dưỡng riêng tư được thiết kế cho những nhóm bạn đông người,
              gia đình nhiều thế hệ và các chuyến đi công ty. Villa nằm trên con đường yên tĩnh, chỉ cách bãi biển
              150 mét, ba phút tản bộ là có thể nghe tiếng sóng.
            </p>
            <p>
              Bốn tầng, sáu phòng ngủ, một hồ bơi ngoài trời, phòng karaoke và sân BBQ, tất cả được đặt trong
              một kiến trúc kính trong trắng, mở ra khu sân vườn với cây xanh và hoa giấy rực rỡ.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 max-w-lg">
            {[
              { n: "15-30", u: "Sức chứa tối đa" },
              { n: "06",    u: "Phòng ngủ riêng" },
              { n: "08+1",  u: "Giường đôi & đơn" },
              { n: "3-4",   u: "Ô tô trong garage" },
            ].map(s => (
              <div key={s.u} className="border-t hairline pt-4">
                <div className="font-display text-4xl text-ink-900">{s.n}</div>
                <div className="text-[10px] tracking-widest-x uppercase text-ink-500 mt-2">{s.u}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border hairline bg-ink-900">
            <img
              src="images/pool.gif"
              alt="Hồ bơi H&D Villa"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-transparent pointer-events-none"/>

            <div className="absolute top-5 left-5 px-3 py-1 rounded-full border hairline bg-ivory-50/95 backdrop-blur text-[10px] tracking-widest-x uppercase text-ink-800">
              Hồ bơi
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-ivory-50 gap-4">
              <div>
                <div className="text-[10px] tracking-widest-x uppercase opacity-80">Khoảnh khắc</div>
                <div className="font-display text-2xl mt-1">Hồ bơi riêng · ngoài trời</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================= DAY NIGHT STORY (removed per request) =================
function DayNight() { return null; }

// ================= HIGHLIGHTS =================
function Highlights() {
  const items = [
    { img: IMG.poolNight,  t: "Hồ bơi thông minh",    d: "Hệ thống âm thanh và ánh sáng đổi màu theo nhịp. Hồ bơi biến thành sân khấu ngoài trời khi đêm xuống.", tag: "Signature" },
    { img: IMG.living,     t: "Dàn âm thanh phòng khách", d: "Dàn âm thanh chuyên nghiệp đặt ngay phòng khách, bật nhạc và hát hò cùng cả nhóm trong không gian rộng rãi.", tag: "Entertainment" },
    { img: IMG.patioDay,   t: "Sân BBQ sân vườn",     d: "Không gian nướng ngoài trời với đầy đủ dụng cụ, bàn ăn lớn và góc ngồi thư giãn bên hồ bơi.", tag: "Outdoor" },
    { img: IMG.kitchen2,   t: "Bàn bi-a & giải trí",  d: "Khu bi-a tiêu chuẩn ngay trong phòng sinh hoạt chung, kết hợp bàn ăn lớn cho cả nhóm.", tag: "Game Room" },
  ];
  return (
    <section id="noi-bat" className="relative py-32 md:py-44 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <Eyebrow num="03" label="Điểm nổi bật"/>
            <h2 className="font-display text-[56px] md:text-[84px] leading-[0.95] text-ink-900 mt-6">
              Bốn khoảnh khắc<br/>
              <span className="italic">đáng nhớ</span>
            </h2>
          </div>
          <p className="text-ink-800/70 text-[15px] leading-relaxed max-w-md">
            Không chỉ là nơi để nghỉ, villa được thiết kế với bốn không gian đặc trưng giúp mỗi buổi tối
            đều trở thành một trải nghiệm mới.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((it, i) => (
            <article key={it.t} className="group relative rounded-2xl overflow-hidden border hairline bg-ivory-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={it.img} alt={it.t} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"/>
                <div className="absolute top-5 left-5 px-3 py-1 rounded-full border hairline-strong bg-ivory-50/95 backdrop-blur text-[10px] tracking-widest-x uppercase text-ink-800">
                  {it.tag}
                </div>
                <div className="absolute top-5 right-5 font-mono text-xs text-ivory-50 bg-ink-900/60 backdrop-blur px-2 py-1 rounded">
                  0{i+1}
                </div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-display text-3xl md:text-4xl text-ink-900">{it.t}</h3>
                <p className="mt-3 text-ink-800/75 text-[14.5px] leading-[1.75]">{it.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= GALLERY (SERVICES-style with big outlined type) =================
function Gallery() {
  const imgs = [
    {src: IMG.living,       label: "Phòng khách chính",  cat: "Nội thất"},
    {src: IMG.kitchen2,     label: "Khu bi-a · ăn uống", cat: "Giải trí"},
    {src: IMG.patioDay,     label: "Sân vườn ngoài trời",cat: "Ngoại thất"},
    {src: IMG.poolDay,      label: "Hồ bơi ban ngày",    cat: "Hồ bơi"},
    {src: IMG.kitchen,      label: "Bếp mở",             cat: "Nội thất"},
    {src: IMG.bathroom,     label: "Phòng tắm",          cat: "Nội thất"},
    {src: IMG.poolNight,    label: "Hồ bơi ban đêm",     cat: "Hồ bơi"},
    {src: IMG.living2,      label: "Sảnh & cầu thang",   cat: "Nội thất"},
    {src: IMG.cornerChair,  label: "Góc thư giãn",       cat: "Chi tiết"},
    {src: IMG.roomBlue,     label: "Master Suite",       cat: "Phòng ngủ"},
    {src: IMG.roomWood,     label: "Wooden Room",        cat: "Phòng ngủ"},
    {src: IMG.roomMusic,    label: "Burgundy Room",      cat: "Phòng ngủ"},
    {src: IMG.roomKids,     label: "Green Room",         cat: "Phòng ngủ"},
    {src: IMG.roomTwin,     label: "Twin Room",          cat: "Phòng ngủ"},
    {src: IMG.roomSmall,    label: "Cosy Room",          cat: "Phòng ngủ"},
  ];
  const [active, setActive] = useState(0);
  return (
    <section id="thu-vien" className="relative py-32 md:py-44 bg-ivory-100 border-y hairline px-6 md:px-12 paper">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <Eyebrow num="04" label="Thư viện hình ảnh"/>
        </div>

        {/* Big outlined word banner with overlapping images, inspired by reference */}
        <div className="relative mb-10 md:mb-14">
          <div className="font-display text-[90px] md:text-[180px] leading-[0.85] select-none text-center text-ink-900">
            Gallery
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.7fr_1fr] gap-6">
          <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border hairline bg-ink-900">
            <img src={imgs[active].src} alt={imgs[active].label}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"/>
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-900/80 to-transparent"/>
            <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-ivory-50">
              <div>
                <div className="text-[10px] tracking-widest-x uppercase opacity-75">{imgs[active].cat}</div>
                <div className="font-display text-3xl">{imgs[active].label}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>setActive((active-1+imgs.length)%imgs.length)}
                  className="w-10 h-10 rounded-full border hairline-light bg-ink-900/40 hover:bg-ink-900/70 flex items-center justify-center"><Icon name="ArrowLeft" size={14}/></button>
                <button onClick={()=>setActive((active+1)%imgs.length)}
                  className="w-10 h-10 rounded-full border hairline-light bg-ink-900/40 hover:bg-ink-900/70 flex items-center justify-center"><Icon name="ArrowRight" size={14}/></button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
            {imgs.map((x, i) => (
              <button key={i} onClick={()=>setActive(i)}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition
                  ${active===i ? "hairline-strong ring-2 ring-terracotta-500/60" : "hairline hover:border-ink-900/40"}`}>
                <img src={x.src} className="absolute inset-0 w-full h-full object-cover" alt=""/>
                {active !== i && <div className="absolute inset-0 bg-ivory-50/20"/>}
                <div className="absolute top-1.5 left-1.5 font-mono text-[9px] text-ivory-50 bg-ink-900/60 px-1.5 py-0.5 rounded">0{i+1}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ================= ROOMS =================
function Rooms() {
  const rooms = [
    { img: IMG.roomWood,  n: "Wooden Room",    b: "2 giường Queen",            f: "Tầng 3" },
    { img: IMG.roomBlue,  n: "Master Suite",   b: "1 giường King + sofa",      f: "Tầng 2" },
    { img: IMG.roomKids,  n: "Green Room",     b: "2 giường đôi",              f: "Tầng 2" },
    { img: IMG.roomMusic, n: "Burgundy Room",  b: "1 giường King",              f: "Tầng 2" },
    { img: IMG.roomTwin,  n: "Twin Room",      b: "1 giường đôi + 1 giường đơn", f: "Tầng 3" },
    { img: IMG.roomSmall, n: "Cosy Room",      b: "1 giường đôi",              f: "Tầng hầm" },
  ];
  return (
    <section id="phong" className="relative py-32 md:py-44 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <Eyebrow num="05" label="Các phòng nghỉ"/>
            <h2 className="font-display text-[56px] md:text-[84px] leading-[0.95] text-ink-900 mt-6">
              Sáu phòng ngủ,<br/>
              <span className="italic">mỗi phòng một tính cách</span>
            </h2>
          </div>
          <p className="text-ink-800/70 text-[14.5px] max-w-sm">
            Tổng cộng 8 giường đôi, 1 giường đơn và 4 nệm phụ, thoải mái cho nhóm 15 khách,
            mở rộng tới 25–30 người cho các dịp đặc biệt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((r, i) => (
            <article key={r.n} className="group rounded-2xl overflow-hidden border hairline bg-ivory-50 hover:-translate-y-1 transition-transform duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={r.img} alt={r.n} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"/>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-ivory-50/95 backdrop-blur border hairline text-[10px] tracking-widest-x uppercase text-ink-800">
                  {r.f}
                </div>
                <div className="absolute top-4 right-4 font-mono text-xs text-ivory-50 bg-ink-900/60 px-2 py-1 rounded">0{i+1}</div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-ink-900">{r.n}</h3>
                <div className="mt-3 flex items-center gap-2 text-[13px] text-ink-800/75">
                  <Icon name="BedDouble" size={14}/> {r.b}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= AMENITIES =================
function Amenities() {
  const groups = [
    { t: "Tiện ích chính", items: [
      { i: "Waves",      x: "Hồ bơi thông minh có âm thanh & ánh sáng" },
      { i: "Mic2",       x: "Phòng karaoke" },
      { i: "Flame",      x: "Sân BBQ ngoài trời, đầy đủ dụng cụ" },
      { i: "Gamepad2",   x: "Bàn bi-a tiêu chuẩn" },
      { i: "ArrowUpDown",x: "Thang máy nội bộ, di chuyển thuận tiện" },
      { i: "Car",        x: "Garage rộng rãi cho 3–4 ô tô" },
    ]},
    { t: "Trong phòng", items: [
      { i: "Wifi",         x: "Wi-Fi tốc độ cao phủ toàn villa" },
      { i: "Tv",           x: "Smart TV trong mỗi phòng ngủ" },
      { i: "Snowflake",    x: "Điều hòa 2 chiều, nóng lạnh" },
      { i: "Refrigerator", x: "Tủ lạnh, minibar, bình đun siêu tốc" },
      { i: "Shirt",        x: "Dịch vụ giặt ủi theo yêu cầu" },
    ]},
    { t: "Dịch vụ thêm", items: [
      { i: "ShieldCheck",x: "Camera an ninh 24/7, bảo vệ khu phố" },
      { i: "UtensilsCrossed", x: "Bếp mở đầy đủ dụng cụ nấu ăn" },
    ]},
  ];
  return (
    <section className="relative py-32 md:py-44 bg-ivory-100 border-y hairline px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16">
          <Eyebrow num="06" label="Tiện nghi đầy đủ"/>
          <h2 className="font-display text-[56px] md:text-[84px] leading-[0.95] text-ink-900 mt-6 max-w-3xl">
            Mọi thứ bạn cần,<br/>
            <span className="italic">và hơn thế nữa</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          {groups.map((g, gi) => (
            <div key={g.t}>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-terracotta-500">0{gi+1}</span>
                <div className="h-px flex-1 bg-ink-900/15"/>
                <span className="text-[11px] tracking-widest-x uppercase text-ink-500">{g.t}</span>
              </div>
              <ul className="space-y-5">
                {g.items.map(it => (
                  <li key={it.x} className="flex items-start gap-4 group">
                    <span className="mt-0.5 w-9 h-9 rounded-lg border hairline flex items-center justify-center text-ink-800 group-hover:text-terracotta-500 group-hover:border-terracotta-500/50 transition">
                      <Icon name={it.i} size={16}/>
                    </span>
                    <span className="text-[14.5px] text-ink-900 leading-relaxed pt-1.5">{it.x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= LOCATION =================
function Location() {
  const places = [
    { n: "Bãi biển Thùy Vân",   d: "150 m",  t: "3 phút đi bộ", i: "Waves" },
    { n: "Đường hoa giấy",      d: "400 m",  t: "6 phút đi bộ", i: "Flower" },
    { n: "Bãi Sau (Back Beach)",d: "800 m",  t: "3 phút ô tô",  i: "Sun" },
    { n: "Chợ đêm Vũng Tàu",    d: "1.2 km", t: "5 phút ô tô",  i: "Store" },
    { n: "Tượng Chúa Kitô Vua", d: "3.5 km", t: "10 phút ô tô", i: "Mountain" },
    { n: "Hải đăng Vũng Tàu",   d: "4.0 km", t: "12 phút ô tô", i: "LampDesk" },
  ];
  return (
    <section id="vi-tri" className="relative py-32 md:py-44 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-20 items-start">
        <div>
          <Eyebrow num="07" label="Vị trí villa"/>
          <h2 className="font-display text-[56px] md:text-[84px] leading-[0.95] text-ink-900 mt-6">
            Ngay trung tâm,<br/>
            <span className="italic">sát bên biển</span>
          </h2>
          <p className="mt-6 text-ink-800/80 text-[15px] leading-relaxed max-w-lg">
            Villa tọa lạc trên đường yên tĩnh, cách bãi biển chỉ 150 mét và gần đường hoa giấy nổi tiếng của Vũng Tàu,
            nơi chỉ vài phút tản bộ là đã có thể đón bình minh bên bờ cát.
          </p>
          <div className="mt-8 rounded-2xl border hairline bg-ivory-100 p-6">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-lg border hairline flex items-center justify-center text-terracotta-500">
                <Icon name="MapPin" size={18}/>
              </span>
              <div>
                <div className="text-[10px] tracking-widest-x uppercase text-ink-500">Địa chỉ</div>
                <div className="font-display text-2xl text-ink-900 mt-1">Số 10 Nguyễn Hữu Tiến</div>
                <div className="text-ink-800/80 text-sm mt-1">P. Tam Thắng, TP.HCM</div>
              </div>
            </div>
          </div>
          <ul className="mt-8 space-y-1">
            {places.map(p => (
              <li key={p.n} className="flex items-center justify-between gap-6 py-3 border-b hairline">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-md border hairline flex items-center justify-center text-ink-700">
                    <Icon name={p.i} size={14}/>
                  </span>
                  <span className="text-ink-900 text-[14.5px]">{p.n}</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] tracking-widest-x uppercase text-ink-500">
                  <span className="font-mono text-terracotta-500">{p.d}</span>
                  <span className="hidden sm:inline">{p.t}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[780px] rounded-2xl overflow-hidden border hairline bg-ivory-100">
          <iframe
            title="Bản đồ H&D Villa Vũng Tàu"
            src="https://www.google.com/maps?q=9432%2BV7+Tam+Thang,+Ho+Chi+Minh,+Vietnam&output=embed"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href="https://www.google.com/maps/search/?api=1&query=9432%2BV7+Tam+Thang+Ho+Chi+Minh"
            target="_blank" rel="noopener noreferrer"
            className="absolute bottom-5 right-5 px-4 py-2.5 rounded-full bg-ivory-50/95 backdrop-blur border hairline-strong text-[11px] tracking-widest-x uppercase text-ink-900 flex items-center gap-2 hover:bg-ivory-50 shadow-lg">
            Mở trên Google Maps <Icon name="ArrowUpRight" size={12}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ================= REVIEWS =================
function Reviews() {
  const reviews = [
    { n:"Lương Mỹ Nga",   r:"Phòng rộng rãi · Tiện nghi và chu đáo", t:"Chủ nhà hoạt bát, vui vẻ. Hồ bơi sạch, gần biển, book được giá tốt, mọi thứ đều OK. Phòng rộng rãi, tiện nghi và chu đáo, rất đáng để quay lại." },
    { n:"Hoàng Oanh",     r:"Phòng rộng rãi",                        t:"Vừa trải nghiệm chuyến du lịch Vũng Tàu về. Book homestay ở đây, cô chủ vui vẻ, dễ thương, nhiệt tình. Tiện nghi hiện đại, phòng thiết kế sang trọng. View thích hợp để chụp ảnh, bao đẹp. Chắc chắn sẽ quay lại." },
    { n:"Linh Nguyễn",    r:"Tiện nghi · Không gian rộng · Dịch vụ tốt", t:"Cả gia đình mình rất hài lòng. Tiện nghi và chu đáo, không gian rộng, dịch vụ phòng tốt, một lựa chọn tuyệt vời cho nhóm đông và những dịp sum họp gia đình." },
    { n:"Thảo Nguyễn",    r:"Biệt thự đẹp · Sang trọng",             t:"Biệt thự đẹp, sang trọng, phục vụ nhiệt tình. Mình rất thích. Từ không gian đến cách chủ nhà chăm sóc khách đều rất chỉn chu." },
  ];
  const [idx, setIdx] = useState(0);
  const r = reviews[idx];
  return (
    <section className="relative py-32 md:py-44 bg-ivory-100 border-y hairline px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <Eyebrow num="08" label="Khách hàng nói gì"/>
            <h2 className="font-display text-[56px] md:text-[84px] leading-[0.95] text-ink-900 mt-6 max-w-2xl">
              Những kỷ niệm<br/><span className="italic">được gửi lại</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>setIdx((idx-1+reviews.length)%reviews.length)}
              className="w-12 h-12 rounded-full border hairline-strong hover:bg-ivory-50 flex items-center justify-center">
              <Icon name="ArrowLeft" size={16}/>
            </button>
            <button onClick={()=>setIdx((idx+1)%reviews.length)}
              className="w-12 h-12 rounded-full border hairline-strong hover:bg-ivory-50 flex items-center justify-center">
              <Icon name="ArrowRight" size={16}/>
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl border hairline bg-ivory-50 p-10 md:p-14">
          <Icon name="Quote" size={36} className="text-terracotta-500 mb-6"/>
          <p className="font-display text-3xl md:text-[40px] leading-[1.25] text-ink-900 max-w-4xl">
            {r.t}
          </p>
          <div className="mt-10 flex items-center justify-between flex-wrap gap-6">
            <div>
              <div className="font-display text-2xl text-ink-900">{r.n}</div>
              <div className="text-[11px] tracking-widest-x uppercase text-ink-500 mt-1">{r.r}</div>
            </div>
            <div className="flex items-center gap-1 text-terracotta-500">
              {Array.from({length:5}).map((_,i)=><Icon key={i} name="Star" size={14} strokeWidth={2}/>)}
            </div>
          </div>
          <div className="absolute top-6 right-8 font-mono text-xs text-ink-500">
            {String(idx+1).padStart(2,"0")} / {String(reviews.length).padStart(2,"0")}
          </div>
        </div>

        <div className="mt-16 overflow-hidden border-y hairline py-6">
          <div className="marquee-track flex gap-12 whitespace-nowrap text-ink-800/70">
            {Array.from({length:2}).map((_,k)=>(
              <div key={k} className="flex gap-12 items-center">
                {["4.9/5 · 120+ đánh giá","Check-in nhanh","Vệ sinh sạch sẽ","Gần biển 150m","Nhóm 15–30 khách","Karaoke & BBQ","Hồ bơi thông minh"].map((s,i)=>(
                  <span key={i} className="flex items-center gap-6 font-display text-2xl">
                    {s} <span className="w-1 h-1 rounded-full bg-terracotta-500 inline-block"/>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ================= FAQ =================
function FAQ() {
  const faqs = [
    { q: "Giờ nhận và trả phòng?", a: "Nhận phòng từ 14:00 và trả phòng trước 12:00 ngày kế tiếp. Nếu bạn cần nhận sớm hoặc trả trễ, vui lòng báo trước để villa sắp xếp tùy theo lịch đặt." },
    { q: "Villa có chỗ đậu ô tô không?", a: "Villa có garage rộng rãi đậu được 3–4 ô tô. Ngoài ra xung quanh đường cũng có thêm chỗ đậu miễn phí." },
    { q: "Chính sách đặt cọc và hủy phòng?", a: "Đặt cọc 50% sau khi xác nhận. Hủy miễn phí trước 7 ngày. Trong vòng 7 ngày hủy sẽ mất tiền cọc. Lễ Tết có chính sách riêng." },
    { q: "Villa có gần các tiện ích khác không?", a: "Chỉ 3 phút đi bộ ra biển, 5 phút ô tô tới chợ đêm Vũng Tàu, và gần nhiều quán ăn, cafe địa phương chất lượng." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="relative py-32 md:py-44 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <Eyebrow num="09" label="Câu hỏi thường gặp" center/>
          <h2 className="font-display text-[56px] md:text-[84px] leading-[0.95] text-ink-900 mt-6">
            Một vài điều<br/><span className="italic">bạn có thể muốn biết</span>
          </h2>
        </div>
        <div className="divide-y hairline border-y hairline">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button onClick={()=>setOpen(open===i?-1:i)} className="w-full py-7 flex items-center justify-between gap-8 text-left group">
                <div className="flex items-start gap-6">
                  <span className="font-mono text-xs text-terracotta-500 pt-2">0{i+1}</span>
                  <span className="font-display text-2xl md:text-3xl text-ink-900">{f.q}</span>
                </div>
                <span className={`w-10 h-10 shrink-0 rounded-full border hairline-strong flex items-center justify-center transition-transform ${open===i?"rotate-45 bg-ink-900 text-ivory-50":""}`}>
                  <Icon name="Plus" size={16} strokeWidth={2}/>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${open===i?"max-h-96 pb-7":"max-h-0"}`}>
                <p className="pl-12 pr-16 text-ink-800/80 text-[15px] leading-[1.8] max-w-3xl">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= CONTACT =================
function Contact() {
  return (
    <section id="lien-he" className="relative py-32 md:py-44 bg-ink-900 text-ivory-50 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          <div className="flex items-center gap-3 text-[11px] tracking-widest-x uppercase text-ivory-100/70">
            <span className="font-mono text-terracotta-400">10</span>
            <span className="h-px w-10 bg-ivory-100/30"/>
            Đặt phòng & Liên hệ
          </div>
          <h2 className="font-display text-[56px] md:text-[84px] leading-[0.95] mt-6">
            Sẵn sàng cho<br/><span className="italic">kỳ nghỉ của bạn?</span>
          </h2>
          <p className="mt-6 text-ivory-100/75 text-[15px] leading-relaxed max-w-md">
            Liên hệ trực tiếp với chủ villa để được tư vấn nhanh,
            kiểm tra lịch trống và nhận ưu đãi riêng cho nhóm đông.
          </p>

          <div className="mt-10 space-y-5">
            <a href="tel:0983850015" className="flex items-center gap-5 p-5 rounded-xl border hairline-light hover:bg-ivory-50/5 transition group">
              <span className="w-12 h-12 rounded-lg bg-sky-500 text-ivory-50 flex items-center justify-center">
                <Icon name="Phone" size={18} strokeWidth={2}/>
              </span>
              <div className="flex-1">
                <div className="text-[10px] tracking-widest-x uppercase text-ivory-100/60">Gọi ngay</div>
                <div className="font-display text-3xl mt-0.5">0983 850 015</div>
              </div>
              <Icon name="ArrowUpRight" className="text-ivory-100/60 group-hover:text-terracotta-400" size={18}/>
            </a>
            <a href="https://m.me/289561758597542" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-5 rounded-xl border hairline-light hover:bg-ivory-50/5 transition group">
              <span className="w-12 h-12 rounded-lg border hairline-light flex items-center justify-center">
                <Icon name="MessageCircle" size={18} strokeWidth={2}/>
              </span>
              <div className="flex-1">
                <div className="text-[10px] tracking-widest-x uppercase text-ivory-100/60">Nhắn tin Messenger</div>
                <div className="font-display text-2xl mt-0.5">Phản hồi trong 15 phút</div>
              </div>
              <Icon name="ArrowUpRight" className="text-ivory-100/60 group-hover:text-terracotta-400" size={18}/>
            </a>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border hairline-light">
                <div className="text-[10px] tracking-widest-x uppercase text-ivory-100/60">Nhận phòng</div>
                <div className="font-display text-3xl mt-1">14:00</div>
              </div>
              <div className="p-5 rounded-xl border hairline-light">
                <div className="text-[10px] tracking-widest-x uppercase text-ivory-100/60">Trả phòng</div>
                <div className="font-display text-3xl mt-1">12:00</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={e=>{
            e.preventDefault();
            const f = e.currentTarget;
            const name  = f.elements.name.value;
            const phone = f.elements.phone.value;
            const checkin  = f.elements.checkin.value;
            const checkout = f.elements.checkout.value;
            const guests   = f.elements.guests.value;
            const note     = f.elements.note.value;
            const body =
`Xin chào H&D Villa,
Tôi muốn đặt phòng.
Họ tên: ${name}
SĐT: ${phone}
Nhận phòng: ${checkin}
Trả phòng: ${checkout}
Số khách: ${guests}
Ghi chú: ${note || "(không có)"}
Cảm ơn!`;
            // sms: scheme, works on mobile. iOS uses &, Android uses ?
            const ua = navigator.userAgent || "";
            const sep = /iPhone|iPad|iPod|Macintosh/i.test(ua) ? "&" : "?";
            window.location.href = `sms:0983850015${sep}body=${encodeURIComponent(body)}`;
          }}
          className="relative rounded-2xl border hairline-light bg-ivory-50/5 backdrop-blur p-8 md:p-10">
          <div className="text-[11px] tracking-widest-x uppercase text-ivory-100/70 mb-6">Gửi yêu cầu qua tin nhắn</div>
          <div className="space-y-5">
            <Field label="Họ và tên"><input name="name" required className="bg-transparent outline-none w-full text-ivory-50 pb-3 border-b hairline-light focus:border-terracotta-400" placeholder="Nhập họ tên của bạn"/></Field>
            <Field label="Số điện thoại"><input name="phone" required type="tel" className="bg-transparent outline-none w-full text-ivory-50 pb-3 border-b hairline-light focus:border-terracotta-400" placeholder="0xxx xxx xxx"/></Field>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Ngày nhận"><input name="checkin" required type="date" className="bg-transparent outline-none w-full text-ivory-50 pb-3 border-b hairline-light focus:border-terracotta-400"/></Field>
              <Field label="Ngày trả"><input name="checkout" required type="date" className="bg-transparent outline-none w-full text-ivory-50 pb-3 border-b hairline-light focus:border-terracotta-400"/></Field>
            </div>
            <Field label="Số khách">
              <select name="guests" className="native outline-none w-full text-ivory-50 pb-3 border-b hairline-light focus:border-terracotta-400">
                <option>10 khách</option><option>15 khách</option><option>20 khách</option><option>25 khách</option><option>30 khách</option>
              </select>
            </Field>
            <Field label="Ghi chú">
              <textarea name="note" rows="3" className="bg-transparent outline-none w-full text-ivory-50 pb-3 border-b hairline-light focus:border-terracotta-400 resize-none" placeholder="Dịp đặc biệt, yêu cầu thêm..."/>
            </Field>
            <button className="w-full py-4 bg-ivory-50 text-ink-900 rounded-xl text-[11px] tracking-widest-x uppercase flex items-center justify-center gap-2 hover:bg-terracotta-400 hover:text-ivory-50 transition">
              Gửi qua tin nhắn <Icon name="MessageCircle" size={14} strokeWidth={2}/>
            </button>
            <p className="text-[11px] text-ivory-100/50 text-center leading-relaxed">
              Khi bấm gửi, điện thoại sẽ mở sẵn tin nhắn tới số 0983 850 015 với nội dung đã điền.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
function Field({label, children}) {
  return (
    <label className="block">
      <div className="text-[10px] tracking-widest-x uppercase text-ivory-100/60 mb-2">{label}</div>
      {children}
    </label>
  );
}

// ================= FOOTER =================
function Footer() {
  return (
    <footer className="relative bg-ivory-100 border-t hairline">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={IMG.heroNight} className="absolute inset-0 w-full h-full object-cover opacity-60" alt=""/>
        <div className="absolute inset-0 bg-gradient-to-t from-ivory-100 via-ivory-100/40 to-transparent"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[10px] tracking-widest-x uppercase text-ivory-50">Vũng Tàu · Việt Nam</div>
            <div className="font-display text-6xl md:text-8xl text-ivory-50 mt-3">H&amp;D Villa</div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-2xl text-ink-900">H&amp;D Villa Vũng Tàu</div>
          <p className="text-ink-800/70 text-[14px] mt-3 leading-relaxed">
            Villa nghỉ dưỡng sang trọng gần biển, dành cho những kỳ nghỉ đáng nhớ bên gia đình và bạn bè.
          </p>
        </div>
        <div>
          <div className="text-[11px] tracking-widest-x uppercase text-ink-500 mb-4">Điều hướng</div>
          <ul className="space-y-2 text-ink-900 text-[14px]">
            <li><a href="#gioi-thieu" className="hover:text-terracotta-500">Giới thiệu</a></li>
            <li><a href="#noi-bat" className="hover:text-terracotta-500">Điểm nổi bật</a></li>
            <li><a href="#phong" className="hover:text-terracotta-500">Các phòng</a></li>
            <li><a href="#vi-tri" className="hover:text-terracotta-500">Vị trí</a></li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] tracking-widest-x uppercase text-ink-500 mb-4">Liên hệ</div>
          <ul className="space-y-2 text-ink-900 text-[14px]">
            <li>0983 850 015</li>
            <li>Số 10 Nguyễn Hữu Tiến</li>
            <li>P. Tam Thắng, TP.HCM</li>
            <li className="text-ink-500">Nhận 14:00 · Trả 12:00</li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] tracking-widest-x uppercase text-ink-500 mb-4">Theo dõi</div>
          <div className="flex gap-3">
            {["Facebook","Instagram","Music"].map(s => (
              <a key={s} href="#" className="w-11 h-11 rounded-full border hairline hover:hairline-strong flex items-center justify-center text-ink-800 hover:text-terracotta-500">
                <Icon name={s} size={16}/>
              </a>
            ))}
          </div>
          <div className="mt-6 text-[12px] text-ink-500">© 2026 H&amp;D Villa. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

// ================= APP =================
function App() {
  return (
    <div className="relative">
      <Nav/>
      <Hero/>
      <Intro/>
      <DayNight/>
      <Highlights/>
      <Rooms/>
      <Amenities/>
      <Location/>
      <Reviews/>
      <FAQ/>
      <Contact/>
      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
