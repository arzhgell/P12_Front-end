import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { InputDate } from "@components/InputDate";
import { InputText } from "@components/InputText";
import { Select } from "@components/Select";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface FormValues {
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	startDate: Date;
	street: string;
	city: string;
	state: string;
	zipCode: number | "";
	department: string;
}

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last Name is required"),
	dateOfBirth: Yup.date().required("Date of Birth is required"),
	startDate: Yup.date().required("Start Date is required"),
	street: Yup.string().required("Street is required"),
	city: Yup.string().required("City is required"),
	state: Yup.string().required("State is required"),
	zipCode: Yup.number().required("Zip Code is required").positive().integer(),
	department: Yup.string().required("Department is required"),
});

export function Home() {
	const [modalIsOpen, setModalIsOpen] = React.useState(false);

	const initialValues: FormValues = {
		firstName: "",
		lastName: "",
		dateOfBirth: new Date(),
		startDate: new Date(),
		street: "",
		city: "",
		state: "",
		zipCode: "",
		department: "Sales",
	};

	const handleSubmit = (
		values: FormValues,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
	) => {
		console.log(values);
		setSubmitting(false);
		setModalIsOpen(true);
	};

	return (
		<div className="container mx-auto p-8">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold text-gray-800">HRnet</h1>
			</div>
			<div className="text-center mb-4">
				<a href="employee-list.html" className="text-blue-500 hover:underline">
					View Current Employees
				</a>
			</div>
			<h2 className="text-2xl font-semibold text-gray-700 mb-6">
				Create Employee
			</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue, values, errors, touched }: any) => (
					<Form id="create-employee" className="space-y-6">
						<div className="space-y-4">
							<InputText
								label="First Name"
								name="firstName"
								onChange={(e) => setFieldValue("firstName", e.target.value)}
								className="w-full p-2 border border-gray-300 rounded"
							/>

							<InputText
								label="Last Name"
								name="lastName"
								onChange={(e) => setFieldValue("lastName", e.target.value)}
								className="w-full p-2 border border-gray-300 rounded"
							/>

							<InputDate
								label="Date of Birth"
								name="dateOfBirth"
								value={values.dateOfBirth}
								onChange={(date: Date) => setFieldValue("dateOfBirth", date)}
								error={
									errors.dateOfBirth && touched.dateOfBirth
										? errors.dateOfBirth
										: undefined
								}
								className="w-full p-2 border border-gray-300 rounded"
							/>

							<InputDate
								label="Start Date"
								name="startDate"
								value={values.startDate}
								onChange={(date: Date) => setFieldValue("startDate", date)}
								error={
									errors.startDate && touched.startDate
										? errors.startDate
										: undefined
								}
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>

						<fieldset className="border border-gray-300 p-4 rounded">
							<legend className="text-lg font-semibold text-gray-700">
								Address
							</legend>

							<div className="space-y-4">
								<InputText
									label="Street"
									name="street"
									onChange={(e) => setFieldValue("street", e.target.value)}
									className="w-full p-2 border border-gray-300 rounded"
								/>

								<InputText
									label="City"
									name="city"
									onChange={(e) => setFieldValue("city", e.target.value)}
									className="w-full p-2 border border-gray-300 rounded"
								/>

								<Select
									label="State"
									name="state"
									options={["CA", "NY", "TX", "FL", "OH"]}
									className="w-full p-2 border border-gray-300 rounded"
								/>

								<InputText
									label="Zip Code"
									name="zipCode"
									onChange={(e) => setFieldValue("zipCode", e.target.value)}
									className="w-full p-2 border border-gray-300 rounded"
								/>
							</div>
						</fieldset>

						<label
							htmlFor="department"
							className="block text-sm font-medium text-gray-700"
						>
							Department
						</label>
						<Select
							label="Department"
							name="department"
							options={["Sales", "Marketing", "Engineering", "Finance", "HR"]}
							className="w-full p-2 border border-gray-300 rounded"
						/>

						<button
							type="submit"
							className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
						>
							Save
						</button>
					</Form>
				)}
			</Formik>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				contentLabel="Employee Created"
				className="fixed inset-0 flex items-center justify-center p-4"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50"
			>
				<div className="bg-white p-8 rounded shadow-lg text-center">
					<h2 className="text-2xl font-semibold text-gray-700 mb-4">
						Employee Created!
					</h2>
					<button
						type="button"
						onClick={() => setModalIsOpen(false)}
						className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
					>
						Close
					</button>
				</div>
			</Modal>
		</div>
	);
}
