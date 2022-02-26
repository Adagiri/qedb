import * as React from 'react';
import { ReferenceField, ReferenceFieldProps } from 'react-admin';
import FullNameField from './FullNameField';

const UserReferenceField = (props) => (
  <ReferenceField source='author.id' reference='users' {...props}>
    <FullNameField />
  </ReferenceField>
);

UserReferenceField.defaultProps = {
  source: 'author.id',
  label: 'author',
  addLabel: true,
};

export default UserReferenceField;
