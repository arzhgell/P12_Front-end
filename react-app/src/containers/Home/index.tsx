import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import { InputText } from '@components/InputText';
import { InputDate } from '@components/InputDate';
import { Select } from '@components/Select';

Modal.setAppElement('#root'); 

interface FormValues {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  startDate: Date;
  street: string;
  city: string;
  state: string;
  zipCode: number | '';
  department: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  startDate: Yup.date().required('Start Date is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.number().required('Zip Code is required').positive().integer(),
  department: Yup.string().required('Department is required')
});

export function Home()  {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    startDate: new Date(),
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales'
  };

  const handleSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    console.log(values);
    setSubmitting(false);
    setModalIsOpen(true);
  };

  return (
    <div className="container">
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <a href="employee-list.html">View Current Employees</a>
      <h2>Create Employee</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }: any) => (
          <Form id="create-employee">
            <InputText label="First Name" name="firstName" onChange={(e) => setFieldValue('firstName', e.target.value)}/>

<InputText label="Last Name" name="lastName" onChange={(e) => setFieldValue('lastName', e.target.value)} />

            <InputDate label="Date of Birth" name="dateOfBirth" value={values.dateOfBirth} onChange={(date: Date) => setFieldValue('dateOfBirth', date)} error={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : undefined} />

            <InputDate label="Start Date" name="startDate" value={values.startDate} onChange={(date: Date) => setFieldValue('startDate', date)} error={errors.startDate && touched.startDate ? errors.startDate : undefined} />

            <fieldset className="address">
              <legend>Address</legend>

              <InputText label="Street" name="street" onChange={(e) => setFieldValue('street', e.target.value)} />

              <InputText label="City" name="city" onChange={(e) => setFieldValue('city', e.target.value)} />

              <Select label="State" name="state" options={['CA', 'NY', 'TX', 'FL', 'OH']} />

              <InputText label="Zip Code" name="zipCode" onChange={(e) => setFieldValue('zipCode', e.target.value)} />
            </fieldset>

            <label htmlFor="department">Department</label>
            <Select label="Department" name="department" options={['Sales', 'Marketing', 'Engineering', 'Finance', 'HR']} />

            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Employee Created"
      >
        <h2>Employee Created!</h2>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

