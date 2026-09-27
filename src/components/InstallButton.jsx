import { useState, useEffect } from 'react'

function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null)
    const [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        // Cek jika aplikasi sudah dibuka dalam mode standalone (sudah terinstal)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true)
        }

        const handleBeforeInstallPrompt = (e) => {
            // Mencegah mini-infobar default browser muncul otomatis
            e.preventDefault()
            // Simpan event agar bisa dipicu oleh tombol custom
            setDeferredPrompt(e)
        }

        const handleAppInstalled = () => {
            setIsInstalled(true)
            setDeferredPrompt(null)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('appinstalled', handleAppInstalled)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('appinstalled', handleAppInstalled)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        // Munculkan dialog instalasi bawaan browser
        await deferredPrompt.prompt()

        // Tangkap respon user
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted') {
            setDeferredPrompt(null)
        }
    }

    // Sembunyikan tombol jika prompt belum siap atau aplikasi sudah terpasang
    if (!deferredPrompt || isInstalled) return null

    return (
        <button
            type="button"
            className="install-btn"
            onClick={handleInstallClick}
            title="Install Bore &amp; Barrel App"
        >
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Install</span>
        </button>
    )
}

export default InstallButton
