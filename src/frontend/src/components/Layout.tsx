import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Coins,
  LogIn,
  LogOut,
  Menu,
  Shield,
  Swords,
  Trophy,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { formatCoinShort } from "../utils/format";

interface LayoutProps {
  children: React.ReactNode;
  coins?: number;
}

const NAV_LINKS = [
  { to: "/", label: "Tournaments", icon: Trophy },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/admin", label: "Admin", icon: Shield },
];

function NavLink({
  to,
  label,
  icon: Icon,
  onClick,
}: {
  to: string;
  label: string;
  icon: typeof Trophy;
  onClick?: () => void;
}) {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to !== "/" && location.pathname.startsWith(to));
  return (
    <Link
      to={to}
      onClick={onClick}
      data-ocid={`nav.${label.toLowerCase()}_link`}
      className={`flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-display font-semibold uppercase tracking-wider transition-smooth
        ${
          isActive
            ? "text-primary bg-primary/10 border border-primary/30"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
    >
      <Icon size={15} />
      {label}
    </Link>
  );
}

export function Layout({ children, coins = 0 }: LayoutProps) {
  const { isAuthenticated, login, logout, username } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.logo_link"
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-sm bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Swords size={18} className="text-primary" />
            </div>
            <span className="font-display font-black text-lg uppercase tracking-tight">
              <span className="text-primary">FIRE</span>
              <span className="text-foreground"> ARENA</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon }) => (
              <NavLink key={to} to={to} label={label} icon={icon} />
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Coin chip */}
            {isAuthenticated && (
              <Link
                to="/wallet"
                data-ocid="nav.wallet_chip"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-smooth"
              >
                <Coins size={13} className="text-accent" />
                <span className="font-display font-bold text-accent text-sm">
                  {formatCoinShort(coins)}
                </span>
              </Link>
            )}

            {/* Auth button */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-body truncate max-w-[100px]">
                  {username}
                </span>
                <Button
                  data-ocid="nav.logout_button"
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="font-display font-bold text-xs uppercase border-border hover:border-destructive hover:text-destructive"
                >
                  <LogOut size={13} className="mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                data-ocid="nav.login_button"
                size="sm"
                onClick={login}
                className="hidden md:flex btn-glow font-display font-black text-xs uppercase tracking-widest"
              >
                <LogIn size={13} className="mr-1" />
                Login
              </Button>
            )}

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  data-ocid="nav.menu_button"
                  variant="outline"
                  size="icon"
                  className="md:hidden border-border"
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-card border-border w-64 p-0"
              >
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-border">
                    <span className="font-display font-black text-base uppercase tracking-tight">
                      <span className="text-primary">FIRE</span>
                      <span className="text-foreground"> ARENA</span>
                    </span>
                  </div>
                  {isAuthenticated && (
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-body text-muted-foreground">
                          {username}
                        </span>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-accent/10 border border-accent/30">
                          <Coins size={12} className="text-accent" />
                          <span className="font-display font-bold text-accent text-xs">
                            {formatCoinShort(coins)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <nav className="flex flex-col gap-1 p-3 flex-1">
                    {NAV_LINKS.map(({ to, label, icon }) => (
                      <NavLink
                        key={to}
                        to={to}
                        label={label}
                        icon={icon}
                        onClick={() => setMobileOpen(false)}
                      />
                    ))}
                  </nav>
                  <Separator className="bg-border" />
                  <div className="p-3">
                    {isAuthenticated ? (
                      <Button
                        data-ocid="nav.mobile_logout_button"
                        variant="outline"
                        className="w-full font-display font-bold text-xs uppercase border-border hover:border-destructive hover:text-destructive"
                        onClick={() => {
                          logout();
                          setMobileOpen(false);
                        }}
                      >
                        <LogOut size={13} className="mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <Button
                        data-ocid="nav.mobile_login_button"
                        className="w-full btn-glow font-display font-black text-xs uppercase tracking-widest"
                        onClick={() => {
                          login();
                          setMobileOpen(false);
                        }}
                      >
                        <LogIn size={13} className="mr-2" />
                        Login to Play
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-display font-bold text-xs text-muted-foreground uppercase tracking-wider">
            <span className="text-primary">FIRE ARENA</span> — Battle for Glory
          </span>
          <span className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-smooth"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
