import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
  withCredentials: true,
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
  },
  promo: {
    issueCode: (campaignId: number) => `/promo/${campaignId}/issue-code`,
    status: (campaignId: number) => `/promo/${campaignId}/status`,
  },
  redeem: {
    lookup: '/redeem/lookup',
    confirm: '/redeem/confirm',
    history: '/redeem/history',
  },
  campaigns: {
    list: '/campaigns',
    detail: (id: number) => `/campaigns/${id}`,
    create: '/campaigns',
    update: (id: number) => `/campaigns/${id}`,
    delete: (id: number) => `/campaigns/${id}`,
    deeplink: (id: number) => `/campaigns/${id}/deeplink`,
    qr: (id: number) => `/campaigns/${id}/qr`,
  },
  exports: {
    codes: (campaignId: number) => `/exports/campaign/${campaignId}/codes.csv`,
    redemptions: (campaignId: number) => `/exports/campaign/${campaignId}/redemptions.csv`,
  },
}