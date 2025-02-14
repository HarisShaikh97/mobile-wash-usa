import { useState, useCallback } from "react"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"
import ProfileCardWeb from "../../../components/profile-card-web/ProfileCardWeb"
import SearchBar from "../../../components/search-bar/SearchBar"
import JobCard from "../../../components/job-card/JobCard"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import JobsFilterModal from "../../../components/jobs-filter-modal/JobsFilterModal"
import { theme } from "../../../utils/constants"
import { Job } from "../../../utils/types"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	const [searchValue, setSearchValue] = useState<string>("") // State for search input
	const [openModal, setOpenModal] = useState<boolean>(false) // State for managing modal visibility

	const jobs: Job[] = []

	// Memoized function to handle profile press
	const handleProfilePress = useCallback((): void => {
		router.navigate("/vendor/home/profile/preview") // Navigating to the profile preview page
	}, [router])

	return (
		// Main scrollable container for the available jobs page
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
			<View style={styles.scrollContainer}>
				{/* Header section with back button and user profile */}
				<View style={styles.headerContainer}>
					{/* Navigation back button */}
					<BackButton
						size="large"
						color="#000000"
						backgroundColor="#ffffff"
						borderColor="transparent"
					/>
					{/* Container for profile and notification components */}
					<View style={styles.headerCardsWrapper}>
						{/* User profile card component */}
						<ProfileCardWeb onPress={handleProfilePress} />
						{/* Notification button component */}
						<NotificationButton mode="web" />
					</View>
				</View>
				{/* Main content container */}
				<View style={styles.bodyContainer}>
					{/* Title bar with search functionality */}
					<View style={styles.availableJobsTitleBarContainer}>
						{/* Title and description section */}
						<View style={styles.availableJobsTitleWrapper}>
							<Text style={styles.availableJobsTitleText}>
								Available jobs
							</Text>
							<Text style={styles.availableJobsDescriptionText}>
								Browse and apply nearby
							</Text>
						</View>
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
					{/* Job cards grid container */}
					<View style={styles.cardsWrapper}>
						{/* Map through jobs array to render job cards */}
						{jobs.map((job): React.ReactElement | null => {
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
						{/* Empty view for grid alignment when needed */}
						{jobs.length % 3 === 2 && (
							<View style={styles.emptyView} />
						)}
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "#F3F8FE"
	},
	scrollContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		padding: 35,
		gap: 65
	},
	headerContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	headerCardsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	bodyContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 25
	},
	availableJobsTitleBarContainer: {
		height: 115,
		width: "100%",
		borderRadius: 15,
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 30
	},
	availableJobsTitleWrapper: {
		flexDirection: "column"
	},
	availableJobsTitleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	availableJobsDescriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Light",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	searchBarWrapper: {
		width: 400
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
	}
})
