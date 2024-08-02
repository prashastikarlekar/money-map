const transactionResolver = {
	Query: {
		transactions: async (_, _, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauthorized");
				const userId = await context.getUser()._id;

				const transactions = await Transaction.find({ userId });
				return transactions;
			} catch (error) {
				console.log("Error getting transactions: ", error);
				throw new Error("Error getting transactions");
			}
		},
		transaction: async (_, { transactionId }) => {
			try {
				const transaction = await Transaction.findById(transactionId);
				return transaction;
			} catch (error) {
				console.log("Error in transaction query: ", error);
				throw new Error(error.message || "Error getting transaction");
			}
		},
		// TODO add category statistics query
	},
	Mutation: {
		createTransaction: async (_, { input }, context) => {
			try {
				const newTransaction = new Transaction({
					...input,
					userId: context.getUser()._id,
				});
				await newTransaction.save();
				return newTransaction;
			} catch (error) {
				console.log("Error in createTransaction: ", error);
				throw new Error(error.message || "Error creating transaction");
			}
		},
		updateTransaction: async (_, { input }) => {
			try {
				const { transactionId, ...updates } = input;
				const updatedTransaction = await Transaction.findByIdAndUpdate(
					transactionId,
					updates,
					{ new: true }
				);
				return updatedTransaction;
			} catch (error) {
				console.log("Error in updateTransaction: ", error);
				throw new Error(error.message || "Error updating transaction");
			}
		},
		deleteTransaction: async (_, { transactionId }) => {
			try {
				const deletedTransaction = await Transaction.findByIdAndDelete(
					transactionId
				);
				return deletedTransaction;
			} catch (error) {
				console.log("Error in deleteTransaction: ", error);
				throw new Error(error.message || "Error deleting transaction");
			}
		},
	},
};
export default transactionResolver;
