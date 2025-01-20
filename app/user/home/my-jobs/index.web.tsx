import { useState } from "react"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import JobCard from "../../../../components/job-card/JobCard"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import ProfileCardWeb from "../../../../components/profile-card-web/ProfileCardWeb"
import SearchBar from "../../../../components/search-bar/SearchBar"
import { theme, WEB_SIDE_NAV_WIDTH } from "../../../../utils/constants"
import { Job } from "../../../../utils/types"

export default function Tab(): React.ReactElement | null {
	// Using useRouter hook to navigate
	const router = useRouter()

	const [searchValue, setSearchValue] = useState<string>("") // State for search input

	const jobs: Job[] = [
		{
			_id: "1",
			title: "Car Wash Service Needed",
			clientName: "John Doe",
			date: "28, Oct 2024",
			time: "10am to 1pm",
			description:
				"Full exterior and interior wash needed for SUV. Preferably before noon Full exterior and interior wash needed for SUV. Preferably before noon.",
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
				"Full exterior and interior wash needed for SUV. Preferably before noon Full exterior and interior wash needed for SUV. Preferably before noon.",
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
				"Full exterior and interior wash needed for SUV. Preferably before noon Full exterior and interior wash needed for SUV. Preferably before noon.",
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
			<View style={styles.scrollContainer}>
				{/* Header section containing the search bar and user profile card */}
				<View style={styles.headerContainer}>
					{/* Search bar component with custom styles and functionality */}
					<SearchBar
						placeholder="Search"
						color="#CACACA"
						backgroundColor="#ffffff"
						borderColor="transparent"
						value={searchValue}
						onChangeText={setSearchValue}
						filterEnabled={false}
						mode="web"
					/>
					{/* Container for user profile and notification button */}
					<View style={styles.headerItemsWrapper}>
						{/* Profile card with user information and navigation action */}
						<ProfileCardWeb
							imageSource={require("../../../../assets/images/profile.png")}
							userName="John Cosby"
							onPress={() => {
								router.navigate("/user/home/profile")
							}}
						/>
						{/* Notification button to alert users to new messages or alerts */}
						<NotificationButton mode="web" />
					</View>
				</View>
				{/* Title bar for the 'My Jobs' section displaying section title and description */}
				<View style={styles.myJobsTitleBarContainer}>
					<Text style={styles.myJobsTitleText}>My jobs</Text>
					<Text style={styles.myJobsDescriptionText}>
						Your active jobs
					</Text>
				</View>
				{/* Container for job cards displaying job details */}
				<View style={styles.cardsWrapper}>
					{/* Mapping through jobs array to render JobCard components for each job */}
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
								mode="web"
								key={job._id}
							/>
						)
					})}
				</View>
				{/* Duplicate container for job cards - consider removing or refactoring if not needed */}
				<View style={styles.cardsWrapper}>
					{/* Mapping through jobs array to render JobCard components for each job */}
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
								mode="web"
								key={job._id}
							/>
						)
					})}
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "#F3F8FE",
		paddingLeft: WEB_SIDE_NAV_WIDTH
	},
	scrollContainer: {
		width: "100%",
		flexDirection: "column",
		padding: 35,
		gap: 20
	},
	headerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	headerItemsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	cardsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		gap: 20
	},
	myJobsTitleBarContainer: {
		height: 115,
		width: "100%",
		borderRadius: 15,
		backgroundColor: "white",
		flexDirection: "column",
		justifyContent: "center",
		paddingHorizontal: 30
	},
	myJobsTitleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	myJobsDescriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Light",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	}
})
