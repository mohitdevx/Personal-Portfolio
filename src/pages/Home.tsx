import React from 'react';
import About from './About';
import Projects from './Projects';
import Contributions from './Contributions';
import TechStack from './TechStack';

const Home: React.FC = () => {
  return (
    <>
      <About />
      <Projects />
      <Contributions />
      <TechStack />
    </>
  );
};

export default Home;
