import React from 'react';
import { render } from '@testing-library/react';
import CourseForm from './CourseForm';

function renderCourseFrom(args) {
  let defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

// query rendered component
it('should render Add Course header', () => {
  const { getByText } = renderCourseFrom();
  getByText('Add Course');
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseFrom();
  getByText('Save');
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText } = renderCourseFrom({ saving: true });
  getByText('Saving...');
});
