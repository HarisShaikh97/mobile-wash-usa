import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import ProfileImageBox from "../../../components/profile-image-box/ProfileImageBox"
import Ratings from "../../../components/ratings/Ratings"
import JobCard from "../../../components/job-card/JobCard"
import { theme } from "../../../utils/constants"
import { Job } from "../../../utils/types"

export default function Tab(): React.ReactElement | null {
	const router = useRouter()

	const jobs: Job[] = []

	return (
		<ScrollView
			style={styles.scrollContainer}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				<Image
					source={require("../../../assets/images/home-screen-bg.png")}
					style={styles.bgImage}
					contentFit="fill"
				/>
				<View style={styles.bodyContainer}>
					<View style={styles.headerContainer}>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/vendor/home/profile")
							}}
						>
							<ProfileImageBox
								source={require("../../../assets/images/vendor-profile.png")}
								mode="app"
							/>
						</TouchableOpacity>
						<NotificationButton theme="light" mode="app" />
					</View>
					<View style={styles.welcomeTextWrapper}>
						<Text style={styles.welcomeHeadingText}>
							Welcome, Michael
						</Text>
						<Text style={styles.welcomeDescriptionText}>
							Browse available jobs and offer your top- notch
							services to customers in need.
						</Text>
					</View>
					<View style={styles.statsSectionWrapper}>
						<View style={styles.verticalWrapper}>
							<ImageBackground
								source={require("../../../assets/images/card-bg.png")}
								style={styles.statsCardContainer}
								contentFit="fill"
							>
								<Text style={styles.statsCardTitleText}>
									Total Earnings
								</Text>
								<Text style={styles.statsCardValueText}>
									$ 450,750
								</Text>
							</ImageBackground>
							<ImageBackground
								source={require("../../../assets/images/card-bg.png")}
								style={styles.statsCardContainer}
								contentFit="fill"
							>
								<Text style={styles.statsCardTitleText}>
									Jobs Completed
								</Text>
								<Text style={styles.statsCardValueText}>
									+15
								</Text>
							</ImageBackground>
						</View>
						<ImageBackground
							source={require("../../../assets/images/card-bg.png")}
							style={styles.statsCardContainer}
							contentFit="fill"
						>
							<Text style={styles.statsCardTitleText}>
								Overall Rating
							</Text>
							<Text style={styles.statsCardRatingValueText}>
								4.5
							</Text>
							<Ratings ratings={4.5} size={22.5} />
							<Text style={styles.statsCardDescriptionText}>
								Base on 135 Reviews
							</Text>
						</ImageBackground>
					</View>
					<View style={styles.availableJobsSectionContainer}>
						<View style={styles.availableJobsHeaderContainer}>
							<View style={styles.availableJobsTextContainer}>
								<Text style={styles.jobTitleText}>
									Available Jobs
								</Text>
								<TouchableOpacity
									onPress={() => {
										router.navigate(
											"/vendor/available-jobs"
										)
									}}
								>
									<Text style={styles.seeAllText}>
										See All
									</Text>
								</TouchableOpacity>
							</View>
						</View>
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
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		width: "100%",
		position: "relative"
	},
	bgImage: {
		height: 300,
		width: "100%",
		position: "absolute",
		top: 0,
		left: 0
	},
	bodyContainer: {
		width: "100%",
		zIndex: 10,
		flexDirection: "column",
		paddingHorizontal: 25
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 25
	},
	welcomeTextWrapper: {
		width: "100%",
		flexDirection: "column"
	},
	welcomeHeadingText: {
		fontSize: 30,
		fontFamily: "Montserrat-Bold",
		color: "white"
	},
	welcomeDescriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: "white",
		width: 300
	},
	statsSectionWrapper: {
		height: 175,
		width: "100%",
		flexDirection: "row",
		gap: 7.5,
		marginVertical: 15
	},
	verticalWrapper: {
		flex: 1,
		flexDirection: "column",
		gap: 7.5
	},
	statsCardContainer: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		borderRadius: 17.5,
		borderWidth: 1,
		borderColor: "rgba(47, 116, 250, 0.2)",
		alignItems: "center",
		justifyContent: "center",
		gap: 5
	},
	statsCardTitleText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		lineHeight: 15
	},
	statsCardValueText: {
		fontSize: 18.5,
		fontFamily: "Roboto-Bold",
		color: theme.colors.secondary,
		lineHeight: 20
	},
	statsCardRatingValueText: {
		fontSize: 45,
		fontFamily: "Roboto-Bold",
		color: theme.colors.secondary,
		lineHeight: 50
	},
	statsCardDescriptionText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		lineHeight: 15
	},
	availableJobsSectionContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 35,
		marginTop: 50,
		marginBottom: 125
	},
	availableJobsHeaderContainer: {
		flexDirection: "column"
	},
	availableJobsTextContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	seeAllText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Bold",
		color: theme.colors.secondary
	},
	jobCardsContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 10
	},
	jobTitleText: {
		fontSize: 25,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	}
})
