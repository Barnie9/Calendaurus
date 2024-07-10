import CalendaurusLogo from "../assets/CalendaurusLogo.svg";
import Button from "../components/Button";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/userSlice";

const Login = () => {
	const { instance } = useMsal();

	const dispatch = useAppDispatch();

	const signIn = async () => {
		try {
			const loginResponse = await instance.loginPopup(loginRequest);

			dispatch(
				setUser({
					name: loginResponse.account.name!,
					email: loginResponse.account.username,
					token: loginResponse.idToken,
				})
			);
		} catch (error) {
			console.error("Login failed: ", error);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-around",
				alignItems: "center",
				height: "100vh",
				width: "100%",
			}}
		>
			<img
				src={CalendaurusLogo}
				alt="Calendaurus Logo"
				style={{
					width: "40%",
				}}
			/>

			<Button
				text="LOGIN"
				textColor="--white"
				backgroundColor="--red-primary"
				hoverBackgroundColor="--red-secondary"
				onClick={signIn}
			/>
		</div>
	);
};

export default Login;
