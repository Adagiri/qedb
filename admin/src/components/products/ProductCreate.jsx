import * as React from 'react';
import {
  Create,
  FormTab,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TabbedForm,
  TextInput,
  required,
  CreateProps,
  ImageInput,
  ImageField,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

export const styles = {
  price: { width: '7em' },
  width: { width: '7em' },
  height: { width: '7em' },
  stock: { width: '7em' },
  widthFormGroup: { display: 'inline-block' },
  heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

const ProductCreate = (props) => {
  const classes = useStyles();
  return (
    <Create redirect={'list'} {...props}>
      <TabbedForm initialValues={{ sales: 0 }}>
        <FormTab label='Image'>
          <ImageInput
            source='images'
            label='Product image'
            accept='image/*'
            validate={required()}
            multiple={true}
          >
            <ImageField source='src' />
          </ImageInput>
        </FormTab>
        <FormTab label='Details' path='details'>
          <TextInput source='title' validate={required()} />
          <TextInput source='subtitle' validate={required()} />
          <NumberInput
            source='price'
            validate={required()}
            className={classes.price}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>₦</InputAdornment>
              ),
            }}
          />

          <ReferenceInput
            source='category'
            reference='categories'
            validate={required()}
          >
            <SelectInput source='name' />
          </ReferenceInput>

          <NumberInput
            source='stock'
            validate={required()}
            className={classes.stock}
            validate={required()}
          />

          <ArrayInput source='tags'>
            <SimpleFormIterator>
              <TextInput label='..' />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>
        <FormTab label='Copyright' path='description'>
          <ReferenceInput
            source='author'
            reference='authors'
            validate={required()}
          >
            <SelectInput source='name' />
          </ReferenceInput>
          <ReferenceInput source='translator' reference='translators'>
            <SelectInput source='name' />
          </ReferenceInput>
          <ReferenceInput source='publisher' reference='publishers'>
            <SelectInput source='name' />
          </ReferenceInput>
          <ReferenceInput source='language' reference='languages'>
            <SelectInput source='name' />
          </ReferenceInput>

          <RichTextInput
            source='description'
            placeholder='Description'
            validate={required()}
          />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default ProductCreate;
