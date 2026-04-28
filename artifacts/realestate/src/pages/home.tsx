import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Star, MapPin, Phone, Mail } from "lucide-react";

// --- Components ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const NumberCounter = ({ end, suffix = "" }: { end: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const step = end / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- Main Page ---

export default function Home() {
  const { toast } = useToast();

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Sent",
      description: "James will be in touch with you shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-primary">
            Hartwell Estates
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#listings" className="hover:text-primary transition-colors">Listings</a>
            <a href="#sold" className="hover:text-primary transition-colors">Sold</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            <Button className="bg-primary text-white hover:bg-primary/90 font-serif" asChild>
              <a href="#contact">Schedule a Call</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src="/images/hero.png" alt="Luxury Estate" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold leading-tight max-w-4xl">
              Where Land <br/><span className="text-secondary italic">Meets Legacy.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-white/90 mt-6 max-w-2xl font-light">
              Exclusive brokerage for legacy ranches, pristine waterfronts, and distinguished estates.
            </p>
          </FadeIn>
          <FadeIn delay={0.4} className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 text-lg font-serif" asChild>
              <a href="#listings" data-testid="button-view-listings">View Listings <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary text-lg font-serif" asChild>
              <a href="#about">My Story</a>
            </Button>
          </FadeIn>
        </div>

        {/* Floating Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-0 right-0 lg:bottom-12 lg:right-12 bg-white p-6 md:p-8 shadow-2xl z-20 border-l-4 border-secondary max-w-sm"
        >
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-serif font-bold text-primary">143</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Properties Sold</p>
            </div>
            <div className="h-px bg-border" />
            <div>
              <p className="text-3xl font-serif font-bold text-primary">$2.8B+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">In Transactions</p>
            </div>
            <div className="h-px bg-border" />
            <div>
              <p className="text-3xl font-serif font-bold text-primary">22</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Years Experience</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-24 lg:py-32 bg-background" data-testid="section-about">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/20 -z-10 translate-x-4 translate-y-4" />
                <img src="/images/broker.png" alt="James Hartwell" className="w-full aspect-[3/4] object-cover shadow-xl grayscale-[20%]" />
              </div>
            </FadeIn>
            <div className="space-y-8">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">The Man Behind the Acreage.</h2>
              </FadeIn>
              <FadeIn delay={0.2} className="prose prose-lg text-muted-foreground">
                <p>
                  Born to a ranching family in Montana, James Hartwell learned early that land isn't just dirt and grass—it's history. It's potential. It's the ultimate heirloom.
                </p>
                <p>
                  Over the past two decades, James has quietly become the most trusted name in high-value land acquisition. Discretion, unparalleled market knowledge, and an unwavering commitment to his clients' legacies are the hallmarks of his practice.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                  <div>
                    <h4 className="font-serif font-bold text-primary mb-2 text-xl">Specialties</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Legacy Ranches</li>
                      <li>• Coastal Acreage</li>
                      <li>• Private Islands</li>
                      <li>• Vineyard Estates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-primary mb-2 text-xl">Regions</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Montana & Wyoming</li>
                      <li>• Texas Hill Country</li>
                      <li>• Northern California</li>
                      <li>• Colorado Rockies</li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="py-24 bg-muted/30 border-y border-border" data-testid="section-listings">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Current Listings</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A curated selection of the finest land currently available on the market.</p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, title: "Whispering Pines Estate", loc: "Bozeman, MT", price: "$8.5M", acres: "1,200 Acres", type: "Mountain Estate", img: "/images/listing-1.png" },
              { id: 2, title: "Azure Cove", loc: "Carmel, CA", price: "$12.2M", acres: "45 Acres", type: "Coastal Land", img: "/images/listing-2.png" },
              { id: 3, title: "Silver Spur Ranch", loc: "Fredericksburg, TX", price: "$4.1M", acres: "850 Acres", type: "Ranch Land", img: "/images/listing-3.png" },
              { id: 4, title: "Clearwater Tract", loc: "Lake Tahoe, NV", price: "$6.8M", acres: "12 Acres", type: "Waterfront", img: "/images/listing-4.png" },
              { id: 5, title: "Red Rock Reserve", loc: "Sedona, AZ", price: "$3.5M", acres: "320 Acres", type: "Desert Acreage", img: "/images/listing-5.png" },
              { id: 6, title: "Emerald Valley", loc: "Aspen, CO", price: "$9.0M", acres: "640 Acres", type: "Forest Acreage", img: "/images/listing-6.png" },
            ].map((prop, i) => (
              <FadeIn key={prop.id} delay={i * 0.1}>
                <div className="group bg-white border border-border overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                      {prop.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-bold text-primary mb-2">{prop.title}</h3>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-1" /> {prop.loc}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <div>
                        <p className="text-xl font-bold text-primary">{prop.price}</p>
                        <p className="text-sm text-muted-foreground">{prop.acres}</p>
                      </div>
                      <Button variant="ghost" className="font-serif text-primary hover:text-secondary hover:bg-transparent" data-testid={`button-view-listing-${prop.id}`}>
                        View Details <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust/Stats Strip */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-primary-foreground/20">
            <FadeIn>
              <div className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-2">
                <NumberCounter end={143} />
              </div>
              <p className="text-sm uppercase tracking-wider opacity-80">Properties Sold</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-2">
                <NumberCounter end={22} />
              </div>
              <p className="text-sm uppercase tracking-wider opacity-80">Years Experience</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-2">
                $<NumberCounter end={2.8} />B+
              </div>
              <p className="text-sm uppercase tracking-wider opacity-80">Total Value</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-2">
                <NumberCounter end={98} suffix="%" />
              </div>
              <p className="text-sm uppercase tracking-wider opacity-80">Client Satisfaction</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sold Gallery */}
      <section id="sold" className="py-24 bg-background" data-testid="section-sold">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Land We've Placed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A testament to our ability to match remarkable properties with visionary stewards.</p>
          </FadeIn>

          <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <FadeIn key={i} delay={i * 0.05} className="break-inside-avoid">
                <div className="relative group overflow-hidden bg-muted">
                  <img src={`/images/sold-${i}.png`} alt={`Sold Property ${i}`} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                    <span className="bg-secondary text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">Sold</span>
                    <span className="font-serif text-lg">Confidential Transfer</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-muted/30 border-y border-border overflow-hidden" data-testid="section-testimonials">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">What Our Clients Say</h2>
          </FadeIn>

          <div className="relative">
            {/* Simple infinite scroll wrapper */}
            <div className="flex gap-8 overflow-hidden relative group">
              <motion.div 
                className="flex gap-8 shrink-0 min-w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              >
                {[
                  { id: 1, name: "Sarah & Tom Whitfield", loc: "Austin, TX", text: "Working with James was a revelation. He understood immediately that we weren't just looking for land; we were looking for a legacy for our children. The transaction was flawless, but his insight was priceless.", img: "/images/client-1.png" },
                  { id: 2, name: "Marcus Sterling", loc: "Jackson Hole, WY", text: "In the high-end land market, discretion and speed are everything. James delivered both. He found an off-market property that perfectly matched my portfolio needs and negotiated it masterfully.", img: "/images/client-2.png" },
                  { id: 3, name: "Elena Rostova", loc: "Napa Valley, CA", text: "We spent three years looking for the right vineyard acreage before meeting James. He found it in three months. His understanding of soil, water rights, and zoning is absolutely unmatched.", img: "/images/client-3.png" },
                  { id: 4, name: "The Harrison Family", loc: "Bozeman, MT", text: "James isn't a broker; he's a land steward. He guided us away from several properties that looked good on paper but had underlying issues, finally placing us in our dream ranch.", img: "/images/client-4.png" },
                ].map((testimonial) => (
                  <div key={testimonial.id} className="w-[400px] md:w-[500px] bg-white p-8 shadow-lg border border-border">
                    <div className="flex text-secondary mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-lg italic text-muted-foreground mb-6">"{testimonial.text}"</p>
                    <div className="flex items-center gap-4">
                      <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.loc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
              {/* Duplicate for infinite loop illusion */}
              <motion.div 
                className="flex gap-8 shrink-0 min-w-max absolute left-[100%]"
                animate={{ x: ["0%", "-100%"] }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              >
                {[
                  { id: 1, name: "Sarah & Tom Whitfield", loc: "Austin, TX", text: "Working with James was a revelation. He understood immediately that we weren't just looking for land; we were looking for a legacy for our children. The transaction was flawless, but his insight was priceless.", img: "/images/client-1.png" },
                  { id: 2, name: "Marcus Sterling", loc: "Jackson Hole, WY", text: "In the high-end land market, discretion and speed are everything. James delivered both. He found an off-market property that perfectly matched my portfolio needs and negotiated it masterfully.", img: "/images/client-2.png" },
                  { id: 3, name: "Elena Rostova", loc: "Napa Valley, CA", text: "We spent three years looking for the right vineyard acreage before meeting James. He found it in three months. His understanding of soil, water rights, and zoning is absolutely unmatched.", img: "/images/client-3.png" },
                  { id: 4, name: "The Harrison Family", loc: "Bozeman, MT", text: "James isn't a broker; he's a land steward. He guided us away from several properties that looked good on paper but had underlying issues, finally placing us in our dream ranch.", img: "/images/client-4.png" },
                ].map((testimonial) => (
                  <div key={`dup-${testimonial.id}`} className="w-[400px] md:w-[500px] bg-white p-8 shadow-lg border border-border">
                    <div className="flex text-secondary mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-lg italic text-muted-foreground mb-6">"{testimonial.text}"</p>
                    <div className="flex items-center gap-4">
                      <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.loc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Press */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm uppercase tracking-widest text-muted-foreground font-bold mb-8">As Featured In & Trusted By</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
            {["The Wall Street Journal", "Forbes Real Estate", "Land Report", "Mansion Global"].map((partner) => (
              <span key={partner} className="text-xl md:text-2xl font-serif font-bold text-primary">{partner}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background" data-testid="section-contact">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-16">
            <FadeIn className="lg:col-span-2">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Ready to Find Your Land?</h2>
              <p className="text-lg text-muted-foreground mb-8">Whether you're acquiring a generational estate or divesting significant acreage, let's discuss your vision.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Direct Line</p>
                    <p className="text-xl font-serif font-bold text-primary">+1 (406) 555-0198</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Email</p>
                    <p className="text-xl font-serif text-primary">james@hartwellestates.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-border">
                <img src="/images/broker-contact.png" alt="James Hartwell" className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-xl" />
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2} className="lg:col-span-3">
              <form onSubmit={handleContact} className="bg-white p-8 md:p-12 shadow-2xl border border-border" data-testid="form-contact">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-primary">Full Name</label>
                    <Input required placeholder="John Smith" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-primary">Email</label>
                    <Input required type="email" placeholder="john@example.com" className="bg-background border-border" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-primary">Phone</label>
                    <Input placeholder="(555) 000-0000" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-primary">Interest</label>
                    <Select defaultValue="buying">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buying">Acquiring Land</SelectItem>
                        <SelectItem value="selling">Selling Land</SelectItem>
                        <SelectItem value="consulting">General Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2 mb-8">
                  <label className="text-sm font-bold uppercase tracking-wider text-primary">Message</label>
                  <Textarea required placeholder="Tell me about your vision..." className="min-h-[150px] bg-background border-border" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary text-white hover:bg-primary/90 font-serif text-lg" data-testid="button-contact">
                  Send Inquiry
                </Button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16 border-t border-secondary/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <span className="font-serif text-3xl font-bold text-secondary mb-4 block">Hartwell Estates</span>
              <p className="text-primary-foreground/70 max-w-sm">
                Where legacy land meets visionary stewardship. Exclusively representing the finest acreage in the American West.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider text-secondary mb-4">Navigation</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li><a href="#about" className="hover:text-white transition-colors">About James</a></li>
                <li><a href="#listings" className="hover:text-white transition-colors">Current Listings</a></li>
                <li><a href="#sold" className="hover:text-white transition-colors">Past Sales</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Client Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider text-secondary mb-4">Connect</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li>LinkedIn</li>
                <li>Instagram</li>
                <li>The Land Report</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/50">
            <p>&copy; {new Date().getFullYear()} Hartwell Estates LLC. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}