import { useState } from "react"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import BackButton from "../../../components/back-button/BackButton"
import SearchBar from "../../../components/search-bar/SearchBar"
import JobCard from "../../../components/job-card/JobCard"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import { theme } from "../../../utils/constants"
import { Job } from "../../../utils/types"

export default function Page(): React.ReactElement | null {
	const [searchValue, setSearchValue] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const jobs: Job[] = [
		{
			_id: "1",
			title: "Car Wash Service Needed",
			clientName: "John Doe",
			date: "28, Oct 2024",
			time: "10am to 1pm",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			address: "California, USA",
			location: {
				lat: 36.7783,
				lng: 119.4179
			},
			budget: 500,
			images: [
				require("../../../assets/images/background1.png"),
				require("../../../assets/images/background2.png"),
				require("../../../assets/images/background3.png"),
				require("../../../assets/images/background4.png")
			],
			status: "incoming"
		},
		{
			_id: "2",
			title: "Car Wash Service Needed",
			clientName: "John Doe",
			date: "28, Oct 2024",
			time: "10am to 1pm",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			address: "California, USA",
			location: {
				lat: 36.7783,
				lng: 119.4179
			},
			budget: 500,
			images: [
				require("../../../assets/images/background1.png"),
				require("../../../assets/images/background2.png"),
				require("../../../assets/images/background3.png"),
				require("../../../assets/images/background4.png")
			],
			status: "incoming"
		},
		{
			_id: "3",
			title: "Car Wash Service Needed",
			clientName: "John Doe",
			date: "28, Oct 2024",
			time: "10am to 1pm",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			address: "California, USA",
			location: {
				lat: 36.7783,
				lng: 119.4179
			},
			budget: 500,
			images: [
				require("../../../assets/images/background1.png"),
				require("../../../assets/images/background2.png"),
				require("../../../assets/images/background3.png"),
				require("../../../assets/images/background4.png")
			],
			status: "incoming"
		},
		{
			_id: "4",
			title: "Car Wash Service Needed",
			clientName: "John Doe",
			date: "28, Oct 2024",
			time: "10am to 1pm",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			address: "California, USA",
			location: {
				lat: 36.7783,
				lng: 119.4179
			},
			budget: 500,
			images: [
				require("../../../assets/images/background1.png"),
				require("../../../assets/images/background2.png"),
				require("../../../assets/images/background3.png"),
				require("../../../assets/images/background4.png")
			],
			status: "incoming"
		}
	]

	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<BackButton
						color="#000000"
						backgroundColor="transparent"
						borderColor="#F5F5F5"
					/>
					<NotificationButton theme="dark" />
				</View>
				<View style={styles.bodyContainer}>
					<View style={styles.titleContainer}>
						{fontsLoaded && (
							<Text style={styles.titleText}>Available Jobs</Text>
						)}
						{fontsLoaded && (
							<Text style={styles.descriptionText}>
								Browse and apply nearby
							</Text>
						)}
					</View>
					<SearchBar
						placeholder="Search"
						color="#F5F5F5"
						value={searchValue}
						onChangeText={setSearchValue}
						filterEnabled
						setOpenFilterModal={setOpenModal}
					/>
					<View style={styles.jobCardsContainer}>
						{jobs.map((job: Job): React.ReactElement | null => {
							return (
								<JobCard
									_id={job._id}
									title={job.title}
									description={job.description}
									date={job.date}
									address={job.address}
									budget={job.budget}
									status={job.status}
									key={job._id}
								/>
							)
						})}
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 20
	},
	container: {
		flexDirection: "column"
	},
	headerContainer: {
		width: "100%",
		paddingVertical: 35,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	bodyContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 20,
		marginBottom: 125
	},
	titleContainer: {
		flexDirection: "column",
		alignItems: "center"
	},
	titleText: {
		fontSize: 25,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	descriptionText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	jobCardsContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		marginTop: 10
	}
})
