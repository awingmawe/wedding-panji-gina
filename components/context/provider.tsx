'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface InvitationContextType {
  isInvitationOpen: boolean
  openInvitation: () => void

  progress: number
  setProgress: React.Dispatch<React.SetStateAction<number>>

  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const InvitationContext = createContext<InvitationContextType | undefined>(
  undefined
)

export const InvitationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  const openInvitation = () => {
    setIsInvitationOpen(true)
    // Enable scrolling when invitation is opened
    document.body.style.overflow = 'auto'
    // Play music if you have background music
    const audioElement = document.getElementById('bgMusic') as HTMLAudioElement
    if (audioElement) {
      audioElement
        .play()
        .catch((error) => console.log('Audio autoplay was prevented:', error))
    }
  }

  // Disable scrolling initially when the component mounts
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <InvitationContext.Provider
      value={{
        isInvitationOpen,
        openInvitation,
        progress,
        setProgress,
        loading,
        setLoading,
      }}
    >
      {children}
    </InvitationContext.Provider>
  )
}

export const useInvitation = () => {
  const context = useContext(InvitationContext)
  if (context === undefined) {
    throw new Error('useInvitation must be used within an InvitationProvider')
  }
  return context
}
