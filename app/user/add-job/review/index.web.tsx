import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import AddJobWebLayout from "../../../../components/add-job-web-layout/AddJobWebLayout"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	// Memoized function to handle form submission
	const handleSubmit = useCallback(() => {
		router.navigate("/user/add-job/payment-card-details") // Navigating to the payment method selection page
	}, [router])

	return (
		<AddJobWebLayout>
			{/* Main container for the page */}
			<View style={styles.container}>
				{/* Title text for the page */}
				<Text style={styles.titleText}>Review Your Job Posting</Text>
				{/* Container for the job details */}
				<View style={styles.jobDetailsWrapper}>
					{/* Job detail container for the job title */}
					<View style={styles.jobDetailContainer}>
						{/* Text for the job title */}
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							Car Wash At Home
						</Text>
						{/* Edit icon for the job title */}
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
					{/* FormButton for submitting the form */}
					<View style={styles.formButtonWrapper}>
						<FormButton
							length="full"
							colorTheme="dark"
							isLoading={false}
							title="Next"
							onPress={handleSubmit}
						/>
					</View>
				</View>
			</View>
		</AddJobWebLayout>
	)
}

const styles = StyleSheet.create({
	titleText: {
		fontSize: 35,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 35
	},
	jobDetailsWrapper: {
		width: "85%",
		flexDirection: "column",
		alignItems: "center",
		gap: 17.5
	},
	jobDetailContainer: {
		width: "100%",
		paddingHorizontal: 15,
		paddingVertical: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(173, 173, 173, 0.2)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	jobDetailText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		maxWidth: "85%"
	},
	editIcon: {
		height: 20,
		width: 20
	},
	formButtonWrapper: {
		width: "75%"
	}
})
