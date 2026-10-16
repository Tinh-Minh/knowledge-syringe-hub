import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

export function SiteHeader() {
  const [cartCount, setCartCount] = useState(0);

  const updateCount = () => {
    try {
      const stored = localStorage.getItem("knowledge_syringe_cart");
      if (stored) {
        const items = JSON.parse(stored);
        const total = items.reduce((acc: number, it: { quantity: number }) => acc + (it.quantity || 1), 0);
        setCartCount(total);
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("cart_updated", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("cart_updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const link = "text-sm text-muted-foreground transition-colors hover:text-primary";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-2.5 font-display text-xl font-extrabold text-gold tracking-wider">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/20">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
            </span>
          </span>
          ỐNG TIÊM
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className={link} activeProps={{ className: "text-primary font-medium" }} activeOptions={{ exact: true }}>
            Trang chủ
          </Link>
          <Link to="/san-pham" className={link} activeProps={{ className: "text-primary font-medium" }}>
            Sản phẩm
          </Link>
          <Link to="/cach-dung" className={link} activeProps={{ className: "text-primary font-medium" }}>
            Cách dùng
          </Link>
          
          <Link
            to="/gio-hang"
            className="relative flex items-center justify-center rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            title="Giỏ hàng"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-primary-foreground shadow-glow">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/san-pham"
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110"
          >
            Đặt mua ngay
          </Link>
        </nav>
      </div>
    </header>
  );
}
