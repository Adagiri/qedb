import * as React from 'react';
import {
  Create,
  TextInput,
  required,
  ImageInput,
  ImageField,
  SimpleForm,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const CategoryCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm redirect={'list'}  label=''>
        <TextInput source='name' validate={required()} />
        <ImageInput
          source='image'
          label='image'
          accept='image/*'
          validate={required()}
        >
          <ImageField source='image' />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};

export default CategoryCreate;
