import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import { theme } from "../../utils/constants"
import { Job } from "../../utils/types"

interface JobCardProps {
	_id: Job["_id"]
	title: Job["title"]
	description: Job["description"]
	date: Job["date"]
	address: Job["address"]
	budget: Job["budget"]
}

export default function JobCard({
	_id,
	title,
	description,
	date,
	address,
	budget
}: JobCardProps): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Bold": require("../../assets/fonts/Roboto/Roboto Bold 700.ttf"),
		"Roboto-Medium": require("../../assets/fonts/Roboto/Roboto Medium 500.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	return (
		<View style={styles.cardContainer}>
			<View style={styles.jobTitleContainer}>
				{fontsLoaded && (
					<Text
						style={styles.jobTitleText}
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						{title}
					</Text>
				)}
				{fontsLoaded && (
					<Text style={styles.budgetText}>${budget}</Text>
				)}
			</View>
			{fontsLoaded && (
				<Text
					style={styles.descriptionText}
					numberOfLines={2}
					ellipsizeMode="tail"
				>
					{description}
				</Text>
			)}
			<View style={styles.dateAndLocationSection}>
				{fontsLoaded && (
					<Text style={styles.dateAndLocationTitleText}>
						Date And Location
					</Text>
				)}
				<View style={styles.dateAndLocationDetailsContainer}>
					<View style={styles.dateAndLocationTextWrapper}>
						<Image
							source={require("../../assets/icons/date.svg")}
							style={styles.dateAndLocationIcon}
							contentFit="contain"
						/>
						{fontsLoaded && (
							<Text style={styles.dateAndLocationDetailsText}>
								{date}
							</Text>
						)}
					</View>
					<View style={styles.dateAndLocationTextWrapper}>
						<Image
							source={require("../../assets/icons/location.svg")}
							style={styles.dateAndLocationIcon}
							contentFit="contain"
						/>
						{fontsLoaded && (
							<Text style={styles.dateAndLocationDetailsText}>
								{address}
							</Text>
						)}
					</View>
				</View>
			</View>
			<View style={styles.actionButtonsWrapper}>
				<View style={[styles.actionButtonContainer, styles.statusTab]}>
					{fontsLoaded && (
						<Text
							style={[
								styles.actionButtonsText,
								styles.statusText
							]}
						>
							In Progress
						</Text>
					)}
				</View>
				<TouchableOpacity
					style={[
						styles.actionButtonContainer,
						styles.viewDetailsButton
					]}
					onPress={() => {
						router.navigate(`/home/my-jobs/${_id}`)
					}}
				>
					{fontsLoaded && (
						<Text
							style={[
								styles.actionButtonsText,
								styles.viewDetailsText
							]}
						>
							View Details
						</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		width: "100%",
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		padding: 15,
		flexDirection: "column",
		gap: 5
	},
	jobTitleContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between"
	},
	jobTitleText: {
		fontSize: 15,
		fontFamily: "Montserrat-Bold",
		width: 150,
		color: theme.colors.secondary
	},
	budgetText: {
		fontSize: 22.5,
		fontFamily: "Roboto-Bold",
		color: theme.colors.primary
	},
	descriptionText: {
		width: 250,
		fontSize: 12,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	dateAndLocationSection: {
		flexDirection: "column",
		gap: 7.5,
		marginVertical: 12.5
	},
	dateAndLocationTitleText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	dateAndLocationDetailsContainer: {
		flexDirection: "row",
		gap: 15,
		alignItems: "center"
	},
	dateAndLocationTextWrapper: {
		flexDirection: "row",
		gap: 5,
		alignItems: "center"
	},
	dateAndLocationDetailsText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	dateAndLocationIcon: {
		height: 12.5,
		width: 12.5
	},
	actionButtonsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	actionButtonContainer: {
		height: 25,
		width: 100,
		borderRadius: 7.5,
		alignItems: "center",
		justifyContent: "center"
	},
	statusTab: {
		backgroundColor: "rgba(255, 107, 44, 0.1)"
	},
	viewDetailsButton: {
		backgroundColor: theme.colors.primary
	},
	actionButtonsText: {
		fontSize: 8.5,
		fontFamily: "Roboto-Medium"
	},
	statusText: {
		color: theme.colors.secondary
	},
	viewDetailsText: {
		color: "white"
	}
})
