import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { formatVND } from "@/data/products";
import type { CartItem } from "@/hooks/useCart";
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/gio-hang")({
  head: () => ({
    meta: [
      { title: "Giỏ hàng Ống Tiêm Tri Thức" },
      { name: "description", content: "Xem lại và điều chỉnh các ống tiêm tri thức trong giỏ hàng." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const loadCart = () => {
    try {
      const stored = localStorage.getItem("knowledge_syringe_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem("knowledge_syringe_cart", JSON.stringify(newItems));
      window.dispatchEvent(new Event("cart_updated"));
    } catch {
      // ignore
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = items
      .map((item) => {
        if (item.product.id === id) {
          const newQ = item.quantity + delta;
          return newQ > 0 ? { ...item, quantity: newQ } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];
    saveCart(updated);
  };

  const removeItem = (id: string) => {
    saveCart(items.filter((item) => item.product.id !== id));
  };

  const clearAll = () => {
    saveCart([]);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "NEURO2026") {
      setDiscountPercent(15);
      setPromoMessage("Áp dụng mã thành công! Giảm 15% tổng hóa đơn.");
    } else if (promoCode.trim().toUpperCase() === "TRI_THUC") {
      setDiscountPercent(10);
      setPromoMessage("Áp dụng mã thành công! Giảm 10% tổng hóa đơn.");
    } else {
      setPromoMessage("Mã ưu đãi không hợp lệ hoặc đã hết hạn.");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal > 0 ? 0 : 0; // Miễn phí giao hàng lượng tử
  const total = subtotal - discountAmount + shippingFee;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            Giỏ Hàng <span className="text-gold">Tri Thức</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý các ống tiêm đã chọn trước khi tiến hành thanh toán
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-muted-foreground transition-colors hover:text-destructive"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-foreground">Giỏ hàng của bạn đang trống</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Hãy khám phá các gói ống tiêm tri thức đột phá để nâng cấp não bộ ngay hôm nay.
          </p>
          <Link
            to="/san-pham"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110"
          >
            Khám phá cửa hàng <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* List of items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {product.categoryName}
                  </span>
                  <Link
                    to="/san-pham/$id"
                    params={{ id: product.id }}
                    className="mt-1 block font-display text-lg font-bold text-foreground hover:text-gold"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    Thời gian nạp: {product.durationSeconds} giây • Thẩm thấu {product.specs.retentionRate}
                  </p>
                  <div className="mt-2 font-display text-base font-bold text-gold">
                    {formatVND(product.price)}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-6 sm:justify-end">
                  {/* Quantity controls */}
                  <div className="flex items-center rounded-lg border border-border bg-background">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, -1)}
                      className="p-2 text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-foreground">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, 1)}
                      className="p-2 text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Subtotal of item */}
                  <div className="w-28 text-right font-display text-sm font-bold text-foreground">
                    {formatVND(product.price * quantity)}
                  </div>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive"
                    title="Xóa khỏi giỏ"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                to="/san-pham"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Tiếp tục lựa chọn kiến thức
              </Link>
            </div>
          </div>

          {/* Order Summary & Promo Code */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-foreground">Tóm tắt đơn hàng</h3>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="mt-4">
              <label className="block text-xs font-semibold text-muted-foreground">Mã giảm giá</label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Gợi ý: NEURO2026"
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs uppercase text-foreground placeholder:normal-case focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/20"
                >
                  Áp dụng
                </button>
              </div>
              {promoMessage && (
                <p className={`mt-1.5 text-xs ${discountPercent > 0 ? "text-emerald-400" : "text-destructive"}`}>
                  {promoMessage}
                </p>
              )}
            </form>

            {/* Summary lines */}
            <div className="mt-6 space-y-3 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Tạm tính ({items.length} món):</span>
                <span className="font-medium text-foreground">{formatVND(subtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Giảm giá ({discountPercent}%):</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Phí bảo quản & vận chuyển:</span>
                <span className="font-medium text-emerald-400">Miễn phí</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-foreground">Tổng thanh toán:</span>
                  <span className="font-display text-2xl font-black text-gold">{formatVND(total)}</span>
                </div>
                <p className="mt-1 text-right text-xs text-muted-foreground">Đã gồm VAT & bảo hiểm truyền dẫn</p>
              </div>
            </div>

            <Link
              to="/thanh-toan"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:brightness-110"
            >
              Tiến hành thanh toán <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> Bảo mật mã hóa lượng tử 256-bit
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
