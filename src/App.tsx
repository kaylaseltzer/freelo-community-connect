
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import PrivateEvents from "./pages/PrivateEvents";
import SavedEvents from "./pages/SavedEvents";
import Auth from "./pages/Auth";
import AddEvent from "./pages/AddEvent";
import PublishOptions from "./pages/PublishOptions";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AccountSettings from "./pages/AccountSettings";
import Membership from "./pages/Membership";
import Tickets from "./pages/Tickets";

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
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/private-events" element={<PrivateEvents />} />
              <Route path="/saved" element={<SavedEvents />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/add-event" element={<AddEvent />} />
              <Route path="/publish-options" element={<PublishOptions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account-settings" element={<AccountSettings />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/tickets" element={<Tickets />} />
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
