import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import UnderConstruction from "@/pages/UnderConstruction";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const UNDER_CONSTRUCTION_ROUTES = [
  "/magazine",
  "/fashion",
  "/music",
  "/photography",
  "/art-culture",
  "/modeling",
  "/advertising",
  "/academy",
  "/community",
  "/branding",
  "/events",
  "/about",
  "/archive",
  "/submit",
  "/contact",
  "/privacy",
];

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      {UNDER_CONSTRUCTION_ROUTES.map((path) => (
        <Route key={path} path={path} component={UnderConstruction} />
      ))}
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
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
