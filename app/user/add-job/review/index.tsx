import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import BackButton from "../../../../components/back-button/BackButton"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	// Memoized function to handle form submission
	const handleSubmit = useCallback(() => {
		router.navigate("/user/add-job/select-payment-method") // Navigating to the next page
	}, [router])

	return (
		// Main container for the page
		<View style={styles.container}>
			{/* Header container for the page */}
			<View style={styles.headerContainer}>
				{/* BackButton component for navigation */}
				<BackButton
					size="small"
					color="#000000"
					backgroundColor="transparent"
					borderColor="#F5F5F5"
				/>
				{/* Title text for the page */}
				<Text style={styles.titleText}>Review Your Job Posting</Text>
			</View>
			{/* Body container for the page */}
			<View style={styles.bodyContainer}>
				{/* Wrapper for job details */}
				<View style={styles.jobDetailsWrapper}>
					{/* Container for each job detail */}
					<View style={styles.jobDetailContainer}>
						{/* Text for the job detail */}
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							Car Wash At Home
						</Text>
						{/* Edit icon for the job detail */}
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					{/* Additional job detail containers follow the same structure */}
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							Vehicle
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							Looking for a thorough exterior and interior car
							wash for my SUV.
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							$500
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job/details")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							2972 Westheimer Rd. Santa Ana, Illinois 85486
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job/details")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							October 5, 2024 at 2:00 PM
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job/details")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
				</View>
				{/* FormButton for submitting the form */}
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
					title="Next"
					onPress={handleSubmit}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white"
	},
	headerContainer: {
		padding: 25,
		flexDirection: "column",
		gap: 25
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 215
	},
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 25,
		paddingBottom: 25
	},
	jobDetailsWrapper: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 15
	},
	jobDetailContainer: {
		width: "100%",
		padding: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(173, 173, 173, 0.2)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	jobDetailText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		maxWidth: "85%"
	},
	editIcon: {
		height: 20,
		width: 20
	}
})
