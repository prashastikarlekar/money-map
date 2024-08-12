import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";

const categoryColorMap = {
	// saving: "from-green-700 to-green-400",
	// expense: "from-pink-800 to-pink-600",
	// investment: "from-blue-700 to-blue-400",
	saving: "from-[#179f4b] to-[#bfedd0]",
	expense: "from-[#e9aa2b] to-[#f9e2b1]",
	investment: "from-[#4eb6eb] to-[#cbe2fd]",
	// Add more categories and corresponding color classes as needed
};

const Card = ({ transaction }) => {
	let { category, amount, location, date, paymentType, description } =
		transaction;

	description =
		description[0]?.toUpperCase() + description.slice(1) || "No description";
	const cardClass = categoryColorMap[category];
	category = category[0]?.toUpperCase() + category.slice(1) || "No category";
	paymentType =
		paymentType[0]?.toUpperCase() + paymentType.slice(1) || "No type";
	const formattedDate = formatDate(date);

	const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
		refetchQueries: ["GetTransactions"],
	});

	const handleDelete = async () => {
		try {
			await deleteTransaction({
				variables: { transactionId: transaction._id },
			});
			toast.success("Transaction deleted successfully.");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-[#f5f4f1]'>{category}</h2>
					<div className='flex items-center gap-2'>
						{!loading && (
							<FaTrash
								className={"cursor-pointer text-[#f5f4f1]"}
								onClick={handleDelete}
							/>
						)}
						{loading && (
							<div className='w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin'></div>
						)}
						<Link to={`/transaction/${transaction._id}`}>
							<HiPencilAlt
								className='cursor-pointer text-[#f5f4f1]'
								size={20}
							/>
						</Link>
					</div>
				</div>
				<p className='text-[#f5f4f1] flex items-center gap-1 text-lg font-semibold'>
					<BsCardText />
					&nbsp; Description: &nbsp;
					<span className='font-normal'>{description}</span>
				</p>
				<p className='text-[#f5f4f1] flex items-center gap-1 text-lg font-semibold'>
					<MdOutlinePayments />
					&nbsp; Payment Type:&nbsp;
					<span className='font-normal'> {paymentType}</span>
				</p>
				<p className='text-[#f5f4f1] flex items-center gap-1 text-lg font-semibold'>
					<FaSackDollar />
					&nbsp; Amount: &nbsp;
					<span className='font-normal'>${amount}</span>
				</p>
				<p className='text-[#f5f4f1] flex items-center gap-1 text-lg font-semibold'>
					<FaLocationDot />
					&nbsp; Location: &nbsp;
					<span className='font-normal'>{location || "N/A"}</span>
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-[#f5f4f1] font-bold'>{formattedDate}</p>
					<img
						src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;
