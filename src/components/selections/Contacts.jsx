import React from 'react';
import { Mail, MapPin, Phone, Instagram, Twitter, Linkedin, Send } from 'lucide-react';
import Reveal from '../ui/Reveal';

const Contact = () => {
  return (
    <section id="contact" className="relative z-10 bg-slate-900 border-t border-slate-800 py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Create <br/><span className="text-cyan-400">Some Beats.</span></h2>
              <p className="text-slate-400 text-lg mb-12 max-w-lg">
                Ready to take your project to the next level? Whether it's mixing, mastering, or custom sound design, I'm here to help you realize your vision.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-cyan-500/10 rounded-full text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Email</h3>
                    <p className="text-slate-400">ankitpatgaonkar@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-violet-500/10 rounded-full text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Studio</h3>
                    <p className="text-slate-400">Kolhapur, Maharashtra & Remote</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-fuchsia-500/10 rounded-full text-fuchsia-400 group-hover:bg-fuchsia-500/20 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Phone</h3>
                    <p className="text-slate-400">+91 87670 07950</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 mt-12">
                <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"><Instagram className="w-6 h-6"/></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"><Twitter className="w-6 h-6"/></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"><Linkedin className="w-6 h-6"/></a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 md:p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Name</label>
                    <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email</label>
                    <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Project Type</label>
                  <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors">
                    <option>Mixing & Mastering</option>
                    <option>Sound Design</option>
                    <option>Original Composition</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Message</label>
                  <textarea rows="4" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" placeholder="Tell me about your project..."></textarea>
                </div>
                <button type="button" className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;