import InstallButton from './InstallButton.jsx'

const NAV = ['Catalog', 'About', 'Contact']
const TYPES = ['All', 'Pistol', 'Rifle', 'Shotgun']

function Header({
    tab,
    onTab,
    searchQuery = '',
    onSearchChange = () => {},
    selectedType = 'All',
    onTypeChange = () => {},
}) {
    return (
        <header className="header">
            <span className="brand display">Bore &amp; Barrel</span>

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
            </div>

            <nav className="nav">
                <InstallButton />
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