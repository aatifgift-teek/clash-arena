import { Skeleton } from "@/components/ui/skeleton";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { RegistrationModal } from "./components/RegistrationModal";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { useWallet } from "./hooks/useWallet";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const TournamentDetailPage = lazy(() => import("./pages/TournamentDetailPage"));
const WalletPage = lazy(() => import("./pages/WalletPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage"));

function PageLoader() {
  return (
    <div className="space-y-4 py-4">
      <Skeleton className="h-10 w-1/3 bg-muted" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
          <Skeleton key={k} className="h-64 bg-muted rounded-sm" />
        ))}
      </div>
    </div>
  );
}

// Root component with auth & wallet state
function RootLayout() {
  const { isAuthenticated, isRegistered, setRegistered } = useAuth();
  const { balance } = useWallet(1000);

  return (
    <>
      <Layout coins={balance}>
        <Outlet />
      </Layout>
      {/* Registration modal: show when authenticated but not registered */}
      <RegistrationModal
        open={isAuthenticated && !isRegistered}
        onRegister={setRegistered}
      />
    </>
  );
}

// Route tree
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const tournamentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tournaments/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TournamentDetailPage />
    </Suspense>
  ),
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wallet",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <WalletPage />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPage />
    </Suspense>
  ),
});

const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LeaderboardPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  tournamentDetailRoute,
  walletRoute,
  profileRoute,
  adminRoute,
  leaderboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
