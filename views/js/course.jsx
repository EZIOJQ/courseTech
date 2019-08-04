import React from 'react';
import PropTypes from 'prop-types';

class Course extends React.Component {
  /* Display number of likes a like/unlike button for one post
   * Reference on forms https://facebook.github.io/react/docs/forms.html
   */

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
    // Render number of likes
    return (
      <div className="courses">
        {this.state.results.map((course) => (<p key={course.name}>{course.name}</p>))}
      </div>
    );
  }
}

Course.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Course;