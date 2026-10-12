import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ThemeProvider } from './context/ThemeContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DemoNotice } from './components/common/DemoNotice';

// Public Pages
import { HomePage } from './pages/HomePage';
import { StayPage } from './pages/StayPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { DiningPage } from './pages/DiningPage';
import { WeddingsEventsPage } from './pages/WeddingsEventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { BookingPage } from './pages/BookingPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

// Admin Suite Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminRoomsPage } from './pages/admin/AdminRoomsPage';
import { AdminReservationsPage } from './pages/admin/AdminReservationsPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

import { CinematicIntro } from './components/common/CinematicIntro';

function AppRoutes() {
  const { path } = useRouter();
  const [introSeen, setIntroSeen] = React.useState(() => {
    try {
      return sessionStorage.getItem('rajmahal_intro_seen') === 'true';
    } catch {
      return false;
    }
  });

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('rajmahal_intro_seen', 'true');
    } catch {}
    setIntroSeen(true);
  };

  const isAdminRoute = path.startsWith('/admin');

  const renderCurrentPage = () => {
    // Exact routes
    if (path === '/' || path === '') return <HomePage />;
    if (path === '/stay') return <StayPage />;
    if (path.startsWith('/stay/')) return <RoomDetailPage />;
    if (path === '/experiences') return <ExperiencesPage />;
    if (path === '/dining') return <DiningPage />;
    if (path === '/weddings-events') return <WeddingsEventsPage />;
    if (path === '/gallery') return <GalleryPage />;
    if (path === '/booking') return <BookingPage />;
    if (path.startsWith('/booking/')) return <BookingConfirmationPage />;
    if (path === '/contact') return <ContactPage />;
    if (path === '/terms') return <TermsPage />;
    if (path === '/privacy') return <PrivacyPage />;

    // Admin routes
    if (path === '/admin/login' || path === '/admin') return <AdminLoginPage />;
    if (path === '/admin/dashboard') return <AdminDashboardPage />;
    if (path === '/admin/rooms') return <AdminRoomsPage />;
    if (path === '/admin/reservations') return <AdminReservationsPage />;
    if (path === '/admin/events') return <AdminEventsPage />;
    if (path === '/admin/content') return <AdminContentPage />;
    if (path === '/admin/settings') return <AdminSettingsPage />;

    // Fallback 404
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl text-[#17382B] dark:text-[#F4EFE8] mb-3">
          Page Not Found
        </h2>
        <p className="text-xs text-[#5E6963] dark:text-[#95A39B] mb-6">
          The requested page does not exist or may have been moved.
        </p>
        <a
          href="/"
          className="inline-block px-5 py-2.5 rounded-lg text-xs font-semibold uppercase bg-[#17382B] text-white"
        >
          Return to Homepage
        </a>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] dark:bg-[#0B120F] text-[#18201C] dark:text-[#F4EFE8] transition-colors duration-200">
      {!introSeen && <CinematicIntro onComplete={handleIntroComplete} />}
      <DemoNotice />
      {!isAdminRoute && <Header />}
      {isAdminRoute && path === '/admin/login' && <Header />}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AdminAuthProvider>
          <AppRoutes />
        </AdminAuthProvider>
      </RouterProvider>
    </ThemeProvider>
  );
}
