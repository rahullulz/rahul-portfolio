import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Credentials from './components/Credentials';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="grain" style={{ background: '#030712', minHeight: '100vh', overflowX: 'hidden' }}>
      <Cursor />
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <Experience />
        <Skills />
        <Credentials />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
