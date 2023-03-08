import React, { Fragment } from 'react'
import Sidebar from '../layout/Sidebar.tsx'
import Navbar from '../layout/Navbar.tsx'

const DetailFacture = () => {
  return (
    <Fragment>
        <Navbar/>
        <Sidebar/>
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
            <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content"></div>
            <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">  
                <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">	
                <div className="kt-portlet">
                    <div className="kt-invoice-2">
                        <div className="kt-invoice__head">
                            <div className="kt-invoice__container">
                                <div className="kt-invoice__brand">
                                    <h1 className="kt-invoice__title">Facture</h1>

                                    <div  className="kt-invoice__logo">
                                        <a href="#"><img src="../../../../themes/keen/theme/demo1/dist/assets/media/misc/invoice2-logo.png"/></a>

                                        <span className="kt-invoice__desc">
                                                    <span>Cecilia Chapman, 711-2880 Nulla St., Mankato</span>
                                        <span>Mississippi 96522</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="kt-invoice__items">
                                    <div className="kt-invoice__item">
                                        <span className="kt-invoice__subtitle">INVOICE TO:</span>
                                        <span className="kt-invoice__text">Iris Watson, P.O. Box 283 8562 Fusce RD.<br/>Fredrick Nebraska 20620</span>
                                    </div>

                                    <div className="kt-invoice__item">
                                        <span className="kt-invoice__subtitle">DATE:</span>
                                        <span className="kt-invoice__text">Dec 12, 2018</span>
                                        <span className="kt-invoice__subtitle">INVOICE NO</span>
                                        <span className="kt-invoice__text">GS000014</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="kt-invoice__body">
                            <div className="kt-invoice__container">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td>DESCRIPTION</td>
                                                <td>HOURS</td>
                                                <td>RATE</td>
                                                <td>AMOUNT</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Creative Design</td>
                                                <td>80</td>
                                                <td>$40.00</td>
                                                <td>$3200.00</td>
                                            </tr>
                                            <tr>
                                                <td>Front-End Development</td>
                                                <td>120</td>
                                                <td>$40.00</td>
                                                <td>$4800.00</td>
                                            </tr>
                                            <tr>
                                                <td>Back-end Development</td>
                                                <td>210</td>
                                                <td>$60.00</td>
                                                <td>$12600.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="kt-invoice__footer">
                            <div className="kt-invoice__container">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>BANK</th>
                                                <th>ACC.NO.</th>
                                                <th>DUE DATE</th>
                                                <th>TOTAL AMOUNT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>BARCLAYS UK</td>
                                                <td>12345678909</td>
                                                <td>Jan 07, 2018</td>
                                                <td className="kt-font-danger kt-font-xl kt-font-boldest">20,600.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="kt-invoice__actions">
                            <div className="kt-invoice__container">
                                <button type="button" className="btn btn-label-brand btn-bold" onClick={"window.print();"}>Download Invoice</button>
                                <button type="button" className="btn btn-brand btn-bold" onClick={"window.print();"}>Print Invoice</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
       </div>
    </Fragment>
  )
}

export default DetailFacture