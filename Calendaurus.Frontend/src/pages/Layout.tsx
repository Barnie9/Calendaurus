import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import WeekCalendar from "../components/WeekCalendar";
import Modal from "../components/Modal";
import { useAppSelector } from "../redux/hooks";
import { selectIsOpen } from "../redux/slices/modalSlice";

const Layout = () => {
	const isOpen = useAppSelector(selectIsOpen);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					height: "50px",
					width: "100%",
				}}
			>
				<Navbar />
			</div>

			<div
				style={{
					display: "flex",
				}}
			>
				<div
					style={{
						height: "calc(100vh - 50px)",
						width: "20%",
					}}
				>
					<Sidebar />
				</div>

				<div
					style={{
						height: "calc(100vh - 50px)",
						width: "80%",
					}}
				>
					<WeekCalendar />
				</div>
			</div>

			{isOpen && <Modal />}
		</div>
	);
};

export default Layout;
