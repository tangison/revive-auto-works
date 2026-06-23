'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import {
  ChevronDown,
  Cpu,
  Droplet,
  CircleDot,
  BatteryCharging,
  ClipboardCheck,
  CarFront,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  X,
  ArrowRight,
  Wrench,
} from 'lucide-react';

// Local logo — uses the user-uploaded PNG logo
const LogoSvg = ({ className = '' }: { className?: string }) => (
  <img
    src="/logo-512.png"
    alt="Revive Auto Works logo"
    width={40}
    height={40}
    className={className}
    decoding="async"
  />
);

// Brand Constants
const WA_NUMBER = "264812680826";
const WA_MESSAGE = "Hi Revive Auto Works, I'd like to book a service for my vehicle.";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
const WA_LINK_PLAIN = `https://wa.me/${WA_NUMBER}`;
const EMAIL = "reviveautonam@gmail.com";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Components
const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative flex items-center justify-center w-12 h-12">
      <LogoSvg className="w-12 h-12" />
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-bold tracking-wider text-white leading-none uppercase" style={{ fontFamily: 'Manrope, sans-serif' }}>
        Revive
      </span>
      <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#8d939b] leading-none mt-1 uppercase">
        Auto Works
      </span>
    </div>
  </div>
);

const Button = ({ children, href, primary = true, className = "", icon = false }: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  className?: string;
  icon?: boolean;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-wide uppercase transition-all duration-300 rounded-lg group ${
      primary
        ? "bg-[#1E90FF] text-white hover:bg-[#1570cc] hover:shadow-[0_0_20px_rgba(30,144,255,0.4)]"
        : "bg-transparent text-white border border-white/20 hover:border-[#1E90FF] hover:bg-[#1E90FF]/10"
    } ${className}`}
  >
    {children}
    {icon && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
  </a>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Adapt motion variants based on user's reduced-motion preference
  const motionVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0, transition: { duration: 0 } } }
    : fadeInUp;
  const motionStagger = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0 } } }
    : staggerContainer;

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'About', href: '#about' },
  ];

  // Local Business Schema for SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Revive Auto Works",
    "description": "Professional vehicle diagnostics, repairs and maintenance services. Driven by excellence.",
    "url": "https://revive-auto-works.vercel.app",
    "telephone": `+${WA_NUMBER}`,
    "email": EMAIL,
    "areaServed": {
      "@type": "Country",
      "name": "Namibia"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "priceRange": "$$",
    "sameAs": [WA_LINK_PLAIN]
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#f3f4f6] selection:bg-[#1E90FF] selection:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>

      {/* JSON-LD Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1E90FF] focus:text-white focus:rounded-md focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <header>
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#090a0f]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`} aria-label="Main navigation">
          <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
            <a href="#" className="z-50 relative" aria-label="Revive Auto Works home"><Logo /></a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-sm font-semibold text-[#8d939b] hover:text-white transition-colors tracking-wide uppercase">
                    {link.name}
                  </a>
                ))}
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-[#1E90FF] text-white border border-white/10 hover:border-[#1E90FF] rounded-md transition-all text-sm font-bold tracking-wider uppercase group"
              >
                <MessageCircle className="w-4 h-4 group-hover:animate-pulse" aria-hidden="true" />
                Book Service
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden z-50 relative text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 right-0 h-screen bg-[#090a0f] border-b border-white/10 flex flex-col items-center justify-center gap-8 md:hidden"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white uppercase tracking-widest"
                  >
                    {link.name}
                  </a>
                ))}
                <Button href={WA_LINK} primary={true} className="mt-8">
                  <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                  Book via WhatsApp
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" aria-labelledby="hero-heading">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#090a0f]/80 via-[#090a0f]/60 to-[#090a0f] z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1E90FF]/10 via-transparent to-transparent opacity-50 z-10" />
            <Image
              src="/images/hero-2560.webp"
              alt="Premium automotive headlights lighting up the workshop at night"
              fill
              priority
              sizes="100vw"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>

          <div className="container relative z-20 max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-2/3 lg:w-3/5"
              initial="hidden"
              animate="visible"
              variants={motionStagger}
            >
              <motion.div variants={motionVariants} className="inline-block mb-4 px-3 py-1 rounded-full border border-[#1E90FF]/30 bg-[#1E90FF]/10 backdrop-blur-sm">
                <span className="text-[#1E90FF] text-xs font-bold tracking-[0.2em] uppercase">Driven By Excellence</span>
              </motion.div>

              <motion.h1 id="hero-heading" variants={motionVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                EXPERT CARE.<br/>
                <span className="text-[#1E90FF]">LASTING<br/>PERFORMANCE.</span>
              </motion.h1>

              <motion.p variants={motionVariants} className="text-lg md:text-xl text-[#8d939b] font-medium mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
                At Revive Auto Works, we deliver reliable, high-quality automotive solutions to keep your vehicle running safely and smoothly.
              </motion.p>

              <motion.div variants={motionVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Button href={WA_LINK} primary={true} icon={true} className="w-full sm:w-auto">
                  Book Service
                </Button>
                <Button href={WA_LINK_PLAIN} primary={false} className="w-full sm:w-auto">
                  <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                  Chat on WhatsApp
                </Button>
              </motion.div>

              <motion.ul variants={motionVariants} className="mt-12 flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-semibold text-[#8d939b] list-none p-0">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E90FF]" aria-hidden="true" /> Experienced Technicians</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E90FF]" aria-hidden="true" /> Quality Parts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1E90FF]" aria-hidden="true" /> Reliable Service</li>
              </motion.ul>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          {!prefersReducedMotion && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-[#8d939b] hidden md:flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            aria-hidden="true"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
          )}
        </section>

        {/* Trust Strip */}
        <section className="bg-[#12141c] border-y border-white/5 py-12" aria-label="Company statistics">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
              {[
                { label: "Years Experience", value: "10+" },
                { label: "Vehicles Serviced", value: "5,000+" },
                { label: "Quality OEM Parts", value: "100%" },
                { label: "Customer Satisfaction", value: "99%" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center px-4"
                >
                  <div className="text-3xl md:text-5xl font-extrabold text-white mb-2">{stat.value}</div>
                  <div className="text-xs md:text-sm font-semibold tracking-wider text-[#8d939b] uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 md:py-32 bg-[#090a0f] relative" aria-labelledby="services-heading">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1E90FF]/5 to-transparent pointer-events-none" aria-hidden="true" />

          <div className="container max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-20"
            >
              <h2 className="text-[#1E90FF] text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Services</h2>
              <h3 id="services-heading" className="text-3xl md:text-5xl font-extrabold text-white mb-6">ENGINEERED FOR EXCELLENCE</h3>
              <div className="h-1 w-20 bg-[#1E90FF] mx-auto rounded-full" aria-hidden="true" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Cpu className="w-8 h-8" />,
                  title: "Engine Diagnostics & Repairs",
                  desc: "Advanced diagnostic testing and expert repairs to get to the root of the problem with precision."
                },
                {
                  icon: <Droplet className="w-8 h-8" />,
                  title: "Routine Servicing",
                  desc: "Oil changes, filter replacements, fluid checks and comprehensive full vehicle inspections."
                },
                {
                  icon: <CircleDot className="w-8 h-8" />,
                  title: "Brake & Suspension",
                  desc: "Brake inspections, repairs and replacements. Suspension diagnostics for a smooth, safe ride."
                },
                {
                  icon: <BatteryCharging className="w-8 h-8" />,
                  title: "Electrical System Repairs",
                  desc: "Battery tests, wiring repairs, alternators, starters and premium lighting solutions."
                },
                {
                  icon: <ClipboardCheck className="w-8 h-8" />,
                  title: "Pre-Purchase Inspections",
                  desc: "Detailed vehicle inspections for your absolute peace of mind before you buy."
                },
                {
                  icon: <CarFront className="w-8 h-8" />,
                  title: "General Maintenance",
                  desc: "From minor tweaks to major overhauls, we've got your vehicle covered end-to-end."
                }
              ].map((service, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-8 rounded-2xl bg-[#12141c] border border-white/5 hover:border-[#1E90FF]/50 hover:shadow-[0_0_30px_rgba(30,144,255,0.05)] transition-all duration-300 flex flex-col items-start"
                >
                  <div className="p-4 rounded-xl bg-[#090a0f] border border-white/5 text-[#1E90FF] group-hover:scale-110 group-hover:bg-[#1E90FF] group-hover:text-white transition-all duration-300 mb-6" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{service.title}</h4>
                  <p className="text-[#8d939b] leading-relaxed text-sm font-medium">{service.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-[#12141c]" aria-labelledby="about-heading">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[#1E90FF]/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" aria-hidden="true" />
                <Image
                  src="/images/engine-detail-2048.webp"
                  alt="Close-up of a modern automotive engine bay during maintenance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-[#090a0f]/90 backdrop-blur-md border border-white/10 p-6 rounded-xl">
                  <div className="text-4xl font-extrabold text-white mb-1">100%</div>
                  <div className="text-xs font-bold text-[#1E90FF] tracking-wider uppercase">Commitment to Quality</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-[#1E90FF] text-sm font-bold tracking-[0.2em] uppercase mb-4">The Revive Standard</h2>
                <h3 id="about-heading" className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  WE DON&apos;T JUST FIX CARS.<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E90FF] to-[#42a5ff]">WE REVIVE THEM.</span>
                </h3>
                <p className="text-[#8d939b] text-lg mb-8 leading-relaxed">
                  We believe that premium automotive care shouldn&apos;t be a luxury—it should be the standard. From complex diagnostics to meticulous preventative maintenance, our specialized workshop is equipped to handle modern engineering with absolute precision.
                </p>
                <p className="text-[#8d939b] text-lg mb-10 leading-relaxed">
                  Driven by precision and built on trust, our team of expert technicians treats every vehicle with the respect and attention to detail it deserves. Your safety and vehicle performance are our highest priorities.
                </p>

                <Button href={WA_LINK} primary={false} icon={true}>
                  Discuss Your Vehicle
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-us" className="py-24 bg-[#090a0f]" aria-labelledby="why-us-heading">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h2 className="text-[#1E90FF] text-sm font-bold tracking-[0.2em] uppercase mb-4">Why Choose Us</h2>
                <h3 id="why-us-heading" className="text-3xl md:text-4xl font-extrabold text-white mb-6">THE ADVANTAGE OF PRECISION.</h3>
                <p className="text-[#8d939b] mb-8">
                  We bridge the gap between dealership expertise and independent workshop personalization.
                </p>
                <Button href={WA_LINK} primary={true}>
                  Schedule Inspection
                </Button>
              </motion.div>

              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                {[
                  "Experienced Technicians",
                  "Quality OEM Components",
                  "Reliable, Transparent Service",
                  "Guaranteed Customer Satisfaction",
                  "State-of-the-Art Diagnostics",
                  "Efficient Turnaround Times"
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-xl bg-[#12141c] border border-white/5 flex items-center gap-4"
                  >
                    <div className="bg-[#1E90FF]/10 p-2 rounded-full text-[#1E90FF]" aria-hidden="true">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-white font-bold tracking-wide">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-24 bg-[#12141c] border-y border-white/5" aria-labelledby="process-heading">
          <div className="container max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-20"
            >
              <h2 className="text-[#1E90FF] text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Process</h2>
              <h3 id="process-heading" className="text-3xl md:text-5xl font-extrabold text-white mb-6">FROM CONTACT TO CONFIDENCE</h3>
              <div className="h-1 w-20 bg-[#1E90FF] mx-auto rounded-full" aria-hidden="true" />
            </motion.div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative list-none p-0">
              {/* Connecting line on desktop */}
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#1E90FF]/30 to-transparent" aria-hidden="true" />

              {[
                {
                  step: "01",
                  icon: <Phone className="w-7 h-7" />,
                  title: "Contact Us",
                  desc: "Reach out via WhatsApp to discuss your vehicle's needs and schedule a visit."
                },
                {
                  step: "02",
                  icon: <ClipboardCheck className="w-7 h-7" />,
                  title: "Vehicle Inspection",
                  desc: "Our technicians perform a thorough diagnostic assessment of your vehicle."
                },
                {
                  step: "03",
                  icon: <Wrench className="w-7 h-7" />,
                  title: "Repair & Service",
                  desc: "We execute precise repairs using quality OEM components and proven methods."
                },
                {
                  step: "04",
                  icon: <CarFront className="w-7 h-7" />,
                  title: "Drive With Confidence",
                  desc: "Get back on the road with a vehicle that performs safely and reliably."
                }
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-[#090a0f] border border-white/10 text-[#1E90FF] group-hover:border-[#1E90FF] group-hover:shadow-[0_0_30px_rgba(30,144,255,0.2)] transition-all duration-300 mb-6" aria-hidden="true">
                    {item.icon}
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1E90FF] text-white text-xs font-extrabold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3 tracking-wide uppercase">{item.title}</h4>
                  <p className="text-[#8d939b] leading-relaxed text-sm font-medium max-w-xs">{item.desc}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden bg-[#090a0f]" aria-labelledby="cta-heading">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1E90FF]/10 via-transparent to-transparent opacity-60" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(30,144,255,0.04),transparent)]" aria-hidden="true" />

          <div className="container relative z-10 max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-6 px-3 py-1 rounded-full border border-[#1E90FF]/30 bg-[#1E90FF]/10 backdrop-blur-sm">
                <span className="text-[#1E90FF] text-xs font-bold tracking-[0.2em] uppercase">Ready When You Are</span>
              </div>
              <h2 id="cta-heading" className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
                READY TO GET YOUR<br/>
                <span className="text-[#1E90FF]">VEHICLE BACK ON THE ROAD?</span>
              </h2>
              <p className="text-lg md:text-xl text-[#8d939b] font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                Book your service today. Our expert technicians are standing by to deliver the premium care your vehicle deserves.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href={WA_LINK} primary={true} icon={true} className="w-full sm:w-auto px-12 py-5 text-base">
                  WhatsApp Us Today
                </Button>
                <a
                  href={`tel:+${WA_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2 px-12 py-5 text-base font-bold tracking-wide uppercase transition-all duration-300 rounded-lg w-full sm:w-auto bg-transparent text-white border border-white/20 hover:border-[#1E90FF] hover:bg-[#1E90FF]/10"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#12141c] border-t border-white/5 pt-20 pb-32 md:pb-12">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <Logo />
              <p className="text-[#8d939b] text-sm leading-relaxed mt-6 max-w-xs">
                Driven by excellence. Reliable, high-quality automotive solutions to keep your vehicle running safely and smoothly.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#1E90FF] hover:bg-[#1570cc] text-white rounded-md transition-all text-sm font-bold tracking-wider uppercase group w-fit"
              >
                <MessageCircle className="w-4 h-4 group-hover:animate-pulse" aria-hidden="true" />
                WhatsApp Us
              </a>
            </div>

            {/* Quick Links */}
            <nav aria-label="Footer navigation">
              <h2 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Quick Links</h2>
              <ul className="space-y-4 list-none p-0">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[#8d939b] hover:text-[#1E90FF] transition-colors text-sm font-medium tracking-wide">
                      {link.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#8d939b] hover:text-[#1E90FF] transition-colors text-sm font-medium tracking-wide">
                    Book a Service
                  </a>
                </li>
              </ul>
            </nav>

            {/* Contact Info */}
            <div>
              <h2 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Get In Touch</h2>
              <ul className="space-y-5 list-none p-0">
                <li>
                  <a href={`tel:+${WA_NUMBER}`} className="flex items-start gap-3 text-[#8d939b] hover:text-[#1E90FF] transition-colors group">
                    <Phone className="w-5 h-5 text-[#1E90FF] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-xs font-semibold text-white uppercase tracking-wider mb-1">Phone</div>
                      <span className="text-sm font-medium">+{WA_NUMBER}</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 text-[#8d939b] hover:text-[#1E90FF] transition-colors group">
                    <Mail className="w-5 h-5 text-[#1E90FF] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-xs font-semibold text-white uppercase tracking-wider mb-1">Email</div>
                      <span className="text-sm font-medium break-all">{EMAIL}</span>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-[#8d939b]">
                  <MapPin className="w-5 h-5 text-[#1E90FF] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs font-semibold text-white uppercase tracking-wider mb-1">Service Area</div>
                    <span className="text-sm font-medium">Namibia</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8d939b] tracking-wide text-center md:text-left">
              &copy; {new Date().getFullYear()} Revive Auto Works. All rights reserved. Driven by Excellence.
            </p>
            <p className="text-xs text-[#8d939b] tracking-wide">
              Expert Care. Lasting Performance.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile WhatsApp Button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Revive Auto Works on WhatsApp"
        className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-[#1E90FF] hover:bg-[#1570cc] shadow-[0_0_25px_rgba(30,144,255,0.5)] transition-all active:scale-95"
      >
        <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </a>
    </div>
  );
}
