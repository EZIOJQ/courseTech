import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from './autocomplete'
import Login from './login'


class Root extends React.Component {

	constructor(props) {
		// Initialize mutable state
		super(props);
		this.state = { results: [] }
	}

	componentDidMount() {
	    // Call REST API to get number of courses
	    fetch(this.props.url, { credentials: 'same-origin' })
	    .then((response) => {
	      if (!response.ok) throw Error(response.statusText);
	      return response.json();
	    })
	    .then((data) => {
	      this.setState({
	        results: data.results
	      });
	    })
	    .catch(error => console.log(error));  // eslint-disable-line no-console
	}


	render() {
		let allName = [];
		this.state.results.forEach(function(course){allName.push(course.name)})
		return (
		// navigation bar
		<section>
			<nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top animated fadeIn" id="mainNav">
			    <div className="container">
			      <a className="navbar-brand js-scroll-trigger animated bounceInLeft" href="/">CourseTech</a>
			      <button className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
			        Menu
			        <i className="fas fa-bars"></i>
			      </button>
			      <div className="collapse navbar-collapse" id="navbarResponsive">
			        <ul className="navbar-nav ml-auto">
			          <li className="nav-item mx-0 mx-lg-1">
			          	<Login data={false} url= "/api/users/" />
			          </li>
			          <li className="nav-item mx-0 mx-lg-1">
			            <a className="nav-link py-3 px-0 px-lg-3 rounded" href="/explore">Explore</a>
			          </li>
			          <li className="nav-item mx-0 mx-lg-1">
			            <a className="nav-link py-3 px-0 px-lg-3 rounded" href="/about">About</a>
			          </li>
			        </ul>
			      </div>
			    </div>
			</nav>
		</section>
		);
	}
}



export default Root;

