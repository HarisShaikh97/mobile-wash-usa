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
import ProfileCardWeb from "../../../components/profile-card-web/ProfileCardWeb"
import ProfileImageBox from "../../../components/profile-image-box/ProfileImageBox"
import Ratings from "../../../components/ratings/Ratings"
import JobCard from "../../../components/job-card/JobCard"
import { theme, WEB_SIDE_NAV_WIDTH } from "../../../utils/constants"
import { Job } from "../../../utils/types"

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
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.scrollContainer}>
				<View style={styles.headerContainer}>
					<ProfileCardWeb
						imageSource={require("../../../assets/images/profile2.png")}
						userName="Michael Guzzi"
					/>
					<NotificationButton mode="web" />
				</View>
				<View
					style={[
						styles.cardsHorizontalWrapper,
						styles.profileSection
					]}
				>
					<ImageBackground
						source={require("../../../assets/images/welcome-card-bg.png")}
						style={styles.welcomeCardContainer}
						contentFit="fill"
					>
						<ProfileImageBox
							source={require("../../../assets/images/profile2.png")}
							mode="web"
						/>
						<Text style={styles.welcomeHeadingText}>
							Welcome, Michael
						</Text>
						<Text style={styles.welcomeDescriptionText}>
							Browse available jobs and offer your top-notch
							services to customers in need.
						</Text>
					</ImageBackground>
					<View style={styles.cardsVerticalWrapper}>
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
						<View style={styles.cardsHorizontalWrapper}>
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
				<View style={styles.availableJobsTitleBarContainer}>
					<Text style={styles.availableJobsTitleText}>
						Available jobs
					</Text>
					<TouchableOpacity
						onPress={() => {
							router.navigate("/vendor/home/my-jobs")
						}}
					>
						<Text style={styles.seeAllText}>See all</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.cardsHorizontalWrapper}>
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
		gap: 15
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
