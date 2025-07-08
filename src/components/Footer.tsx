function Footer() {
    return (
        <footer className="text-gray-600 body-font bg-white">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900" href="https://www.instagram.com/skin.cts/" target="_blank">
                    <img src="LogoNavbar.png" alt="" className="w-36 h-10"/>
                </a>
                <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 Skin —
                    <a href="https://www.instagram.com/skin.cts/" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@skin.cts</a>
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <a href="https://www.instagram.com/skin.cts/" target="_blank" className="ml-3 text-gray-500">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                        </svg>
                    </a>
                </span>
            </div>
        </footer>
    )
}

export default Footer;