import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
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
	status: Job["status"]
	showActionButtons: boolean
}

export default function JobCard({
	_id,
	title,
	description,
	date,
	address,
	budget,
	status,
	showActionButtons
}: JobCardProps): React.ReactElement | null {
	const router = useRouter()

	return (
		<View style={styles.cardContainer}>
			<View style={styles.jobTitleContainer}>
				<Text
					style={styles.jobTitleText}
					numberOfLines={2}
					ellipsizeMode="tail"
				>
					{title}
				</Text>
				<Text style={styles.budgetText}>${budget}</Text>
			</View>
			<Text
				style={styles.descriptionText}
				numberOfLines={2}
				ellipsizeMode="tail"
			>
				{description}
			</Text>
			<View style={styles.dateAndLocationSection}>
				<Text style={styles.dateAndLocationTitleText}>
					Date And Location
				</Text>
				<View style={styles.dateAndLocationDetailsContainer}>
					<View style={styles.dateAndLocationTextWrapper}>
						<Image
							source={require("../../assets/icons/date.svg")}
							style={styles.dateAndLocationIcon}
							contentFit="contain"
						/>
						<Text style={styles.dateAndLocationDetailsText}>
							{date}
						</Text>
					</View>
					<View style={styles.circularSeparator} />
					<View style={styles.dateAndLocationTextWrapper}>
						<Image
							source={require("../../assets/icons/location.svg")}
							style={styles.dateAndLocationIcon}
							contentFit="contain"
						/>
						<Text style={styles.dateAndLocationDetailsText}>
							{address}
						</Text>
					</View>
				</View>
			</View>
			{showActionButtons && (
				<View style={styles.actionButtonsWrapper}>
					{status === "in-progress" ? (
						<View
							style={[
								styles.actionButtonContainer,
								styles.statusTab
							]}
						>
							<Text
								style={[
									styles.actionButtonsText,
									styles.actionButtonsTextDark
								]}
							>
								In Progress
							</Text>
						</View>
					) : (
						status === "incoming" && (
							<TouchableOpacity
								style={[
									styles.actionButtonContainer,
									styles.buttonLightBlue
								]}
								onPress={() => {
									router.navigate(
										`/vendor/home/my-jobs/${_id}`
									)
								}}
							>
								<Text
									style={[
										styles.actionButtonsText,
										styles.actionButtonsTextDark
									]}
								>
									View
								</Text>
							</TouchableOpacity>
						)
					)}
					{status === "in-progress" ? (
						<TouchableOpacity
							style={[
								styles.actionButtonContainer,
								styles.buttonDarkBlue
							]}
							onPress={() => {
								router.navigate(`/user/home/my-jobs/${_id}`)
							}}
						>
							<Text
								style={[
									styles.actionButtonsText,
									styles.actionButtonsTextLight
								]}
							>
								View Details
							</Text>
						</TouchableOpacity>
					) : (
						status === "incoming" && (
							<TouchableOpacity
								style={[
									styles.actionButtonContainer,
									styles.buttonDarkBlue
								]}
								onPress={() => {
									router.navigate(`/vendor/place-bid/${_id}`)
								}}
							>
								<Text
									style={[
										styles.actionButtonsText,
										styles.actionButtonsTextLight
									]}
								>
									Place a bid
								</Text>
							</TouchableOpacity>
						)
					)}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		width: "100%",
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		backgroundColor: "white",
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
	circularSeparator: {
		height: 3,
		width: 3,
		borderRadius: 1.5,
		backgroundColor: theme.colors.primary
	},
	dateAndLocationTitleText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	dateAndLocationDetailsContainer: {
		flexDirection: "row",
		gap: 10,
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
	buttonDarkBlue: {
		backgroundColor: theme.colors.primary
	},
	buttonLightBlue: {
		backgroundColor: "rgba(47, 116, 250, 0.1)"
	},
	actionButtonsText: {
		fontSize: 8.5,
		fontFamily: "Roboto-Medium"
	},
	actionButtonsTextDark: {
		color: theme.colors.secondary
	},
	actionButtonsTextLight: {
		color: "white"
	}
})
