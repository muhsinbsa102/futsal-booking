Product Requirements Document (PRD): Platform Booking Lapangan Futsal
1. Ringkasan Eksekutif
Aplikasi berbasis web untuk mengotomatisasi proses penyewaan lapangan futsal. Menghubungkan pemain yang ingin melihat jadwal kosong secara real-time dan melakukan booking, dengan pemilik lapangan yang membutuhkan sistem manajemen jadwal dan analisis performa bisnis untuk menggantikan pencatatan manual.

2. Target Pengguna (User Personas)
Pemain Futsal (Customer): Ingin proses booking yang cepat, transparan, dan tidak perlu menunggu balasan chat admin hanya untuk mengecek ketersediaan lapangan.

Pemilik/Admin Lapangan (Admin): Membutuhkan visibilitas jadwal yang jelas (seperti kalender), pencatatan otomatis, dan wawasan data penjualan untuk strategi retensi pelanggan.

3. Cakupan Fitur Utama (MVP)
A. Sisi Pengguna (Pemain Futsal)
Halaman Utama (Landing Page): Menampilkan nama lapangan, foto, fasilitas, dan harga sewa per jam (bisa berbeda antara siang dan malam).

Sistem Kalender & Ketersediaan: Tampilan real-time jadwal yang masih kosong dan yang sudah di-booking pada tanggal tertentu.

Formulir Booking: Input nama pemesan, nama tim, nomor WhatsApp, dan pilihan jam.

Halaman Konfirmasi: Ringkasan pesanan dan instruksi pembayaran.

B. Sisi Admin (Dashboard Pemilik)
Manajemen Jadwal (Calendar View): Tampilan visual mirip Google Calendar yang menunjukkan blok waktu booking. Admin bisa menambah, mengedit, atau membatalkan jadwal secara manual jika ada pelanggan yang datang langsung (go-show).

Dashboard Sales & Performa Bisnis:

Metrik Utama: Total pendapatan harian/bulanan, total jam tersewa, dan persentase okupansi lapangan.

Leaderboard Tim: Daftar tim/nomor WhatsApp yang paling sering menyewa (berguna untuk memberikan promo loyalitas atau membership).

Manajemen Lapangan (Opsional jika >1 lapangan): Pengaturan nama lapangan, status aktif/nonaktif, dan penyesuaian harga khusus (misal: harga weekend atau night billing).

4. Rekomendasi Tech Stack (Ramah Pemula & AI Co-Pilot)
Kombinasi teknologi ini saat ini adalah "standar emas" untuk pengembangan aplikasi dibantu AI. Model AI memiliki sangat banyak data pelatihan untuk stack ini, sehingga mereka jarang melakukan kesalahan konyol saat menulis kode.

AI IDE (Alat Utama): Cursor atau Windsurf. Ini adalah code editor yang memiliki AI co-pilot bawaan. Kamu bisa mengetik instruksi (seperti "buatkan halaman dashboard kalender") dan AI akan menulis kodenya di dalam file yang tepat.

Frontend (Tampilan Web): Next.js (React) dengan Tailwind CSS dan shadcn/ui.

Kenapa? Tailwind dan shadcn/ui memungkinkan AI membuat tombol, kalender, dan tabel dashboard yang terlihat profesional dalam hitungan detik tanpa perlu styling CSS manual yang rumit.

Backend & Database: Supabase.

Kenapa? Jauh lebih mudah bagi pemula dibandingkan membangun backend dari nol. Berfungsi sebagai database (PostgreSQL) dan sistem Autentikasi (Login/Register). AI co-pilot sangat ahli mengintegrasikan Supabase dengan Next.js.

Hosting: Vercel (Gratis untuk memulai, tinggal hubungkan dengan GitHub, dan web langsung live).
Tambahan Dokumen PRD: Sistem Pembayaran QRIS
1. Alur Pengguna (User Flow) Booking & Pembayaran
Pilih Jadwal: Pemain memilih tanggal, lapangan, dan jam yang kosong.

Isi Data & Submit: Pemain mengisi nama tim dan nomor WhatsApp, lalu mengklik "Lanjut ke Pembayaran".

Reservasi Sementara (Slot Terkunci): Sistem memasukkan data booking ke database dengan status PENDING dan mengunci jam tersebut selama 10-15 menit agar tidak diambil orang lain saat proses bayar.

Halaman Checkout (QRIS Page): Halaman menampilkan detail pesanan, total harga, hitung mundur waktu pembayaran (e.g., 10:00 menit), dan gambar QRIS Dinamis yang di-generate otomatis.

Pembayaran: Pemain men-scan QRIS dan membayar menggunakan e-wallet (Gopay, OVO, Dana) atau m-banking.

Konfirmasi Otomatis: Setelah bayar sukses, halaman checkout otomatis berubah menampilkan pesan "Pembayaran Berhasil!" dan status booking berubah menjadi PAID (Sudah Bayar).

2. Pembaruan Tech Stack (Tambahan Payment Gateway)
Untuk memproses QRIS secara otomatis tanpa cek mutasi bank manual, kamu memerlukan Payment Gateway. Rekomendasi terbaik untuk pemula dan AI co-pilot di Indonesia adalah:

Midtrans atau Xendit

Kenapa? Keduanya memiliki dokumentasi API yang sangat lengkap. AI seperti Cursor atau Windsurf sudah sangat hapal dengan struktur kode Midtrans/Xendit karena banyak digunakan.

Keunggulan Pemula: Mereka menyediakan Sandbox Mode (Mode Simulasi). Kamu bisa menguji coba pembuatan QRIS dan pura-pura membayar menggunakan simulator tanpa perlu memakai uang asli sepeser pun selama masa pengembangan.

3. Struktur Database (Schema) yang Dibutuhkan AI
Beritahu AI co-pilot kamu bahwa tabel bookings di Supabase harus memiliki kolom-kolom ini untuk mengelola pembayaran:

id: ID unik booking.

court_id: Lapangan mana yang dipesan.

booking_date: Tanggal main.

start_time & end_time: Jam mulai dan selesai.

team_name & whatsapp_number: Data pemesan.

total_price: Total harga yang harus dibayar.

payment_status: Status pembayaran (PENDING, SUCCESS, EXPIRED, FAILED).

midtrans_order_id: ID transaksi unik dari Payment Gateway (untuk pelacakan).

4. Cara Kerja Logika Sistem (Dibalik Layar)
Kamu tidak perlu pusing memikirkan kodenya sekarang, cukup pahami konsep ini agar bisa mengarahkan AI:

Webhook: Ini adalah fitur dari Midtrans/Xendit. Ketika pemain selesai men-scan dan membayar QRIS, Midtrans akan mengirimkan sinyal otomatis ("Webhook Notification") ke website kamu. Website kamu menangkap sinyal itu, lalu AI akan menulis kode untuk mengubah status di database dari PENDING menjadi SUCCESS.

Cron Job / Auto-Expiry: Jika dalam waktu 15 menit pemain tidak membayar QRIS tersebut, status pesanan otomatis berubah dari PENDING menjadi EXPIRED, dan jam lapangan tersebut otomatis terbuka kembali di web agar bisa dipesan orang lain.