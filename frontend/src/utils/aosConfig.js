// src/utils/aosConfig.js
import AOS from 'aos';
import 'aos/dist/aos.css';

export const initAOS = () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
};