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
	const [searchValue, setSearchValue] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)

	const jobs: Job[] = []

	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<JobsFilterModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				mode="app"
			/>
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
						<Text style={styles.titleText}>Available Jobs</Text>
						<Text style={styles.descriptionText}>
							Browse and apply nearby
						</Text>
					</View>
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
					<View style={styles.jobCardsContainer}>
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
