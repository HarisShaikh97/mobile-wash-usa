import { useCallback } from "react"
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import ServiceCard from "../../../components/service-card/ServiceCard"
import JobCard from "../../../components/job-card/JobCard"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import ProfileImageBox from "../../../components/profile-image-box/ProfileImageBox"
import { getMyJobs } from "../../../helpers/job"
import { RootState } from "../../../store/store"
import { services, theme } from "../../../utils/constants"
import { Job } from "../../../utils/types"

export default function Tab(): React.ReactElement | null {
	// Define base URL
	const BASE_URL = process.env.EXPO_PUBLIC_API_URL

	// Initialize router for navigation
	const router = useRouter()

	// Retrieve user data from Redux store
	const user = useSelector((state: RootState) => state.auth.user)

	// Retrieve user's token from Redux store
	const token = useSelector((state: RootState) => state.auth.token)

	// Query to fetch user's jobs using TanStack Query
	const { data: myJobs } = useQuery({
		queryKey: ["my-jobs", token],
		queryFn: () => getMyJobs({ accessToken: token }),
		enabled: !!token
	})

	// Memoized function to handle profile press
	const handleProfilePress = useCallback((): void => {
		router.navigate("/user/home/profile") // Navigating to the profile page
	}, [router])

	// Memoized function to handle add job press
	const handleAddJobPress = useCallback((): void => {
		router.navigate("/user/add-job") // Navigating to the add job page
	}, [router])

	// Memoized function to handle see all jobs press
	const handleSeeAllJobsPress = useCallback((): void => {
		router.navigate("/user/home/my-jobs") // Navigating to the see all jobs page
	}, [router])

	return (
		// Main ScrollView container for the home screen
		<ScrollView
			style={styles.scrollContainer}
			showsVerticalScrollIndicator={false}
		>
			{/* Main container view */}
			<View style={styles.container}>
				{/* Background image */}
				<Image
					source={require("../../../assets/images/home-screen-bg.png")}
					style={styles.bgImage}
					contentFit="fill"
				/>
				{/* Main content container */}
				<View style={styles.bodyContainer}>
					{/* Header with profile image and notification button */}
					<View style={styles.headerContainer}>
						{/* Profile image button */}
						<TouchableOpacity onPress={handleProfilePress}>
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
								mode="app"
							/>
						</TouchableOpacity>
						{/* Notification button */}
						<NotificationButton theme="light" mode="app" />
					</View>
					{/* Welcome text section */}
					<View style={styles.welcomeTextWrapper}>
						<Text style={styles.welcomeHeadingText}>
							Welcome,{" "}
							{(user && user.full_name.split(" ")[0]) || ""}
						</Text>
						<Text style={styles.welcomeDescriptionText}>
							Find top-rated service providers for your vehicle,
							home, and business
						</Text>
					</View>
					{/* Horizontal scrolling services section */}
					<ScrollView
						style={styles.servicesCardsScrollView}
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						{/* Services cards container */}
						<View style={styles.servicesCardsScrollContainer}>
							{/* Map through services to render ServiceCard components */}
							{services.map(
								(service, index): React.ReactElement | null => {
									return (
										<ServiceCard
											title={service.title}
											image={service.image}
											mode="app"
											key={index}
										/>
									)
								}
							)}
						</View>
					</ScrollView>
					{/* Post job section */}
					<View style={styles.postJobSectionContainer}>
						<Text style={styles.jobTitleText}>Post A Job</Text>
						<Text
							style={[
								styles.jobDescriptionText,
								styles.postJobDescriptionText
							]}
						>
							Quickly post a car wash or maintenance job for
							vendors to apply to.
						</Text>
						{/* Post job button */}
						<TouchableOpacity
							style={styles.postJobButtonContainer}
							onPress={handleAddJobPress}
						>
							<Text style={styles.postJobButtonText}>
								Post a New Job
							</Text>
						</TouchableOpacity>
					</View>
					{/* My jobs section */}
					<View style={styles.myJobsSectionContainer}>
						{/* My jobs header with title and see all button */}
						<View style={styles.myJobsHeaderContainer}>
							<Text style={styles.jobTitleText}>My Jobs</Text>
							<View style={styles.activeJobsTextContainer}>
								<Text style={styles.jobDescriptionText}>
									Your Active Jobs
								</Text>
								{/* See all jobs button */}
								<TouchableOpacity
									onPress={handleSeeAllJobsPress}
								>
									<Text style={styles.seeAllText}>
										See All
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						{/* Container for job cards */}
						<View style={styles.jobCardsContainer}>
							{/* Map through jobs to render JobCard components */}
							{Array.isArray(myJobs) &&
								myJobs
									.slice(0, 3)
									.map(
										(
											job: Job
										): React.ReactElement | null => {
											return (
												<JobCard
													id={job.id}
													job_title={job.job_title}
													job_description={
														job.job_description
													}
													created_at={job.created_at}
													address={job.address}
													budget={job.budget}
													status={job.status}
													showActionButtons
													mode="app"
													key={job.id}
												/>
											)
										}
									)}
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
