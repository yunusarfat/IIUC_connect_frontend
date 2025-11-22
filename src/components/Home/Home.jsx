import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import mosque from "./mosque.jpg";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  BookOpen, 
  Heart,
  ArrowRight,
  UserPlus,
  Search,
  Globe,
  GraduationCap,
  MessageCircle
} from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Home = () => {
  const [counters, setCounters] = useState({
    alumni: 0,
    countries: 0,
    stories: 0,
    companies: 0
  });

  const statsRef = useRef(null);

  // Animated counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const targetValues = {
            alumni: 15000,
            countries: 5,
            stories: 2000,
            companies: 10
          };

          Object.keys(targetValues).forEach(key => {
            const target = targetValues[key];
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCounters(prev => ({
                ...prev,
                [key]: Math.floor(current)
              }));
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Users,
      title: "Global Alumni Network",
      description: "Connect with 10,000+ IIUC graduates worldwide"
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Access exclusive job postings and career resources"
    },
    {
      icon: Calendar,
      title: "Alumni Events",
      description: "Join reunions, webinars, and networking events"
    },
    {
      icon: BookOpen,
      title: "Knowledge Hub",
      description: "Share insights, research, and industry knowledge"
    },
    {
      icon: Heart,
      title: "Lifelong Community",
      description: "Stay connected with your IIUC family forever"
    },
    {
      icon: MessageCircle,
      title: "Mentorship Program",
      description: "Get guidance from experienced alumni in your field"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Register",
      description: "Create your alumni profile in 2 minutes"
    },
    {
      step: "02",
      title: "Connect",
      description: "Find classmates and industry professionals"
    },
    {
      step: "03",
      title: "Grow",
      description: "Access opportunities and build your career"
    }
  ];

  const recentActivities = {
    blogPosts: [
      { title: "AI in Modern Business", readTime: "5 min read" },
      { title: "Career Growth Strategies", readTime: "4 min read" }
    ],
    events: [
      { title: "Annual Alumni Meet 2024", date: "Dec 15, 2024" },
      { title: "Tech Industry Webinar", date: "Nov 30, 2024" }
    ],
    jobs: [
      { company: "TechCorp", position: "Senior Developer" },
      { company: "GlobalBank", position: "Finance Manager" }
    ]
  };

  // Animated Campus Word Component
  const AnimatedCampusWord = () => (
    <motion.span
      className="inline-block relative"
      animate={{
        rotateY: [0, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotateY: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.span
        className="relative inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(45deg, #22d3ee, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
        }}
        animate={{
          textShadow: [
            '0 0 20px rgba(59, 130, 246, 0.5)',
            '0 0 40px rgba(139, 92, 246, 0.8)',
            '0 0 20px rgba(34, 211, 238, 0.5)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        campus
        {/* 3D effect layers */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent opacity-70"
          style={{
            transform: 'translateZ(10px)',
            filter: 'blur(2px)',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          campus
        </motion.span>
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent opacity-50"
          style={{
            transform: 'translateZ(20px)',
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          campus
        </motion.span>
      </motion.span>
      
      {/* Glowing effect */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 rounded-lg blur-xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with college image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${mosque})`,
            }}
          ></div>
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-blue-800/30 to-cyan-600/20"></div>

        {/* Glassmorphism Content Container */}
        <div className="relative z-10 px-4 max-w-6xl mx-auto w-full">
          <motion.div 
            className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-12 md:p-16 lg:p-20 shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              {/* Main focus line with animated campus word */}
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Once we walked this{" "}
                <AnimatedCampusWord />
                {" "}together.
                <br />
                Today, we reconnect again.
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Join the IIUC Alumni Network - Where Connections Create Opportunities
              </motion.p>

              <motion.div 
              
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link to="/register">
                <button className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 shadow-lg">
                    
                  Join Now <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                </Link>
                <Link to="/blog">
                <button className="group backdrop-blur-lg bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg">
                  Explore Network <Search size={20} />
                </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm bg-black/20">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Rest of the sections remain the same */}
      {/* College Image Section under Hero */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Legacy Continues</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From the halls of IIUC to the world stage - our journey continues through this network
            </p>
          </motion.div>
          
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src={mosque} 
              alt="IIUC Campus" 
              className="w-full h-auto max-h-[540px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">International Islamic University Chittagong</h3>
              <p className="text-cyan-200">Where lifelong connections begin</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Join Our Network?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the powerful benefits of connecting with your IIUC alumni community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Counter */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-indigo-900/30 to-blue-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: counters.alumni, label: "Alumni Members", suffix: "+" },
              { value: counters.countries, label: "Countries Worldwide", suffix: "+" },
              { value: counters.stories, label: "Success Stories", suffix: "+" },
              { value: counters.companies, label: "Partner Companies", suffix: "+" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Started in 3 Steps</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of alumni who are already advancing their careers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 text-center group-hover:bg-white/10 transition-all duration-500 transform group-hover:-translate-y-2">
                  <div className="text-6xl font-bold text-gray-400/30 mb-4">{step.step}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-cyan-400 w-8 h-8 opacity-50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What's Happening</h2>
            <p className="text-xl text-gray-300">Latest updates from our community</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Posts */}
            <motion.div
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="text-cyan-400" /> Latest Blogs
              </h3>
              <div className="space-y-4">
                {recentActivities.blogPosts.map((post, index) => (
                  <div key={index} className="group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                    <h4 className="font-semibold mb-2 group-hover:text-cyan-300 transition-colors">{post.title}</h4>
                    <p className="text-gray-400 text-sm">{post.readTime}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Events */}
            <motion.div
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="text-cyan-400" /> Upcoming Events
              </h3>
              <div className="space-y-4">
                {recentActivities.events.map((event, index) => (
                  <div key={index} className="group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                    <h4 className="font-semibold mb-2 group-hover:text-cyan-300 transition-colors">{event.title}</h4>
                    <p className="text-gray-400 text-sm">{event.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Jobs */}
            <motion.div
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="text-cyan-400" /> Featured Jobs
              </h3>
              <div className="space-y-4">
                {recentActivities.jobs.map((job, index) => (
                  <div key={index} className="group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                    <h4 className="font-semibold mb-1 group-hover:text-cyan-300 transition-colors">{job.position}</h4>
                    <p className="text-gray-400 text-sm">{job.company}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Expand Your Network?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of IIUC alumni who are already connecting and growing together
            </p>
            
            {/* New inspirational line */}
            <motion.p 
              className="text-cyan-200 italic text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              "Reconnect with the people who made your journey unforgettable."
            </motion.p>
            
            <Link to="/register">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2">
                Create Your Account <UserPlus className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
            </Link>
            
            <p className="text-gray-400 mt-6">
                <Link to="/login">
              Already a member? <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors">Sign In</span>
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;