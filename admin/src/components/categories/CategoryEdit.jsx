import * as React from 'react';
import {
  Datagrid,
  Edit,
  EditProps,
  EditButton,
  FieldProps,
  NumberField,
  ReferenceManyField,
  SimpleForm,
  TextInput,
  useTranslate,
  TabbedForm,
  FormTab,
  ImageInput,
  ImageField,
  TopToolbar,
  ListButton,
} from 'react-admin';

import ThumbnailField from '../questions/ThumbnailField';
import QuestionRefField from '../questions/QuestionRefField';

import ChevronLeft from '@material-ui/icons/ChevronLeft';

const CategoryEditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label='Back' icon={<ChevronLeft />} />
  </TopToolbar>
);

const CategoryTitle = (props) => {
  const { record } = props;
  const translate = useTranslate();
  return record ? (
    <span>
      {/* {translate('resources.categories.name', { smart_count: 1 })} &quot; */}
      {record.name}&quot;
    </span>
  ) : null;
};

export const CategoryEdit = (props) => (
  <Edit actions={<CategoryEditActions />} title={<CategoryTitle />} {...props}>
    <TabbedForm>
      <FormTab label='Basic'>
        <TextInput source='name' />
        <ReferenceManyField
          reference='questions'
          target='category'
          label='questions'
          perPage={20}
          fullWidth
        >
          <Datagrid>
            <ThumbnailField />
            <QuestionRefField source='reference' />
            <NumberField
              source='price'
              options={{ style: 'currency', currency: 'USD' }}
            />
            <NumberField
              source='width'
              options={{ minimumFractionDigits: 2 }}
            />
            <NumberField
              source='height'
              options={{ minimumFractionDigits: 2 }}
            />
            <NumberField source='stock' />
            <NumberField source='sales' />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
      {/* Second tab  */}
      <FormTab label='Banner'>
        <ImageInput
          source='image'
          label='image'
          accept='image/*'
          // validate={}
        >
          <ImageField source='image' />
        </ImageInput>
        <ImageField label="Current banner" source='image' />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default CategoryEdit;
