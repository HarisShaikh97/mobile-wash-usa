import { useState } from "react"
import { View, ScrollView, Text, StyleSheet } from "react-native"
import BackButton from "../../../components/back-button/BackButton"
import SearchBar from "../../../components/search-bar/SearchBar"
import JobCard from "../../../components/job-card/JobCard"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import JobsFilterModal from "../../../components/jobs-filter-modal/JobsFilterModal"
import { theme } from "../../../utils/constants"
import { Job } from "../../../utils/types"

export default function Page(): React.ReactElement | null {
	const [searchValue, setSearchValue] = useState<string>("") // State for search input
	const [openModal, setOpenModal] = useState<boolean>(false) // State for managing modal visibility

	const jobs: Job[] = []

	return (
		// Main scrollable container for the available jobs page
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			{/* Modal component for filtering jobs */}
			<JobsFilterModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				mode="app"
			/>
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
				{/* Main content container */}
				<View style={styles.bodyContainer}>
					{/* Title section */}
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>Available Jobs</Text>
						<Text style={styles.descriptionText}>
							Browse and apply nearby
						</Text>
					</View>
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
					{/* Container for job cards */}
					<View style={styles.jobCardsContainer}>
						{/* Map through jobs array to render individual job cards */}
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
		marginBottom: 25
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
