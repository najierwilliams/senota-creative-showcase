import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import UnderConstruction from "@/pages/UnderConstruction";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage";
import CreativeShowcase from "./pages/Home";
import CommunityPage from "./pages/CommunityPage";
import AdvertisingPage from "./pages/AdvertisingPage";
import AcademyPage from "./pages/AcademyPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SubmitPage from "./pages/SubmitPage";
import PrivacyPage from "./pages/PrivacyPage";
import AcademyEnrollPage from "./pages/AcademyEnrollPage";

// Routes still under construction (not yet built)
const UNDER_CONSTRUCTION_ROUTES = [
  "/magazine",
  "/fashion",
  "/music",
  "/photography",
  "/art-culture",
  "/modeling",
  "/branding",
  "/events",
  "/archive",
];

function Router() {
  return (
    <Switch>
      {/* Main homepage */}
      <Route path={"/"} component={HomePage} />

      {/* Creative Showcase archive */}
      <Route path={"/creatives"} component={CreativeShowcase} />

      {/* Community */}
      <Route path={"/community"} component={CommunityPage} />

      {/* Advertising */}
      <Route path={"/advertising"} component={AdvertisingPage} />

      {/* Academy */}
      <Route path={"/academy"} component={AcademyPage} />

      {/* Academy Enrollment */}
      <Route path={"/academy/enroll"} component={AcademyEnrollPage} />

      {/* About */}
      <Route path={"/about"} component={AboutPage} />

      {/* Contact */}
      <Route path={"/contact"} component={ContactPage} />

      {/* Submit Work */}
      <Route path={"/submit"} component={SubmitPage} />

      {/* Privacy Policy */}
      <Route path={"/privacy"} component={PrivacyPage} />

      {/* Under-construction section pages */}
      {UNDER_CONSTRUCTION_ROUTES.map((path) => (
        <Route key={path} path={path} component={UnderConstruction} />
      ))}

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
