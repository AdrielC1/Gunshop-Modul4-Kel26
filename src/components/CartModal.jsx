function CartModal({
    isOpen,
    onClose,
    cartItems = [],
    onUpdateQuantity,
    onRemoveFromCart,
    onClearCart,
    onExploreCatalog,
}) {
    if (!isOpen) return null

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    const handleExploreCatalog = () => {
        if (onExploreCatalog) {
            onExploreCatalog()
        }
        onClose()
    }

    const handleCheckout = () => {
        alert(
            `Terima kasih! Pesanan Anda sebanyak ${totalItems} item dengan total $${totalPrice.toLocaleString()} berhasil diproses.`
        )
        onClearCart()
        onClose()
    }

    return (
        <div className="cart-modal-backdrop" onClick={onClose} role="presentation">
            <div
                className="cart-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-modal-title"
            >
                <div className="cart-modal-header">
                    <div className="cart-header-title-wrap">
                        <svg
                            className="cart-title-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <h2 id="cart-modal-title" className="display">
                            Keranjang Belanja
                        </h2>
                        <span className="cart-count-badge">{totalItems} item</span>
                    </div>
                    <button
                        type="button"
                        className="cart-close-btn"
                        onClick={onClose}
                        title="Tutup keranjang"
                        aria-label="Tutup keranjang"
                    >
                        &times;
                    </button>
                </div>

                <div className="cart-modal-body">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <svg
                                className="cart-empty-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            <p className="cart-empty-title">Keranjang Anda masih kosong</p>
                            <p className="cart-empty-desc">
                                Silakan pilih senjata di katalog dan klik "Tambah ke Keranjang".
                            </p>
                            <button
                                type="button"
                                className="cart-empty-action"
                                onClick={handleExploreCatalog}
                            >
                                Jelajahi Katalog
                            </button>
                        </div>
                    ) : (
                        <ul className="cart-items-list">
                            {cartItems.map((item) => (
                                <li key={item.name} className="cart-item">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="cart-item-img"
                                    />
                                    <div className="cart-item-info">
                                        <div className="cart-item-head">
                                            <span className="cart-item-name display">
                                                {item.name}
                                            </span>
                                            <button
                                                type="button"
                                                className="cart-item-remove"
                                                onClick={() => onRemoveFromCart(item.name)}
                                                title="Hapus dari keranjang"
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="14"
                                                    height="14"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                            </button>
                                        </div>

                                        <span className="cart-item-type">
                                            {item.type} · {item.caliber}
                                        </span>

                                        <div className="cart-item-foot">
                                            {/* Kontrol Kuantitas */}
                                            <div className="cart-qty-ctrl">
                                                <button
                                                    type="button"
                                                    className="qty-btn"
                                                    onClick={() => onUpdateQuantity(item.name, -1)}
                                                    title="Kurangi kuantitas"
                                                    aria-label="Kurangi kuantitas"
                                                >
                                                    &minus;
                                                </button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    className="qty-btn"
                                                    onClick={() => onUpdateQuantity(item.name, 1)}
                                                    title="Tambah kuantitas"
                                                    aria-label="Tambah kuantitas"
                                                >
                                                    &#43;
                                                </button>
                                            </div>

                                            <div className="cart-item-price-wrap">
                                                <span className="cart-item-unit-price">
                                                    @${item.price.toLocaleString()}
                                                </span>
                                                <span className="cart-item-subtotal">
                                                    ${(item.price * item.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-modal-footer">
                        <div className="cart-total-row">
                            <span className="cart-total-label">Total Harga ({totalItems} item):</span>
                            <span className="cart-total-amount display">
                                ${totalPrice.toLocaleString()}
                            </span>
                        </div>

                        <div className="cart-footer-actions">
                            <button
                                type="button"
                                className="cart-clear-btn"
                                onClick={onClearCart}
                            >
                                Kosongkan
                            </button>
                            <button
                                type="button"
                                className="cart-checkout-btn"
                                onClick={handleCheckout}
                            >
                                Checkout (${totalPrice.toLocaleString()})
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartModal
