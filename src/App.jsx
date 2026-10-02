import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import CartModal from './components/CartModal.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [sortBy, setSortBy] = useState('default')

  // Cart state
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bore_barrel_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('bore_barrel_cart', JSON.stringify(cartItems))
    } catch {
      // ignore
    }
  }, [cartItems])

  const addToCart = (gun) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === gun.name)
      if (existing) {
        return prev.map((item) =>
          item.name === gun.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...gun, quantity: 1 }]
    })
  }

  const updateQuantity = (gunName, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.name === gunName) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (gunName) => {
    setCartItems((prev) => prev.filter((item) => item.name !== gunName))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const handleSearchChange = (query) => {
    setSearchQuery(query)
    if (tab !== 'Catalog') setTab('Catalog')
  }

  const handleTypeChange = (type) => {
    setSelectedType(type)
    if (tab !== 'Catalog') setTab('Catalog')
  }

  const handleSortChange = (sort) => {
    setSortBy(sort)
    if (tab !== 'Catalog') setTab('Catalog')
  }

  return (
    <div className="shell">
      <Header
        tab={tab}
        onTab={setTab}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        totalCartItems={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="main">
        {tab === 'Catalog' && (
          <Catalog
            searchQuery={searchQuery}
            selectedType={selectedType}
            sortBy={sortBy}
            onAddToCart={addToCart}
          />
        )}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
        onExploreCatalog={() => setTab('Catalog')}
      />
    </div>
  )
}

export default App