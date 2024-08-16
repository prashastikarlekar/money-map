import React from "react";

const FilterTransaction = () => {
	return (
		<div className='flex justify-center py-5 mt-2'>
			<select
				className='flex py-2 px-2 border-2 border-gray-300 shadow-md rounded-md text-lg'
				name='transactionType'
				id='transactionType'>
				<option value=''>Saving</option>
				<option value=''>Expense</option>
				<option value=''>Investment</option>
			</select>
		</div>
	);
};

export default FilterTransaction;
