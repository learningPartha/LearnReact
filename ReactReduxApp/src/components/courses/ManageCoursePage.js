import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/CourseActions';
import { loadAuthors } from '../../redux/actions/AuthorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

export function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    //load course detail once components mount
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed ' + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed ' + error);
      });
    }
  }, [props.course]); //empty array as second argument to effect so that it runs once when component mounts

  function handleChange(event) {
    const { name, value } = event.target; //destructuring avoids the event getting garbage collected so that it's available within nested setCourse callback
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  }

  //client side validation
  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = 'Title is required.';
    if (!authorId) errors.author = 'Author is required.';
    if (!category) errors.category = 'Category is required.';

    setErrors(errors);
    //form is valid if errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success('Course Saved.');
        history.push('/courses');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

//we declare that dispatch to be passed in to ManageCoursePage component
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

// ownprops lets us access component props
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  //debugger;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

//if we declare this as object instead of function, each property will be automatically bound to dispatch
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

//if we don't declare mapDispatchToProps it automatically injects dispatcher for props
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
