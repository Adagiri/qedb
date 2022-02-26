import * as React from 'react';
import { Link } from 'react-router-dom';
import { FieldProps } from 'react-admin';

const QuestionRefField = ({ record }) =>
  record ? <Link to={`questions/${record.id}`}>{record.reference}</Link> : null;

QuestionRefField.defaultProps = {
  source: 'id',
  label: 'Reference',
};

export default QuestionRefField;
