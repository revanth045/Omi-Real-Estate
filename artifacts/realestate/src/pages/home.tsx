import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Star, MapPin, Phone, Mail, ChevronDown, TrendingUp, Award, Users, Landmark, CheckCircle2, Globe2, ShieldCheck, MailPlus } from "lucide-react";

// ─── Components ──────────────────────────────────────────────────────────────

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-secondary z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// ─── Animation Helpers ────────────────────────────────────────────────────────

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SlideIn = ({ children, direction = "left", delay = 0, className = "" }: { children: React.ReactNode; direction?: "left" | "right"; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === "left" ? -60 : 60 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ScaleIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.94, filter: "blur(4px)" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const RevealText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {text}
      </motion.span>
    </div>
  );
};

const NumberCounter = ({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start > end) { setCount(end); clearInterval(timer); }
      else { setCount(parseFloat(start.toFixed(1))); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const { toast } = useToast();
  const heroRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Inquiry Sent", description: "James will be in touch with you shortly." });
  };

  const listings = [
    { id: 1, title: "Whispering Pines Estate", loc: "Bozeman, MT", price: "$8.5M", acres: "1,200 Acres", type: "Mountain Estate", img: "/images/listing-montana.png" },
    { id: 2, title: "Azure Cove", loc: "Carmel, CA", price: "$12.2M", acres: "45 Acres", type: "Coastal Land", img: "/images/listing-california.png" },
    { id: 3, title: "Silver Spur Ranch", loc: "Fredericksburg, TX", price: "$4.1M", acres: "850 Acres", type: "Ranch Land", img: "/images/listing-texas.png" },
    { id: 4, title: "Summit Peaks Lodge", loc: "Aspen, CO", price: "$9.4M", acres: "120 Acres", type: "Ski Estate", img: "/images/listing-colorado.png" },
    { id: 5, title: "Red Rock Reserve", loc: "Sedona, AZ", price: "$3.5M", acres: "320 Acres", type: "Desert Acreage", img: "/images/listing-arizona.png" },
    { id: 6, title: "Coral Reef Estate", loc: "Miami, FL", price: "$15.8M", acres: "12 Acres", type: "Waterfront", img: "/images/listing-florida.png" },
    { id: 7, title: "Grand Teton Range", loc: "Jackson Hole, WY", price: "$11.2M", acres: "2,400 Acres", type: "Legacy Ranch", img: "/images/listing-wyoming.png" },
    { id: 8, title: "Coastal Mist Retreat", loc: "Cannon Beach, OR", price: "$5.9M", acres: "28 Acres", type: "Pacific Estate", img: "/images/listing-oregon.png" },
    { id: 9, title: "Sandstone Villa", loc: "Moab, UT", price: "$7.2M", acres: "440 Acres", type: "Desert Modern", img: "/images/listing-utah.png" },
    { id: 10, title: "Adobe Sun Manor", loc: "Santa Fe, NM", price: "$4.8M", acres: "160 Acres", type: "High Desert", img: "/images/listing-newmexico.png" },
    { id: 11, title: "Emerald Island", loc: "San Juan Islands, WA", price: "$8.1M", acres: "35 Acres", type: "Private Island", img: "/images/listing-washington.png" },
    { id: 12, title: "Sapphire Lake Point", loc: "Coeur d'Alene, ID", price: "$6.4M", acres: "55 Acres", type: "Lakeside", img: "/images/listing-idaho.png" },
  ];

  const soldProperties = [
    { id: 1, title: "Prairie Wind Ranch", loc: "Montana", img: "/images/sold-1.png" },
    { id: 2, title: "Redwood Retreat", loc: "California", img: "/images/sold-2.png" },
    { id: 3, title: "Summit Ridge", loc: "Colorado", img: "/images/sold-3.png" },
    { id: 4, title: "Lakeside Enclave", loc: "Nevada", img: "/images/sold-4.png" },
    { id: 5, title: "Vineyard Estates", loc: "Napa Valley", img: "/images/sold-5.png" },
    { id: 6, title: "Coastal Reserve", loc: "Oregon", img: "/images/sold-6.png" },
    { id: 7, title: "Canyon Bluff", loc: "Utah", img: "/images/sold-7.png" },
    { id: 8, title: "Meadow Run", loc: "Wyoming", img: "/images/sold-8.png" },
  ];

  const testimonials = [
    { id: 1, name: "Sarah & Tom Whitfield", loc: "Austin, TX", text: "Working with James was a revelation. He understood immediately that we weren't just looking for land — we were looking for a legacy for our children. The transaction was flawless.", img: "/images/client-1.png" },
    { id: 2, name: "Marcus Sterling", loc: "Jackson Hole, WY", text: "In the high-end land market, discretion and speed are everything. James delivered both. He found an off-market property that perfectly matched my portfolio needs.", img: "/images/client-2.png" },
    { id: 3, name: "Elena Rostova", loc: "Napa Valley, CA", text: "We spent three years looking for the right vineyard acreage before meeting James. He found it in three months. His understanding of water rights is unmatched.", img: "/images/client-3.png" },
    { id: 4, name: "The Harrison Family", loc: "Bozeman, MT", text: "James isn't a broker; he's a land steward. He guided us away from several properties that looked good on paper, finally placing us in our dream ranch.", img: "/images/client-1.png" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white scroll-smooth">
      <ScrollProgress />

      {/* ── Navigation ── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-primary" : "text-white"}`}>
            Omi
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["About", "Listings", "Sold", "Reviews", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`hover:text-secondary transition-colors duration-200 ${scrolled ? "text-foreground" : "text-white/90"}`}
              >
                {item}
              </a>
            ))}
            <Button className="bg-primary text-white hover:bg-primary/90 font-serif shadow-lg" asChild>
              <a href="#contact">Schedule a Call</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden" data-testid="section-hero">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImgY }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />
          <img src="/images/hero.png" alt="Luxury Estate" className="w-full h-full object-cover scale-110" />
        </motion.div>

        <motion.div className="container relative z-10 mx-auto px-6" style={{ opacity: heroOpacity }}>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white font-bold leading-[0.9] max-w-5xl">
              <RevealText text="Where Land" delay={0.2} />
              <div className="text-secondary italic">
                <RevealText text="Meets Legacy." delay={0.4} />
              </div>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-white/85 mt-8 max-w-2xl font-light"
          >
            Exclusive brokerage for legacy ranches, pristine waterfronts, and distinguished estates across the American West.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="bg-secondary text-primary hover:bg-secondary/90 text-lg font-serif px-8 py-6 shadow-xl"
              asChild
            >
              <a href="#listings" data-testid="button-view-listings">
                View Listings <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white/70 hover:bg-white hover:text-primary text-lg font-serif px-8 py-6"
              asChild
            >
              <a href="#about">My Story</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Stats Badge */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 right-0 lg:bottom-14 lg:right-14 bg-white/98 p-7 md:p-9 shadow-2xl z-20 border-l-[5px] border-secondary max-w-xs"
        >
          <div className="space-y-5">
            <div>
              <p className="font-serif font-bold text-primary leading-none">
                <span className="text-4xl">143</span>
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mt-1">Properties Sold</p>
            </div>
            <div className="h-px bg-border" />
            <div>
              <p className="font-serif font-bold text-primary leading-none flex items-start gap-0.5">
                <span className="text-xl mt-1 font-bold">$</span>
                <span className="text-4xl">2.8B</span>
                <span className="text-2xl mt-1">+</span>
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mt-1">In Transactions</p>
            </div>
            <div className="h-px bg-border" />
            <div>
              <p className="font-serif font-bold text-primary leading-none">
                <span className="text-4xl">22</span>
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mt-1">Years Experience</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown className="w-6 h-6 text-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 lg:py-36 bg-background overflow-hidden" data-testid="section-about">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <SlideIn direction="left">
              <div className="relative">
                <motion.div
                  className="absolute -inset-6 bg-secondary/15 -z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ translate: "16px 16px" }}
                />
                <motion.img
                  src="/images/broker.png"
                  alt="James Hartwell"
                  className="w-full aspect-[3/4] object-cover shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <div className="space-y-8">
                <div>
                  <p className="text-secondary uppercase tracking-[0.2em] text-sm font-bold mb-4">The Broker</p>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight">
                    The Man Behind<br />the Acreage.
                  </h2>
                </div>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Born to a ranching family in Montana, James Hartwell learned early that land isn't just dirt and grass — it's history, it's potential, it's the ultimate heirloom.
                  </p>
                  <p>
                    Over the past two decades, James has quietly become the most trusted name in high-value land acquisition. Discretion, unparalleled market knowledge, and an unwavering commitment to his clients' legacies are the hallmarks of his practice.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                  <div>
                    <h4 className="font-serif font-bold text-primary mb-3 text-xl">Specialties</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      {["Legacy Ranches", "Coastal Acreage", "Private Islands", "Vineyard Estates"].map((s) => (
                        <li key={s} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-primary mb-3 text-xl">Regions</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      {["Montana & Wyoming", "Texas Hill Country", "Northern California", "Colorado Rockies"].map((r) => (
                        <li key={r} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ── The Hartwell Method ── */}
      <section className="py-28 bg-primary text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <p className="text-secondary uppercase tracking-[0.2em] text-sm font-bold mb-4">The Approach</p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                The Hartwell<br />Method.
              </h2>
            </div>
            <p className="text-primary-foreground/70 text-lg max-w-md pb-2">
              A refined process for matching exceptional land with its next steward.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-1">
            {[
              { step: "01", title: "Site Analysis", desc: "Exhaustive review of water rights, mineral rights, and conservation potential." },
              { step: "02", title: "Targeted Search", desc: "Accessing off-market inventory through a network of multi-generational owners." },
              { step: "03", title: "Strategic Terms", desc: "Expert negotiation focused on long-term legacy and preservation." },
              { step: "04", title: "Stewardship", desc: "Seamless transition with local expertise in ranch and land management." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.15} className="group">
                <div className="p-10 border border-white/10 hover:bg-white/5 transition-colors h-full">
                  <span className="text-secondary font-serif text-5xl opacity-30 block mb-8 group-hover:opacity-100 transition-opacity">
                    {item.step}
                  </span>
                  <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                  <p className="text-primary-foreground/60 leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listings ── */}
      <section id="listings" className="py-28 bg-muted/30 border-y border-border" data-testid="section-listings">
        <div className="container mx-auto px-6">
          <FadeUp className="text-center mb-20">
            <p className="text-secondary uppercase tracking-[0.2em] text-sm font-bold mb-4">Portfolio</p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">Current Listings</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated selection of the finest land currently available on the market.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {listings.map((prop, i) => (
              <ScaleIn key={prop.id} delay={i * 0.05}>
                <motion.div
                  className="group bg-white border border-border overflow-hidden shadow-md cursor-pointer relative"
                  whileHover={{ 
                    y: -12, 
                    rotateY: 2,
                    rotateX: -2,
                    boxShadow: "0 40px 80px rgba(0,0,0,0.12)" 
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  data-testid={`card-listing-${prop.id}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={prop.img}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.35 }}
                    >
                      <motion.p
                        className="text-white font-serif text-xl font-bold"
                        initial={{ y: 15, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                      >
                        {prop.title}
                      </motion.p>
                      <motion.p
                        className="text-white/80 text-sm"
                        initial={{ y: 15, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                      >
                        {prop.acres} · {prop.loc}
                      </motion.p>
                    </motion.div>
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary z-10">
                      {prop.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-primary mb-2">{prop.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-5">
                      <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {prop.loc}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <div>
                        <p className="text-2xl font-serif font-bold text-primary">{prop.price}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{prop.acres}</p>
                      </div>
                      <Button
                        variant="ghost"
                        className="font-serif text-primary hover:text-secondary hover:bg-secondary/10 group/btn"
                        data-testid={`button-view-listing-${prop.id}`}
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: <Award className="w-6 h-6" />, value: 143, suffix: "", label: "Properties Sold" },
              { icon: <TrendingUp className="w-6 h-6" />, value: 2.8, prefix: "$", suffix: "B+", label: "Total Transaction Value" },
              { icon: <Landmark className="w-6 h-6" />, value: 22, suffix: " yrs", label: "Years Experience" },
              { icon: <Users className="w-6 h-6" />, value: 98, suffix: "%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div
                  className="flex flex-col items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-secondary/60">{stat.icon}</div>
                  <div className="text-5xl md:text-6xl font-serif font-bold text-secondary">
                    {stat.prefix && <span className="text-3xl align-super mr-0.5">{stat.prefix}</span>}
                    <NumberCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] opacity-70">{stat.label}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sold Gallery ── */}
      <section id="sold" className="py-28 bg-background" data-testid="section-sold">
        <div className="container mx-auto px-6">
          <FadeUp className="text-center mb-20">
            <p className="text-secondary uppercase tracking-[0.2em] text-sm font-bold mb-4">Track Record</p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">Land We've Placed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A testament to our ability to match remarkable properties with visionary stewards.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {soldProperties.map((prop, i) => (
              <ScaleIn key={prop.id} delay={i * 0.06}>
                <motion.div
                  className="group relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  data-testid={`card-sold-${prop.id}`}
                >
                  <motion.img
                    src={prop.img}
                    alt={prop.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  {/* Gradient base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Hover reveal overlay */}
                  <motion.div
                    className="absolute inset-0 bg-primary/75 flex flex-col items-center justify-center text-white p-4 text-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="bg-secondary text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                    >
                      Sold
                    </motion.span>
                    <motion.p
                      className="font-serif text-lg font-bold"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {prop.title}
                    </motion.p>
                    <motion.p
                      className="text-white/70 text-sm mt-1"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                    >
                      {prop.loc}
                    </motion.p>
                    <motion.p
                      className="text-white/50 text-xs mt-3 uppercase tracking-wider"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Confidential Transfer
                    </motion.p>
                  </motion.div>
                  {/* Always visible location */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/80 text-xs pointer-events-none opacity-0 group-hover:opacity-0 transition-opacity">
                    <MapPin className="w-3 h-3" /> {prop.loc}
                  </div>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="reviews" className="py-28 bg-muted/30 border-y border-border overflow-hidden" data-testid="section-testimonials">
        <div className="container mx-auto px-6">
          <FadeUp className="text-center mb-20">
            <p className="text-secondary uppercase tracking-[0.2em] text-sm font-bold mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">What Our Clients Say</h2>
          </FadeUp>
        </div>

        {/* Infinite marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -2240] }}
            transition={{ duration: 38, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <motion.div
                key={i}
                className="w-[420px] md:w-[500px] shrink-0 bg-white border border-border p-8 shadow-sm hover:shadow-xl transition-shadow duration-400"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex text-secondary mb-5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-base italic text-muted-foreground mb-7 leading-relaxed">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-secondary/30"
                  />
                  <div>
                    <p className="font-bold text-primary font-serif">{t.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Global Reach ── */}
      <section className="py-28 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Globe2 className="w-[120%] h-[120%] absolute -top-1/4 -right-1/4 text-secondary stroke-[0.5]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeUp>
              <p className="text-secondary uppercase tracking-[0.2em] text-sm font-bold mb-4">Market Scope</p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Global Reach,<br />Local Expertise.</h2>
              <p className="text-xl text-primary-foreground/70 mb-10 leading-relaxed">
                While our focus is the American West, our network of high-net-worth buyers spans the globe. We connect your land with the world's most serious investors.
              </p>
              <div className="space-y-6">
                {[
                  { label: "Active Investors", value: "2,500+" },
                  { label: "Partner Brokerages", value: "85" },
                  { label: "International Presence", value: "14 Countries" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-6">
                    <div className="h-px w-12 bg-secondary/50" />
                    <div>
                      <p className="text-2xl font-serif font-bold text-secondary">{item.value}</p>
                      <p className="text-xs uppercase tracking-widest opacity-60">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl"
              />
              <img src="/images/listing-utah.png" alt="Global Reach" className="relative z-10 w-full aspect-square object-cover rounded-full border-8 border-white/5" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Strip ── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Market Intelligence", desc: "Decades of data on land valuation, water rights, zoning, and market cycles — not just comparable sales.", icon: "🗺" },
              { title: "Absolute Discretion", desc: "Many of our transactions are confidential. Your acquisition or sale is handled with complete privacy.", icon: "🔒" },
              { title: "Network Access", desc: "Off-market parcels represent over 60% of our volume. Access properties that never appear on public listings.", icon: "🤝" },
            ].map((feat, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <motion.div
                  className="p-8 border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-400 group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl mb-5">{feat.icon}</div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-3 group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press Logos ── */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-6">
          <FadeUp>
            <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground font-bold mb-10">
              As Featured In & Trusted By
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale">
              {["The Wall Street Journal", "Forbes Real Estate", "Land Report", "Mansion Global"].map((partner, i) => (
                <motion.span
                  key={partner}
                  className="text-xl md:text-2xl font-serif font-bold text-primary"
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {partner}
                </motion.span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-24 bg-muted/50 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-primary p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <MailPlus className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Off-Market Intelligence.</h2>
              <p className="text-primary-foreground/70 text-lg mb-10 max-w-xl mx-auto">
                Join our exclusive circle for early access to distressed assets and off-market legacy parcels before they ever reach the public.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Your Email Address" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14" />
                <Button className="bg-secondary text-primary hover:bg-secondary/90 h-14 px-8 font-serif font-bold">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 bg-background" data-testid="section-contact">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-20">
            <SlideIn direction="left" className="lg:col-span-2">
              <div>
                <p className="text-secondary uppercase tracking-[0.2em] text-sm font-bold mb-4">Get in Touch</p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Ready to Find Your Land?</h2>
                <p className="text-lg text-muted-foreground mb-10">
                  Whether you're acquiring a generational estate or divesting significant acreage, let's discuss your vision.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: <Phone className="w-5 h-5" />, label: "Direct Line", value: "+1 (406) 555-0198" },
                    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "james@omi.com" },
                  ].map((c) => (
                    <motion.div
                      key={c.label}
                      className="flex items-center gap-4"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-primary/8 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                        {c.icon}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
                        <p className="text-lg font-serif font-bold text-primary">{c.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 pt-10 border-t border-border">
                  <img
                    src="/images/broker.png"
                    alt="James Hartwell"
                    className="w-28 h-28 rounded-full object-cover border-4 border-secondary/30 shadow-xl"
                  />
                  <p className="font-serif text-primary font-bold mt-3 text-lg">James Hartwell</p>
                  <p className="text-muted-foreground text-sm">Principal Broker, Omi</p>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={0.15} className="lg:col-span-3">
              <form
                onSubmit={handleContact}
                className="bg-white p-10 md:p-14 shadow-2xl border border-border"
                data-testid="form-contact"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">Full Name</label>
                    <Input required placeholder="John Smith" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">Email</label>
                    <Input required type="email" placeholder="john@example.com" className="bg-background border-border" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">Phone</label>
                    <Input placeholder="(555) 000-0000" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">Interest</label>
                    <Select defaultValue="buying">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buying">Acquiring Land</SelectItem>
                        <SelectItem value="selling">Selling Land</SelectItem>
                        <SelectItem value="consulting">General Consulting</SelectItem>
                        <SelectItem value="ranch">Ranch Purchase</SelectItem>
                        <SelectItem value="vineyard">Vineyard Estate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2 mb-8">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary">Your Vision</label>
                  <Textarea
                    required
                    placeholder="Tell me about your vision for the land..."
                    className="min-h-[160px] bg-background border-border"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-white hover:bg-primary/90 font-serif text-lg py-6 shadow-lg"
                    data-testid="button-contact"
                  >
                    Send Inquiry <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </form>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-primary text-white py-20 border-t border-secondary/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-14">
            <div className="md:col-span-2">
              <span className="font-serif text-4xl font-bold text-secondary mb-5 block">Omi</span>
              <p className="text-primary-foreground/65 max-w-sm leading-relaxed">
                Where legacy land meets visionary stewardship. Exclusively representing the finest acreage in the American West.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider text-secondary mb-5 text-sm">Navigation</h4>
              <ul className="space-y-3 text-primary-foreground/65">
                {[["About James", "#about"], ["Current Listings", "#listings"], ["Past Sales", "#sold"], ["Client Reviews", "#reviews"]].map(([label, href]) => (
                  <li key={label}>
                    <motion.a
                      href={href}
                      className="hover:text-white transition-colors"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider text-secondary mb-5 text-sm">Connect</h4>
              <ul className="space-y-3 text-primary-foreground/65">
                {["LinkedIn", "Instagram", "The Land Report"].map((s) => (
                  <li key={s}>
                    <motion.a
                      href="#"
                      className="hover:text-white transition-colors"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {s}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/40">
            <p>&copy; {new Date().getFullYear()} Omi LLC. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FAB Quick Contact ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={scrolled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        className="fixed bottom-8 right-8 z-[60]"
      >
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-2xl bg-secondary text-primary hover:bg-secondary/90 border-2 border-white/20"
          asChild
        >
          <a href="#contact">
            <Phone className="w-6 h-6" />
          </a>
        </Button>
      </motion.div>
    </div>
  );
}
