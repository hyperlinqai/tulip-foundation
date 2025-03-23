
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "@/lib/transitions";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Fundraising from "./pages/Fundraising";
import SummerCamps from "./pages/SummerCamps";
import TulipTrot from "./pages/TulipTrot";
import JoinTeam from "./pages/JoinTeam";
import Support from "./pages/Support";
import About from "./pages/About";
import WhoWeAre from "./pages/WhoWeAre";
import Leadership from "./pages/Leadership";
import DonationSuccess from "./pages/DonationSuccess";
import Admin from "./pages/Admin";

function App() {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/fundraising" element={<Fundraising />} />
              <Route path="/summer-camps" element={<SummerCamps />} />
              <Route path="/tulip-trot" element={<TulipTrot />} />
              <Route path="/join-team" element={<JoinTeam />} />
              <Route path="/support" element={<Support />} />
              <Route path="/about" element={<About />} />
              <Route path="/donation-success" element={<DonationSuccess />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
              {/* <Route path="/who-we-are" element={<WhoWeAre />} /> */}
              <Route path="/leadership" element={<Leadership />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
