import { Divider } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import {
  ImageInput,
  ImageField,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  Edit,
  SelectInput,
  TabbedForm,
  FormTab,
  ReferenceArrayInput,
  SelectArrayInput,
  TopToolbar,
  ListButton,
  ShowButton,
  maxLength,
  FormDataConsumer,
  required,
  Create,
  minLength,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
// import { Edit, SimpleForm, SelectInput, FormDataConsumer } from 'react-admin';

const getOptions = (array, type) => {
  if (type === 'boolean') {
    return [
      {
        id: 'True',
        name: 'True',
      },
      {
        id: 'False',
        name: 'False',
      },
    ];
  }
  return array
    .filter((data) => !!data)
    .map((data) => {
      const dat = {};
      dat.id = data;
      dat.name = data;

      console.log(dat);
      return dat;
    });
};

const answerValidation = (value, allValues) => {
  console.log(allValues);
  if (!value) {
    return 'Answer is required';
  }
  if (
    allValues.options &&
    allValues.type === 'multiple_choice' &&
    !allValues.options.includes(value)
  ) {
    return 'Select a valid answer';
  }
  return undefined;
};

const validateOptions = (value, allValues) => {
  console.log(value);
  if (allValues.type === 'multiple_choice' && !value) {
    return 'Options are required';
  }
  if (allValues.type === 'multiple_choice' && value.length < 2) {
    return 'Options must be more than 1';
  }
  return undefined;
};

const validateText = [required(), minLength(3), maxLength(150)];
const validateExplanation = [maxLength(800)];
const validateOption = [required(), minLength(1), maxLength(50)];
const validateAnswer = [required(), answerValidation];

const PostEditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label='Back' icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

export const QuestionCreate = (props) => {
  return (
    <Create actions={<PostEditActions />} {...props}>
      <TabbedForm redirect={'list'}>
        <FormTab label='Basic'>
          {/* Type */}
          <SelectInput
            source='type'
            choices={[
              { id: 'multiple_choice', name: 'Multiple choice' },
              { id: 'boolean', name: 'Boolean' },
            ]}
          />
          {/* Text  */}
          <TextInput source='text' validate={validateText} />
          {/* Option */}
          <Divider />
          <FormDataConsumer>
            {({ formData, ...rest }) => {
              return (
                formData.type === 'multiple_choice' && (
                  <ArrayInput validate={validateOptions} source='options'>
                    <SimpleFormIterator>
                      <TextInput validate={validateOption} label='' />
                    </SimpleFormIterator>
                  </ArrayInput>
                )
              );
            }}
          </FormDataConsumer>
          {/* Answer  */}
          <FormDataConsumer>
            {({ formData, ...rest }) => {
              return (
                formData.type && (
                  <SelectInput
                    source='answer'
                    choices={
                      formData.options || formData.type === 'boolean'
                        ? getOptions(formData.options, formData.type)
                        : []
                    }
                    {...rest}
                    validate={validateAnswer}
                  />
                )
              );
            }}
          </FormDataConsumer>
          {/* Category  */}

          <ReferenceArrayInput
            source='category'
            reference='categories'
            validate={required()}
          >
            <SelectArrayInput source='name' />
          </ReferenceArrayInput>
          <Divider />
          {/* Difficulty  */}
          <SelectInput
            source='difficulty'
            choices={[
              { id: 'easy', name: 'Easy' },
              { id: 'medium', name: 'Medium' },
              { id: 'hard', name: 'Hard' },
            ]}
            validate={required()}
          />
        </FormTab>

        <FormTab label='Image'>
          {/* Images */}
          <ImageInput
            source='image'
            label='image'
            accept='image/*'
            // validate={}
          >
            <ImageField label='banner to upload' source='image' />
          </ImageInput>
          <ImageField label='Current banner' source='image' />
        </FormTab>

        <FormTab label='Credits'>
          {/* Credits  */}
          <ArrayInput source='credits'>
            <SimpleFormIterator>
              <TextInput
                label='title'
                placeholder='e.g Wikipedia'
                validate={required()}
                source='title'
              />
              <TextInput
                label='link'
                placeholder='e.g https://wikipedia.com/....'
                validate={required()}
                source='link'
              />
            </SimpleFormIterator>
          </ArrayInput>
        </FormTab>

        <FormTab label='Explanation'>
          {/* Explanation */}
          <RichTextInput
            label='Explanation'
            validate={validateExplanation}
            source='explanation'
          />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};
