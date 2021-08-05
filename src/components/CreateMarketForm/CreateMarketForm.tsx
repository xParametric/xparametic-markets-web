import dayjs from 'dayjs';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import CreateMarketFormActions from './CreateMarketFormActions';
import CreateMarketFormConfigure from './CreateMarketFormConfigure';
import CreateMarketFormFund from './CreateMarketFormFund';

type Outcome = {
  name: string;
  probability: number;
};

export type CreateMarketFormData = {
  question: string;
  firstOutcome: Outcome;
  secondOutcome: Outcome;
  thumbnail: {
    file: any;
    isUploaded: boolean;
  };
  category: string;
  subcategory: string;
  closingDate: string;
  liquidity: number;
};

const initialData: CreateMarketFormData = {
  question: '',
  firstOutcome: {
    name: '',
    probability: 50
  },
  secondOutcome: {
    name: '',
    probability: 50
  },
  thumbnail: {
    file: undefined,
    isUploaded: false
  },
  category: '',
  subcategory: '',
  closingDate: '',
  liquidity: 0
};

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Market Question is required!'),
  firstOutcome: Yup.object().shape({
    name: Yup.string().required('Outcome name is required!'),
    probability: Yup.number()
      .min(0, 'The probability of the Outcome must be greater or equal than 0!')
      .max(
        100,
        'The probability of the Outcome must be less or equal than 100!'
      )
      .required('Outcome probability is required!')
  }),
  secondOutcome: Yup.object().shape({
    name: Yup.string().required('Outcome name is required!'),
    probability: Yup.number()
      .min(0, 'The probability of the Outcome must be greater or equal than 0!')
      .max(
        100,
        'The probability of the Outcome must be less or equal than 100!'
      )
      .required('Outcome probability is required!')
  }),
  category: Yup.string().required('Category is required!'),
  subcategory: Yup.string(),
  closingDate: Yup.date()
    .min(
      dayjs().format('MM/DD/YYYY'),
      `Closing date must be later than ${dayjs().format('MM/DD/YYYY')}`
    )
    .required('Closing date is required!')
});

function CreateMarketForm() {
  async function handleFormSubmit(values: CreateMarketFormData) {
    console.log(values);
  }

  return (
    <Formik
      initialValues={initialData}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await handleFormSubmit(values);
        actions.setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      <Form className="pm-c-create-market-form">
        <CreateMarketFormConfigure />
        <CreateMarketFormFund />
        <CreateMarketFormActions />
      </Form>
    </Formik>
  );
}

export default CreateMarketForm;