import React from 'react'
import Link from 'next/link'

const navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-success bg-gradient rounded-4 p-3 shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="/quran.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                    <strong>Al-Qur&rsquo;anulkareem</strong>
                </a>
                <span >by <Link className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover" href="https://instagram.com/nabilfgrza_">nabilfgrza</Link></span>
            </div>
        </nav>
    )
}

export default navbar