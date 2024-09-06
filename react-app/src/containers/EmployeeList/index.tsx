import { Header } from "@components/Header";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
	type Cell,
	type Column,
	type HeaderGroup,
	type Row,
	type TableInstance,
	useTable,
} from "react-table";

// Interface for Employee data
interface Employee {
	firstName: string;
	lastName: string;
	startDate: string;
	department: string;
	dateOfBirth: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
}

const EmployeeList: React.FC = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [loading, setLoading] = useState(true);

	// Fetch employees from localStorage and update state
	useEffect(() => {
		const employeesData = JSON.parse(localStorage.getItem("employees") || "[]");
		setEmployees(employeesData);
		setLoading(false); // Data has been loaded
	}, []);

	const data = React.useMemo(() => employees, [employees]);

	// Define the columns for the table
	const columns: Column<Employee>[] = React.useMemo(
		() => [
			{ Header: "First Name", accessor: "firstName" },
			{ Header: "Last Name", accessor: "lastName" },
			{ Header: "Start Date", accessor: "startDate" },
			{ Header: "Department", accessor: "department" },
			{ Header: "Date of Birth", accessor: "dateOfBirth" },
			{ Header: "Street", accessor: "street" },
			{ Header: "City", accessor: "city" },
			{ Header: "State", accessor: "state" },
			{ Header: "Zip Code", accessor: "zipCode" },
		],
		[],
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	}: TableInstance<Employee> = useTable({ columns, data });

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<p className="text-xl font-semibold text-gray-600">
					Loading employees...
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<h1 className="text-3xl font-bold text-center text-gray-900 my-8 ">
				Current Employees
			</h1>

			<div className="overflow-x-auto shadow-lg px-8 flex-1">
				<table
					{...getTableProps()}
					className="min-w-full table-auto bg-white rounded-lg shadow-lg"
					role="table"
					aria-label="Employee List"
				>
					<thead className="bg-gray-200">
						{headerGroups.map((headerGroup: HeaderGroup<Employee>) => (
							<tr
								{...headerGroup.getHeaderGroupProps()}
								key={headerGroup.id}
								role="row"
							>
								{headerGroup.headers.map((column: Column<Employee>) => (
									<th
										{...column.getHeaderProps()}
										key={column.id}
										className="px-6 py-3 text-left text-sm font-semibold text-gray-800 tracking-wider"
										role="columnheader"
										scope="col"
									>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{rows.length > 0 ? (
							rows.map((row: Row<Employee>) => {
								prepareRow(row);
								return (
									<tr
										{...row.getRowProps()}
										key={row.id}
										className={`hover:bg-gray-100",${
											row.index % 2 === 0 && "bg-white"
										}
											${row.index % 2 !== 0 && "bg-gray-50"}
										`}
										role="row"
									>
										{row.cells.map((cell: Cell<Employee>) => (
											<td
												{...cell.getCellProps()}
												key={cell.column.id}
												className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
												role="cell"
											>
												{cell.render("Cell")}
											</td>
										))}
									</tr>
								);
							})
						) : (
							<tr>
								<td
									colSpan={columns.length}
									className="px-6 py-4 text-center text-sm text-gray-500"
								>
									No employees found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="text-center mt-8">
				<NavLink
					to="/"
					className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
				>
					Go back to Home
				</NavLink>
			</div>
		</div>
	);
};

export default EmployeeList;
