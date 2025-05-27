'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  updateGuest,
  useAttendancesPaginated,
  useAttendanceStats,
  useGuests,
  useGuestsPaginated,
  useMessagesPaginated,
} from '@/hooks/useApi'
import { Guest } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

// Custom hook for infinite scroll
function useInfiniteScroll(
  loading: boolean,
  hasMore: boolean,
  loadMore: () => void
) {
  const [isFetching, setIsFetching] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !loading) {
      setIsFetching(true)
    }
  }

  useEffect(() => {
    if (!isFetching) return
    if (hasMore && !loading) {
      loadMore()
    }
    setIsFetching(false)
  }, [isFetching, hasMore, loading, loadMore])

  return { handleScroll }
}

// Edit Guest Modal Component
function EditGuestModal({
  guest,
  onGuestUpdated,
  trigger,
}: {
  guest: Guest
  onGuestUpdated: () => void
  trigger: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [nama, setNama] = useState(guest.nama)
  const [nickname, setNickname] = useState(guest.nickname)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when guest changes
  useEffect(() => {
    setNama(guest.nama)
    setNickname(guest.nickname)
  }, [guest])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nama.trim() || !nickname.trim()) {
      toast.error('Nama dan nickname tidak boleh kosong')
      return
    }

    setIsSubmitting(true)

    try {
      await updateGuest(guest.id, {
        nama: nama.trim(),
        nickname: nickname.trim(),
      })

      toast.success('Tamu berhasil diperbarui!')
      setOpen(false)
      onGuestUpdated() // Refresh the list
    } catch (error) {
      toast.error('Gagal memperbarui tamu')
      console.error('Error updating guest:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tamu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama">Nama</Label>
            <Input
              id="nama"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value)
                setNickname(
                  e.target.value
                    ? nama
                        .toLowerCase()
                        .trim()
                        .replace(/ +/g, ' ') // Replace multiple spaces with a single space
                        .replace(/ /g, '-') // Replace spaces with dashes
                        .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric characters except dash
                        .replace(/--+/g, '-') // Replace multiple dashes with a single dash
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                    : ''
                )
              }}
              placeholder="Masukkan nama tamu"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Masukkan nickname (untuk URL)"
              required
              disabled
            />
            <p className="text-xs text-gray-500">
              URL akan menjadi: {window.location.origin}/{nickname}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminDashboard() {
  // Use regular hook for stats (non-paginated)
  const { data: allGuests, refetch: refetchAllGuests } = useGuests()
  const { data: attendanceStats } = useAttendanceStats()

  // Use paginated hooks for the lists
  const {
    data: guests,
    loading: guestsLoading,
    loadingMore: guestsLoadingMore,
    hasMore: guestsHasMore,
    loadMore: loadMoreGuests,
    refetch: refetchGuests,
  } = useGuestsPaginated(50)

  const {
    data: attendances,
    loadingMore: attendancesLoadingMore,
    hasMore: attendancesHasMore,
    loadMore: loadMoreAttendances,
  } = useAttendancesPaginated(30)

  const {
    data: messages,
    loadingMore: messagesLoadingMore,
    hasMore: messagesHasMore,
    loadMore: loadMoreMessages,
  } = useMessagesPaginated(20)

  const [searchTerm, setSearchTerm] = useState('')

  // Filter guests based on search term - use allGuests for search, guests for pagination
  const filteredGuests = useMemo(() => {
    if (!searchTerm) {
      // When no search term, return paginated guests
      return guests
    }

    // When searching, filter from all guests
    if (!allGuests) return []

    return allGuests.filter(
      (guest) =>
        guest.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [allGuests, guests, searchTerm])

  // Determine if we should show pagination controls
  const isSearchActive = searchTerm.trim() !== ''

  // Function to refresh guest data after updates
  const handleGuestUpdated = () => {
    refetchAllGuests()
    refetchGuests()
  }

  // Infinite scroll hooks
  const guestsScroll = useInfiniteScroll(
    guestsLoadingMore,
    guestsHasMore && !isSearchActive, // Disable infinite scroll when searching
    loadMoreGuests
  )
  const attendancesScroll = useInfiniteScroll(
    attendancesLoadingMore,
    attendancesHasMore,
    loadMoreAttendances
  )
  const messagesScroll = useInfiniteScroll(
    messagesLoadingMore,
    messagesHasMore,
    loadMoreMessages
  )

  // Calculate basic stats from all guests data
  const basicStats = useMemo(
    () => ({
      totalGuests: allGuests?.length || 0,
      totalAttendances: attendances?.length || 0,
      totalMessages: messages?.length || 0,
      attendingAkad:
        attendances?.filter((a) => a.konfirmasi.includes('Akad')).length || 0,
      attendingResepsi:
        attendances?.filter((a) => a.konfirmasi.includes('Resepsi')).length ||
        0,
      notAttending:
        attendances?.filter((a) => a.konfirmasi.includes('belum bisa hadir'))
          .length || 0,
    }),
    [allGuests, attendances, messages]
  )

  if (guestsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#CF935F]"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto h-full px-4 py-4">
      <h1 className="mb-8 text-3xl font-bold text-[#8b6c5c]">
        Wedding Admin Dashboard
      </h1>

      {/* Main Stats Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-center text-sm font-medium text-[#606161]">
              RSVP yang masuk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-2xl font-bold text-[#CF935F]">
              {basicStats.totalAttendances}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-center text-sm font-medium text-[#606161]">
              Pesan dan Kesan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-2xl font-bold text-[#8b6c5c]">
              {basicStats.totalMessages}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-center text-sm font-medium text-[#606161]">
              Total Tamu (Jumlah Keseluruhan)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-2xl font-bold text-purple-600">
              {attendanceStats?.totalTamu || 0}
            </div>
            <p className="mt-1 text-center text-xs text-gray-500">
              dari {attendanceStats?.totalResponses || 0} responden
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="guests" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guests" className="cursor-pointer">
            Tamu ({allGuests?.length})
          </TabsTrigger>
          <TabsTrigger value="attendances" className="cursor-pointer">
            RSVP ({attendances.length})
          </TabsTrigger>
          <TabsTrigger value="messages" className="cursor-pointer">
            Pesan ({messages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guests" className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Tamu</CardTitle>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Cari Tamu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm rounded-lg border-1 border-gray-300"
                />
                {isSearchActive && (
                  <span className="text-sm text-gray-500">
                    {filteredGuests.length} hasil
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="mt-2 p-0">
              <div
                className="h-[270px] overflow-y-auto pr-3 pb-6 pl-6"
                onScroll={
                  !isSearchActive ? guestsScroll.handleScroll : undefined
                }
              >
                {filteredGuests.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">
                      {searchTerm
                        ? 'Tamu yang dicari tidak ditemukan.'
                        : 'Belum ada tamu yang ditambahkan.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredGuests.map((guest) => (
                      <div
                        key={guest.id}
                        className="flex flex-col items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex w-full items-center justify-between gap-4">
                          <h4 className="font-medium">{guest.nama}</h4>
                          {/* EDIT BUTTON ADDED HERE */}
                          <EditGuestModal
                            guest={guest}
                            onGuestUpdated={handleGuestUpdated}
                            trigger={
                              <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer"
                              >
                                Edit
                              </Button>
                            }
                          />
                        </div>
                        <div className="mt-2 flex w-full gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 cursor-pointer"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `${window.location.origin}/${guest.nickname}`,
                                '_blank'
                              )
                            }
                          >
                            Lihat Undangan
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `Assalamu'alaikum Wr. Wb.\n\nDengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada acara pernikahan kami:\n\nGina & Panji\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir pada hari bahagia kami.\n\nBerikut kami lampirkan undangan digitalnya:\n\n🔗Link Undangan: ${window.location.origin}/${guest.nickname}\n\n✨ Mohon kesediaannya untuk mengisi konfirmasi kehadiran (RSVP) yang tersedia di dalam undangan digital tersebut, agar kami dapat mempersiapkan segala sesuatunya dengan lebih baik.\n\nAtas kehadiran dan doa restunya, kami ucapkan terima kasih.\n\nWassalamu'alaikum Wr. Wb.\nSalam hangat,\nGina & Panji`
                              )
                              toast.success('Link berhasil disalin!')
                            }}
                          >
                            Copy Link
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* Loading indicator for infinite scroll - only show when not searching */}
                    {!isSearchActive && guestsLoadingMore && (
                      <div className="py-4 text-center">
                        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-[#CF935F]"></div>
                      </div>
                    )}

                    {/* End of list indicator - only show when not searching */}
                    {!isSearchActive &&
                      !guestsHasMore &&
                      filteredGuests.length > 0 && (
                        <div className="py-4 text-center">
                          <p className="text-sm text-gray-400">
                            Tidak ada lagi tamu yang dimuat
                          </p>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendances" className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle>RSVP Responden</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="h-fit w-full">
                <TabsList className=" flex h-full w-full flex-wrap">
                  <TabsTrigger value="all" className="cursor-pointer text-xs">
                    Semua ({attendances.length})
                  </TabsTrigger>
                  <TabsTrigger value="akad" className="cursor-pointer text-xs">
                    Akad ({attendanceStats?.breakdown.akad.count || 0})
                  </TabsTrigger>
                  <TabsTrigger
                    value="resepsi"
                    className="cursor-pointer text-xs"
                  >
                    Resepsi ({attendanceStats?.breakdown.resepsi.count || 0})
                  </TabsTrigger>
                  <TabsTrigger
                    value="akad-resepsi"
                    className="cursor-pointer text-xs"
                  >
                    Akad & Resepsi (
                    {attendanceStats?.breakdown.akadResepsi.count || 0})
                  </TabsTrigger>
                  <TabsTrigger
                    value="tidak-hadir"
                    className="cursor-pointer text-xs"
                  >
                    Tidak Hadir (
                    {attendanceStats?.breakdown.tidakHadir.count || 0})
                  </TabsTrigger>
                </TabsList>

                {/* All Attendances */}
                <TabsContent value="all">
                  <div
                    className="h-[240px] overflow-y-auto"
                    onScroll={attendancesScroll.handleScroll}
                  >
                    {attendances.length === 0 ? (
                      <p className="py-8 text-center text-gray-500">
                        Belum ada RSVP responden.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {attendances.map((attendance) => (
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
                                {new Date(
                                  attendance.createdAt
                                ).toLocaleDateString('id-ID')}
                              </p>
                            </div>
                          </div>
                        ))}

                        {/* Loading indicator for infinite scroll */}
                        {attendancesLoadingMore && (
                          <div className="py-4 text-center">
                            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-[#CF935F]"></div>
                          </div>
                        )}

                        {/* End of list indicator */}
                        {!attendancesHasMore && attendances.length > 0 && (
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400">
                              Tidak ada yang bisa dimuat lagi
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Other tabs content remains the same... */}
                {/* I'll skip the repeated code for brevity, but include all the other tabs */}

                {/* Akad Only */}
                <TabsContent value="akad">
                  <div className="h-[240px] overflow-y-auto">
                    {attendances.filter((a) => a.konfirmasi === 'Akad')
                      .length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">Belum ada akad.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {attendances
                          .filter((a) => a.konfirmasi === 'Akad')
                          .map((attendance) => (
                            <div
                              key={attendance.id}
                              className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-3"
                            >
                              <div>
                                <h4 className="font-medium">
                                  {attendance.nama}
                                </h4>
                                <p className="text-sm text-blue-600">
                                  {attendance.konfirmasi}
                                </p>
                                <p className="text-xs text-[#999]">
                                  {attendance.jumlahTamu} tamu •{' '}
                                  {new Date(
                                    attendance.createdAt
                                  ).toLocaleDateString('id-ID')}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Resepsi Only */}
                <TabsContent value="resepsi">
                  <div className="h-[240px] overflow-y-auto">
                    {attendances.filter((a) => a.konfirmasi === 'Resepsi')
                      .length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">Belum ada resepsi.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {attendances
                          .filter((a) => a.konfirmasi === 'Resepsi')
                          .map((attendance) => (
                            <div
                              key={attendance.id}
                              className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3"
                            >
                              <div>
                                <h4 className="font-medium">
                                  {attendance.nama}
                                </h4>
                                <p className="text-sm text-green-600">
                                  {attendance.konfirmasi}
                                </p>
                                <p className="text-xs text-[#999]">
                                  {attendance.jumlahTamu} tamu •{' '}
                                  {new Date(
                                    attendance.createdAt
                                  ).toLocaleDateString('id-ID')}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Akad & Resepsi */}
                <TabsContent value="akad-resepsi">
                  <div className="h-[240px] overflow-y-auto">
                    {attendances.filter(
                      (a) => a.konfirmasi === 'Akad dan Resepsi'
                    ).length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">
                          Belum ada akad dan resepsi.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {attendances
                          .filter((a) => a.konfirmasi === 'Akad dan Resepsi')
                          .map((attendance) => (
                            <div
                              key={attendance.id}
                              className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-3"
                            >
                              <div>
                                <h4 className="font-medium">
                                  {attendance.nama}
                                </h4>
                                <p className="text-sm text-orange-600">
                                  {attendance.konfirmasi}
                                </p>
                                <p className="text-xs text-[#999]">
                                  {attendance.jumlahTamu} tamu •{' '}
                                  {new Date(
                                    attendance.createdAt
                                  ).toLocaleDateString('id-ID')}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Tidak Hadir */}
                <TabsContent value="tidak-hadir">
                  <div className="h-[240px] overflow-y-auto">
                    {attendances.filter(
                      (a) => a.konfirmasi === 'Maaf, Saya belum bisa hadir'
                    ).length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">
                          Belum ada yang tidak hadir.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {attendances
                          .filter(
                            (a) =>
                              a.konfirmasi === 'Maaf, Saya belum bisa hadir'
                          )
                          .map((attendance) => (
                            <div
                              key={attendance.id}
                              className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3"
                            >
                              <div>
                                <h4 className="font-medium">
                                  {attendance.nama}
                                </h4>
                                <p className="text-sm text-red-600">
                                  {attendance.konfirmasi}
                                </p>
                                <p className="text-xs text-[#999]">
                                  {attendance.jumlahTamu} tamu •{' '}
                                  {new Date(
                                    attendance.createdAt
                                  ).toLocaleDateString('id-ID')}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle>Pesan Undangan</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div
                className="h-[300px] overflow-y-auto px-6 pb-6"
                onScroll={messagesScroll.handleScroll}
              >
                {messages.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">Belum ada pesan undangan.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-start justify-between">
                          <h4 className="font-medium">{message.name}</h4>
                          <span className="text-xs text-[#999]">
                            {new Date(message.createdAt).toLocaleDateString(
                              'id-ID'
                            )}
                          </span>
                        </div>
                        <p className="text-[#606161]">
                          Dari: {message.guest?.nama}
                        </p>
                        <p className="text-[#606161]">
                          Pesan: {message.message}
                        </p>
                      </div>
                    ))}

                    {/* Loading indicator for infinite scroll */}
                    {messagesLoadingMore && (
                      <div className="py-4 text-center">
                        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-[#CF935F]"></div>
                      </div>
                    )}

                    {/* End of list indicator */}
                    {!messagesHasMore && messages.length > 0 && (
                      <div className="py-4 text-center">
                        <p className="text-sm text-gray-400">
                          Tidak ada lagi pesan
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
