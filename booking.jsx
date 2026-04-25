// ============ BOOKING WIDGET (full-featured) ============
const BOOK_PRICE_WEEKDAY = 5_000_000;
const BOOK_PRICE_WEEKEND = 7_000_000;
const BOOK_CLEAN_FEE     = 500_000;
const BOOK_BOOKED_DATES  = [
  // sample booked dates (YYYY-MM-DD)
  (() => { const d=new Date(); d.setDate(d.getDate()+3); return d.toISOString().slice(0,10); })(),
  (() => { const d=new Date(); d.setDate(d.getDate()+4); return d.toISOString().slice(0,10); })(),
  (() => { const d=new Date(); d.setDate(d.getDate()+10); return d.toISOString().slice(0,10); })(),
  (() => { const d=new Date(); d.setDate(d.getDate()+11); return d.toISOString().slice(0,10); })(),
  (() => { const d=new Date(); d.setDate(d.getDate()+18); return d.toISOString().slice(0,10); })(),
];
const BOOK_MONTHS = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
const BOOK_DOW = ["T2","T3","T4","T5","T6","T7","CN"];

const fmtVND = (n) => n.toLocaleString("vi-VN").replace(/,/g,".") + "đ";
const fmtDate = (d) => d ? `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}` : "—";
const ymd = (d) => d.toISOString().slice(0,10);
const isWeekend = (d) => { const dw = d.getDay(); return dw === 5 || dw === 6; }; // Fri, Sat night
const sameDay = (a,b) => a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
const stripTime = (d) => { const x = new Date(d); x.setHours(0,0,0,0); return x; };

function BookCalendar({ viewMonth, setViewMonth, checkin, checkout, onPick, hoverDate, setHoverDate }) {
  const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const startOffset = (first.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth()+1, 0).getDate();
  const today = stripTime(new Date());
  const cells = [];
  for (let i=0; i<startOffset; i++) cells.push(null);
  for (let d=1; d<=daysInMonth; d++) cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));

  const prevM = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth()-1, 1));
  const nextM = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth()+1, 1));

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevM} className="w-9 h-9 rounded-full border hairline hover:bg-ivory-100 flex items-center justify-center">
          <Icon name="ChevronLeft" size={16}/>
        </button>
        <div className="font-display text-xl text-ink-900">{BOOK_MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}</div>
        <button onClick={nextM} className="w-9 h-9 rounded-full border hairline hover:bg-ivory-100 flex items-center justify-center">
          <Icon name="ChevronRight" size={16}/>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {BOOK_DOW.map(x => <div key={x} className="text-[10px] tracking-widest-x uppercase text-ink-500 text-center py-1">{x}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, idx) => {
          if (!d) return <div key={idx}/>;
          const past = d < today;
          const booked = BOOK_BOOKED_DATES.includes(ymd(d));
          const disabled = past || booked;
          const isCheckin = sameDay(d, checkin);
          const isCheckout = sameDay(d, checkout);
          const inRange = checkin && (checkout || hoverDate) && d > checkin && d < (checkout || hoverDate);
          const wknd = isWeekend(d);
          return (
            <button key={idx}
              disabled={disabled}
              onMouseEnter={()=> checkin && !checkout && setHoverDate(d)}
              onClick={()=> !disabled && onPick(d)}
              className={`relative aspect-square rounded-lg text-[13px] font-medium transition
                ${disabled ? "text-ink-500/40 cursor-not-allowed" : "text-ink-900 hover:bg-ivory-100"}
                ${inRange ? "bg-ivory-200 text-ink-900" : ""}
                ${isCheckin || isCheckout ? "bg-ink-900 text-ivory-50 hover:bg-ink-800" : ""}
              `}>
              <span>{d.getDate()}</span>
              {wknd && !disabled && !isCheckin && !isCheckout && (
                <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-terracotta-500"/>
              )}
              {booked && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="block w-full h-px bg-ink-500/40 rotate-[-30deg]"/>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-4 text-[10px] tracking-widest-x uppercase text-ink-500">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-terracotta-500"/> Cuối tuần</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-px bg-ink-500/40"/> Đã kín</span>
      </div>
    </div>
  );
}

function BookingWidget() {
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [openCal, setOpenCal] = useState(false);
  const [viewMonth, setViewMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [adults, setAdults] = useState(10);
  const [children, setChildren] = useState(0);
  const [openGuests, setOpenGuests] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null); // null | "summary" | "form" | "done"
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const totalGuests = adults + children;

  // calc
  let nights = 0;
  let nightlyTotal = 0;
  let weekendNights = 0;
  if (checkin && checkout && checkout > checkin) {
    const cur = new Date(checkin);
    while (cur < checkout) {
      const wknd = isWeekend(cur);
      nightlyTotal += wknd ? BOOK_PRICE_WEEKEND : BOOK_PRICE_WEEKDAY;
      if (wknd) weekendNights++;
      nights++;
      cur.setDate(cur.getDate()+1);
    }
  }
  const weekendSurcharge = weekendNights * (BOOK_PRICE_WEEKEND - BOOK_PRICE_WEEKDAY);
  const baseTotal = nights * BOOK_PRICE_WEEKDAY;
  const total = nightlyTotal + (nights > 0 ? BOOK_CLEAN_FEE : 0);

  const handlePick = (d) => {
    setError("");
    if (!checkin || (checkin && checkout)) {
      setCheckin(d); setCheckout(null); setHoverDate(null);
    } else if (d <= checkin) {
      setCheckin(d); setCheckout(null);
    } else {
      // check no booked date in between
      const cur = new Date(checkin); cur.setDate(cur.getDate()+1);
      let conflict = false;
      while (cur < d) {
        if (BOOK_BOOKED_DATES.includes(ymd(cur))) { conflict = true; break; }
        cur.setDate(cur.getDate()+1);
      }
      if (conflict) { setError("Khoảng ngày chọn có ngày đã kín phòng."); return; }
      setCheckout(d); setHoverDate(null); setOpenCal(false);
    }
  };

  const handleCheck = () => {
    setError("");
    if (!checkin || !checkout) { setError("Vui lòng chọn ngày nhận và trả phòng."); return; }
    if (checkout <= checkin)   { setError("Ngày trả phải sau ngày nhận phòng."); return; }
    if (checkin < stripTime(new Date())) { setError("Không thể đặt ngày trong quá khứ."); return; }
    if (totalGuests > 30)      { setError("Tổng khách không vượt quá 30."); return; }
    if (totalGuests < 1)       { setError("Vui lòng chọn ít nhất 1 khách."); return; }
    setModal("summary");
  };

  return (
    <div id="dat-phong" className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-[-120px] z-30 w-[min(1100px,94vw)] mx-auto mt-10 md:mt-0">
      <div className="rounded-2xl border hairline bg-ivory-50 shadow-[0_20px_60px_-25px_rgba(42,35,28,0.35)]">
        <div className="grid md:grid-cols-[1fr_1fr_1fr_auto] divide-y md:divide-y-0 md:divide-x divide-ink-900/10">
          {/* Check-in */}
          <button onClick={()=>setOpenCal(v=>!v)} className="p-5 flex items-center gap-4 text-left hover:bg-ivory-100/50">
            <div className="w-10 h-10 rounded-lg border hairline flex items-center justify-center text-ink-700">
              <Icon name="Calendar" size={18}/>
            </div>
            <div className="flex-1">
              <div className="text-[10px] tracking-widest-x uppercase text-ink-500 mb-1">Nhận phòng</div>
              <div className="text-ink-900 text-[15px] font-medium">{checkin ? fmtDate(checkin) : "Chọn ngày"}</div>
            </div>
          </button>
          {/* Check-out */}
          <button onClick={()=>setOpenCal(v=>!v)} className="p-5 flex items-center gap-4 text-left hover:bg-ivory-100/50">
            <div className="w-10 h-10 rounded-lg border hairline flex items-center justify-center text-ink-700">
              <Icon name="CalendarCheck" size={18}/>
            </div>
            <div className="flex-1">
              <div className="text-[10px] tracking-widest-x uppercase text-ink-500 mb-1">Trả phòng {nights > 0 && <span className="text-terracotta-500 normal-case tracking-normal">· {nights} đêm</span>}</div>
              <div className="text-ink-900 text-[15px] font-medium">{checkout ? fmtDate(checkout) : "Chọn ngày"}</div>
            </div>
          </button>
          {/* Guests */}
          <button onClick={()=>setOpenGuests(v=>!v)} className="p-5 flex items-center gap-4 text-left hover:bg-ivory-100/50">
            <div className="w-10 h-10 rounded-lg border hairline flex items-center justify-center text-ink-700">
              <Icon name="Users" size={18}/>
            </div>
            <div className="flex-1">
              <div className="text-[10px] tracking-widest-x uppercase text-ink-500 mb-1">Số khách</div>
              <div className="text-ink-900 text-[15px] font-medium">{adults} người lớn{children>0 ? ` · ${children} trẻ em` : ""}</div>
            </div>
          </button>
          <div className="p-4 flex items-stretch">
            <button onClick={handleCheck}
              className="btn-terra flex items-center justify-center gap-2 px-8 rounded-xl text-[11px] tracking-widest-x uppercase min-w-[180px]">
              Kiểm tra phòng <Icon name="ArrowRight" size={14} strokeWidth={2}/>
            </button>
          </div>
        </div>

        {/* Dropdowns */}
        {openCal && (
          <div className="border-t hairline grid md:grid-cols-2 divide-x divide-ink-900/10 bg-ivory-50">
            <BookCalendar viewMonth={viewMonth} setViewMonth={setViewMonth}
              checkin={checkin} checkout={checkout}
              hoverDate={hoverDate} setHoverDate={setHoverDate}
              onPick={handlePick}/>
            <BookCalendar
              viewMonth={new Date(viewMonth.getFullYear(), viewMonth.getMonth()+1, 1)}
              setViewMonth={(d)=>setViewMonth(new Date(d.getFullYear(), d.getMonth()-1, 1))}
              checkin={checkin} checkout={checkout}
              hoverDate={hoverDate} setHoverDate={setHoverDate}
              onPick={handlePick}/>
          </div>
        )}

        {openGuests && (
          <div className="border-t hairline p-6 bg-ivory-50">
            <div className="max-w-md mx-auto space-y-5">
              <GuestRow label="Người lớn" sub="Từ 13 tuổi" value={adults} setValue={setAdults} min={1} max={30-children}/>
              <GuestRow label="Trẻ em" sub="2–12 tuổi" value={children} setValue={setChildren} min={0} max={30-adults}/>
              <div className="flex items-center justify-between pt-4 border-t hairline">
                <div className="text-[12px] text-ink-500">Tối đa 30 khách · hiện tại {totalGuests}</div>
                <button onClick={()=>setOpenGuests(false)} className="text-[11px] tracking-widest-x uppercase text-ink-900 border-b hairline-strong pb-1 hover:text-terracotta-500">Xong</button>
              </div>
            </div>
          </div>
        )}

        {/* Price breakdown */}
        {nights > 0 && (
          <div className="border-t hairline p-6 bg-ivory-100/60">
            <div className="max-w-2xl mx-auto space-y-2 text-[14px] text-ink-900">
              <PriceRow label={`${fmtVND(BOOK_PRICE_WEEKDAY)} × ${nights} đêm`} value={fmtVND(baseTotal)}/>
              {weekendSurcharge > 0 && (
                <PriceRow label={`Phụ thu cuối tuần (${weekendNights} đêm T6/T7)`} value={"+ " + fmtVND(weekendSurcharge)}/>
              )}
              <PriceRow label="Phí vệ sinh" value={fmtVND(BOOK_CLEAN_FEE)}/>
              <div className="pt-3 mt-2 border-t hairline flex items-center justify-between">
                <div className="font-display text-xl text-ink-900">Tổng cộng</div>
                <div className="font-display text-2xl text-terracotta-500">{fmtVND(total)}</div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="border-t hairline p-4 bg-terracotta-400/10 text-terracotta-600 text-[13px] text-center flex items-center justify-center gap-2">
            <Icon name="AlertCircle" size={14}/> {error}
          </div>
        )}
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm"
          onClick={()=>setModal(null)}>
          <div onClick={e=>e.stopPropagation()}
            className="relative bg-ivory-50 rounded-2xl border hairline max-w-lg w-full max-h-[90vh] overflow-auto">
            <button onClick={()=>setModal(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full border hairline hover:bg-ivory-100 flex items-center justify-center">
              <Icon name="X" size={14}/>
            </button>

            {modal === "summary" && (
              <div className="p-8 md:p-10">
                <div className="text-[10px] tracking-widest-x uppercase text-ink-500">Xác nhận đặt phòng</div>
                <h3 className="font-display text-4xl text-ink-900 mt-2">Tóm tắt của bạn</h3>

                <div className="mt-6 space-y-3 text-[14.5px] text-ink-900 border-y hairline py-5">
                  <SumRow k="Nhận phòng" v={fmtDate(checkin) + " · 14:00"}/>
                  <SumRow k="Trả phòng"  v={fmtDate(checkout) + " · 12:00"}/>
                  <SumRow k="Số đêm"     v={`${nights} đêm`}/>
                  <SumRow k="Số khách"   v={`${adults} người lớn${children>0 ? `, ${children} trẻ em` : ""}`}/>
                </div>

                <div className="mt-5 space-y-2 text-[13.5px] text-ink-900">
                  <PriceRow label={`${fmtVND(BOOK_PRICE_WEEKDAY)} × ${nights} đêm`} value={fmtVND(baseTotal)}/>
                  {weekendSurcharge > 0 && <PriceRow label={`Phụ thu cuối tuần`} value={"+ " + fmtVND(weekendSurcharge)}/>}
                  <PriceRow label="Phí vệ sinh" value={fmtVND(BOOK_CLEAN_FEE)}/>
                  <div className="pt-3 mt-2 border-t hairline flex items-center justify-between">
                    <div className="font-display text-xl">Tổng cộng</div>
                    <div className="font-display text-2xl text-terracotta-500">{fmtVND(total)}</div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onClick={()=>setModal("form")} className="btn-terra py-3.5 rounded-xl text-[11px] tracking-widest-x uppercase flex items-center justify-center gap-2">
                    Xác nhận đặt <Icon name="ArrowRight" size={14} strokeWidth={2}/>
                  </button>
                  <a href="tel:0983850015" className="py-3.5 rounded-xl border hairline-strong text-[11px] tracking-widest-x uppercase flex items-center justify-center gap-2 text-ink-900 hover:bg-ivory-100">
                    <Icon name="Phone" size={14} strokeWidth={2}/> Gọi Mrs Hà 0983 850 015
                  </a>
                </div>
                <div className="mt-3 text-center text-[12px] text-ink-500">
                  Hoặc nhắn Messenger: <a href="https://m.me/289561758597542" target="_blank" rel="noopener noreferrer" className="text-terracotta-500 underline">m.me/289561758597542</a>
                </div>
              </div>
            )}

            {modal === "form" && (
              <form onSubmit={e=>{e.preventDefault(); setModal("done");}} className="p-8 md:p-10">
                <div className="text-[10px] tracking-widest-x uppercase text-ink-500">Thông tin liên hệ</div>
                <h3 className="font-display text-4xl text-ink-900 mt-2">Gần xong rồi!</h3>
                <p className="mt-2 text-ink-800/75 text-[14px]">Villa sẽ liên hệ lại trong 15 phút để xác nhận đơn đặt của bạn.</p>

                <div className="mt-6 space-y-5">
                  <label className="block">
                    <div className="text-[10px] tracking-widest-x uppercase text-ink-500 mb-2">Họ và tên</div>
                    <input required value={name} onChange={e=>setName(e.target.value)}
                      className="bg-transparent outline-none w-full text-ink-900 pb-3 border-b hairline-strong focus:border-terracotta-400" placeholder="Nhập họ tên"/>
                  </label>
                  <label className="block">
                    <div className="text-[10px] tracking-widest-x uppercase text-ink-500 mb-2">Số điện thoại</div>
                    <input required type="tel" value={phone} onChange={e=>setPhone(e.target.value)}
                      className="bg-transparent outline-none w-full text-ink-900 pb-3 border-b hairline-strong focus:border-terracotta-400" placeholder="0xxx xxx xxx"/>
                  </label>
                </div>

                <div className="mt-8 flex gap-3">
                  <button type="button" onClick={()=>setModal("summary")}
                    className="px-6 py-3.5 rounded-xl border hairline-strong text-[11px] tracking-widest-x uppercase hover:bg-ivory-100">
                    Quay lại
                  </button>
                  <button type="submit" className="flex-1 btn-terra py-3.5 rounded-xl text-[11px] tracking-widest-x uppercase flex items-center justify-center gap-2">
                    Gửi yêu cầu đặt <Icon name="ArrowRight" size={14} strokeWidth={2}/>
                  </button>
                </div>
              </form>
            )}

            {modal === "done" && (
              <div className="p-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-terracotta-500 text-ivory-50 flex items-center justify-center">
                  <Icon name="Check" size={22} strokeWidth={2.5}/>
                </div>
                <h3 className="font-display text-4xl text-ink-900 mt-5">Đã gửi thành công!</h3>
                <p className="mt-3 text-ink-800/80 text-[14.5px] max-w-sm mx-auto">
                  Cảm ơn {name || "bạn"}! Mrs Hà sẽ gọi lại số {phone || "0xxx"} trong 15 phút để xác nhận đặt phòng.
                </p>
                <button onClick={()=>{setModal(null); setName(""); setPhone("");}}
                  className="mt-8 btn-terra px-8 py-3.5 rounded-xl text-[11px] tracking-widest-x uppercase">
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PriceRow({label, value}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-800/80">{label}</span>
      <span className="text-ink-900 font-medium">{value}</span>
    </div>
  );
}
function SumRow({k, v}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] tracking-widest-x uppercase text-ink-500">{k}</span>
      <span className="text-ink-900 font-medium">{v}</span>
    </div>
  );
}
function GuestRow({label, sub, value, setValue, min, max}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-display text-xl text-ink-900">{label}</div>
        <div className="text-[11px] tracking-widest-x uppercase text-ink-500">{sub}</div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={()=>setValue(Math.max(min, value-1))} disabled={value<=min}
          className="w-9 h-9 rounded-full border hairline-strong flex items-center justify-center hover:bg-ivory-100 disabled:opacity-30">
          <Icon name="Minus" size={14}/>
        </button>
        <div className="w-8 text-center font-display text-xl">{value}</div>
        <button onClick={()=>setValue(Math.min(max, value+1))} disabled={value>=max}
          className="w-9 h-9 rounded-full border hairline-strong flex items-center justify-center hover:bg-ivory-100 disabled:opacity-30">
          <Icon name="Plus" size={14}/>
        </button>
      </div>
    </div>
  );
}
