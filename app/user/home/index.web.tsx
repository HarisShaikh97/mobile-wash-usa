import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { useRouter } from "expo-router"
import ServiceCard from "../../../components/service-card/ServiceCard"
import JobCard from "../../../components/job-card/JobCard"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import ProfileCardWeb from "../../../components/profile-card-web/ProfileCardWeb"
import ProfileImageBox from "../../../components/profile-image-box/ProfileImageBox"
import { services, theme, WEB_SIDE_NAV_WIDTH } from "../../../utils/constants"
import { Job } from "../../../utils/types"

export default function Tab(): React.ReactElement | null {
	// Initialize router for navigation
	const router = useRouter()

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
				"Full exterior and interior wash needed for SUV. Preferably before noon Full exterior and interior wash needed for SUV. Preferably before noon.",
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
				"Full exterior and interior wash needed for SUV. Preferably before noon Full exterior and interior wash needed for SUV. Preferably before noon.",
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

	return (
		// Main ScrollView container with side nav offset and custom background
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			{/* Primary content container with consistent padding and column layout */}
			<View style={styles.scrollContainer}>
				{/* Header section containing profile and notifications */}
				<View style={styles.headerContainer}>
					{/* Profile card showing user avatar and name, links to profile */}
					<ProfileCardWeb
						imageSource={require("../../../assets/images/profile.png")}
						userName="John Cosby"
						onPress={() => {
							router.navigate("/user/home/profile")
						}}
					/>
					{/* Web-styled notification button */}
					<NotificationButton mode="web" />
				</View>

				{/* Featured cards section with welcome and post job cards */}
				<View style={styles.cardsWrapper}>
					{/* Welcome card with background image and centered content */}
					<ImageBackground
						source={require("../../../assets/images/welcome-card-bg.png")}
						style={styles.welcomeCardContainer}
						contentFit="fill"
					>
						{/* Prominent user profile image display */}
						<ProfileImageBox
							source={require("../../../assets/images/profile.png")}
							mode="web"
						/>
						{/* Large personalized welcome heading */}
						<Text style={styles.welcomeHeadingText}>
							Welcome, John
						</Text>
						{/* Service description text */}
						<Text style={styles.welcomeDescriptionText}>
							Find top-rated service providers for your vehicle,
							home, and business
						</Text>
					</ImageBackground>

					{/* Post Job card with action button */}
					<View style={styles.postJobCardContainer}>
						{/* Card title text */}
						<Text style={styles.postJobHeadingText}>
							Post a job
						</Text>
						{/* Job posting process description */}
						<Text style={styles.postJobDescriptionText}>
							Quickly post a car wash or maintenance job for
							vendors to apply to.
						</Text>
						{/* Primary CTA button for job creation */}
						<TouchableOpacity
							style={styles.postJobButtonContainer}
							onPress={() => {
								router.navigate("/user/add-job")
							}}
						>
							<Text style={styles.postJobButtonText}>
								Post a New Job
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Services grid showing available service categories */}
				<View style={styles.cardsWrapper}>
					{services.map(
						(service, index): React.ReactElement | null => {
							return (
								<ServiceCard
									title={service.title}
									image={service.image}
									mode="web"
									key={index}
								/>
							)
						}
					)}
				</View>

				{/* My Jobs section header with title and See all link */}
				<View style={styles.myJobsTitleBarContainer}>
					<View style={styles.myJobsTitleWrapper}>
						{/* Section title */}
						<Text style={styles.myJobsTitleText}>My jobs</Text>
						{/* Section subtitle */}
						<Text style={styles.myJobsDescriptionText}>
							Your active jobs
						</Text>
					</View>
					{/* Link to full jobs list */}
					<TouchableOpacity
						onPress={() => {
							router.navigate("/user/home/my-jobs")
						}}
					>
						<Text style={styles.seeAllText}>See all</Text>
					</TouchableOpacity>
				</View>

				{/* Jobs grid with 3-column layout */}
				<View style={styles.cardsWrapper}>
					{/* Map and render individual job cards */}
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
					{/* Empty view for grid alignment when 2 cards present */}
					{jobs.length % 3 === 2 && <View style={styles.emptyView} />}
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
	postJobCardContainer: {
		height: 325,
		width: 400,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		backgroundColor: "white",
		borderRadius: 25,
		paddingHorizontal: 35
	},
	postJobHeadingText: {
		fontSize: 35,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	postJobDescriptionText: {
		fontSize: 17.5,
		fontFamily: "Roboto-Light",
		color: theme.colors.secondary,
		textAlign: "center"
	},
	postJobButtonContainer: {
		height: 57.5,
		width: 200,
		borderRadius: 11,
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
	myJobsTitleBarContainer: {
		height: 115,
		width: "100%",
		borderRadius: 15,
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 30
	},
	myJobsTitleWrapper: {
		flexDirection: "column"
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
	},
	seeAllText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		textTransform: "capitalize"
	}
})
