import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SkirtGuide = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);
  const smoothWrapperRef = useRef(null);
  const parallaxRef = useRef(null);
  const videoRef = useRef(null);
  const controls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const springScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Initialize GSAP ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: containerRef.current,
      smooth: 1.5,
      effects: true
    });

    // Parallax effects
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
      gsap.to(element, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Cleanup
    return () => smoother.kill();
  }, []);

  const sections = [
    {
      title: "Finding Your Perfect Skirt Length",
      content: "The journey to finding your ideal skirt length begins with understanding your body proportions...",
      image: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg"
    },
    {
      title: "The Mini Skirt",
      content: "Mini skirts, typically falling above the knee, create an illusion of longer legs...",
      image: "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg"
    },
    {
      title: "The Midi Skirt",
      content: "The versatile midi skirt hits between the knee and ankle, offering endless styling possibilities...",
      image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg"
    },
    {
      title: "The Maxi Skirt",
      content: "Maxi skirts bring drama and elegance to any outfit, perfect for both casual and formal occasions...",
      image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg"
    }
  ];

  return (
    <div ref={smoothWrapperRef} className="min-h-screen overflow-hidden bg-[#0a0a0a]">
      <div ref={containerRef} className="relative">
        {/* Hero Section with Parallax */}
        <motion.section 
          className="h-screen relative flex items-center justify-center overflow-hidden"
          style={{ scale }}
        >
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ 
              backgroundImage: `url(${sections[0].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity,
              y
            }}
          />
          <div className="absolute inset-0 bg-black/50 z-1" />
          <motion.div 
            className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl font-bold mb-6">The Ultimate Skirt Guide</h1>
            <p className="text-xl mb-8">Discover the perfect length and style for your body type</p>
          </motion.div>
        </motion.section>

        {/* Interactive Length Guide */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <motion.img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                      <p className="text-sm opacity-90">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3D Card Section */}
        <section className="py-20 bg-[#0a0a0a] text-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {[...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800"
                  whileHover={{ 
                    rotateY: 15,
                    rotateX: 15,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="h-48 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={`https://source.unsplash.com/random/400x300?fashion,skirt&sig=${index}`}
                      alt="Fashion"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Style Tip #{index + 1}</h3>
                  <p className="text-gray-400">Discover how to style your skirts for any occasion...</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Video Section with Hover Effect */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="relative aspect-video rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                poster="https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg"
              >
                <source src="https://your-video-source.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <motion.button
                  className="bg-white text-black px-8 py-3 rounded-full font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Guide
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Floating Elements Section */}
        <section className="py-20 bg-[#0a0a0a] text-white relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[...Array(20)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-4 h-4 rounded-full bg-white/10"
                animate={{
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth
                  ],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight
                  ]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              className="text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Style?
            </motion.h2>
            <motion.p
              className="text-xl mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join our community of fashion enthusiasts and get personalized style advice.
            </motion.p>
            <motion.button
              className="bg-white text-black px-8 py-4 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SkirtGuide; 