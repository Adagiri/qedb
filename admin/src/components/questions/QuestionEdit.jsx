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
  FormDataConsumer,
  required,
  minLength,
  maxLength,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

// import { Edit, SimpleForm, SelectInput, FormDataConsumer } from 'react-admin';

const getOptions = (array) => {
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

const validateText = [required(), minLength(3), maxLength(80)];
const validateOption = [required(), minLength(1), maxLength(20)];
const validateExplanation = [maxLength(800)];
const validateAnswer = [required(), answerValidation];

const QuestionTitle = (props) => {
  const { record } = props;
  return record ? <span>{record.text}</span> : null;
};

const PostEditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} label='Back' icon={<ChevronLeft />} />
    {/* <ShowButton basePath={basePath} record={data} /> */}
  </TopToolbar>
);

export const QuestionEdit = (props) => {
  const idMatch = true;

  return (
    <Edit actions={<PostEditActions />} title={<QuestionTitle />} {...props}>
      <TabbedForm>
        <FormTab label='Basic'>
          {/* Type */}
          <SelectInput
            disabled={!idMatch}
            source='type'
            choices={[
              { id: 'multiple_choice', name: 'Multiple choice' },
              { id: 'boolean', name: 'Boolean' },
            ]}
          />

          {/* Text  */}
          <TextInput validate={validateText} source='text' />

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
                <SelectInput
                  source='answer'
                  choices={formData.options ? getOptions(formData.options) : []}
                  {...rest}
                  validate={validateAnswer}
                />
              );
            }}
          </FormDataConsumer>

          {/* Category  */}
          <ReferenceArrayInput
            validate={required()}
            source='category'
            reference='categories'
          >
            <SelectArrayInput source='name' />
          </ReferenceArrayInput>
          <Divider />

          {/* Difficulty  */}
          <SelectInput
            source='difficulty'
            validate={required()}
            choices={[
              { id: 'easy', name: 'Easy' },
              { id: 'medium', name: 'Medium' },
              { id: 'hard', name: 'Hard' },
            ]}
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
          <FormDataConsumer>
            {({ formData, ...rest }) => {
              return !formData.image?.rawFile && <ImageField source='image' />;
            }}
          </FormDataConsumer>
        </FormTab>

        <FormTab label='Credits'>
          {/* Credits  */}
          <ArrayInput source='credits'>
            <SimpleFormIterator>
              <TextInput
                validate={required()}
                label=''
                placeholder='e.g Wikipedia'
                source='title'
              />
              <TextInput
                validate={required()}
                label=''
                placeholder='e.g https://wikipedia.com/....'
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

        <FormTab label='Approve It'>
          {/* Status  */}
          <SelectInput
            source='status'
            choices={[
              { id: 'approved', name: 'Approve' },
              { id: 'rejected', name: 'Reject' },
            ]}
          />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};
