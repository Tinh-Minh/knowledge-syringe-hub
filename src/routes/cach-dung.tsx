import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/cach-dung")({
  head: () => ({
    meta: [
      { title: "Cách dùng Ống Tiêm Tri Thức — Hướng dẫn 4 bước" },
      { name: "description", content: "Hướng dẫn sử dụng Ống Tiêm Tri Thức an toàn, nhanh chóng trong 4 bước và câu hỏi thường gặp." },
      { property: "og:title", content: "Cách dùng Ống Tiêm Tri Thức" },
      { property: "og:description", content: "4 bước để nạp cả thế giới tri thức vào não bộ." },
    ],
  }),
  component: HowTo,
});

const steps = [
  { t: "Chọn lĩnh vực", d: "Chọn gói kiến thức bạn muốn: ngôn ngữ, khoa học, nghệ thuật hay kỹ năng." },
  { t: "Kích hoạt ống tiêm", d: "Xoay vòng kim loại ở thân ống đến khi đèn chuyển sang màu vàng." },
  { t: "Thư giãn & nạp", d: "Ngồi thoải mái, nhắm mắt, đặt đầu ống gần thái dương. Quá trình nạp mất khoảng 10 giây." },
  { t: "Nghỉ ngơi 5 phút", d: "Để não bộ sắp xếp tri thức mới. Sau đó, bạn đã sẵn sàng sử dụng kiến thức!" },
];

const faqs = [
  { q: "Một ống dùng được mấy lần?", a: "Mỗi ống dùng một lần cho một gói kiến thức." },
  { q: "Ai có thể sử dụng?", a: "Người từ 12 tuổi trở lên. Không dùng khi đang mệt mỏi hoặc thiếu ngủ." },
  { q: "Kiến thức có bị quên không?", a: "Kiến thức được lưu lâu dài, nhưng nên vận dụng thường xuyên để thành thạo." },
];

function HowTo() {
  const [sent, setSent] = useState(false);
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-center font-display text-4xl font-extrabold text-gold md:text-5xl">Cách dùng sản phẩm</h1>
      <p className="mt-4 text-center text-muted-foreground">Chỉ 4 bước đơn giản để mở ra cả thế giới tri thức.</p>

      <ol className="mt-14 space-y-6">
        {steps.map((s, i) => (
          <li key={s.t} className="flex gap-6 rounded-2xl border border-border bg-card p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold font-display text-xl font-extrabold text-primary-foreground">{i + 1}</span>
            <div>
              <h3 className="text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-muted-foreground">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-20 font-display text-3xl font-extrabold text-gold">Câu hỏi thường gặp</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-xl border border-border bg-card p-5">
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2 text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>

      <section id="dat-mua" className="mt-20 rounded-2xl border border-primary bg-card p-8 shadow-glow">
        <h2 className="font-display text-3xl font-extrabold text-gold">Đặt mua ngay</h2>
        {sent ? (
          <p className="mt-4 text-primary">Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.</p>
        ) : (
          <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input required placeholder="Họ và tên" className="rounded-lg border border-input bg-background px-4 py-3" />
            <input required type="tel" placeholder="Số điện thoại" className="rounded-lg border border-input bg-background px-4 py-3" />
            <select className="rounded-lg border border-input bg-background px-4 py-3 md:col-span-2">
              <option>Gói Khởi Đầu</option><option>Gói Chuyên Gia</option><option>Gói Vô Hạn</option>
            </select>
            <button className="rounded-full bg-gold py-3 font-semibold text-primary-foreground md:col-span-2">Gửi đơn hàng</button>
          </form>
        )}
      </section>
    </main>
  );
}
