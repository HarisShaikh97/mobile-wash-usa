import { useState } from "react"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import BackButton from "../../../../components/back-button/BackButton"
import SearchBar from "../../../../components/search-bar/SearchBar"
import JobCard from "../../../../components/job-card/JobCard"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import { theme } from "../../../../utils/constants"
import { Job } from "../../../../utils/types"

export default function Page(): React.ReactElement | null {
	const [searchValue, setSearchValue] = useState<string>("")

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
				require("../../../../assets/images/background1.png"),
				require("../../../../assets/images/background2.png"),
				require("../../../../assets/images/background3.png"),
				require("../../../../assets/images/background4.png")
			],
			status: "in-progress"
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
				require("../../../../assets/images/background1.png"),
				require("../../../../assets/images/background2.png"),
				require("../../../../assets/images/background3.png"),
				require("../../../../assets/images/background4.png")
			],
			status: "in-progress"
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
				require("../../../../assets/images/background1.png"),
				require("../../../../assets/images/background2.png"),
				require("../../../../assets/images/background3.png"),
				require("../../../../assets/images/background4.png")
			],
			status: "in-progress"
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
				require("../../../../assets/images/background1.png"),
				require("../../../../assets/images/background2.png"),
				require("../../../../assets/images/background3.png"),
				require("../../../../assets/images/background4.png")
			],
			status: "in-progress"
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
						size="small"
						color="#000000"
						backgroundColor="transparent"
						borderColor="#F5F5F5"
					/>
					<NotificationButton theme="dark" mode="app" />
				</View>
				<View style={styles.bodyContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>My Jobs</Text>
						<Text style={styles.descriptionText}>
							Your Active Jobs
						</Text>
					</View>
					<SearchBar
						placeholder="Search"
						color="#CACACA"
						backgroundColor="#ffffff"
						borderColor="#F5F5F5"
						value={searchValue}
						onChangeText={setSearchValue}
						filterEnabled={false}
						mode="app"
					/>
					<View style={styles.jobCardsContainer}>
						{jobs.map((job): React.ReactElement | null => {
							return (
								<JobCard
									_id={job._id}
									title={job.title}
									description={job.description}
									date={job.date}
									address={job.address}
									budget={job.budget}
									status={job.status}
									showActionButtons
									mode="app"
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
		flexDirection: "column"
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
