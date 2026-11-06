import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransition } from './components/PageTransition';
import { SmoothScroll } from './components/SmoothScroll';
import { BrandedPreloader } from './components/BrandedPreloader';

import { HomePage } from './pages/HomePage';
import { LabPage } from './pages/LabPage';
import { AboutPage } from './pages/AboutPage';
import { ConnectPage } from './pages/ConnectPage';

export function App() {
  const location = useLocation();
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  return (
    <SmoothScroll>
      {!isPreloaderDone && (
        <BrandedPreloader onComplete={() => setIsPreloaderDone(true)} />
      )}
      <div className="min-h-screen bg-black text-[#f5f5f7] selection:bg-blue-500/30 selection:text-white flex flex-col justify-between">
        <ScrollToTop />
        {/* Translucent Glass Navigation */}
        <Navbar />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <HomePage />
                  </PageTransition>
                }
              />
              <Route
                path="/lab"
                element={
                  <PageTransition>
                    <LabPage />
                  </PageTransition>
                }
              />
              <Route
                path="/about"
                element={
                  <PageTransition>
                    <AboutPage />
                  </PageTransition>
                }
              />
              <Route
                path="/connect"
                element={
                  <PageTransition>
                    <ConnectPage />
                  </PageTransition>
                }
              />
              <Route
                path="*"
                element={
                  <PageTransition>
                    <HomePage />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Respectful Clean Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
