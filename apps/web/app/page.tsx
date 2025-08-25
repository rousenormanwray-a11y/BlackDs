'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Crown, Target, Shield, Trophy, MessageCircle, Instagram, Share2 } from 'lucide-react'

export default function HomePage() {
  const socialLinks = {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PLACEHOLDER',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/blvkdot',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@blvkdot',
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-amber-900/20"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-8xl md:text-9xl font-bold text-gradient mb-4"
          >
            BLVKDOT
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-light mb-8"
          >
            ONE SHOT. ONE KING.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href={socialLinks.whatsapp} className="btn-primary flex items-center gap-2">
              <MessageCircle size={20} />
              Join WhatsApp
            </Link>
            <Link href={socialLinks.instagram} className="btn-secondary flex items-center gap-2">
              <Instagram size={20} />
              Follow Instagram
            </Link>
            <Link href={socialLinks.tiktok} className="btn-outline flex items-center gap-2">
              <Share2 size={20} />
              Follow TikTok
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-panel text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Philosophy</h2>
            <blockquote className="text-xl md:text-2xl italic">
              "One dot. One shot. One king. Every move is staked. Every win is earned."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Roadmap
          </motion.h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { phase: 'Phase 1', title: 'The Arena', status: 'Live' },
              { phase: 'Phase 2', title: 'The Digital Board', status: 'Coming Soon' },
              { phase: 'Phase 3', title: 'Escrow Challenges', status: 'Coming Soon' },
              { phase: 'Phase 4', title: 'Merch & Kingship', status: 'Soon' },
              { phase: 'Phase 5', title: 'Full BLVKDOT Web App', status: 'Launch' },
            ].map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel text-center"
              >
                <div className="text-sm text-amber-400 mb-2">{item.phase}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <div className="text-sm text-gray-400">{item.status}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Trophy, title: 'Ranking & Leaderboards', desc: 'Compete for the top spot' },
              { icon: Target, title: 'Challenge System', desc: 'Challenge other players' },
              { icon: Shield, title: 'Escrow Wallet', desc: 'Secure transactions' },
              { icon: Crown, title: 'Tournaments', desc: 'Join competitive events' },
              { icon: MessageCircle, title: 'Real-Time Chat', desc: 'Connect with players' },
              { icon: Trophy, title: 'Redeemable Rewards', desc: 'Earn and redeem prizes' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel text-center"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-900/20 to-amber-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-panel"
          >
            <h2 className="text-4xl font-bold mb-6">Claim Your Free Game</h2>
            <p className="text-lg mb-6">
              Follow our socials and claim a free game code. Attendant will verify your follows before you can play.
            </p>
            <Link href="/claim" className="btn-primary text-lg px-8 py-4">
              Claim Free Game Code
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-panel"
          >
            <h2 className="text-4xl font-bold mb-6">Report Results / Redeem</h2>
            <p className="text-lg mb-6">
              Have a code to redeem? Contact us via WhatsApp for assistance.
            </p>
            <Link href={socialLinks.whatsapp} className="btn-secondary text-lg px-8 py-4">
              Report Results / Redeem via WhatsApp
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}