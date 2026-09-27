import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { world, webgl, reducedMotion } from './lib/store';
import { initShots, initReveals, initVelocitySkew, initTilt, initPhotoOpen } from './lib/cinema';
import ScrollProgressBar from './components/ScrollProgressBar';
import MagneticCursor from './components/MagneticCursor';
import LoadingScreen from './components/LoadingScreen';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import StackedProjects from './components/StackedProjects';
import TileRows from './components/TileRows';
import PartnerCTA from './components/PartnerCTA';
import FooterMarquee from './components/FooterMarquee';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import SystemHookSection from './components/SystemHookSection';
import HardwareToAiSection from './components/HardwareToAiSection';
import CareerJourneySection from './components/CareerJourneySection';
import ImpactSection from './components/ImpactSection';
import DigitalEcosystemSection from './components/DigitalEcosystemSection';
import SelectedSystemsSection from './components/SelectedSystemsSection';
import SecuritySection from './components/SecuritySection';
import AutomationSection from './components/AutomationSection';
import CapabilityUniverseSection from './components/CapabilityUniverseSection';
import HumanStorySection from './components/HumanStorySection';
import FinalSystemContactSection from './components/FinalSystemContactSection';
import VelocityMarquee from './components/VelocityMarquee';
import LiquidGlassFilter from './components/fx/LiquidGlassFilter';
import ChapterRail from './components/ChapterRail';
import HeadTurn from './components/HeadTurn';
import RedShift from './components/RedShift';
import LocalTime from './components/LocalTime';

const HazeCanvas = lazy(() => import('./components/HazeCanvas'));

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = ['hero', 'layers', 'turn', 'journey', 'impact', 'services', 'flagship', 'systems', 'ecosystem', 'redshift', 'security', 'automation', 'capabilities', 'about', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const activeRef = useRef('hero');
  const lenisRef = useRef<Lenis | null>(null);
  const onLoaded = useCallback(() => { (window as unknown as { __vkLoaded?: boolean }).__vkLoaded = true; if (window.scrollY < 50) world.shot = 'hero'; ScrollTrigger.refresh(); window.dispatchEvent(new Event('vk:loaded')); }, []);

  // Smooth scroll → ScrollTrigger + shared world state. No React state per frame.
  useEffect(() => {
    const lenis = new Lenis({ anchors: { offset: -70 }, duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: !reducedMotion });
    lenisRef.current = lenis;
    if (document.documentElement.classList.contains('is-loading')) lenis.stop();
    lenis.on('scroll', (l: Lenis) => {
      ScrollTrigger.update();
      world.progress = l.progress;
      world.velocity = l.velocity;
    });
    const onScrollTo = (e: Event) => lenis.scrollTo((e as CustomEvent<number>).detail, { duration: 1.1 });
    window.addEventListener('vk:scrollto', onScrollTo);
    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener('vk:modal-open', stop);
    window.addEventListener('vk:modal-close', start);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); window.removeEventListener('vk:modal-open', stop); window.removeEventListener('vk:modal-close', start); window.removeEventListener('vk:scrollto', onScrollTo); };
  }, []);

  // Active nav item: IntersectionObserver, state only changes when the section changes
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && activeRef.current !== e.target.id) {
          activeRef.current = e.target.id;
          setActiveSection(e.target.id);
        }
      }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // Cinematic systems (created after all sections have set up their own pins)
  useEffect(() => {
    const ctx = gsap.context(() => {
      initShots();
      initReveals();
      initPhotoOpen();
    });
    const stopSkew = initVelocitySkew();
    const stopTilt = initTilt();
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    const t = setTimeout(refresh, 800);
    return () => { ctx.revert(); stopSkew(); stopTilt(); clearTimeout(t); };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target && lenisRef.current) lenisRef.current.scrollTo(target, { offset: -70, duration: 1.4 });
    else target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-[#F5F5F2] selection:bg-[#2F7BFF] selection:text-white">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="film-grain-overlay" aria-hidden="true" />
      <div className="cinema-vignette" aria-hidden="true" />
      <LiquidGlassFilter />
      <MagneticCursor />
      {webgl ? (
        <Suspense fallback={null}><HazeCanvas /></Suspense>
      ) : (
        <div className="haze-layer haze-fallback" aria-hidden="true" />
      )}
      <ScrollProgressBar />
      <LoadingScreen onComplete={onLoaded} />
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      <ChapterRail active={activeSection} onNavigate={handleNavigate} />

      <main id="main" className="relative z-10">
        <HeroSection onExplore={() => handleNavigate('layers')} />
        <SystemHookSection />
        <HardwareToAiSection />
        <Manifesto />
        <HeadTurn />
        <VelocityMarquee />
        <CareerJourneySection />
        <ImpactSection />
        <Services />
        <StackedProjects />
        <SelectedSystemsSection />
        <TileRows />
        <DigitalEcosystemSection />
        <RedShift />
        <SecuritySection />
        <AutomationSection />
        <CapabilityUniverseSection />
        <VelocityMarquee reverse />
        <HumanStorySection />
        <PartnerCTA onContact={() => handleNavigate('contact')} />
        <FinalSystemContactSection />
        <div className="site-footer">
        <FooterMarquee />
        <footer className="site-foot">
          <span className="available"><i /> Open to new conversations</span>
          <span>© {new Date().getFullYear()} Vijaya Kumar L · <LocalTime /></span>
          <span style={{ display: 'flex', gap: 24 }}>
            <a href="https://www.linkedin.com/in/vijayakumarl/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/risewithvj" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://trendit.in/author/vijayakumarl/" target="_blank" rel="noopener noreferrer">Blog</a>
          </span>
        </footer>
        </div>
      </main>
    </div>
  );
}
