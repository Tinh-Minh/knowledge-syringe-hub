import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, formatVND } from "@/data/products";
import { Search, Star, Zap, ShoppingCart, Check, ShieldCheck, Sparkles, Filter } from "lucide-react";

export const Route = createFileRoute("/san-pham")({
  head: () => ({
    meta: [
      { title: "Danh mục Ống Tiêm Tri Thức — Mua trực tuyến" },
      { name: "description", content: "Khám phá các loại Ống Tiêm Tri Thức: Ngoại ngữ, Công nghệ AI, Kinh doanh, Y khoa và gói Vô Hạn." },
      { property: "og:title", content: "Cửa hàng Ống Tiêm Tri Thức" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = selectedCat === "all" || p.category === selectedCat;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCat, search, sortBy]);

  const handleQuickAdd = (p: (typeof PRODUCTS)[0]) => {
    try {
      const stored = localStorage.getItem("knowledge_syringe_cart");
      const list = stored ? JSON.parse(stored) : [];
      const idx = list.findIndex((it: { product: { id: string } }) => it.product.id === p.id);
      if (idx >= 0) {
        list[idx].quantity += 1;
      } else {
        list.push({ product: p, quantity: 1 });
      }
      localStorage.setItem("knowledge_syringe_cart", JSON.stringify(list));
      window.dispatchEvent(new Event("cart_updated"));
    } catch {
      // ignore
    }
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Banner Header */}
      <div className="relative mb-12 overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card/90 to-background p-8 text-center shadow-xl md:p-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Công nghệ truyền dẫn nơ-ron thế hệ 2026
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Danh Mục <span className="text-gold">Ống Tiêm Tri Thức</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Chọn lọc tinh hoa kiến thức toàn diện. Chỉ một thao tác kích hoạt, kiến thức được mã hóa bền vững trong não bộ.
        </p>

        {/* Search & Sort Bar */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo kỹ năng, ngoại ngữ, công nghệ..."
              className="w-full rounded-xl border border-input bg-background/90 py-2.5 pl-10 pr-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm font-medium text-foreground shadow-sm focus:border-primary focus:outline-none"
            >
              <option value="featured">Nổi bật nhất</option>
              <option value="rating">Đánh giá cao</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              selectedCat === cat.id
                ? "bg-gold text-primary-foreground shadow-glow"
                : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="my-16 text-center">
          <p className="text-lg text-muted-foreground">Không tìm thấy ống tiêm kiến thức phù hợp.</p>
          <button
            onClick={() => {
              setSelectedCat("all");
              setSearch("");
            }}
            className="mt-4 rounded-xl border border-primary px-4 py-2 text-sm text-primary hover:bg-primary/10"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {p.categoryName}
                  </span>
                  {p.tag && (
                    <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-bold text-gold">
                      {p.tag}
                    </span>
                  )}
                </div>

                <Link
                  to="/san-pham/$id"
                  params={{ id: p.id }}
                  className="mt-3 block font-display text-xl font-bold tracking-tight text-foreground transition-colors hover:text-gold"
                >
                  {p.name}
                </Link>

                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {p.description}
                </p>

                {/* Meta spec */}
                <div className="mt-4 space-y-1.5 border-y border-border/60 py-3 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Thời gian nạp não bộ:</span>
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      <Zap className="h-3 w-3" /> {p.durationSeconds} giây
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Thẩm thấu tri thức:</span>
                    <span className="font-semibold text-foreground">{p.specs.retentionRate}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="ml-1 font-bold text-foreground">{p.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{p.reviewCount} lượt nạp thành công</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 border-t border-border/60 pt-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-xl font-extrabold text-gold">
                      {formatVND(p.price)}
                    </div>
                    {p.originalPrice && (
                      <div className="text-xs text-muted-foreground line-through">
                        {formatVND(p.originalPrice)}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(p)}
                      aria-label="Thêm vào giỏ"
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                        addedId === p.id
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                          : "border-border bg-muted/60 text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {addedId === p.id ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-4 w-4" />}
                    </button>
                    <Link
                      to="/san-pham/$id"
                      params={{ id: p.id }}
                      className="rounded-xl bg-gold px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Trust Section */}
      <section className="mt-16 grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card/60 p-6 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">An toàn não bộ 100%</h4>
            <p className="text-xs text-muted-foreground">Đã kiểm nghiệm lâm sàng trên 500.000 mẫu</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Nạp thần tốc</h4>
            <p className="text-xs text-muted-foreground">Từ 10 đến 60 giây hoàn tất toàn bộ giáo trình</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Bảo hành tri thức trọn đời</h4>
            <p className="text-xs text-muted-foreground">Tái kích hoạt miễn phí nếu có dấu hiệu suy giảm</p>
          </div>
        </div>
      </section>
    </main>
  );
}
