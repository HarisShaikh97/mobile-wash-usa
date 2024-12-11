import { useState } from "react"
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import JobCard from "../../../../components/job-card/JobCard"
import NotificationButton from "../../../../components/notification-button/NotificationButton"
import ProfileCardWeb from "../../../../components/profile-card-web/ProfileCardWeb"
import SearchBar from "../../../../components/search-bar/SearchBar"
import { theme, WEB_SIDE_NAV_WIDTH } from "../../../../utils/constants"
import { Job } from "../../../../utils/types"

export default function Tab(): React.ReactElement | null {
	const router = useRouter()

	const [searchValue, setSearchValue] = useState<string>("")

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
				<View style={styles.headerContainer}>
					<SearchBar
						placeholder="Search"
						color="#CACACA"
						value={searchValue}
						onChangeText={setSearchValue}
						filterEnabled={false}
						mode="web"
					/>
					<View style={styles.headerItemsWrapper}>
						<ProfileCardWeb />
						<NotificationButton mode="web" />
					</View>
				</View>
				<View style={styles.myJobsTitleBarContainer}>
					<Text style={styles.myJobsTitleText}>My jobs</Text>
					<Text style={styles.myJobsDescriptionText}>
						Your active jobs
					</Text>
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
