import { useState } from "react"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import BackButton from "../../../../components/back-button/BackButton"
import SearchBar from "../../../../components/search-bar/SearchBar"
import JobCard from "../../../../components/job-card/JobCard"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import { getMyJobs } from "../../../../helpers/job"
import { RootState } from "../../../../store/store"
import { theme } from "../../../../utils/constants"
import { Job } from "../../../../utils/types"

export default function Page(): React.ReactElement | null {
	// State to handle search input
	const [searchValue, setSearchValue] = useState<string>("")

	// Retrieve user's token from Redux store
	const token = useSelector((state: RootState) => state.auth.token)

	// Query to fetch user's jobs using TanStack Query
	const { data: myJobs } = useQuery({
		queryKey: ["my-jobs", token],
		queryFn: () => getMyJobs({ accessToken: token }),
		enabled: !!token
	})

	return (
		// ScrollView for the entire jobs section
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				{/* Header container with back and notification buttons */}
				<View style={styles.headerContainer}>
					<BackButton
						size="small"
						color="#000000"
						backgroundColor="transparent"
						borderColor="#F5F5F5"
					/>
					<NotificationButton theme="dark" mode="app" />
				</View>
				{/* Body container for job titles, search bar, and job cards */}
				<View style={styles.bodyContainer}>
					{/* Title container for the "My Jobs" section */}
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>My Jobs</Text>
						<Text style={styles.descriptionText}>
							Your Active Jobs
						</Text>
					</View>
					{/* Search bar for filtering job listings */}
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
					{/* Container for individual job cards */}
					<View style={styles.jobCardsContainer}>
						{Array.isArray(myJobs) &&
							myJobs.map(
								(job: Job): React.ReactElement | null => {
									return (
										// JobCard component displaying individual job details
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
								}
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
