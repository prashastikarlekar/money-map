import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import TransactionPage from "./components/pages/TransactionPage";
import NotFound from "./components/pages/NotFound";
import HomePage from "./components/pages/HomePage";
import Header from "./components/ui/Header";

function App() {
	const authUser = true;
	return (
		<>
			{authUser && <Header />}
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/transaction/:id' element={<TransactionPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
