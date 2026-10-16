import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { formatVND } from "@/data/products";
import type { CartItem } from "@/hooks/useCart";
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/thanh-toan")({
  head: () => ({
    meta: [
      { title: "Thanh toán đơn hàng — Ống Tiêm Tri Thức" },
      { name: "description", content: "Hoàn tất thông tin giao nhận và thanh toán ống tiêm tri thức." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"banking" | "card" | "cod">("banking");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Hà Nội",
    notes: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("knowledge_syringe_cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    try {
      localStorage.removeItem("knowledge_syringe_cart");
      window.dispatchEvent(new Event("cart_updated"));
    } catch {
      // ignore
    }
  };

  if (isSuccess) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-foreground">
          Đặt Hàng Thành Công!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Mã đơn hàng: <span className="font-mono font-bold text-gold">#OTT-{Math.floor(100000 + Math.random() * 900000)}</span>
        </p>
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-left text-sm text-muted-foreground">
          <p>
            Chuyên viên y sinh của chúng tôi sẽ liên hệ số điện thoại <strong className="text-foreground">{formData.phone || "của bạn"}</strong> trong vòng 15 phút để chuẩn bị môi trường truyền dẫn não bộ phù hợp trước khi giao ống tiêm.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-primary">
            <Sparkles className="h-4 w-4" /> Hãy nghỉ ngơi đầy đủ trước phiên nạp kiến thức!
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/san-pham"
            className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Tiếp tục xem sản phẩm
          </Link>
          <Link
            to="/"
            className="rounded-xl bg-gold px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110"
          >
            Về trang chủ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          Thông Tin <span className="text-gold">Giao Nhận & Thanh Toán</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vui lòng cung cấp địa chỉ chính xác để đội ngũ điều phối sinh học vận chuyển bảo ôn
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left Form: Delivery info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Section 1: Customer Details */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-foreground">1. Thông tin người nhận</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground">Họ và tên *</label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground">Số điện thoại *</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0987 654 321"
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-muted-foreground">Email nhận chứng chỉ tri thức *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-muted-foreground">Địa chỉ nhận hàng bảo ôn *</label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Số nhà, tên đường, phường/xã"
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-muted-foreground">Ghi chú đặc biệt (tình trạng sức khỏe, giờ nhận)</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ví dụ: Giao sau 18h hoặc cần kỹ thuật viên hỗ trợ đo sóng não..."
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment method */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-foreground">2. Phương thức thanh toán</h2>
            <div className="mt-4 space-y-3">
              <label
                onClick={() => setPaymentMethod("banking")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  paymentMethod === "banking"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="h-5 w-5 text-gold" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Chuyển khoản QR Siêu Tốc (Khuyên dùng)</div>
                    <div className="text-xs text-muted-foreground">Kích hoạt lập tức mã bảo mật ống tiêm</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "banking"}
                  onChange={() => setPaymentMethod("banking")}
                  className="text-primary"
                />
              </label>

              <label
                onClick={() => setPaymentMethod("card")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gold" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Thẻ Quốc Tế (Visa / Mastercard / JCB)</div>
                    <div className="text-xs text-muted-foreground">Bảo mật mã hóa giao dịch 3D-Secure</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="text-primary"
                />
              </label>

              <label
                onClick={() => setPaymentMethod("cod")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  paymentMethod === "cod"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-gold" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Thanh toán khi nhận ống tiêm (COD)</div>
                    <div className="text-xs text-muted-foreground">Kiểm tra niêm phong lượng tử trước khi thanh toán</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="text-primary"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-display text-lg font-bold text-foreground">Đơn hàng của bạn</h3>
          <div className="mt-4 divide-y divide-border/60">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="py-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground line-clamp-1">{product.name}</span>
                  <span className="shrink-0 font-bold text-gold">{formatVND(product.price * quantity)}</span>
                </div>
                <div className="text-xs text-muted-foreground">Số lượng: {quantity}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Tạm tính:</span>
              <span className="text-foreground">{formatVND(total)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Bảo hiểm truyền dẫn não bộ:</span>
              <span className="text-emerald-400">Được tặng kèm</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Giao hàng lạnh Nano:</span>
              <span className="text-emerald-400">0₫</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-foreground">Tổng cộng:</span>
                <span className="font-display text-2xl font-black text-gold">{formatVND(total)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 text-sm font-bold text-primary-foreground shadow-glow hover:brightness-110"
          >
            Xác nhận đặt mua <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" /> Cam kết an toàn và bảo mật tuyệt đối
          </div>
        </div>
      </form>
    </main>
  );
}
