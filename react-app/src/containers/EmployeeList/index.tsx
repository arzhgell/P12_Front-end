import React, { useEffect, useState } from "react";
import {
	type Cell,
	type Column,
	type HeaderGroup,
	type Row,
	type TableInstance,
	useTable,
} from "react-table";
import "./app.css";

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

	useEffect(() => {
		const employeesData = JSON.parse(localStorage.getItem("employees") || "[]");
		setEmployees(employeesData);
	}, []);

	const data = React.useMemo(() => employees, [employees]);

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

	return (
		<div className="container">
			<h1>Current Employees</h1>
			<table {...getTableProps()} className="display">
				<thead>
					{headerGroups.map((headerGroup: HeaderGroup<Employee>) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
							{headerGroup.headers.map((column: Column<Employee>) => (
								<th {...column.getHeaderProps()} key={column.id}>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row: Row<Employee>) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()} key={row.id}>
								{row.cells.map((cell: Cell<Employee>) => (
									<td {...cell.getCellProps()} key={cell.column.id}>
										{cell.render("Cell")}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
			<a href="index.html">Home</a>
		</div>
	);
};

export default EmployeeList;
