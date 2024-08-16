import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
	query GetTransactions {
		transactions {
			_id
			description
			paymentType
			category
			amount
			location
			date
		}
	}
`;

export const GET_TRANSACTION = gql`
	query GetTransaction($id: ID!) {
		transaction(transactionId: $id) {
			_id
			description
			paymentType
			category
			amount
			location
			date
			user {
				_id
				name
				username
				profilePicture
			}
		}
	}
`;

export const GET_TRANSACTION_STATISTICS = gql`
	query GetTransactionStatistics {
		categoryStatistics {
			category
			totalAmount
		}
	}
`;

export const GET_CATEGORY_TRANSACTIONS = gql`
	query GetCategoryTransactions($category: String!) {
		categoryTransactions(category: $category) {
			_id
			description
			paymentType
			category
			amount
			location
			date
		}
	}
`;
