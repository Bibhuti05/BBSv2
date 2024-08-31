import React from 'react';
import styles from './home.module.css';
import Hero from '../../components/HeroSection/Hero';
import NavBar from '../../components/NavBar/NavBar';
import HoverCard from '../../components/HoverCard/HoverCard'

//skill section 

function SkillSection(){
  return(
    <div className={styles.skillSection}>
      <div className={styles.radialColor}></div>
      <div className={styles.radialColor2}></div>
      <HoverCard />
    </div>
  )
}

export default function Home() {
  return (
    <div className={styles.container}>
        <NavBar />
        <Hero />
        <SkillSection />
    </div>
  )
}
