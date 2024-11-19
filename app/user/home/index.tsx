import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import ServiceCard from "../../../components/service-card/ServiceCard"
import JobCard from "../../../components/job-card/JobCard"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import ProfileImageBox from "../../../components/profile-image-box/ProfileImageBox"
import { services, theme } from "../../../utils/constants"
import { Service, Job } from "../../../utils/types"

export default function Tab(): React.ReactElement | null {
	const router = useRouter()

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
			status: "in-progress"
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
			status: "in-progress"
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
			status: "in-progress"
		}
	]

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto 400.ttf"),
		"Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto Medium 500.ttf"),
		"Roboto-Bold": require("../../../assets/fonts/Roboto/Roboto Bold 700.ttf")
	})

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
								router.navigate("/user/home/profile")
							}}
						>
							<ProfileImageBox
								source={require("../../../assets/images/profile.png")}
							/>
						</TouchableOpacity>
						<NotificationButton theme="light" />
					</View>
					<View style={styles.welcomeTextWrapper}>
						{fontsLoaded && (
							<Text style={styles.welcomeHeadingText}>
								Welcome, John
							</Text>
						)}
						{fontsLoaded && (
							<Text style={styles.welcomeDescriptionText}>
								Find top-rated service providers for your
								vehicle, home, and business
							</Text>
						)}
					</View>
					<ScrollView
						style={styles.servicesCardsScrollView}
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View style={styles.servicesCardsScrollContainer}>
							{services.map(
								(service, index): React.ReactElement | null => {
									return (
										<ServiceCard
											title={service.title}
											image={service.image}
											key={index}
										/>
									)
								}
							)}
						</View>
					</ScrollView>
					<View style={styles.postJobSectionContainer}>
						{fontsLoaded && (
							<Text style={styles.jobTitleText}>Post A Job</Text>
						)}
						{fontsLoaded && (
							<Text
								style={[
									styles.jobDescriptionText,
									styles.postJobDescriptionText
								]}
							>
								Quickly post a car wash or maintenance job for
								vendors to apply to.
							</Text>
						)}
						<TouchableOpacity
							style={styles.postJobButtonContainer}
							onPress={() => {
								router.navigate("/user/add-job")
							}}
						>
							{fontsLoaded && (
								<Text style={styles.postJobButtonText}>
									Post a New Job
								</Text>
							)}
						</TouchableOpacity>
					</View>
					<View style={styles.myJobsSectionContainer}>
						<View style={styles.myJobsHeaderContainer}>
							{fontsLoaded && (
								<Text style={styles.jobTitleText}>My Jobs</Text>
							)}
							<View style={styles.activeJobsTextContainer}>
								{fontsLoaded && (
									<Text style={styles.jobDescriptionText}>
										Your Active Jobs
									</Text>
								)}
								<TouchableOpacity
									onPress={() => {
										router.navigate("/user/home/my-jobs")
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
		flexDirection: "column"
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 25
	},
	welcomeTextWrapper: {
		width: "100%",
		flexDirection: "column",
		paddingHorizontal: 25
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
		width: 275
	},
	servicesCardsScrollView: {
		width: "100%",
		marginVertical: 30
	},
	servicesCardsScrollContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingHorizontal: 25
	},
	postJobSectionContainer: {
		flexDirection: "column",
		alignItems: "center",
		marginVertical: 20
	},
	jobTitleText: {
		fontSize: 25,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	jobDescriptionText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	postJobDescriptionText: {
		textAlign: "center",
		width: 265
	},
	postJobButtonContainer: {
		height: 50,
		width: 175,
		borderRadius: 10,
		backgroundColor: theme.colors.primary,
		marginTop: 15,
		alignItems: "center",
		justifyContent: "center"
	},
	postJobButtonText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: "white"
	},
	myJobsSectionContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 35,
		paddingHorizontal: 25,
		marginTop: 50,
		marginBottom: 125
	},
	myJobsHeaderContainer: {
		flexDirection: "column"
	},
	activeJobsTextContainer: {
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
	}
})
