import React from 'react'

export default function SiteFooter() {
  return (
    <div className='site-footer'>
        <p className='footer-text'>© Copyright <strong>{(new Date()).getFullYear()}</strong> | Gestion des Laboratoires Hologram | Tous droits reservés.</p>
    </div>
  )
}
