import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')

  const handleSearchChange = (query) => {
    setSearchQuery(query)
    if (tab !== 'Catalog') setTab('Catalog')
  }

  const handleTypeChange = (type) => {
    setSelectedType(type)
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
      />

      <main className="main">
        {tab === 'Catalog' && (
          <Catalog searchQuery={searchQuery} selectedType={selectedType} />
        )}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />
    </div>
  )
}

export default App