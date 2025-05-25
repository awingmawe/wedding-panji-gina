import { useState, useEffect } from 'react'
import { Guest, Attendance, Message } from '@/types'

// Generic API hook
function useApi<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [options, url])

  return { data, loading, error, refetch: () => fetchData() }
}

// Guest API hooks
export function useGuests() {
  return useApi<Guest[]>('/api/guests')
}

export function useGuest(id: string) {
  return useApi<Guest>(`/api/guests/${id}`)
}

export function useGuestByNickname(nickname: string) {
  return useApi<Guest>(`/api/guests/nickname/${nickname}`)
}

// Attendance API hooks
export function useAttendances() {
  return useApi<Attendance[]>('/api/attendance')
}

// Messages API hooks
export function useMessages() {
  return useApi<Message[]>('/api/messages')
}

// API action functions
export async function createAttendance(data: {
  guestId: number
  nama: string
  konfirmasi: string
  jumlahTamu: number
}) {
  const response = await fetch('/api/attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to submit attendance')
  }

  return response.json()
}

export async function createMessage(data: {
  guestId: number
  message: string
  name: string
}) {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to submit message')
  }

  return response.json()
}

function fetchData() {
  throw new Error('Function not implemented.')
}
