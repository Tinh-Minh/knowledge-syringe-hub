import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  const link = "text-sm text-muted-foreground transition-colors hover:text-primary";
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl font-extrabold text-gold">ỐNG TIÊM</Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className={link} activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>Sản phẩm</Link>
          <Link to="/cach-dung" className={link} activeProps={{ className: "text-primary" }}>Cách dùng</Link>
          <Link to="/cach-dung" hash="dat-mua" className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">Đặt mua</Link>
        </nav>
      </div>
    </header>
  );
}
