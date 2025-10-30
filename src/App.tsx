import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/layout/Layout';
import HackingLoader from './components/ui/HackingLoader';
import BackgroundAnimation from './components/ui/BackgroundAnimation';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="loading-spinner mx-auto mb-4"></div>
      <p className="text-text-tertiary">Loading...</p>
    </div>
  </div>
);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger after loading
    if (!isInitialLoading) {
      ScrollTrigger.refresh();
    }
  }, [isInitialLoading]);

  const handleLoadingComplete = () => {
    setIsInitialLoading(false);
  };

  return (
    <>
      {/* Initial hacking-style loading screen */}
      {isInitialLoading && <HackingLoader onComplete={handleLoadingComplete} />}

      {/* Main application */}
      {!isInitialLoading && (
        <>
          {/* Background animations */}
          <BackgroundAnimation />

          <Router basename="/nourkhadour">
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
