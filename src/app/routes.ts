import { createBrowserRouter } from 'react-router';
import Root from './Root';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ColombiaPage from './pages/ColombiaPage';
import FloridaPage from './pages/FloridaPage';
import TravelPage from './pages/TravelPage';
import RSVPPage from './pages/RSVPPage';
import SchedulePage from './pages/SchedulePage';
import BridalPartyPage from './pages/BridalPartyPage';
import RegistryPage from './pages/RegistryPage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: 'login', Component: LoginPage },
      { path: 'dashboard', Component: DashboardPage },
      { path: 'colombia', Component: ColombiaPage },
      { path: 'florida', Component: FloridaPage },
      { path: 'travel', Component: TravelPage },
      { path: 'rsvp', Component: RSVPPage },
      { path: 'schedule', Component: SchedulePage },
      { path: 'bridal-party', Component: BridalPartyPage },
      { path: 'registry', Component: RegistryPage },
      { path: 'gallery', Component: GalleryPage },
      { path: 'admin', Component: AdminPage },
    ],
  },
]);
