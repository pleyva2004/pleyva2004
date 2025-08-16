import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Sidebar />
      <Header />
      <main>
        <Hero />
        <Timeline />
        <Contact />
      </main>
    </div>
  );
}

export default App;