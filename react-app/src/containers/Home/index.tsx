import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { InputDate } from "@components/InputDate";
import { InputText } from "@components/InputText";
import { Select } from "@components/Select";
import Modal from "react-modal";
import UnsplashImage from "../../assets/illustrations/illustration.webp";
import { Header } from "@components/Header";
import { NavLink } from "react-router-dom";

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

// Schéma de validation avec Yup pour une meilleure UX
const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last Name is required"),
	dateOfBirth: Yup.date().required("Date of Birth is required").nullable(),
	startDate: Yup.date().required("Start Date is required").nullable(),
	street: Yup.string().required("Street is required"),
	city: Yup.string().required("City is required"),
	state: Yup.string().required("State is required"),
	zipCode: Yup.number().required("Zip Code is required").positive().integer(),
	department: Yup.string().required("Department is required"),
});

// Loader accessible avec rôle pour les lecteurs d'écran
const Loader = () => (
	<div
		className="fixed inset-0 flex items-center justify-center bg-white z-50"
		role="status"
		aria-label="Loading..."
	>
		<div className="animate-spin rounded-full h-32 w-32 border-t-4 border-indigo-600" />
	</div>
);

export function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

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

	// Fonction de soumission du formulaire
	const handleSubmit = (
		values: FormValues,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
	) => {
		console.log(values);
		setSubmitting(false);
		setModalIsOpen(true);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow container mx-auto p-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">HRnet</h1>
				</div>
				<div className="text-center mb-6">
					<NavLink
						to="/employees-list"
						className="text-indigo-600 hover:text-indigo-800 transition duration-300"
					>
						View Current Employees
					</NavLink>
				</div>
				<div className="text-center mb-8 h-[200px]">
					<img
						src={UnsplashImage} // Image open source pour le site
						alt="Company culture illustration"
						className="mx-auto rounded-lg shadow-lg h-full w-full object-cover"
					/>
				</div>
				<h2 className="text-xl font-semibold text-gray-800 mb-6">
					Create Employee
				</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ setFieldValue, values, errors, touched }) => (
						<Form id="create-employee" className="space-y-6">
							<div className="space-y-4">
								<InputText
									label="First Name"
									name="firstName"
									onChange={(e) => setFieldValue("firstName", e.target.value)}
									error={
										touched.firstName && errors.firstName
											? errors.firstName
											: undefined
									}
									aria-label="First Name"
									className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 transition duration-300"
								/>

								<InputText
									label="Last Name"
									name="lastName"
									onChange={(e) => setFieldValue("lastName", e.target.value)}
									error={
										touched.lastName && errors.lastName
											? errors.lastName
											: undefined
									}
									aria-label="Last Name"
									className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 transition duration-300"
								/>

								<InputDate
									label="Date of Birth"
									name="dateOfBirth"
									value={values.dateOfBirth}
									onChange={(date: Date) => setFieldValue("dateOfBirth", date)}
									error={
										touched.dateOfBirth && errors.dateOfBirth
											? errors.dateOfBirth
											: undefined
									}
									aria-label="Date of Birth"
									className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 transition duration-300"
								/>

								<InputDate
									label="Start Date"
									name="startDate"
									value={values.startDate}
									onChange={(date: Date) => setFieldValue("startDate", date)}
									error={
										touched.startDate && errors.startDate
											? errors.startDate
											: undefined
									}
									aria-label="Start Date"
									className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 transition duration-300"
								/>
							</div>

							<fieldset className="border border-gray-200 p-4 rounded-lg shadow-sm">
								<legend className="text-lg font-semibold text-gray-800 mb-4">
									Address
								</legend>

								<div className="space-y-4">
									<InputText
										label="Street"
										name="street"
										onChange={(e) => setFieldValue("street", e.target.value)}
										error={
											touched.street && errors.street
												? errors.street
												: undefined
										}
										aria-label="Street"
										className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 transition duration-300"
									/>

									<InputText
										label="City"
										name="city"
										onChange={(e) => setFieldValue("city", e.target.value)}
										error={
											touched.city && errors.city ? errors.city : undefined
										}
										aria-label="City"
										className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 transition duration-300"
									/>

									<Select
										label="State"
										name="state"
										options={["CA", "NY", "TX", "FL", "OH"]}
										error={
											touched.state && errors.state ? errors.state : undefined
										}
										aria-label="State"
										className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 transition duration-300"
									/>

									<InputText
										label="Zip Code"
										name="zipCode"
										onChange={(e) => setFieldValue("zipCode", e.target.value)}
										error={
											touched.zipCode && errors.zipCode
												? errors.zipCode
												: undefined
										}
										aria-label="Zip Code"
										className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 transition duration-300"
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
								error={
									touched.department && errors.department
										? errors.department
										: undefined
								}
								aria-label="Department"
								className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-600 transition duration-300"
							/>

							<button
								type="submit"
								className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
								aria-label="Submit Employee Form"
							>
								Submit
							</button>
						</Form>
					)}
				</Formik>

				{/* Modal accessible */}
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={() => setModalIsOpen(false)}
					className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
					overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
				>
					<h2 id="modal-title" className="text-2xl font-bold mb-4">
						Employee Created!
					</h2>
					<p id="modal-description" className="text-lg">
						The employee has been successfully added.
					</p>
					<button
						onClick={() => setModalIsOpen(false)}
						className="mt-6 py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
						aria-label="Close Modal"
					>
						Close
					</button>
				</Modal>
			</main>

			<footer className="bg-gray-800 text-white py-6">
				<div className="container mx-auto text-center">
					<p>&copy; 2024 HRnet. All Rights Reserved.</p>
				</div>
			</footer>
		</div>
	);
}
