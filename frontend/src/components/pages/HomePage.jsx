import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import TransactionForm from "../TransactionForm";

import { MdLogout } from "react-icons/md";
import Cards from "../Cards";
import toast from "react-hot-toast";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TRANSACTION_STATISTICS } from "../../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);
// const chartData = {
// 	labels: ["Saving", "Expense", "Investment"],
// 	datasets: [
// 		{
// 			label: "%",
// 			data: [13, 8, 3],
// 			backgroundColor: ["#61bc84", "#e9aa2b", "#71c4ef"],
// 			// borderColor: [
// 			// 	"rgba(75, 192, 192)",
// 			// 	"rgba(255, 99, 132)",
// 			// 	"rgba(54, 162, 235, 1)",
// 			// ],
// 			// borderWidth: 1,
// 			borderRadius: 30,
// 			spacing: 10,
// 			cutout: 130,
// 		},
// 	],
// };
const HomePage = () => {
	const { data } = useQuery(GET_TRANSACTION_STATISTICS);
	const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);

	console.log(data);
	const [logout, { loading, client }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "$",
				data: [],
				backgroundColor: [],
				borderColor: [],
				// borderColor: [
				// 	"rgba(75, 192, 192)",
				// 	"rgba(255, 99, 132)",
				// 	"rgba(54, 162, 235, 1)",
				// ],
				borderWidth: 1,
				borderRadius: 30,
				spacing: 10,
				cutout: 130,
			},
		],
	});
	useEffect(() => {
		if (data?.categoryStatistics) {
			const categories = data.categoryStatistics.map((stat) => stat.category);
			const totalAmounts = data.categoryStatistics.map(
				(stat) => stat.totalAmount
			);
			const backgroundColors = [];
			const borderColors = [];

			categories.forEach((c) => {
				if (c === "saving") {
					backgroundColors.push("#61bc84");
					borderColors.push("#61bc84");
				} else if (c === "expense") {
					backgroundColors.push("#e9aa2b");
					borderColors.push("#e9aa2b");
				} else if (c === "investment") {
					backgroundColors.push("#71c4ef");
					borderColors.push("#71c4ef");
				}
			});
			setChartData((prev) => ({
				labels: categories,
				datasets: [
					{
						...prev.datasets[0],
						data: totalAmounts,
						backgroundColor: backgroundColors,
						borderColor: borderColors,
					},
				],
			}));
		}
	}, [data]);
	const handleLogout = async () => {
		try {
			console.log("Logging out...");
			await logout();
			client.resetStore();
		} catch (error) {
			console.error("Error logging out: ", error);
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center'>
					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-[#5c5c5c] via-[#949191] to-[#5c5c5c] inline-block text-transparent bg-clip-text'>
						{/* Spend wisely, track wisely */}
						Navigate your finances with ease
					</p>
					<img
						src={authUserData?.authUser.profilePicture}
						className='w-11 h-11 rounded-full border-[0.75px] border-gray-400 cursor-pointer'
						alt='Avatar'
					/>
					{!loading && (
						<MdLogout
							className='mx-2 w-5 h-5 cursor-pointer'
							onClick={handleLogout}
						/>
					)}
					{/* loading spinner */}
					{loading && (
						<div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>
					)}
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6 p-8 border-2 border-gray-700 rounded-3xl bg-[#f5f4f1] h-2/5 shadow-xl'>
					<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
						<Doughnut data={chartData} />
					</div>

					<TransactionForm />
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;
