import { useState } from "react"
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
	const router = useRouter()

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
				mode="web"
			/>
			<View style={styles.scrollContainer}>
				<View style={styles.headerContainer}>
					<BackButton
						size="large"
						color="#000000"
						backgroundColor="#ffffff"
						borderColor="transparent"
					/>
					<View style={styles.headerCardsWrapper}>
						<ProfileCardWeb
							imageSource={require("../../../assets/images/profile2.png")}
							userName="Michael Guzzi"
							onPress={() => {
								router.navigate("/vendor/home/profile/preview")
							}}
						/>
						<NotificationButton mode="web" />
					</View>
				</View>
				<View style={styles.bodyContainer}>
					<View style={styles.availableJobsTitleBarContainer}>
						<View style={styles.availableJobsTitleWrapper}>
							<Text style={styles.availableJobsTitleText}>
								Available jobs
							</Text>
							<Text style={styles.availableJobsDescriptionText}>
								Browse and apply nearby
							</Text>
						</View>
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
					<View style={styles.cardsWrapper}>
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
