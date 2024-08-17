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

import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

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

	const totalCards = categoryTransactions?.categoryTransactions?.length;
	const cardsOnPage = 3;
	const totalPages = Math.ceil(totalCards / cardsOnPage);
	console.log("Total cards are : ", totalCards);

	const [currentPage, setCurrentPage] = useState(1);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const start = (currentPage - 1) * cardsOnPage;
	const end = currentPage * cardsOnPage;
	const displayedTransactions =
		categoryTransactions?.categoryTransactions?.slice(start, end);

	useEffect(() => {
		// console.log("categoryTransactions: ", categoryTransactions);
		setCurrentPage(1);
	}, [selectedCategory, categoryTransactions]);

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center mt-10 text-gray-600'>
				History
			</p>

			<FilterTransaction handleSelectedCategory={handleSelectedCategory} />
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start my-10'>
				{loadingCategoryTransactions && <p>Loading...</p>}
				{!loadingCategoryTransactions &&
					displayedTransactions?.map((transaction) => (
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
			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				handlePageChange={handlePageChange}
			/>
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

export const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	console.log(pages);

	return (
		<div className='flex justify-center py-5  gap-2'>
			<button
				className={`flex py-1 px-2 border-[1px] border-gray-400 shadow-md rounded-md text-sm items-center gap-1  ${
					currentPage === 1 ? "cursor-not-allowed" : ""
				}`}
				disabled={currentPage === 1}
				onClick={() => handlePageChange(currentPage - 1)}>
				<FaAngleDoubleLeft className='text-gray-600  border-black' />
				Previous
			</button>
			{pages.map((page) => (
				<button
					key={page}
					className={`flex py-1 px-2 border-[1px] border-gray-400 shadow-md rounded-md text-sm ${
						currentPage === page ? "bg-gray-300" : ""
					}`}
					onClick={() => handlePageChange(page)}>
					{page}
				</button>
			))}
			<button
				className={`flex py-1 px-2 border-[1px] border-gray-400 shadow-md rounded-md text-sm items-center gap-1 ${
					currentPage === totalPages ? "cursor-not-allowed" : ""
				}`}
				disabled={currentPage === totalPages}
				onClick={() => handlePageChange(currentPage + 1)}>
				Next
				<FaAngleDoubleRight className='text-gray-600  border-black' />
			</button>
		</div>
	);
};
