import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { selectUser } from "./redux/slices/userSlice";

function App() {
	const user = useAppSelector(selectUser);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={user.token != "" ? <Layout /> : <Login />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
