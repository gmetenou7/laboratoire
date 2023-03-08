import React, {Fragment}from 'react'
import {Link } from 'react-router-dom'

const Footer = () => {
  return (    
      <div className="kt-footer kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop  kt-header--fixed" id="kt_footer">
                    <div className="kt-container  kt-container--fluid ">
                        <div className="kt-footer__copyright">
                        
                        © Copyright {(new Date()).getFullYear()} | Gestion des Laboratoires Hologram | Tous droits reservés.
                    
                        </div>
                        <div className="kt-footer__menu">
                            <a target="_blank" className="kt-footer__menu-link kt-link">A Propos</a>
                            <a target="_blank" className="kt-footer__menu-link kt-link">Equipe</a>
                            <a target="_blank" className="kt-footer__menu-link kt-link">Contact</a>
                        </div>
                    </div>
                </div>
    
  )
}

export default Footer