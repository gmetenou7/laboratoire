import React, { Fragment } from 'react'

const CreateLabo = () => {
  return (
    <Fragment>
        <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content"></div>	
        <div className="kt-subheader   kt-grid__item" id="kt_subheader"></div>
        <div className="kt-container  kt-container--fluid "></div>
        <div className="kt-subheader__main"></div>
        <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
		<div className="row">
	    <div className="col-md-6">
		
		<div className="kt-portlet">
			<div className="kt-portlet__head">
				<div className="kt-portlet__head-label">
					<h3 className="kt-portlet__head-title">Base Controls</h3>
				</div>
			</div>
			
			<form className="kt-form">
				<div className="kt-portlet__body">
					<div className="form-group form-group-last">
						<div className="alert alert-secondary" role="alert">
							<div className="alert-icon"><i className="flaticon-warning kt-font-brand"></i></div>
						  	<div className="alert-text">
								The example form below demonstrates common HTML form elements that receive updated styles from Bootstrap with additional classNamees.
							</div>
						</div>
					</div>
					<div className="form-group">
						<label>Email address</label>
						<input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"/>
						<span className="form-text text-muted">We'll never share your email with anyone else.</span>
					</div>
					<div className="form-group">
						<label >Password</label>
						<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
					</div>
					<div className="form-group">
						<label>Static:</label>
						<p className="form-control-static">email@example.com</p>
					</div>
					<div className="form-group">
						<label >Example select</label>
						<select className="form-control" id="exampleSelect1">
							<option >1</option>
							<option value="1">2</option>
							<option value="1">3</option>
							<option value="1">4</option>
							<option value="1">5</option>
						</select>
					</div>
					<div className="form-group">
						<label >Example multiple select</label>
						<select  className="form-control">
							<option  value="1">1</option>
							<option  value="1">2</option>
							<option  value="1">3</option>
							<option   value="1">4</option>
							<option  value="1">5</option>
						</select>
					</div>
					
				</div>
				<div className="kt-portlet__foot">
					<div className="kt-form__actions">
						<button type="reset" className="btn btn-primary">Submit</button>
						<button type="reset" className="btn btn-secondary">Cancel</button>
					</div>
				</div>
			</form>
						
		</div>
		
		<div className="kt-portlet">
			<div className="kt-portlet__head">
				<div className="kt-portlet__head-label">
					<h3 className="kt-portlet__head-title">Textual HTML5 Inputs</h3>
				</div>
			</div>
			
			<form className="kt-form kt-form--label-right">
				<div className="kt-portlet__body">
					<div className="form-group form-group-last">
						<div className="alert alert-secondary" role="alert">
							<div className="alert-icon"><i className="flaticon-warning kt-font-brand"></i></div>
						  	<div className="alert-text">
								Here are examples of <code>.form-control</code> applied to each textual HTML5 input type:
							</div>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-2 col-form-label">Text</label>
						<div className="col-10">
							<input className="form-control" type="text" value="Artisanal kale" id="example-text-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label  className="col-2 col-form-label">Search</label>
						<div className="col-10">
							<input className="form-control" type="search" value="How do I shoot web" id="example-search-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label  className="col-2 col-form-label">Email</label>
						<div className="col-10">
							<input className="form-control" type="email" value="bootstrap@example.com" id="example-email-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label  className="col-2 col-form-label">URL</label>
						<div className="col-10">
							<input className="form-control" type="url" value="https://getbootstrap.com" id="example-url-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label  className="col-2 col-form-label">Telephone</label>
						<div className="col-10">
							<input className="form-control" type="tel" value="1-(555)-555-5555" id="example-tel-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label  className="col-2 col-form-label">Password</label>
						<div className="col-10">
							<input className="form-control" type="password" value="hunter2" id="example-password-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label  className="col-2 col-form-label">Number</label>
						<div className="col-10">
							<input className="form-control" type="number" value="42" id="example-number-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label  className="col-2 col-form-label">Date and time</label>
						<div className="col-10">
							<input className="form-control" type="datetime-local" value="2011-08-19T13:45:00" id="example-datetime-local-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-2 col-form-label">Date</label>
						<div className="col-10">
							<input className="form-control" type="date" value="2011-08-19" id="example-date-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-2 col-form-label">Month</label>
						<div className="col-10">
							<input className="form-control" type="month" value="2011-08" id="example-month-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label  className="col-2 col-form-label">Week</label>
						<div className="col-10">
							<input className="form-control" type="week" value="2011-W33" id="example-week-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label  className="col-2 col-form-label">Time</label>
						<div className="col-10">
							<input className="form-control" type="time" value="13:45:00" id="example-time-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-2 col-form-label">Color</label>
						<div className="col-10">
							<input className="form-control" type="color" value="#563d7c" id="example-color-input"/>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-2 col-form-label">Range</label>
						<div className="col-10">
							<input className="form-control" type="range"/>
						</div>
					</div>
				</div>
				<div className="kt-portlet__foot">
					<div className="kt-form__actions">
						<div className="row">
							<div className="col-2">
							</div>
							<div className="col-10">
								<button type="reset" className="btn btn-success">Submit</button>
								<button type="reset" className="btn btn-secondary">Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
        
        </div>
        </div>
        </div>
        
    </Fragment>
  )
}

export default CreateLabo