// src/pages/Katalog.jsx
import { useState } from 'react'

const PRODUK = [
  {
    id: 1,
    nama: 'Crude Palm Oil (CPO)',
    kategori: 'Minyak',
    harga: 'Rp 12.500/kg',
    stok: 'Tersedia',
    deskripsi: 'Minyak sawit mentah hasil ekstraksi tandan buah segar, kandungan beta-karoten tinggi.',
    gambar: '/images/cpo.jpeg',
    badge: 'Terlaris',
    badgeColor: '#c8900a',
  },
  {
    id: 2,
    nama: 'Palm Kernel Oil (PKO)',
    kategori: 'Minyak',
    harga: 'Rp 15.200/kg',
    stok: 'Tersedia',
    deskripsi: 'Minyak inti sawit berkualitas tinggi untuk industri kosmetik dan pangan.',
    gambar: '/images/pko.jpeg',
    badge: 'Premium',
    badgeColor: '#2d5a1b',
  },
  {
    id: 3,
    nama: 'Tandan Buah Segar (TBS)',
    kategori: 'Buah',
    harga: 'Rp 2.800/kg',
    stok: 'Tersedia',
    deskripsi: 'TBS segar langsung dari kebun dengan kandungan minyak optimal >22%.',
    gambar: '/images/tbs.jpg',
    badge: 'Segar',
    badgeColor: '#3d7a26',
  },
  {
    id: 4,
    nama: 'Palm Fatty Acid Distillate (PFAD)',
    kategori: 'Turunan',
    harga: 'Rp 7.900/kg',
    stok: 'Terbatas',
    deskripsi: 'Produk sampingan pemurnian CPO, digunakan sebagai bahan baku sabun dan oleokimia.',
    gambar: '/images/pfad.webp',
    badge: 'Terbatas',
    badgeColor: '#7a4a1e',
  },
  {
    id: 5,
    nama: 'RBD Palm Olein',
    kategori: 'Minyak',
    harga: 'Rp 14.000/kg',
    stok: 'Tersedia',
    deskripsi: 'Minyak goreng sawit yang telah dimurnikan, diputihkan, dan dihilangkan baunya.',
    gambar: '/images/olein.png',
    badge: null,
    badgeColor: null,
  },
  {
    id: 6,
    nama: 'Palm Kernel Cake (PKC)',
    kategori: 'Pakan',
    harga: 'Rp 1.850/kg',
    stok: 'Tersedia',
    deskripsi: 'Bungkil inti sawit, pakan ternak kaya protein dan serat untuk sapi & unggas.',
    gambar: '/images/pkc.webp',
    badge: null,
    badgeColor: null,
  },
  {
    id: 7,
    nama: 'Biodiesel B100',
    kategori: 'Energi',
    harga: 'Rp 9.100/liter',
    stok: 'Tersedia',
    deskripsi: 'Bahan bakar nabati 100% dari minyak sawit, ramah lingkungan dan terbarukan.',
    gambar: '/images/biodiesel.jpeg',
    badge: 'Eco',
    badgeColor: '#3d7a26',
  },
  {
    id: 8,
    nama: 'Bibit Sawit DxP Simalungun',
    kategori: 'Bibit',
    harga: 'Rp 45.000/batang',
    stok: 'Pre-order',
    deskripsi: 'Varietas unggul produktivitas tinggi >30 ton TBS/ha/tahun, cocok untuk lahan gambut.',
    gambar: '/images/bibit.jpeg',
    badge: 'Unggul',
    badgeColor: '#2d5a1b',
  },
]

const KATEGORI_LIST = ['Semua', 'Minyak', 'Buah', 'Turunan', 'Pakan', 'Energi', 'Bibit']

export default function Katalog({ onLogout }) {
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState('')

  const filtered = PRODUK.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.deskripsi.toLowerCase().includes(search.toLowerCase())
    const matchKat = kategori === 'Semua' || p.kategori === kategori
    return matchSearch && matchKat
  })

  const addToCart = (produk) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === produk.id)
      if (exists) return prev.map(i => i.id === produk.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...produk, qty: 1 }]
    })
    setToast(`${produk.nama} ditambahkan ke keranjang!`)
    setTimeout(() => setToast(''), 2000)
  }

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg, #faf6ed)' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-6 py-3"
        style={{
          background: 'linear-gradient(90deg, #1a3a0f 0%, #2d5a1b 100%)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
        }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌴</span>
          <span className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            SawitNusantara
          </span>
          <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full font-medium ml-1"
            style={{ background: '#c8900a', color: '#fff' }}>
            Katalog
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Cart */}
          <button className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                style={{ background: '#c8900a', color: '#fff' }}>
                {totalItems}
              </span>
            )}
            <span className="hidden sm:inline">Keranjang</span>
          </button>

          {/* Logout */}
          <button onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}>
            ← Keluar
          </button>
        </div>
      </nav>

      {/* Hero banner */}
      <div className="px-6 py-10 text-center"
        style={{ background: 'linear-gradient(180deg, #2d5a1b08 0%, transparent 100%)' }}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#1a3a0f' }}>
          Katalog Produk Sawit
        </h1>
        <p className="text-sm" style={{ color: '#6b5e4e' }}>
          Minyak, buah, bibit, dan produk turunan kelapa sawit pilihan Nusantara
        </p>
      </div>

      {/* Filter bar */}
      <div className="px-6 pb-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center max-w-5xl mx-auto">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">🔍</span>
          <input
            type="text" placeholder="Cari produk sawit..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{
              border: '1.5px solid #d9cdb8',
              background: '#fff',
              fontFamily: "'DM Sans', sans-serif",
            }}
            onFocus={e => e.target.style.borderColor = '#2d5a1b'}
            onBlur={e => e.target.style.borderColor = '#d9cdb8'}
          />
        </div>
        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {KATEGORI_LIST.map(k => (
            <button key={k}
              onClick={() => setKategori(k)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: kategori === k ? '#2d5a1b' : '#fff',
                color: kategori === k ? '#fff' : '#2d5a1b',
                border: `1.5px solid ${kategori === k ? '#2d5a1b' : '#d9cdb8'}`,
              }}>
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 pb-12 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-3 text-center py-16" style={{ color: '#aaa' }}>
            <p className="text-4xl mb-3">🌿</p>
            <p className="text-sm">Produk tidak ditemukan.</p>
          </div>
        ) : filtered.map(p => (
          <div key={p.id}
            className="flex flex-col rounded-2xl overflow-hidden transition-all duration-200"
            style={{
              background: '#fff',
              border: '1.5px solid #e8dfc8',
              boxShadow: '0 2px 12px rgba(45,90,27,0.07)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(45,90,27,0.16)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(45,90,27,0.07)'}
          >
            {/* Card image area */}
            <div className="relative overflow-hidden" style={{ height: '180px' }}>
              <img
                src={p.gambar}
                alt={p.nama}
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback jika gambar belum ada */}
              <div className="w-full h-full items-center justify-center text-sm font-medium"
                style={{ display: 'none', background: 'linear-gradient(135deg, #f5f0e8, #e8f5e0)', color: '#6b5e4e' }}>
                📷 Gambar belum tersedia
              </div>
              {p.badge && (
                <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: p.badgeColor }}>
                  {p.badge}
                </span>
              )}
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 p-4 gap-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm leading-snug" style={{ color: '#1a3a0f', margin: 0 }}>
                  {p.nama}
                </h3>
                <span className="text-xs px-1.5 py-0.5 rounded-md shrink-0"
                  style={{ background: '#f0f8ec', color: '#2d5a1b', border: '1px solid #c3e2b0' }}>
                  {p.kategori}
                </span>
              </div>

              <p className="text-xs leading-relaxed" style={{ color: '#6b5e4e' }}>
                {p.deskripsi}
              </p>

              <div className="flex items-center justify-between mt-auto pt-2"
                style={{ borderTop: '1px solid #f0e8d8' }}>
                <div>
                  <p className="text-base font-bold" style={{ color: '#c8900a', margin: 0 }}>{p.harga}</p>
                  <p className="text-xs" style={{
                    color: p.stok === 'Tersedia' ? '#2d5a1b' : p.stok === 'Terbatas' ? '#c8900a' : '#7a4a1e',
                    margin: 0,
                  }}>
                    ● {p.stok}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #2d5a1b, #3d7a26)',
                    boxShadow: '0 2px 8px rgba(45,90,27,0.25)',
                  }}>
                  + Keranjang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-medium text-white"
          style={{
            background: 'linear-gradient(135deg, #2d5a1b, #c8900a)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            whiteSpace: 'nowrap',
          }}>
          ✓ {toast}
        </div>
      )}
    </div>
  )
}
