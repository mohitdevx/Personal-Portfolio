import Navbar from "./components/Navbar"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Contributions from "./pages/Contributions"
import TechStack from "./pages/TechStack"
import Footer from "./components/Footer"
import H4xBackground from "./components/H4xBackground"
import CursorLine from "./components/CursorLine"

const App = () => {
    return (
        <div className="relative min-h-screen">
            <H4xBackground />
            <CursorLine />
            <Navbar />
            <main className="relative z-10">
                <About />
                <Projects />
                <Contributions />
                <TechStack />
            </main>
            <Footer />
        </div>
    )
}

export default App