'use client'

import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Copy, Check, MessageCircle, Instagram, Share2 } from 'lucide-react'
import { api, endpoints } from '@/lib/api'

export default function ClaimPage() {
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [code, setCode] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Generate or retrieve device ID
    let id = localStorage.getItem('bd_device_id')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('bd_device_id', id)
    }
    setDeviceId(id)
  }, [])

  const issueCodeMutation = useMutation({
    mutationFn: () =>
      api.post(endpoints.promo.issueCode(1), { 
        deviceId, 
        selfAttested: true 
      }).then((r) => r.data),
    onSuccess: (data) => setCode(data),
  })

  const copyToClipboard = async () => {
    if (code?.code) {
      await navigator.clipboard.writeText(code.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareViaWhatsApp = () => {
    const message = `I just claimed a BLVKDOT free game. Code: ${code?.code}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const socialLinks = {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/message/PLACEHOLDER',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/blvkdot',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@blvkdot',
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Claim Free Game</h1>

        {!code ? (
          <div className="glass-panel text-center">
            <p className="text-lg mb-6">
              Follow our social media channels to claim your free game code.
            </p>
            
            <div className="flex flex-col gap-3 mb-8">
              <a 
                href={socialLinks.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Join WhatsApp
              </a>
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Instagram size={20} />
                Follow Instagram
              </a>
              <a 
                href={socialLinks.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Share2 size={20} />
                Follow TikTok
              </a>
            </div>

            <button
              onClick={() => issueCodeMutation.mutate()}
              disabled={issueCodeMutation.isPending}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50"
            >
              {issueCodeMutation.isPending ? 'Issuing Code...' : 'I Followed – Claim Code'}
            </button>

            {issueCodeMutation.isError && (
              <p className="text-red-400 mt-4">
                Error issuing code. Please try again.
              </p>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Your Code</h2>
            
            <div className="bg-gray-900 p-6 rounded-xl mb-6">
              <div className="text-4xl font-mono font-bold text-amber-400 mb-2">
                {code.code}
              </div>
              <p className="text-sm text-gray-400">
                Expires: {new Date(code.expiresAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={copyToClipboard}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>

              <button
                onClick={shareViaWhatsApp}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Save via WhatsApp
              </button>
            </div>

            <div className="mt-6 p-4 bg-amber-900/20 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> Attendant will verify your follows before you can play.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}