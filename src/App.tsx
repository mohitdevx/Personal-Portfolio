import Navbar from "./components/Navbar"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Contributions from "./pages/Contributions"
import TechStack from "./pages/TechStack"

const App = () => {
    return (
        <>
            <Navbar />
            <main>
                <About />
                <Contributions />
                <TechStack />
                <Projects />
            </main>
        </>
    )
}

export default App