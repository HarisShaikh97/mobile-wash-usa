import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import ServiceCard from "../../../components/service-card/ServiceCard"
import JobCard from "../../../components/job-card/JobCard"
import NotificationButton from "../../../components/notification-button/NotificationButton"
import ProfileImageBox from "../../../components/profile-image-box/ProfileImageBox"
import { services, theme } from "../../../utils/constants"
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

	return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3F8FE"
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
