import { useState } from "react"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import JobCard from "../../../../components/job-card/JobCard"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import ProfileCardWeb from "../../../../components/profile-card-web/ProfileCardWeb"
import SearchBar from "../../../../components/search-bar/SearchBar"
import { getMyJobs } from "../../../../helpers/job"
import { RootState } from "../../../../store/store"
import { theme, WEB_SIDE_NAV_WIDTH } from "../../../../utils/constants"
import { Job } from "../../../../utils/types"

export default function Tab(): React.ReactElement | null {
	// Using useRouter hook to navigate
	const router = useRouter()

	const [searchValue, setSearchValue] = useState<string>("") // State for search input

	// Retrieve user's token from Redux store
	const token = useSelector((state: RootState) => state.auth.token)

	// Query to fetch user's jobs using TanStack Query
	const { data: myJobs } = useQuery({
		queryKey: ["my-jobs", token],
		queryFn: () => getMyJobs({ accessToken: token }),
		enabled: !!token
	})

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
					{/* Map and render individual job cards */}
					{Array.isArray(myJobs) &&
						myJobs.map((job: Job): React.ReactElement | null => {
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
