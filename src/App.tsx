/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

// --- Types ---

interface Service {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  idealFor: string;
  involved: string[];
  image: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  services: Service[];
}

// --- Mock Data ---

const CATEGORIES: Category[] = [
  {
    id: 'hair-styling',
    name: 'HAIR STYLING',
    count: 12,
    image: '/Hair styling.png',
    services: [
      {
        id: 'blowout',
        title: 'SIGNATURE BLOWOUT',
        price: '$65',
        duration: '45min',
        description: 'Our classic high-volume blowout that leaves your hair smooth, shiny, and ready for anything.',
        idealFor: 'Weekly maintenance or a quick style refresh for any occasion.',
        involved: [
          'Relaxing Scalp Massage & Wash',
          'Premium Heat Protectant Application',
          'Professional Round-Brush Blow-Dry'
        ],
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'updo',
        title: 'LUXURY UPDO',
        price: '$120',
        duration: '75min',
        description: 'An elegant, sophisticated up-style tailored to your face shape and event needs.',
        idealFor: 'Gala events, formal dinners, or any evening requiring a touch of class.',
        involved: [
          'Style Consultation & Texture Prep',
          'Intricate Pinning & Shaping',
          'Long-Hold Finishing Spray'
        ],
        image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'waves',
        title: 'HOLLYWOOD WAVES',
        price: '$95',
        duration: '60min',
        description: 'Glamorous, red-carpet ready waves that provide ultimate shine and timeless movement.',
        idealFor: 'Special occasions where you want maximum impact and classic glamour.',
        involved: [
          'Precision Iron Curling',
          'Brushing Out for Seamless Flow',
          'Shine Serum & Setting Mist'
        ],
        image: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'bridal',
        title: 'BRIDAL STYLING',
        price: '$180',
        duration: '90min',
        description: 'The ultimate styling experience for your special day, including trial options and veil placement.',
        idealFor: 'Brides looking for a flawless, long-lasting look that shines in photos.',
        involved: [
          'In-Depth Bridal Consultation',
          'Structural Prepping for All-Day Hold',
          'Veil or Hair Accessory Placement'
        ],
        image: 'https://images.unsplash.com/photo-1522337094846-8a818192de2f?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'hair-coloring',
    name: 'HAIR COLORING',
    count: 16,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800',
    services: [
      {
        id: 'balayage',
        title: 'BALAYAGE',
        price: '$220',
        duration: '150min',
        description: 'Hand-painted highlights that create a natural, sun-kissed gradient effect with seamless grow-out.',
        idealFor: 'Those wanting low-maintenance, dimensional color with a natural finish.',
        involved: [
          'Consultation & Color Mapping',
          'Freehand Balayage Application with Loreal Lightener',
          'Toning & Gloss Treatment for Shine'
        ],
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'full-color',
        title: 'FULL COLOR',
        price: '$130',
        duration: '90min',
        description: 'Complete root-to-tip hair color transformation using professional Loreal Paris color.',
        idealFor: 'Covering grays or achieving a bold, uniform new shade.',
        involved: [
          'Color Consultation & Strand Test',
          'Full Application of Permanent or Demi-Permanent Color',
          'Conditioning Treatment & Blow-Dry Finish'
        ],
        image: 'https://images.unsplash.com/photo-1560869713-da86a9ec0744?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'highlights',
        title: 'HIGHLIGHTS & LOWLIGHTS',
        price: '$180',
        duration: '120min',
        description: 'Foil highlights or lowlights to add contrast, depth, and dimension to your hair.',
        idealFor: 'Adding brightness and movement to flat or one-dimensional color.',
        involved: [
          'Sectioning & Foil Placement',
          'Lightener or Color Application',
          'Gloss Finish for Vibrancy'
        ],
        image: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'toning',
        title: 'GLOSS & TONING',
        price: '$80',
        duration: '45min',
        description: 'Neutralizes brassiness and refreshes color with a sheer, luminous gloss treatment.',
        idealFor: 'Maintaining vibrancy between color appointments and eliminating yellow tones.',
        involved: [
          'Hair Assessment & Shade Selection',
          'Toner or Gloss Application',
          'Deep Conditioning Mask'
        ],
        image: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'hair-treatments',
    name: 'HAIR TREATMENTS',
    count: 12,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
    services: [
      {
        id: 'keratin',
        title: 'KERATIN INFUSION',
        price: '$250',
        duration: '120min',
        description: 'Smoothing treatment that reduces frizz and adds intense shine.',
        idealFor: 'Unruly hair and long-lasting smoothness.',
        involved: ['Deep Wash', 'Keratin Application', 'Heat Sealing'],
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
];

// --- Components ---

const Navbar = ({ onLogoClick }: { onLogoClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <span
            onClick={onLogoClick}
            className={`font-display font-black text-2xl tracking-tighter cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}`}
          >
            MOONYE
          </span>
          <div className={`hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase ${isScrolled ? 'text-black' : 'text-white'}`}>
            <a href="#" className="hover:opacity-60 transition-opacity">About Us</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Services</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Contact Us</a>
          </div>
        </div>
        <AnimatePresence>
          {isScrolled && (
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              href="https://wa.link/gpavdx"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-lg"
            >
              Book Now
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between pt-32 pb-16">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/Real Background.png"
          alt="Beauty Hero"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-24 flex flex-col items-start gap-12"
        >
          <div className="flex flex-col items-start">
            <p className="text-[14px] font-bold tracking-tight text-white mb-2">
              Good hair days begin here. Welcome to MOONYE
            </p>
            <a
              href="https://wa.link/gpavdx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[18px] font-black tracking-tighter uppercase border-b-2 border-white pb-0.5 text-white hover:opacity-70 transition-opacity"
            >
              BOOK AN APPOINTMENT
            </a>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

const Pitch = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-32 bg-white flex flex-col items-center text-center px-6">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl"
      >
        <div className="overflow-hidden mb-12">
          <motion.h2 variants={item} className="font-display font-extrabold text-5xl md:text-8xl leading-[1] tracking-tighter uppercase">
            WE HELP YOU LOOK <br />
            AND FEEL YOUR BEST
          </motion.h2>
        </div>

        <motion.div variants={item} className="mb-8 flex justify-center">
          <img
            src="/LOREAL new.png"
            alt="L'Oréal Paris Professional"
            className="h-[66px] w-auto object-contain"
          />
        </motion.div>

        <div className="overflow-hidden mb-12">
          <motion.p variants={item} className="text-sm font-medium tracking-widest uppercase opacity-60 max-w-2xl mx-auto leading-relaxed">
            We're a certified L'Oréal Paris Professional
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

const ServicesSection = ({ onSelectCategory }: { onSelectCategory: (cat: Category) => void }) => {
  return (
    <section className="py-24 bg-neutral-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden mb-16">
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-between items-end"
          >
            <h2 className="font-display font-extrabold text-6xl tracking-tighter uppercase">OUR SERVICES</h2>
            <button className="text-xs font-bold tracking-widest uppercase border-b border-black/20 pb-1 hover:border-black transition-all">
              View All
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectCategory(cat)}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8 text-white transform transition-transform duration-700 group-hover:-translate-y-2">
                <h3 className="font-display font-bold text-3xl tracking-tight mb-2 uppercase">{cat.name}</h3>
                <p className="text-xs font-medium tracking-widest uppercase opacity-80">{cat.count} services</p>
              </div>
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform transition-transform duration-500 scale-50 group-hover:scale-100">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpansionSection = ({ category, onBack, onSelectService, onSelectCategory }: {
  category: Category;
  onBack: () => void;
  onSelectService: (service: Service) => void;
  onSelectCategory: (cat: Category) => void;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-32 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-24">
          <h2 className="font-display font-extrabold text-7xl tracking-tighter uppercase mb-12">
            OUR SERVICES
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4 w-full justify-center no-scrollbar">
            <button
              onClick={onBack}
              className="px-8 py-4 border border-neutral-100 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-neutral-50 transition-colors flex flex-col items-start min-w-[160px]"
            >
              <span className="opacity-40 mb-1">ALL</span>
              <span>54 SERVICES</span>
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                className={`px-8 py-4 border rounded-xl text-xs font-bold tracking-widest uppercase transition-all flex flex-col items-start min-w-[160px] ${category.id === cat.id ? 'border-black bg-black text-white' : 'border-neutral-100 hover:bg-neutral-50'
                  }`}
              >
                <span className={`opacity-40 mb-1 ${category.id === cat.id ? 'text-white/60' : ''}`}>{cat.name}</span>
                <span>{cat.count} SERVICES</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col h-full"
          >
            <div className="mb-12">
              <h2 className="font-display font-extrabold text-7xl tracking-tighter mb-4 uppercase">{category.name}</h2>
              <p className="text-lg text-neutral-500 leading-relaxed font-medium">
                Inspired by nature, light, and the soft rhythm of self-care, our {category.name.toLowerCase()}
                treatments are designed to restore balance, nourish deeply, and reveal your natural radiance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onSelectService(service)}
                  className="p-8 border border-neutral-100 rounded-2xl hover:border-neutral-300 cursor-pointer transition-colors group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-display font-bold text-lg tracking-tight group-hover:text-neutral-600 transition-colors">
                      {service.title}
                    </h4>
                    <span className="font-display font-bold text-lg">{service.price}</span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-6 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase opacity-60">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</span>
                    <button className="ml-auto border-b border-black/20 pb-0.5 group-hover:border-black transition-all">Learn More</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="sticky top-32 aspect-[4/5] rounded-3xl overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const ServiceDetail = ({ service, onClose }: { service: Service; onClose: () => void }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto overflow-hidden">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-8">
            <motion.div variants={item}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-black" />
                ))}
                <span className="text-[10px] font-bold ml-1">4.9</span>
              </div>
              <h3 className="font-display font-extrabold text-5xl tracking-tighter leading-none mb-4 uppercase">
                {service.title}
              </h3>
              <div className="flex items-center gap-4 text-[11px] font-bold tracking-widest uppercase opacity-50 mb-6">
                <span>{service.price}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</span>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                {service.description}
              </p>
            </motion.div>
            <motion.button
              variants={item}
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-8 mb-8">
            <motion.div variants={item}>
              <h5 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-3">Ideal For:</h5>
              <p className="text-sm text-neutral-800 leading-relaxed font-medium">{service.idealFor}</p>
            </motion.div>

            <motion.div variants={item}>
              <h5 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-4">What's Involved:</h5>
              <ul className="space-y-4">
                {service.involved.map((item, idx) => (
                  <li key={idx} className="flex gap-4 text-sm text-neutral-800 leading-relaxed font-medium">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.a
            href="https://wa.link/gpavdx"
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 w-full bg-black text-white text-xs font-bold tracking-widest uppercase py-5 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center"
          >
            Book Now
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Angela Tan',
      treatment: 'Hair Cut & Wash',
      date: 'Aug 12th, 2025',
      rating: 5,
      text: 'Found a new salon, went for hair cut and wash. It was pleasantly surprised. Good service and reasonable price. Lady boss are friendly and skillful. Highly recommend the massage service. So good and rejuvenate!',
      beforeImage: '/med.png',
      afterImage: '/unnamed.png'
    },
    {
      id: 2,
      name: 'Cassandra',
      treatment: 'Hair Styling',
      date: 'Sep 5th, 2025',
      rating: 5,
      text: 'Outstanding and reliable hairstylist. Ms. Clounie has always been our go-to for haircuts and styling. The quality of her work justifies the price.',
      beforeImage: '/3.png',
      afterImage: '/3.png'
    }
  ];

  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-display font-extrabold text-5xl md:text-7xl tracking-tighter leading-[0.9] uppercase inline-block">
            REAL RATINGS <br />
            NO FILTERS NO RETOUCHING <br />
            JUST REAL PEOPLE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reviews.map((review) => (
            <div key={review.id} className="p-10 border border-neutral-100 rounded-2xl flex flex-col h-full">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black" />
                ))}
                <span className="text-sm font-bold ml-2">{review.rating}</span>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-10 flex-grow">
                {review.text}
              </p>

              <div className="flex gap-4 mb-8">
                <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-neutral-100">
                  <img src={review.beforeImage} alt="Before" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-neutral-100">
                  <img src={review.afterImage} alt="After" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>

              <div>
                <h4 className="font-display font-bold text-lg tracking-tight">{review.name}</h4>
                <p className="text-xs font-medium tracking-widest uppercase opacity-40">
                  {review.treatment}, {review.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-neutral-200" />
            <div className="w-2 h-2 rounded-full bg-neutral-200" />
          </div>
          <button className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedService]);

  // Scroll to top when category changes
  useEffect(() => {
    if (selectedCategory) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  return (
    <div className="font-sans selection:bg-black selection:text-white">
      <Navbar onLogoClick={() => {
        setSelectedCategory(null);
        setSelectedService(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      <main>
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="main-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <Pitch />
              <ServicesSection onSelectCategory={setSelectedCategory} />
              <ReviewsSection />
            </motion.div>
          ) : (
            <motion.div
              key="expansion-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ExpansionSection
                category={selectedCategory}
                onBack={() => setSelectedCategory(null)}
                onSelectService={setSelectedService}
                onSelectCategory={setSelectedCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedService && (
          <ServiceDetail
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>

      <footer className="py-24 bg-neutral-900 text-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <h3 className="font-display font-extrabold text-3xl tracking-tighter mb-6">MOONYE HAIR SALON</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              A premium beauty studio dedicated to your well-being. We believe in the power of self-care
              and the beauty of natural radiance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-6">Explore</h4>
              <ul className="space-y-4 text-xs font-semibold tracking-widest uppercase">
                <li><a href="#" className="hover:opacity-60 transition-opacity">About</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Services</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-6">Legal</h4>
              <ul className="space-y-4 text-xs font-semibold tracking-widest uppercase">
                <li><a href="#" className="hover:opacity-60 transition-opacity">Privacy</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-6">Social</h4>
              <ul className="space-y-4 text-xs font-semibold tracking-widest uppercase">
                <li><a href="#" className="hover:opacity-60 transition-opacity">Instagram</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase opacity-30">
          <p>© 2026 MOONYE HAIR SALON</p>
          <p>DESIGNED BY TIMEFALL STUDIOS</p>
        </div>
      </footer>
    </div>
  );
}
