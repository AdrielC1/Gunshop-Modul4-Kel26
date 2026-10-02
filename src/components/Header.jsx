import InstallButton from './InstallButton.jsx'

const NAV = ['Catalog', 'About', 'Contact']
const TYPES = ['All', 'Pistol', 'Rifle', 'Shotgun']
const SORT_OPTIONS = [
    { value: 'default', label: 'Default' },
    { value: 'name-asc', label: 'Name (A - Z)' },
    { value: 'name-desc', label: 'Name (Z - A)' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
]

function Header({
    tab,
    onTab,
    searchQuery = '',
    onSearchChange = () => {},
    selectedType = 'All',
    onTypeChange = () => {},
    sortBy = 'default',
    onSortChange = () => {},
    totalCartItems = 0,
    onOpenCart = () => {},
}) {
    return (
        <header className="header">
            <div className="header-brand-row">
                <span className="brand display">Bore &amp; Barrel</span>

                <div className="header-actions">
                    <InstallButton />
                    <button
                        type="button"
                        className="cart-btn"
                        onClick={onOpenCart}
                        title="Keranjang Belanja"
                        aria-label="Buka keranjang belanja"
                    >
                        <svg
                            className="cart-icon"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span className="cart-btn-label">Cart</span>
                        {totalCartItems > 0 && (
                            <span className="cart-badge">{totalCartItems}</span>
                        )}
                    </button>
                </div>
            </div>

            <div className="header-search-bar">
                <div className="search-input-wrap">
                    <svg
                        className="search-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search guns..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            className="search-clear-btn"
                            onClick={() => onSearchChange('')}
                            title="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="header-filters">
                    <select
                        className="filter-select"
                        value={selectedType}
                        onChange={(e) => onTypeChange(e.target.value)}
                        title="Filter by gun type"
                    >
                        {TYPES.map((type) => (
                            <option key={type} value={type}>
                                {type === 'All' ? 'All Types' : type}
                            </option>
                        ))}
                    </select>

                    <select
                        className="filter-select"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        title="Sort guns"
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <nav className="nav">
                {NAV.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={tab === item ? 'nav-link active' : 'nav-link'}
                        onClick={() => onTab(item)}
                    >
                        {item}
                    </button>
                ))}
            </nav>
        </header>
    )
}

export default Header