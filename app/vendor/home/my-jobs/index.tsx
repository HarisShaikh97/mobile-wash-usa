import { useState } from "react"
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import BackButton from "../../../../components/back-button/BackButton"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import SearchBar from "../../../../components/search-bar/SearchBar"
import JobCard from "../../../../components/job-card/JobCard"
import JobsFilterModal from "../../../../components/jobs-filter-modal/JobsFilterModal"
import { getMyJobs } from "../../../../helpers/job"
import { RootState } from "../../../../store/store"
import { theme } from "../../../../utils/constants"
import { Job, JobTab } from "../../../../utils/types"

export default function Page(): React.ReactElement | null {
	// Define tabs
	const tabs: JobTab[] = ["Pending", "Completed", "Cancelled"]

	const [searchValue, setSearchValue] = useState<string>("") // State for search input
	const [openModal, setOpenModal] = useState<boolean>(false) // State for managing the modal visibility
	const [selectedTab, setSelectedTab] = useState<JobTab>(tabs[0]) // State for managing the selected tab

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
				mode="app"
			/>
			{/* Main content container */}
			<View style={styles.container}>
				{/* Header section with back and notification buttons */}
				<View style={styles.headerContainer}>
					<BackButton
						size="small"
						color="#000000"
						backgroundColor="transparent"
						borderColor="#F5F5F5"
					/>
					<NotificationButton theme="dark" mode="app" />
				</View>
				{/* Body section containing main content */}
				<View style={styles.bodyContainer}>
					{/* Page title */}
					<Text style={styles.titleText}>My Jobs</Text>
					{/* Search bar with filter functionality */}
					<SearchBar
						placeholder="Search"
						color="#F5F5F5"
						backgroundColor="#ffffff"
						borderColor="#F5F5F5"
						value={searchValue}
						onChangeText={setSearchValue}
						filterEnabled
						setOpenFilterModal={setOpenModal}
						mode="app"
					/>
					{/* Tab navigation section */}
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
					{/* Jobs list section */}
					<View style={styles.jobCardsWrapper}>
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
											job_description={
												job.job_description
											}
											created_at={job.created_at}
											address={job.address}
											budget={job.budget}
											status={job.status}
											showActionButtons
											mode="app"
											key={job.id}
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
	titleText: {
		fontSize: 25,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	tabsWrapper: {
		width: "100%",
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
	},
	jobCardsWrapper: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		marginTop: 10
	}
})
