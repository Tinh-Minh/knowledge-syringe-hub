import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS, formatVND } from "@/data/products";
import {
  Brain,
  Zap,
  Star,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  ShoppingCart,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/san-pham/$id")({
  head: () => ({
    meta: [
      { title: "Chi tiết Ống Tiêm Tri Thức — Công nghệ dẫn truyền nơ-ron" },
      { name: "description", content: "Thông số chi tiết và đặt mua Ống Tiêm Tri Thức sinh học." },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { id } = useParams({ from: "/san-pham/$id" });
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "guide">("features");

  const handleAddToCart = () => {
    try {
      const stored = localStorage.getItem("knowledge_syringe_cart");
      const list = stored ? JSON.parse(stored) : [];
      const idx = list.findIndex((it: { product: { id: string } }) => it.product.id === product.id);
      if (idx >= 0) {
        list[idx].quantity += quantity;
      } else {
        list.push({ product, quantity });
      }
      localStorage.setItem("knowledge_syringe_cart", JSON.stringify(list));
      window.dispatchEvent(new Event("cart_updated"));
    } catch {
      // ignore
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Trang chủ</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/san-pham" className="hover:text-foreground">Sản phẩm</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-foreground">{product.name}</span>
      </nav>

      {/* Hero Section of Product */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Product Visual Box */}
        <div className="flex flex-col items-center justify-center rounded-3xl border border-primary/40 bg-gradient-to-b from-card via-card/80 to-background p-8 text-center shadow-glow">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-gold/30 bg-gold/5 shadow-inner">
            <Brain className="h-28 w-28 text-gold animate-pulse" />
            <div className="absolute -top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
              {product.specs.version}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Zap className="h-3 w-3 text-gold" /> Nạp trong {product.durationSeconds}s
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-gold" /> Thẩm thấu {product.specs.retentionRate}
            </span>
          </div>
        </div>

        {/* Product Info & Purchase Options */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {product.categoryName}
              </span>
              {product.tag && (
                <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold">
                  {product.tag}
                </span>
              )}
            </div>

            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center text-amber-400">
                <Star className="h-4 w-4 fill-amber-400" />
                <span className="ml-1.5 font-bold text-foreground">{product.rating}</span>
              </div>
              <span>•</span>
              <span className="underline">{product.reviewCount} khách hàng đã tiêm kiến thức</span>
            </div>

            {/* Price Box */}
            <div className="mt-6 rounded-2xl border border-border/70 bg-card p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-black text-gold">
                  {formatVND(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatVND(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Đã bao gồm ống tiêm vô trùng Nano-Syringe + Buồng dưỡng chất phục hồi não sau tiêm.
              </p>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Highlights bullets */}
            <div className="mt-6 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Điểm nổi bật:</h4>
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-lg font-bold text-muted-foreground hover:text-foreground"
                >
                  -
                </button>
                <span className="w-10 text-center font-semibold text-foreground">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-lg font-bold text-muted-foreground hover:text-foreground"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/50 bg-primary/10 px-6 py-3 font-semibold text-primary transition-all hover:bg-primary/20"
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5 text-emerald-400" />
                    <span>Đã thêm vào giỏ!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Thêm vào giỏ</span>
                  </>
                )}
              </button>

              <Link
                to="/gio-hang"
                onClick={handleAddToCart}
                className="flex items-center justify-center rounded-xl bg-gold px-8 py-3 font-bold text-primary-foreground shadow-glow transition-all hover:brightness-110"
              >
                Mua ngay
              </Link>
            </div>

            {/* Guarantees */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" /> Chứng nhận an toàn não bộ
              </span>
              <span className="flex items-center gap-1.5">
                <RotateCcw className="h-4 w-4 text-primary" /> Đổi trả trong 30 ngày
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-primary" /> Giao hàng hỏa tốc trong 2h
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="mt-16 border-t border-border pt-10">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("features")}
            className={`border-b-2 px-6 py-3 text-sm font-semibold transition-all ${
              activeTab === "features"
                ? "border-gold text-gold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Thông số kỹ thuật
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`border-b-2 px-6 py-3 text-sm font-semibold transition-all ${
              activeTab === "guide"
                ? "border-gold text-gold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Quy trình nạp vào não
          </button>
        </div>

        <div className="py-6">
          {activeTab === "features" && (
            <div className="max-w-2xl divide-y divide-border/60 rounded-2xl border border-border bg-card p-6 text-sm">
              <div className="grid grid-cols-2 py-3">
                <span className="text-muted-foreground">Đối tượng tối ưu:</span>
                <span className="font-medium text-foreground">{product.specs.suitableFor}</span>
              </div>
              <div className="grid grid-cols-2 py-3">
                <span className="text-muted-foreground">Tỷ lệ lưu giữ tri thức:</span>
                <span className="font-medium text-foreground">{product.specs.retentionRate}</span>
              </div>
              <div className="grid grid-cols-2 py-3">
                <span className="text-muted-foreground">Phiên bản vi mạch:</span>
                <span className="font-medium text-foreground">{product.specs.version}</span>
              </div>
              <div className="grid grid-cols-2 py-3">
                <span className="text-muted-foreground">Chính sách cập nhật tri thức:</span>
                <span className="font-medium text-foreground">{product.specs.updatePolicy}</span>
              </div>
            </div>
          )}

          {activeTab === "guide" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="font-display text-lg font-bold text-gold">Bước 1</div>
                <h5 className="mt-1 font-semibold text-foreground">Chuẩn bị tâm thế</h5>
                <p className="mt-1 text-xs text-muted-foreground">Ngồi thư giãn tại nơi yên tĩnh, nhắm mắt và thở đều trong 60 giây.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="font-display text-lg font-bold text-gold">Bước 2</div>
                <h5 className="mt-1 font-semibold text-foreground">Áp sát thái dương</h5>
                <p className="mt-1 text-xs text-muted-foreground">Đặt đầu tiêm vi nano không đau cạnh vùng thái dương và nhấn kích hoạt.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="font-display text-lg font-bold text-gold">Bước 3</div>
                <h5 className="mt-1 font-semibold text-foreground">Hấp thụ & Định hình</h5>
                <p className="mt-1 text-xs text-muted-foreground">Cảm nhận luồng thông tin chạy qua các nơ-ron và sẵn sàng sử dụng ngay.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
