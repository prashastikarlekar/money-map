import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import TransactionForm from "../TransactionForm";

import { MdLogout } from "react-icons/md";
import Cards from "../Cards";
import toast from "react-hot-toast";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { useMutation } from "@apollo/client";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const chartData = {
		labels: ["Saving", "Expense", "Investment"],
		datasets: [
			{
				label: "%",
				data: [13, 8, 3],
				// backgroundColor: ["#5fa49e", "#c9576e", "#92a3d6"],
				backgroundColor: ["#61bc84", "#e9aa2b", "#71c4ef"],

				// borderColor: [
				// 	"rgba(75, 192, 192)",
				// 	"rgba(255, 99, 132)",
				// 	"rgba(54, 162, 235, 1)",
				// ],
				// borderWidth: 1,
				borderRadius: 30,
				spacing: 10,
				cutout: 130,
			},
		],
	};

	const [logout, { loading }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

	const handleLogout = async () => {
		try {
			console.log("Logging out...");
			await logout();
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
						src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
						className='w-11 h-11 rounded-full border cursor-pointer'
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
				<div className='flex flex-wrap w-full justify-center items-center gap-6 p-3 border-2 border-gray-700 rounded-3xl bg-white h-2/5'>
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
