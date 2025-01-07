import { useState } from "react"
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import BackButton from "../../../components/back-button/BackButton"
import ProfileCardWeb from "../../../components/profile-card-web/ProfileCardWeb"
import SearchBar from "../../../components/search-bar/SearchBar"
import JobCard from "../../../components/job-card/JobCard"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import JobsFilterModal from "../../../components/jobs-filter-modal/JobsFilterModal"
import { theme } from "../../../utils/constants"
import { Job } from "../../../utils/types"

export default function Page(): React.ReactElement | null {
	const [searchValue, setSearchValue] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)

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
				require("../../../assets/images/background1.png"),
				require("../../../assets/images/background2.png"),
				require("../../../assets/images/background3.png"),
				require("../../../assets/images/background4.png")
			],
			status: "incoming"
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
				require("../../../assets/images/background1.png"),
				require("../../../assets/images/background2.png"),
				require("../../../assets/images/background3.png"),
				require("../../../assets/images/background4.png")
			],
			status: "incoming"
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
				require("../../../assets/images/background1.png"),
				require("../../../assets/images/background2.png"),
				require("../../../assets/images/background3.png"),
				require("../../../assets/images/background4.png")
			],
			status: "incoming"
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
				require("../../../assets/images/background1.png"),
				require("../../../assets/images/background2.png"),
				require("../../../assets/images/background3.png"),
				require("../../../assets/images/background4.png")
			],
			status: "incoming"
		}
	]

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
