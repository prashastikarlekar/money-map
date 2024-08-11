import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import TransactionPage from "./components/pages/TransactionPage";
import NotFound from "./components/pages/NotFound";
import HomePage from "./components/pages/HomePage";
import Header from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";
import React from "react";

function App() {
	const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
	// console.log("Authenticated user: ", data);

	if (loading) return null;
	return (
		<>
			{data?.authUser && <Header />}

			<Routes>
				<Route
					path='/'
					element={data.authUser ? <HomePage /> : <Navigate to='/login' />}
				/>
				<Route
					path='/login'
					element={!data.authUser ? <LoginPage /> : <Navigate to='/' />}
				/>
				<Route
					path='/signup'
					element={!data.authUser ? <SignUpPage /> : <Navigate to='/' />}
				/>
				<Route
					path='/transaction/:id'
					element={
						data.authUser ? <TransactionPage /> : <Navigate to='/login' />
					}
				/>
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
