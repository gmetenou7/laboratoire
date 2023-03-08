import React, { Fragment } from 'react'
import Navbar from '../layout/Navbar.tsx';
import Sidebar from '../layout/Sidebar.tsx';

const InfoUser = () => {
  return (
    <Fragment>
        <Navbar/>
        <Sidebar/>
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
  <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
        <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
		
          <div className="kt-subheader   kt-grid__item" id="kt_subheader">
                        <div className="kt-container  kt-container--fluid ">
                            <div className="kt-subheader__main">
                                

                                <span className="kt-subheader__separator kt-hidden"></span>
                                <div className="kt-subheader__breadcrumbs">
                                    
                                </div>

                            </div>
                            <div className="kt-subheader__toolbar">
                                <div className="kt-subheader__wrapper">
                                    
                                   

                                </div>
                            </div>
                        </div>
                    </div>
                    

<div className="kt-portlet kt-profile">
	<div className="kt-profile__content">
		<div className="row">
			<div className="col-md-12 col-lg-5 col-xl-4">
				<div className="kt-profile__main">
					{/* <div className="kt-profile__main-pic">
						<img src="../../../../themes/keen/theme/demo1/dist/assets/media/users/300_21.jpg" alt=""/>
						<label className="kt-profile__main-pic-upload" >
							<i className="flaticon-photo-camera"></i>
						</label>
					</div> */}
					<div className="kt-profile__main-info">
						<div className="kt-profile__main-info-name">Brian Johnson</div>
						<div className="kt-profile__main-info-position">Lead Designer</div>
					</div>
				</div>			
			</div>
			<div className="col-md-12 col-lg-4 col-xl-4">
				<div className="kt-profile__contact">
					<a href="#" className="kt-profile__contact-item">
						<span className="kt-profile__contact-item-icon kt-profile__contact-item-icon-whatsup"><i className="flaticon-whatsapp"></i></span>
						<span className="kt-profile__contact-item-text">44 8475 804342</span>
					</a>
					<a href="#" className="kt-profile__contact-item">
						<span className="kt-profile__contact-item-icon"><i className="flaticon-email-black-circular-button kt-font-danger"></i></span>
						<span className="kt-profile__contact-item-text">brian@keenthemes.com</span>
					</a>
					<a href="#" className="kt-profile__contact-item">
						<span className="kt-profile__contact-item-icon kt-profile__contact-item-icon-twitter"><i className="flaticon-twitter-logo-button"></i></span>
						<span className="kt-profile__contact-item-text">@brianjohnson</span>
					</a>
				</div>
			</div>
			<div className="col-md-12 col-lg-3 col-xl-4">
				<div className="kt-profile__stats">
					<div className="kt-profile__stats-item">
						<div className="kt-profile__stats-item-label">Sales</div>
						<div className="kt-profile__stats-item-chart">
							<span>USP: +23%</span>
							<canvas id="kt_profile_mini_chart_1" width="100" height="40"></canvas>
						</div>
					</div>
					<div className="kt-profile__stats-item">
						<div className="kt-profile__stats-item-label">Reports</div>
						<div className="kt-profile__stats-item-chart">
							<span>RNP: +30%</span>
							<canvas id="kt_profile_mini_chart_2" width="100" height="40"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{/* <div className="kt-profile__nav">
		
		<ul className="nav nav-tabs nav-tabs-line" role="tablist">
            <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#kt_tabs_1_1" role="tab">Dashboard</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#kt_tabs_1_2" role="tab">Account & Profile</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#kt_tabs_1_3" role="tab">Activities</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#kt_tabs_1_4" role="tab">Tasks</a>
            </li>
		</ul>         
		
    </div> */}
</div>
         </div>
            </div>	 
        </div>
	

    </Fragment>
  )
}

export default InfoUser