import AuroraCanvas from '../components/effects/AuroraCanvas';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import GitHubSection from '../sections/GitHubSection';
import LinkedInSection from '../sections/LinkedInSection';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <>
      <AuroraCanvas />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubSection />
        <LinkedInSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
