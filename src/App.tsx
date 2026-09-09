import Navbar from "./components/Navbar"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Contributions from "./pages/Contributions"
import TechStack from "./pages/TechStack"
import Footer from "./components/Footer"

const App = () => {
    return (
        <>
            <Navbar />
            <main>
                <About />
                <Projects />
                <Contributions />
                <TechStack />
            </main>
            <Footer />
        </>
    )
}

export default App