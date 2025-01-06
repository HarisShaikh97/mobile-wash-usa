import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter, usePathname } from "expo-router"
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
	mode: "web" | "app"
}

export default function JobCard({
	_id,
	title,
	description,
	date,
	address,
	budget,
	status,
	showActionButtons,
	mode
}: JobCardProps): React.ReactElement | null {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<View
			style={[
				styles.cardContainer,
				mode === "app"
					? styles.cardContainerApp
					: styles.cardContainerWeb
			]}
		>
			<View style={styles.jobTitleContainer}>
				<Text
					style={[
						styles.jobTitleText,
						mode === "app"
							? styles.jobTitleTextApp
							: styles.jobTitleTextWeb
					]}
					numberOfLines={2}
					ellipsizeMode="tail"
				>
					{title}
				</Text>
				<Text style={styles.budgetText}>${budget}</Text>
			</View>
			<Text
				style={[
					styles.descriptionText,
					mode === "app"
						? styles.descriptionTextApp
						: styles.descriptionTextWeb
				]}
				numberOfLines={mode === "app" ? 2 : 3}
				ellipsizeMode="tail"
			>
				{description}
			</Text>
			<View
				style={[
					styles.dateAndLocationSection,
					mode === "app"
						? styles.dateAndLocationSectionApp
						: styles.dateAndLocationSectionWeb
				]}
			>
				<Text style={styles.dateAndLocationTitleText}>
					Date And Location
				</Text>
				<View
					style={[
						styles.dateAndLocationDetailsContainer,
						mode === "app"
							? styles.dateAndLocationDetailsContainerApp
							: styles.dateAndLocationDetailsContainerWeb
					]}
				>
					<View style={styles.dateAndLocationTextWrapper}>
						<Image
							source={require("../../assets/icons/date.svg")}
							style={styles.dateAndLocationIcon}
							contentFit="contain"
						/>
						<Text
							style={[
								styles.dateAndLocationDetailsText,
								mode === "app"
									? styles.dateAndLocationDetailsTextApp
									: styles.dateAndLocationDetailsTextWeb
							]}
						>
							{date}
						</Text>
					</View>
					<View
						style={
							mode === "app"
								? styles.circularSeparatorSmall
								: styles.circularSeparatorLarge
						}
					/>
					<View style={styles.dateAndLocationTextWrapper}>
						<Image
							source={require("../../assets/icons/location.svg")}
							style={styles.dateAndLocationIcon}
							contentFit="contain"
						/>
						<Text
							style={[
								styles.dateAndLocationDetailsText,
								mode === "app"
									? styles.dateAndLocationDetailsTextApp
									: styles.dateAndLocationDetailsTextWeb
							]}
						>
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
								mode === "app"
									? styles.actionButtonContainerApp
									: styles.actionButtonContainerWeb,
								styles.inProgressStatusTab
							]}
						>
							<Text
								style={[
									mode === "app"
										? styles.actionButtonsTextApp
										: styles.actionButtonsTextWeb,
									styles.actionButtonsTextDark
								]}
							>
								In Progress
							</Text>
						</View>
					) : status === "incoming" ? (
						<TouchableOpacity
							style={[
								styles.actionButtonContainer,
								mode === "app"
									? styles.actionButtonContainerApp
									: styles.actionButtonContainerWeb,
								styles.buttonLightBlue
							]}
							onPress={() => {
								router.navigate(`/vendor/home/my-jobs/${_id}`)
							}}
						>
							<Text
								style={[
									mode === "app"
										? styles.actionButtonsTextApp
										: styles.actionButtonsTextWeb,
									styles.actionButtonsTextDark
								]}
							>
								View
							</Text>
						</TouchableOpacity>
					) : status === "active" ? (
						<View
							style={[
								styles.actionButtonContainer,
								mode === "app"
									? styles.actionButtonContainerApp
									: styles.actionButtonContainerWeb,
								styles.activeStatusTab
							]}
						>
							<Text
								style={[
									mode === "app"
										? styles.actionButtonsTextApp
										: styles.actionButtonsTextWeb,
									styles.actionButtonsTextDark
								]}
							>
								Active
							</Text>
						</View>
					) : (
						status === "completed" && (
							<View
								style={[
									styles.actionButtonContainer,
									mode === "app"
										? styles.actionButtonContainerApp
										: styles.actionButtonContainerWeb,
									styles.buttonLightBlue
								]}
							>
								<Text
									style={[
										mode === "app"
											? styles.actionButtonsTextApp
											: styles.actionButtonsTextWeb,
										styles.actionButtonsTextDark
									]}
								>
									Completed
								</Text>
							</View>
						)
					)}
					{status === "incoming" ? (
						<TouchableOpacity
							style={[
								styles.actionButtonContainer,
								mode === "app"
									? styles.actionButtonContainerApp
									: styles.actionButtonContainerWeb,
								styles.buttonDarkBlue
							]}
							onPress={() => {
								router.navigate(`/vendor/place-bid/${_id}`)
							}}
						>
							<Text
								style={[
									mode === "app"
										? styles.actionButtonsTextApp
										: styles.actionButtonsTextWeb,
									styles.actionButtonsTextLight
								]}
							>
								Place a bid
							</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={[
								styles.actionButtonContainer,
								mode === "app"
									? styles.actionButtonContainerApp
									: styles.actionButtonContainerWeb,
								styles.buttonDarkBlue
							]}
							onPress={() => {
								if (pathname.includes("/user/")) {
									router.navigate(`/user/home/my-jobs/${_id}`)
								} else {
									router.navigate(
										`/vendor/home/my-jobs/${_id}`
									)
								}
							}}
						>
							<Text
								style={[
									mode === "app"
										? styles.actionButtonsTextApp
										: styles.actionButtonsTextWeb,
									styles.actionButtonsTextLight
								]}
							>
								View Details
							</Text>
						</TouchableOpacity>
					)}
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: "white",
		flexDirection: "column"
	},
	cardContainerApp: {
		flexGrow: 1,
		flexShrink: 1,
		width: "100%",
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		padding: 15,
		gap: 5
	},
	cardContainerWeb: {
		width: "32%",
		borderRadius: 15,
		padding: 25,
		gap: 15
	},
	jobTitleContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between"
	},
	jobTitleText: {
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	jobTitleTextApp: {
		fontSize: 15,
		maxWidth: 150
	},
	jobTitleTextWeb: {
		fontSize: 22.5,
		maxWidth: 250
	},
	budgetText: {
		fontSize: 22.5,
		fontFamily: "Roboto-Bold",
		color: theme.colors.primary
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	descriptionTextApp: {
		maxWidth: 250,
		fontSize: 12
	},
	descriptionTextWeb: {
		maxWidth: 375,
		fontSize: 15
	},
	dateAndLocationSection: {
		flexDirection: "column",
		gap: 7.5,
		marginVertical: 12.5
	},
	dateAndLocationSectionApp: {
		gap: 7.5
	},
	dateAndLocationSectionWeb: {
		gap: 15
	},
	circularSeparatorSmall: {
		height: 3,
		width: 3,
		borderRadius: 1.5,
		backgroundColor: theme.colors.primary
	},
	circularSeparatorLarge: {
		height: 5,
		width: 5,
		borderRadius: 2.5,
		backgroundColor: theme.colors.primary
	},
	dateAndLocationTitleText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	dateAndLocationDetailsContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
	dateAndLocationDetailsContainerApp: {
		gap: 10
	},
	dateAndLocationDetailsContainerWeb: {
		gap: 25
	},
	dateAndLocationTextWrapper: {
		flexDirection: "row",
		gap: 6.5,
		alignItems: "center"
	},
	dateAndLocationDetailsText: {
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	dateAndLocationDetailsTextApp: {
		fontSize: 11.5
	},
	dateAndLocationDetailsTextWeb: {
		fontSize: 13.5
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
		borderRadius: 7.5,
		alignItems: "center",
		justifyContent: "center"
	},
	actionButtonContainerApp: {
		height: 25,
		width: 100
	},
	actionButtonContainerWeb: {
		height: 35,
		width: 135
	},
	inProgressStatusTab: {
		backgroundColor: "rgba(255, 107, 44, 0.1)"
	},
	activeStatusTab: {
		backgroundColor: "rgba(40, 167, 69, 0.1)"
	},
	buttonDarkBlue: {
		backgroundColor: theme.colors.primary
	},
	buttonLightBlue: {
		backgroundColor: "rgba(47, 116, 250, 0.1)"
	},
	actionButtonsTextApp: {
		fontFamily: "Roboto-Medium",
		fontSize: 8.5
	},
	actionButtonsTextWeb: {
		fontFamily: "Roboto-Regular",
		fontSize: 11.5
	},
	actionButtonsTextDark: {
		color: theme.colors.secondary
	},
	actionButtonsTextLight: {
		color: "white"
	}
})
