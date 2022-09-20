import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/CourseActions';
import * as authorActions from '../../redux/actions/AuthorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseLIst';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  /* constructor(props) {
    super(props);
    this.state = {
      course: {
        title: ''
      }
    };
    //this.handleChange = this.handleChange.bind(this); //this will bind handlechange function to this.state so that it can acces its objects
  }*/
  //alternate way to initialize state object
  /*state = {
    course: {
      title: ''
    }
  };

  handleChange = (event) => {
    //use arrow function on event handler to avoid binding issue with state object
    //pass current state and update variable title to input target value
    const course = { ...this.state.course, title: event.target.value };
    //using new course variable set state of object
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault(); //stop re rendering whole page
    //debugger;
    //dispatching an action is mandatory
    this.props.actions.createCourse(this.state.course);
    //alert(this.state.course.title);
  };*/

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    //load course detail once components mount
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert('Loading courses failed ' + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert('Loading authors failed ' + error);
      });
    }
  }

  handleDeleteCourse = async (course) => {
    toast.success('Course deleted');
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error('Delete failed.' + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {/*<form onSubmit={this.handleSubmit}>*/}
        {/*redirect to add course */}
        {this.state.redirectToAddCoursePage && <Redirect to='/course' />}
        <h2>Courses</h2>
        {/*show spinner only if loading in progress */}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className='btn btn-primary add-course'
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            {/*pass course list fetched from api to display component*/}
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
        {/*<h3>Add Course</h3>
        <input
          type='text'
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type='submit' value='Save' />
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
        </form>*/}
      </>
    );
  }
}

//we declare that dispatch to be passed in to CoursesPage component
CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

//this determines what state is passed to our component via props
function mapStateToProps(state) {
  //debugger;
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              //map course with author name
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

//this determines what action to pass to our component on props
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      //define actions to dispatch
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

//if we don't declare mapDispatchToProps it automatically injects dispatcher for props
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
