import Nav from "./components/layout/Nav";
import Hero from "./components/layout/Hero";
import Footer from "./components/layout/Footer";
import Timeline from "./components/timeline/Timeline";
import ProjectsGrid from "./components/projects/ProjectsGrid";
import BlogList from "./components/blog/BlogList";

export default function App() {
  return (
    <div id="top" className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Timeline />
        <ProjectsGrid />
        <BlogList />
      </main>
      <Footer />
    </div>
  );
}
