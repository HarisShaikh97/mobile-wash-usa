import { useCallback } from "react"
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import ProfileCardWeb from "../../../components/profile-card-web/ProfileCardWeb"
import ProfileImageBox from "../../../components/profile-image-box/ProfileImageBox"
import Ratings from "../../../components/ratings/Ratings"
import JobCard from "../../../components/job-card/JobCard"
import { RootState } from "../../../store/store"
import { theme, WEB_SIDE_NAV_WIDTH } from "../../../utils/constants"
import { Job } from "../../../utils/types"

export default function Tab(): React.ReactElement | null {
	// Define base URL
	const BASE_URL = process.env.EXPO_PUBLIC_API_URL

	// Initialize router for navigation
	const router = useRouter()

	// Retrieve user data from Redux store
	const user = useSelector((state: RootState) => state.auth.user)

	const myJobs: Job[] = []

	// Memoized function to handle profile press
	const handleProfilePress = useCallback((): void => {
		router.navigate("/vendor/home/profile/preview") // Navigating to the profile preview page
	}, [router])

	return (
		// Main scrollable container
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			{/* Content container */}
			<View style={styles.scrollContainer}>
				{/* Header section with profile card and notification button */}
				<View style={styles.headerContainer}>
					<ProfileCardWeb onPress={handleProfilePress} />
					<NotificationButton mode="web" />
				</View>
				{/* Profile section with welcome card and stats */}
				<View
					style={[
						styles.cardsHorizontalWrapper,
						styles.profileSection
					]}
				>
					{/* Welcome card with profile image and message */}
					<ImageBackground
						source={require("../../../assets/images/welcome-card-bg.png")}
						style={styles.welcomeCardContainer}
						contentFit="fill"
					>
						<ProfileImageBox
							source={
								user &&
								user.profile_pic &&
								user.profile_pic.length > 0
									? {
											uri: `${BASE_URL}/storage/${user.profile_pic}`
									  }
									: require("../../../assets/images/profile.png")
							}
							mode="web"
						/>
						<Text style={styles.welcomeHeadingText}>
							Welcome,{" "}
							{(user && user.full_name.split(" ")[0]) || ""}
						</Text>
						<Text style={styles.welcomeDescriptionText}>
							Browse available jobs and offer your top-notch
							services to customers in need.
						</Text>
					</ImageBackground>
					{/* Right side cards container */}
					<View style={styles.cardsVerticalWrapper}>
						{/* Ratings card */}
						<ImageBackground
							source={require("../../../assets/images/card-bg.png")}
							style={styles.ratingsCardContainer}
							contentFit="fill"
						>
							<Text style={styles.ratingsHeadingText}>
								Overall Rating
							</Text>
							<Text style={styles.ratingsValueText}>4.5</Text>
							<Ratings ratings={4.5} size={30} />
							<Text style={styles.ratingsDescriptionText}>
								Base on 135 Reviews
							</Text>
						</ImageBackground>
						{/* Stats cards container */}
						<View style={styles.cardsHorizontalWrapper}>
							{/* Earnings stats card */}
							<ImageBackground
								source={require("../../../assets/images/card-bg.png")}
								style={styles.statsCardContainer}
								contentFit="cover"
							>
								<Text style={styles.statsTitleText}>
									Total Earnings
								</Text>
								<Text style={styles.statsValueText}>
									$ 450,750
								</Text>
							</ImageBackground>
							{/* Jobs completed stats card */}
							<ImageBackground
								source={require("../../../assets/images/card-bg.png")}
								style={styles.statsCardContainer}
								contentFit="cover"
							>
								<Text style={styles.statsTitleText}>
									Jobs Completed
								</Text>
								<Text style={styles.statsValueText}>+15</Text>
							</ImageBackground>
						</View>
					</View>
				</View>
				{/* Available jobs section header */}
				<View style={styles.availableJobsTitleBarContainer}>
					<Text style={styles.availableJobsTitleText}>
						Available jobs
					</Text>
					<TouchableOpacity
						onPress={() => {
							router.navigate("/vendor/available-jobs")
						}}
					>
						<Text style={styles.seeAllText}>See all</Text>
					</TouchableOpacity>
				</View>
				{/* Jobs list container */}
				<View style={styles.cardsHorizontalWrapper}>
					{/* Map and render individual job cards */}
					{Array.isArray(myJobs) &&
						myJobs
							.slice(0, 3)
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
		padding: 35,
		gap: 20
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		alignSelf: "flex-end"
	},
	profileSection: {
		marginVertical: 20
	},
	cardsHorizontalWrapper: {
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
	cardsVerticalWrapper: {
		height: 325,
		flexDirection: "column",
		gap: 15
	},
	welcomeCardContainer: {
		flexGrow: 1,
		height: 325,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 12.5,
		backgroundColor: theme.colors.primary,
		borderRadius: 25,
		overflow: "hidden"
	},
	welcomeHeadingText: {
		fontSize: 42.5,
		fontFamily: "Montserrat-Bold",
		color: "white",
		textTransform: "capitalize"
	},
	welcomeDescriptionText: {
		fontSize: 17.5,
		fontFamily: "Roboto-Light",
		color: "white",
		width: 415,
		textAlign: "center"
	},
	ratingsCardContainer: {
		flex: 1,
		width: 385,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		backgroundColor: "white",
		borderRadius: 25,
		overflow: "hidden"
	},
	ratingsHeadingText: {
		fontSize: 16.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	ratingsValueText: {
		fontSize: 85,
		fontFamily: "Roboto-Bold",
		color: theme.colors.secondary,
		lineHeight: 75
	},
	ratingsDescriptionText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	statsCardContainer: {
		flex: 1,
		height: 85,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
		backgroundColor: "white",
		borderRadius: 25,
		overflow: "hidden"
	},
	statsTitleText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	statsValueText: {
		fontSize: 18.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
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
	availableJobsTitleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	seeAllText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	}
})
