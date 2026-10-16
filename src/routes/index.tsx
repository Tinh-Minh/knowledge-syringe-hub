import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Zap, BookOpen, Infinity as Inf } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import hero from "@/assets/hero.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ống Tiêm Tri Thức — Nạp kiến thức vào não bộ không cần học" },
      { name: "description", content: "Ống Tiêm Tri Thức: nạp toàn bộ thông tin vào não bộ trong vài giây, mọi lĩnh vực, không giới hạn." },
      { property: "og:title", content: "Ống Tiêm Tri Thức" },
      { property: "og:description", content: "Từ một ống tiêm đến cả thế giới tri thức." },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Brain, t: "Nạp toàn bộ thông tin vào não bộ", d: "Không cần học, không cần ghi nhớ thủ công." },
  { icon: Zap, t: "Truyền tải siêu tốc", d: "Chỉ trong vài giây, cả thế giới tri thức." },
  { icon: BookOpen, t: "Kiến thức mọi lĩnh vực", d: "Khoa học, công nghệ, nghệ thuật, ngôn ngữ, kỹ năng..." },
  { icon: Inf, t: "Học mãi không giới hạn", d: "Không còn giới hạn thời gian hay khả năng con người." },
];

const packs = [
  { n: "Gói Khởi Đầu", p: "9.900.000₫", d: "1 lĩnh vực tự chọn (ví dụ: tiếng Anh giao tiếp)" },
  { n: "Gói Chuyên Gia", p: "49.900.000₫", d: "5 lĩnh vực chuyên sâu cấp đại học", hot: true },
  { n: "Gói Vô Hạn", p: "199.900.000₫", d: "Toàn bộ tri thức nhân loại, cập nhật trọn đời" },
];

const sparks = Array.from({ length: 22 }, (_, i) => ({
  left: 5 + ((i * 4.4 + 5) % 90),
  delay: (i % 10) * 0.8,
  duration: 7 + (i % 6) * 1.5,
  size: i % 3 === 0 ? 9 : 6,
  gold: i % 2 === 0,
}));

function setParallax(el: HTMLElement, x: number, y: number) {
  el.style.setProperty("--px", x.toFixed(3));
  el.style.setProperty("--py", y.toFixed(3));
}

function Index() {
  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setParallax(e.currentTarget, (e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = (e: ReactPointerEvent<HTMLElement>) => setParallax(e.currentTarget, 0, 0);

  return (
    <main>
      <section
        className="hero-enter relative overflow-hidden"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="hero-parallax">
          <img
            src={hero.url}
            alt="Ống tiêm truyền tri thức vào não bộ"
            className="hero-breathe block h-auto w-full"
            decoding="async"
          />
        </div>

        <div className="hero-glow hero-pulse hero-parallax-far pointer-events-none absolute inset-0" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hero-sweep hero-sweep-bar absolute -inset-y-16 left-0 w-1/3" />
        </div>

        <div className="hero-scan hero-scan-bar pointer-events-none absolute inset-x-0 top-0 h-1/3 opacity-70" />

        <div className="hero-parallax-far pointer-events-none absolute inset-0 overflow-hidden">
          {sparks.map((s, i) => (
            <span
              key={i}
              className={`hero-particle hero-spark absolute bottom-[6%] rounded-full ${s.gold ? "bg-primary text-primary" : "bg-secondary text-secondary"}`}
              style={{
                left: `${s.left}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>

        <div className="hero-vignette pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-secondary">Công nghệ tương lai</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-gold md:text-6xl">Ống Tiêm Tri Thức</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Nạp toàn bộ thông tin vào não bộ mà không cần học. Một ống tiêm — vô hạn tri thức trong một bộ não duy nhất.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/cach-dung" className="rounded-full bg-gold px-6 py-3 font-semibold text-primary-foreground shadow-glow">Xem cách dùng</Link>
          <a href="#bang-gia" className="rounded-full border border-border px-6 py-3 font-semibold text-foreground hover:border-primary">Bảng giá</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-glow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary"><Icon /></div>
            <h3 className="mt-4 font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section id="bang-gia" className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-center font-display text-3xl font-extrabold text-gold">Chọn ống tiêm của bạn</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packs.map((k) => (
            <div key={k.n} className={`rounded-2xl border bg-card p-8 ${k.hot ? "border-primary shadow-glow" : "border-border"}`}>
              {k.hot && <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-primary-foreground">Bán chạy</span>}
              <h3 className="mt-3 text-xl font-semibold">{k.n}</h3>
              <p className="mt-2 text-3xl font-bold text-primary">{k.p}</p>
              <p className="mt-3 text-sm text-muted-foreground">{k.d}</p>
              <Link to="/cach-dung" hash="dat-mua" className="mt-6 block rounded-full border border-primary py-2 text-center text-primary hover:bg-primary hover:text-primary-foreground">Đặt mua</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
