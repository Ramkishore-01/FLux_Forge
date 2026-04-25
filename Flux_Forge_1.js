// App.js
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const toggleNav = () => setIsNavOpen(!isNavOpen);
    const closeNav = () => setIsNavOpen(false);

    // Intersection Observer for fade-up animations
    useEffect(() => {
        const observerOptions = { threshold: 0.08, rootMargin: "0px 0px -20px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .process-step');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.35s, border-color 0.35s';
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Active section highlighting on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'services', 'process', 'work', 'about', 'contact'];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) closeNav();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            closeNav();
        }
    };

    const services = [
        { icon: '🌐', title: 'Web Development', desc: 'Blazing-fast, SEO-optimized websites built with modern frameworks. Pixel-perfect on every screen size.', type: 'web' },
        { icon: '📱', title: 'App Development', desc: 'Native & cross-platform mobile apps that users love. React Native, Flutter — built to scale.', type: 'app' },
        { icon: '🧠', title: 'Software Development', desc: 'Custom software solutions — from SaaS platforms to enterprise tools — engineered for performance.', type: 'brand' },
        { icon: '📈', title: 'SEO & Growth', desc: 'Data-driven SEO strategies and performance optimization that bring qualified traffic to your door.', type: 'seo' },
        { icon: '⚡', title: 'AI & Automation', desc: 'Smart integrations and workflow automation that save hours. AI chatbots, APIs, and more.', type: 'auto' },
        { icon: '💡', title: 'Tech Consulting', desc: 'Strategic roadmaps, tech stack selection and architecture reviews to future-proof your product.', type: 'consult' }
    ];

    const processSteps = [
        { num: '01', title: 'Discover', desc: 'Deep-dive into your goals, audience and competitive landscape to form a clear strategy.' },
        { num: '02', title: 'Design', desc: 'Wireframes, prototypes and polished UI — we iterate until every pixel earns its place.' },
        { num: '03', title: 'Build', desc: 'Clean, scalable code. Every component crafted with performance and maintainability in mind.' },
        { num: '04', title: 'Launch', desc: 'Thorough QA, optimized deployment, and ongoing support to ensure flawless go-live.' }
    ];

    const portfolioItems = [
        { type: 'app', tag: 'App Development', badge: 'hot', badgeType: 'badge-hot', title: 'Mobile App Development', desc: 'iOS & Android apps crafted with React Native and Flutter — smooth UX, real-time features, and App Store ready.', tags: ['React Native', 'Flutter', 'iOS', 'Android'] },
        { type: 'web', tag: 'Web Development', badge: 'new', badgeType: 'badge-new', title: 'Web Development', desc: 'High-performance websites and web apps using Next.js, React and modern stacks — pixel-perfect, blazing-fast, and fully responsive.', tags: ['Next.js', 'React', 'Tailwind', 'SEO'] },
        { type: 'soft', tag: 'Software Development', badge: 'AI-Ready', badgeType: 'badge-ai', title: 'Custom Software Solutions', desc: 'Scalable SaaS platforms, APIs, dashboards and enterprise tools engineered with clean architecture and long-term maintainability.', tags: ['Node.js', 'PostgreSQL', 'REST API', 'SaaS'] },
        { type: 'tech', tag: 'Cutting Edge Tech', badge: 'Future-Ready', badgeType: 'badge-future', title: 'Cutting Edge Technology', desc: 'AI integrations, LLM-powered products, IoT systems, AR/VR experiences and next-gen tech implementations that keep you ahead of the curve.', tags: ['AI/ML', 'LLM APIs', 'IoT', 'AR/VR'] },
        { type: 'more', tag: 'Full Spectrum', badge: 'Explore All', badgeType: 'badge-more', title: 'E-Commerce, Branding & More', desc: 'Online stores, brand identities, SEO campaigns, cloud infrastructure, tech consulting — if it\'s digital, we forge it.', tags: ['Shopify', 'Branding', 'AWS', 'DevOps'] }
    ];

    const technologies = [
        { name: 'React', color: '#61dbfb' }, { name: 'Next.js', color: '#111' }, { name: 'TypeScript', color: '#3178c6' },
        { name: 'JavaScript', color: '#e8b400' }, { name: 'Flutter', color: '#57a0d3' }, { name: 'React Native', color: '#61dbfb' },
        { name: 'Node.js', color: '#68a063' }, { name: 'MongoDB', color: '#47a248' }, { name: 'PostgreSQL', color: '#336791' },
        { name: 'AWS', color: '#ff9900' }, { name: 'Netlify', color: '#00c7b7' }, { name: 'Tailwind CSS', color: '#38bdf8' },
        { name: 'GraphQL', color: '#e434aa' }, { name: 'Git', color: '#f05032' }, { name: 'AI/LLM APIs', color: '#0a5cf5' }
    ];

    const testimonials = [
        { name: 'Aryan Reddy', role: 'Founder, NeuraMetrics', rating: 5, text: '"Flux Forge completely transformed our online presence. The website they built is stunning and our conversion rate doubled within a month."', avatar: 'AR' },
        { name: 'Neha Kapoor', role: 'Product Lead, SwiftCart', rating: 4.5, text: '"Great technical expertise and smooth communication. The app they delivered exceeded expectations, though the timeline stretched slightly. Still highly recommended."', avatar: 'NK' },
        { name: 'Rahul Jaiswal', role: 'CTO, DataNexus', rating: 4, text: '"Solid work on our SaaS dashboard. The team is responsive and skilled. Minor UI tweaks took an extra iteration, but overall great value."', avatar: 'RJ' },
        { name: 'Priya Krishnan', role: 'CEO, LuxeVault', rating: 5, text: '"Exceptional attention to detail and extremely professional. They delivered ahead of schedule with better results than we imagined."', avatar: 'PK' },
        { name: 'Sam Mitchell', role: 'CTO, EcoTrack', rating: 4, text: '"Good experience overall. The AI automation they integrated saved us 10+ hours a week. Would appreciate more proactive progress updates, but outcome is solid."', avatar: 'SM' },
        { name: 'Shreya Das', role: 'E‑commerce Director, ModaStyle', rating: 4.5, text: '"Flux Forge rebuilt our entire e-commerce platform. Performance improved by 40%, and the team was very collaborative. A few backend delays but they made up for it."', avatar: 'SD' }
    ];

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
        return (
            <div className="stars">
                {[...Array(fullStars)].map((_, i) => <span key={i}>★</span>)}
                {hasHalf && <span className="star-half">★</span>}
                {[...Array(emptyStars)].map((_, i) => <span key={i} className="star-empty">★</span>)}
            </div>
        );
    };

    const renderPortfolioThumb = (type) => {
        switch (type) {
            case 'app':
                return (
                    <div className="portfolio-thumb thumb-app">
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                            <div className="device-frame"><div className="device-notch"></div><div className="device-screen"><div className="d-bar d-blue"></div><div className="d-bar" style={{ background: '#e0e7ff', width: '90%' }}></div><div className="d-bar d-purple"></div><div className="d-bar" style={{ background: '#e0e7ff', width: '75%' }}></div><div className="d-bar d-blue" style={{ width: '50%' }}></div></div></div>
                            <div className="device-frame" style={{ height: '108px' }}><div className="device-notch"></div><div className="device-screen"><div className="d-bar" style={{ background: '#c4b5fd', width: '80%' }}></div><div className="d-bar" style={{ background: '#e0e7ff', width: '60%' }}></div><div className="d-bar d-purple" style={{ width: '90%' }}></div></div></div>
                        </div>
                    </div>
                );
            case 'web':
                return (
                    <div className="portfolio-thumb thumb-web">
                        <div className="browser-frame"><div className="browser-bar"><div className="b-dot" style={{ background: '#ff5f57' }}></div><div className="b-dot" style={{ background: '#febc2e' }}></div><div className="b-dot" style={{ background: '#28c840' }}></div><div className="b-url"></div></div><div className="browser-content"><div className="bc-line" style={{ height: '28px', background: '#eff6ff', borderRadius: '6px' }}></div><div className="bc-line bc-accent"></div><div className="bc-line" style={{ width: '90%' }}></div><div className="bc-line" style={{ width: '75%' }}></div><div style={{ display: 'flex', gap: '5px', marginTop: '4px' }}><div style={{ height: '28px', flex: 1, background: '#bfdbfe', borderRadius: '6px' }}></div><div style={{ height: '28px', flex: 1, background: '#e0e7ff', borderRadius: '6px' }}></div></div></div></div>
                    </div>
                );
            case 'soft':
                return (
                    <div className="portfolio-thumb thumb-soft">
                        <div className="code-frame"><div className="code-bar"><div className="b-dot" style={{ background: '#ff5f57' }}></div><div className="b-dot" style={{ background: '#febc2e' }}></div><div className="b-dot" style={{ background: '#28c840' }}></div></div><div className="code-lines"><div className="cl cl-1"></div><div className="cl cl-2"></div><div className="cl cl-3"></div><div className="cl cl-4"></div><div className="cl cl-5"></div><div className="cl cl-6"></div><div className="cl cl-3" style={{ width: '40%', marginLeft: '0' }}></div><div className="cl cl-2" style={{ width: '50%' }}></div></div></div>
                    </div>
                );
            case 'tech':
                return (
                    <div className="portfolio-thumb thumb-tech">
                        <div className="chip-frame"><div className="chip chip-purple">AI / LLM</div><div className="chip chip-blue">Machine Learning</div><div className="chip chip-amber">IoT</div><div className="chip chip-green">Blockchain</div><div className="chip chip-pink">AR / VR</div><div className="chip chip-purple">Automation</div><div className="chip chip-blue">Edge Computing</div></div>
                    </div>
                );
            default:
                return (
                    <div className="portfolio-thumb thumb-more">
                        <div style={{ textAlign: 'center', padding: '1.5rem' }}><div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>+</div><div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '800', fontSize: '1.1rem', color: '#831843', marginBottom: '0.5rem' }}>And Much More</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}><span className="chip chip-pink" style={{ fontSize: '0.6rem' }}>E-Commerce</span><span className="chip chip-purple" style={{ fontSize: '0.6rem' }}>Brand Identity</span><span className="chip chip-blue" style={{ fontSize: '0.6rem' }}>SEO</span><span className="chip chip-green" style={{ fontSize: '0.6rem' }}>Cloud DevOps</span><span className="chip chip-amber" style={{ fontSize: '0.6rem' }}>Consulting</span></div></div>
                    </div>
                );
        }
    };

    return (
        <div className="App">
            <nav className={`navbar ${isNavOpen ? 'nav-open' : ''}`}>
                <div className="nav-logo" onClick={() => scrollToSection('home')}>FLUX FORGE</div>
                <ul className="nav-links">
                    <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className={activeSection === 'services' ? 'active' : ''}>Services</a></li>
                    <li><a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection('work'); }} className={activeSection === 'work' ? 'active' : ''}>Work</a></li>
                    <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }} className={activeSection === 'process' ? 'active' : ''}>Process</a></li>
                    <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
                </ul>
                <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Get Started</a>
                <div className="hamburger" onClick={toggleNav}>
                    <span></span><span></span><span></span>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="hero-shapes">
                    <div className="shape s1"></div><div className="shape s2"></div><div className="shape s3"></div>
                    <div className="dot-grid"></div>
                </div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div className="hero-tag">✦ Tech Studio</div>
                    <h1>We Build<br /><span>Digital Futures</span><br />That Perform</h1>
                    <p>Flux Forge crafts high-performance websites, apps & digital experiences that drive real results for ambitious brands.</p>
                    <div className="hero-btns">
                        <a href="#services" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Explore Services ↓</a>
                        <a href="#work" className="btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('work'); }}>View Portfolio</a>
                    </div>
                    <div className="hero-stats">
                        <div className="stat"><span className="stat-num">50+</span><span className="stat-label">Projects Shipped</span></div>
                        <div className="stat"><span className="stat-num">98%</span><span className="stat-label">Client Satisfaction</span></div>
                        <div className="stat"><span className="stat-num">5yr</span><span className="stat-label">Industry Experience</span></div>
                        <div className="stat"><span className="stat-num">24h</span><span className="stat-label">Response Time</span></div>
                    </div>
                </div>
            </section>

            {/* Marquee Section */}
            <div className="marquee-section">
                <div className="marquee-track">
                    {['Web Development', 'App Development', 'Software Development', 'UI/UX Design', 'AI Integration', 'Cutting Edge Tech', 'Automation', 'E-Commerce'].map((item, idx) => (
                        <React.Fragment key={idx}>
                            <div className="marquee-item"><div className="marquee-dot"></div>{item}</div>
                        </React.Fragment>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {['Web Development', 'App Development', 'Software Development', 'UI/UX Design', 'AI Integration', 'Cutting Edge Tech', 'Automation', 'E-Commerce'].map((item, idx) => (
                        <React.Fragment key={`dup-${idx}`}>
                            <div className="marquee-item"><div className="marquee-dot"></div>{item}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Services Section */}
            <section id="services" className="section">
                <div className="section-label">What We Do</div>
                <h2 className="section-title">Services That<br />Scale Your Business</h2>
                <p className="section-sub">From concept to launch, we deliver end-to-end digital solutions built for growth and precision.</p>
                <div className="services-grid">
                    {services.map((service, idx) => (
                        <div key={idx} className={`service-card sc-${service.type}`}>
                            <div className={`service-icon icon-${service.type}`}>{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                            <div className="service-arrow">Learn more →</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process Section */}
            <section id="process" className="process-section">
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="section-label">How We Work</div>
                    <h2 className="section-title">Our Process</h2>
                    <div className="process-grid">
                        {processSteps.map((step, idx) => (
                            <div key={idx} className="process-step">
                                <span className="step-num">{step.num}</span>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="work" className="section">
                <div className="section-label">Portfolio</div>
                <h2 className="section-title">What We Build</h2>
                <p className="section-sub">From mobile apps to enterprise software — here's a look at the kind of work we forge.</p>
                <div className="portfolio-grid">
                    {portfolioItems.map((item, idx) => (
                        <div key={idx} className="portfolio-card">
                            {renderPortfolioThumb(item.type)}
                            <div className="portfolio-info">
                                <div className="portfolio-tag-row">
                                    <div className="portfolio-tag">{item.tag}</div>
                                    <div className={`portfolio-badge ${item.badgeType}`}>{item.badge}</div>
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                                <div className="portfolio-tags">
                                    {item.tags.map((tag, tidx) => <span key={tidx} className="ptag">{tag}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Section */}
            <section className="tech-section">
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="section-label">Technology</div>
                    <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.6rem)' }}>Stack We Master</h2>
                    <div className="tech-grid">
                        {technologies.map((tech, idx) => (
                            <div key={idx} className="tech-pill">
                                <div className="tech-dot" style={{ background: tech.color }}></div>
                                {tech.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="about" className="section">
                <div className="section-label">Testimonials</div>
                <h2 className="section-title">Clients Who<br />Trust Flux Forge</h2>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, idx) => (
                        <div key={idx} className="testimonial-card">
                            {renderStars(testimonial.rating)}
                            <p>{testimonial.text}</p>
                            <div className="client-info">
                                <div className="client-avatar">{testimonial.avatar}</div>
                                <div>
                                    <div className="client-name">{testimonial.name}</div>
                                    <div className="client-role">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="cta-section">
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div className="section-label" style={{ margin: '0 auto 1.5rem', display: 'inline-flex' }}>Start Your Project</div>
                    <h2>Ready to Forge<br />Something <span>Extraordinary?</span></h2>
                    <p>Let's turn your vision into a high-performing digital reality. No fluff — just results.</p>
                    <div className="hero-btns">
                        <a href="https://wa.me/918870761569" target="_blank" rel="noopener noreferrer" className="btn-secondary">💬 WhatsApp Us</a>
                    </div>
                    <p style={{ marginTop: '2rem', color: '#94a3b8', fontSize: '0.8rem' }}>Usually reply within 2–4 hours · Based in India · Available Globally</p>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <div className="footer-logo">FLUX FORGE</div>
                            <p>Independent tech studio specializing in web, mobile and AI-powered digital solutions for ambitious founders and brands.</p>
                        </div>
                        <div className="footer-col">
                            <h4>Services</h4>
                            <ul className="footer-links">
                                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Web Development</a></li>
                                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>App Development</a></li>
                                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Software Dev</a></li>
                                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>AI Integration</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul className="footer-links">
                                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
                                <li><a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection('work'); }}>Portfolio</a></li>
                                <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}>Process</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Connect</h4>
                            <ul className="footer-links">
                                <li><a href="#">LinkedIn</a></li>
                                <li><a href="#">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2025 Flux Forge. All rights reserved.</p>
                        <div className="social-links">
                            <a href="#" className="social-link">Li</a>
                            <a href="#" className="social-link">Gh</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;