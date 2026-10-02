import { useRef } from 'react'

function GunCard({ gun, onAddToCart }) {
    const popup = useRef(null)

    const handleCardClick = () => {
        popup.current.showModal()
    }

    const handleAddToCart = (e) => {
        e.stopPropagation()
        if (onAddToCart) onAddToCart(gun)
    }

    return (
        <li className="card">
            <div className="card-body">
                <div
                    className="card-content"
                    onClick={handleCardClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
                >
                    <img className="card-img" src={gun.image} alt={gun.name} width="120" height="90" />
                    <span className="name display">{gun.name}</span>
                    <span className="type">
                        {gun.type} · {gun.caliber}
                    </span>
                </div>

                <div className="card-action-row">
                    <span className="price">${gun.price.toLocaleString()}</span>
                    <button
                        type="button"
                        className="card-add-cart-btn"
                        onClick={handleAddToCart}
                        title={`Tambah ${gun.name} ke keranjang`}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="13"
                            height="13"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Cart</span>
                    </button>
                </div>
            </div>

            <dialog
                className="popup"
                ref={popup}
                onClick={(e) => e.target === popup.current && popup.current.close()}
            >
                <img className="popup-img" src={gun.image} alt={gun.name} width="240" height="180" />
                <h3 className="display">{gun.name}</h3>
                <p className="type">
                    {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
                </p>
                <p>{gun.description}</p>
                <div className="popup-footer-actions">
                    <button
                        type="button"
                        className="popup-add-cart-btn"
                        onClick={() => {
                            if (onAddToCart) onAddToCart(gun)
                            popup.current.close()
                        }}
                    >
                        + Tambah ke Keranjang
                    </button>
                    <form method="dialog">
                        <button className="popup-close">Close</button>
                    </form>
                </div>
            </dialog>
        </li>
    )
}

export default GunCard