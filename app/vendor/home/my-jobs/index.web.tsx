import { useState } from "react"
import {
	View,
	ScrollView,
	TouchableOpacity,
	Text,
	StyleSheet
} from "react-native"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import JobCard from "../../../../components/job-card/JobCard"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import ProfileCardWeb from "../../../../components/profile-card-web/ProfileCardWeb"
import SearchBar from "../../../../components/search-bar/SearchBar"
import JobsFilterModal from "../../../../components/jobs-filter-modal/JobsFilterModal"
import { getMyJobs } from "../../../../helpers/job"
import { RootState } from "../../../../store/store"
import { theme, WEB_SIDE_NAV_WIDTH } from "../../../../utils/constants"
import { Job, JobTab } from "../../../../utils/types"

export default function Tab(): React.ReactElement | null {
	// Define base URL
	const BASE_URL = process.env.EXPO_PUBLIC_API_URL

	// Initialize router for navigation
	const router = useRouter()

	// Define tabs
	const tabs: JobTab[] = ["Pending", "Completed", "Cancelled"]

	const [searchValue, setSearchValue] = useState<string>("") // State for search input
	const [openModal, setOpenModal] = useState<boolean>(false) // State for managing the modal visibility
	const [selectedTab, setSelectedTab] = useState<JobTab>(tabs[0]) // State for managing the selected tab

	// Retrieve user data from Redux store
	const user = useSelector((state: RootState) => state.auth.user)

	// Retrieve user's token from Redux store
	const token = useSelector((state: RootState) => state.auth.token)

	// Query to fetch user's jobs using TanStack Query
	const { data: myJobs } = useQuery({
		queryKey: ["my-jobs", token],
		queryFn: () => getMyJobs({ accessToken: token }),
		enabled: !!token
	})

	return (
		// Main scrollable container
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			{/* Jobs filter modal component */}
			<JobsFilterModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				mode="web"
			/>
			{/* Main content container */}
			<View style={styles.scrollContainer}>
				{/* Header section with profile and notification */}
				<View style={styles.headerContainer}>
					{/* Profile card component */}
					<ProfileCardWeb
						imageSource={
							user &&
							user.profile_pic &&
							user.profile_pic.length > 0
								? {
										uri: `${BASE_URL}/storage/${user.profile_pic}`
								  }
								: require("../../../../assets/images/profile.png")
						}
						userName={(user && user.full_name) || ""}
						onPress={() => {
							router.navigate("/vendor/home/profile/preview")
						}}
					/>
					{/* Notification button component */}
					<NotificationButton mode="web" />
				</View>
				{/* Title bar with search functionality */}
				<View style={styles.myJobsTitleBarContainer}>
					<Text style={styles.myJobsTitleText}>My jobs</Text>
					{/* Search bar container */}
					<View style={styles.searchBarWrapper}>
						<SearchBar
							placeholder="Search"
							color="#CACACA"
							backgroundColor="#ffffff"
							borderColor="#F5F5F5"
							value={searchValue}
							onChangeText={setSearchValue}
							filterEnabled={true}
							setOpenFilterModal={setOpenModal}
							mode="app"
						/>
					</View>
				</View>
				{/* Job status tabs section */}
				<View style={styles.tabsWrapper}>
					{tabs.map((tab, index): React.ReactElement | null => {
						return (
							<TouchableOpacity
								style={[
									styles.tabContainer,
									tab === selectedTab
										? styles.selectedTab
										: styles.unSelectedTab
								]}
								onPress={() => {
									setSelectedTab(tab)
								}}
								key={index}
							>
								<Text
									style={[
										styles.tabText,
										tab === selectedTab
											? styles.selectedTabText
											: styles.unSelectedTabText
									]}
								>
									{tab}
								</Text>
							</TouchableOpacity>
						)
					})}
				</View>
				<View style={styles.cardsWrapper}>
					{/* Map and render individual job cards */}
					{Array.isArray(myJobs) &&
						myJobs
							.filter((job) => {
								// Map tab names to job status values
								const statusMap = {
									Pending: "in-progress",
									Completed: "completed",
									Cancelled: "cancelled"
								}
								// Filter jobs based on the selected tab
								return job.status === statusMap[selectedTab]
							})
							.map((job: Job): React.ReactElement | null => {
								return (
									<JobCard
										id={job.id}
										job_title={job.job_title}
										job_description={job.job_description}
										created_at={job.created_at}
										address={job.address}
										budget={job.budget}
										status={job.status}
										showActionButtons
										mode="web"
										key={job.id}
									/>
								)
							})}
					{/* Empty view for grid alignment when 2 cards present */}
					{Array.isArray(myJobs) && myJobs.length % 3 === 2 && (
						<View style={styles.emptyView} />
					)}
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
		alignItems: "center",
		padding: 35,
		gap: 35
	},
	headerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		gap: 10
	},
	cardsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flexWrap: "wrap",
		gap: 20
	},
	emptyView: {
		width: "32%"
	},
	myJobsTitleBarContainer: {
		height: 115,
		width: "100%",
		borderRadius: 15,
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
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
	},
	searchBarWrapper: {
		width: 400
	},
	tabsWrapper: {
		width: 400,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	tabContainer: {
		height: 45,
		width: "32%",
		borderRadius: 8.5,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	selectedTab: {
		backgroundColor: theme.colors.primary,
		borderColor: "transparent"
	},
	unSelectedTab: {
		borderColor: theme.colors.primary
	},
	tabText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Medium"
	},
	selectedTabText: {
		color: "white"
	},
	unSelectedTabText: {
		color: theme.colors.primary
	}
})
