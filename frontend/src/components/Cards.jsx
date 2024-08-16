import { useQuery } from "@apollo/client";
import Card from "./Card";
import {
	GET_CATEGORY_TRANSACTIONS,
	GET_TRANSACTIONS,
} from "../graphql/queries/transaction.query";
import {
	GET_AUTHENTICATED_USER,
	GET_USER_AND_TRANSACTIONS,
} from "../graphql/queries/user.query";
import { useEffect, useState } from "react";

const Cards = () => {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const { data, loading } = useQuery(GET_TRANSACTIONS);
	const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);
	const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
		variables: { userId: authUser?.authUser?._id },
	});

	const handleSelectedCategory = (e) => {
		setSelectedCategory(e.target.value);
	};
	const { data: categoryTransactions, loadingCategoryTransactions } = useQuery(
		GET_CATEGORY_TRANSACTIONS,
		{
			variables: { category: selectedCategory },
		}
	);
	console.log(data);
	console.log(categoryTransactions);

	useEffect(() => {
		console.log("categoryTransactions: ", categoryTransactions);
	}, [selectedCategory, categoryTransactions]);

	// if (loading) return <p>Loading...</p>;

	// console.log("cards data: ", data);

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center mt-10 text-gray-600'>
				History
			</p>

			<FilterTransaction handleSelectedCategory={handleSelectedCategory} />
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loadingCategoryTransactions &&
					categoryTransactions?.categoryTransactions?.map((transaction) => (
						<Card
							key={transaction._id}
							transaction={transaction}
							authUser={authUser?.authUser}
						/>
					))}
			</div>
			{!loadingCategoryTransactions && data?.transactions.length === 0 && (
				<p className='text-2xl text-center w-full text-gray-600'>
					No transaction history found.
				</p>
			)}
		</div>
	);
};
export default Cards;

export const FilterTransaction = ({ handleSelectedCategory }) => {
	return (
		<div className='flex justify-center py-5 mt-2'>
			<select
				className='flex py-2 px-2 border-2 border-gray-300 shadow-md rounded-md text-lg'
				name='transactionType'
				id='transactionType'
				onChange={handleSelectedCategory}>
				<option value='All'>All</option>
				<option value='saving'>Saving</option>
				<option value='expense'>Expense</option>
				<option value='investment'>Investment</option>
			</select>
		</div>
	);
};
