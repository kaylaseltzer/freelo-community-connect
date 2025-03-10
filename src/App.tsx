
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import Index from "./pages/Index";
import Events from "./pages/Events";
import PrivateEvents from "./pages/PrivateEvents";
import SavedEvents from "./pages/SavedEvents";
import Auth from "./pages/Auth";
import AddEvent from "./pages/AddEvent";
import PublishOptions from "./pages/PublishOptions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/events" element={<Events />} />
              <Route path="/private-events" element={<PrivateEvents />} />
              <Route path="/saved" element={<SavedEvents />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/add-event" element={<AddEvent />} />
              <Route path="/publish-options" element={<PublishOptions />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
