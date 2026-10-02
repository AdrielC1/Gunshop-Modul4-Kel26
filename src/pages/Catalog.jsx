import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({
    searchQuery = '',
    selectedType = 'All',
    sortBy = 'default',
    onAddToCart,
}) {
    const query = searchQuery.trim().toLowerCase()

    const filteredGuns = GUNS.filter((gun) => {
        const matchesType =
            selectedType === 'All' ||
            gun.type.toLowerCase() === selectedType.toLowerCase()

        const matchesSearch =
            !query ||
            gun.name.toLowerCase().includes(query) ||
            gun.caliber.toLowerCase().includes(query) ||
            gun.type.toLowerCase().includes(query) ||
            (gun.description && gun.description.toLowerCase().includes(query))

        return matchesType && matchesSearch
    })

    const displayedGuns = [...filteredGuns].sort((a, b) => {
        if (sortBy === 'name-asc') {
            return a.name.localeCompare(b.name)
        }
        if (sortBy === 'name-desc') {
            return b.name.localeCompare(a.name)
        }
        if (sortBy === 'price-asc') {
            return (a.price - b.price) || a.name.localeCompare(b.name)
        }
        if (sortBy === 'price-desc') {
            return (b.price - a.price) || a.name.localeCompare(b.name)
        }
        return 0
    })

    return (
        <>
            <section className="masthead">
                <h1 className="display">Hardware, by the spec sheet.</h1>
                <p className="lede">
                    A small armory of pistols, rifles, and shotguns. Every piece listed with its
                    type, caliber, and price — nothing else.
                </p>
            </section>

            <section>
                <div className="list-head">
                    <h2>Current stock</h2>
                    <span className="count">{displayedGuns.length} pieces</span>
                </div>
                {displayedGuns.length > 0 ? (
                    <ul className="stock">
                        {displayedGuns.map((gun) => (
                            <GunCard
                                key={gun.name}
                                gun={gun}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="no-match">
                        <p className="no-match-title">No guns match</p>
                        <p className="no-match-sub">
                            {query
                                ? `No results found for "${searchQuery}" in ${selectedType === 'All' ? 'all categories' : selectedType}.`
                                : `No guns available in ${selectedType} category.`}
                        </p>
                    </div>
                )}
            </section>
        </>
    )
}

export default Catalog