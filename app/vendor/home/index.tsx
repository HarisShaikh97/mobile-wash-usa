import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image, ImageBackground } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import ProfileImageBox from "../../../components/profile-image-box/ProfileImageBox"
import Ratings from "../../../components/ratings/Ratings"
import JobCard from "../../../components/job-card/JobCard"
import { theme } from "../../../utils/constants"
import { Job } from "../../../utils/types"

export default function Tab(): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto 400.ttf"),
		"Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto Medium 500.ttf"),
		"Roboto-Bold": require("../../../assets/fonts/Roboto/Roboto Bold 700.ttf")
	})

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
		}
	]

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
							/>
						</TouchableOpacity>
						<NotificationButton theme="light" />
					</View>
					<View style={styles.welcomeTextWrapper}>
						{fontsLoaded && (
							<Text style={styles.welcomeHeadingText}>
								Welcome, Michael
							</Text>
						)}
						{fontsLoaded && (
							<Text style={styles.welcomeDescriptionText}>
								Browse available jobs and offer your top- notch
								services to customers in need.
							</Text>
						)}
					</View>
					<View style={styles.statsSectionWrapper}>
						<View style={styles.verticalWrapper}>
							<ImageBackground
								source={require("../../../assets/images/card-bg.png")}
								style={styles.statsCardContainer}
								contentFit="fill"
							>
								{fontsLoaded && (
									<Text style={styles.statsCardTitleText}>
										Total Earnings
									</Text>
								)}
								{fontsLoaded && (
									<Text style={styles.statsCardValueText}>
										$ 450,750
									</Text>
								)}
							</ImageBackground>
							<ImageBackground
								source={require("../../../assets/images/card-bg.png")}
								style={styles.statsCardContainer}
								contentFit="fill"
							>
								{fontsLoaded && (
									<Text style={styles.statsCardTitleText}>
										Jobs Completed
									</Text>
								)}
								{fontsLoaded && (
									<Text style={styles.statsCardValueText}>
										+15
									</Text>
								)}
							</ImageBackground>
						</View>
						<ImageBackground
							source={require("../../../assets/images/card-bg.png")}
							style={styles.statsCardContainer}
							contentFit="fill"
						>
							{fontsLoaded && (
								<Text style={styles.statsCardTitleText}>
									Overall Rating
								</Text>
							)}
							{fontsLoaded && (
								<Text style={styles.statsCardRatingValueText}>
									4.5
								</Text>
							)}
							<Ratings ratings={4.5} size={22.5} />
							{fontsLoaded && (
								<Text style={styles.statsCardDescriptionText}>
									Base on 135 Reviews
								</Text>
							)}
						</ImageBackground>
					</View>
					<View style={styles.availableJobsSectionContainer}>
						<View style={styles.availableJobsHeaderContainer}>
							<View style={styles.availableJobsTextContainer}>
								{fontsLoaded && (
									<Text style={styles.jobTitleText}>
										Available Jobs
									</Text>
								)}
								<TouchableOpacity
									onPress={() => {
										router.navigate(
											"/vendor/available-jobs"
										)
									}}
								>
									{fontsLoaded && (
										<Text style={styles.seeAllText}>
											See All
										</Text>
									)}
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.jobCardsContainer}>
							{jobs.map((job: Job): React.ReactElement | null => {
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
										key={job._id}
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
		left: 0,
		zIndex: -10
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
