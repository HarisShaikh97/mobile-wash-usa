import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { theme } from "../../utils/constants"
import { Job } from "../../utils/types"

// Interface for the props of the component
interface JobCardProps {
	id: Job["id"]
	job_title: Job["job_title"]
	job_description: Job["job_description"]
	created_at: Job["created_at"]
	address: Job["address"]
	budget: Job["budget"]
	status: Job["status"]
	showActionButtons: boolean
	mode: "web" | "app"
}

export default function JobCard({
	id,
	job_title,
	job_description,
	created_at,
	address,
	budget,
	status,
	showActionButtons,
	mode
}: JobCardProps): React.ReactElement | null {
	// Initialize router for navigation
	const router = useRouter()

	// Retrieve user data from Redux store
	const user = useSelector((state: RootState) => state.auth.user)

	return (
		// Main card container with conditional styling for app/web modes
		<View
			style={[
				styles.cardContainer,
				mode === "app"
					? styles.cardContainerApp
					: styles.cardContainerWeb
			]}
		>
			{/* Job title and budget section */}
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
					{job_title}
				</Text>
				<Text style={styles.budgetText}>${budget}</Text>
			</View>
			{/* Job description with mode-specific styling */}
			<Text
				style={[
					styles.descriptionText,
					mode === "app"
						? styles.descriptionTextApp
						: styles.descriptionTextWeb
				]}
				numberOfLines={mode === "app" ? 2 : 1}
				ellipsizeMode="tail"
			>
				{job_description}
			</Text>
			{/* Date and location section */}
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
				{/* Container for date and location details */}
				<View
					style={[
						styles.dateAndLocationDetailsContainer,
						mode === "app"
							? styles.dateAndLocationDetailsContainerApp
							: styles.dateAndLocationDetailsContainerWeb
					]}
				>
					{/* Date display section */}
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
							{created_at.slice(0, 10)}
						</Text>
					</View>
					{/* Circular separator between date and location */}
					<View
						style={
							mode === "app"
								? styles.circularSeparatorSmall
								: styles.circularSeparatorLarge
						}
					/>
					{/* Location display section */}
					<View
						style={[
							styles.dateAndLocationTextWrapper,
							styles.locationTextWrapper
						]}
					>
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
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{address}
						</Text>
					</View>
				</View>
			</View>
			{/* Action buttons section - conditionally rendered */}
			{showActionButtons && (
				<View style={styles.actionButtonsWrapper}>
					{/* Status indicator button */}
					<View
						style={[
							styles.actionButtonContainer,
							mode === "app"
								? styles.actionButtonContainerApp
								: styles.actionButtonContainerWeb,
							status === "in-progress"
								? styles.buttonLightYellow
								: status === "open"
								? styles.buttonLightBlue
								: status === "completed"
								? styles.buttonLightGreen
								: status === "cancelled" &&
								  styles.buttonLightRed
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
							{status === "in-progress"
								? "In Progress"
								: status === "open"
								? "Open"
								: status === "completed"
								? "Completed"
								: status === "cancelled" && "Cancelled"}
						</Text>
					</View>
					{/* View Details button with role-based navigation */}
					<TouchableOpacity
						style={[
							styles.actionButtonContainer,
							mode === "app"
								? styles.actionButtonContainerApp
								: styles.actionButtonContainerWeb,
							styles.buttonDarkBlue
						]}
						onPress={() => {
							if (user && user.role === "customer") {
								router.navigate(`/user/home/my-jobs/${id}`)
							} else if (user && user.role === "vendor") {
								router.navigate(`/vendor/home/my-jobs/${id}`)
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
	locationTextWrapper: {
		flex: 1
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
	buttonLightRed: {
		backgroundColor: "rgba(255, 107, 44, 0.1)"
	},
	buttonLightYellow: {
		backgroundColor: "rgba(251, 186, 29, 0.1)"
	},
	buttonLightGreen: {
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
