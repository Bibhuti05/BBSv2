import React from 'react';
import styles from './home.module.css';
import Hero from '../../components/HeroSection/Hero';
import NavBar from '../../components/NavBar/NavBar';
import HoverCard from '../../components/HoverCard/HoverCard'

export default function Home() {
  return (
    <div className={styles.container}>
        <NavBar />
        <Hero />
        <HoverCard />
    </div>
  )
}
