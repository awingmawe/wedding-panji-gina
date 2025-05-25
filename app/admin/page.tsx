'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAttendances, useGuests, useMessages } from '@/hooks/useApi'
import { useState } from 'react'

export default function AdminDashboard() {
  const { data: guests, loading: guestsLoading } = useGuests()
  const { data: attendances, loading: attendancesLoading } = useAttendances()
  const { data: messages, loading: messagesLoading } = useMessages()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredGuests = guests?.filter(
    (guest) =>
      guest.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalGuests: guests?.length || 0,
    totalAttendances: attendances?.length || 0,
    totalMessages: messages?.length || 0,
    attendingAkad:
      attendances?.filter((a) => a.konfirmasi.includes('Akad')).length || 0,
    attendingResepsi:
      attendances?.filter((a) => a.konfirmasi.includes('Resepsi')).length || 0,
    notAttending:
      attendances?.filter((a) => a.konfirmasi.includes('belum bisa hadir'))
        .length || 0,
  }

  if (guestsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#CF935F]"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#8b6c5c]">
        Wedding Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#606161]">
              Total Guests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8b6c5c]">
              {stats.totalGuests}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#606161]">
              RSVP Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#CF935F]">
              {stats.totalAttendances}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#606161]">
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8b6c5c]">
              {stats.totalMessages}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#606161]">
              Attending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.totalAttendances - stats.notAttending}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="guests" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guests">Guests</TabsTrigger>
          <TabsTrigger value="attendances">RSVP</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="guests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest List</CardTitle>
              <Input
                placeholder="Search guests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredGuests?.map((guest) => (
                  <div
                    key={guest.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <h4 className="font-medium">{guest.nama}</h4>
                      <p className="text-sm text-[#606161]">
                        @{guest.nickname}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(`/invitation/${guest.nickname}`, '_blank')
                        }
                      >
                        View Invitation
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/invitation/${guest.nickname}`
                          )
                        }}
                      >
                        Copy Link
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendances" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>RSVP Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {attendances?.map((attendance) => (
                  <div
                    key={attendance.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <h4 className="font-medium">{attendance.nama}</h4>
                      <p className="text-sm text-[#606161]">
                        {attendance.konfirmasi}
                      </p>
                      <p className="text-xs text-[#999]">
                        {attendance.jumlahTamu} tamu •{' '}
                        {new Date(attendance.createdAt).toLocaleDateString(
                          'id-ID'
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Wedding Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages?.map((message) => (
                  <div key={message.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <h4 className="font-medium">{message.name}</h4>
                      <span className="text-xs text-[#999]">
                        {new Date(message.createdAt).toLocaleDateString(
                          'id-ID'
                        )}
                      </span>
                    </div>
                    <p className="text-[#606161]">{message.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
