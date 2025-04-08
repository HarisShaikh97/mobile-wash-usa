import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import { useMutation } from "@tanstack/react-query"
import { showToastable } from "react-native-toastable"
import BackButton from "../../../../components/back-button/BackButton"
import FormButton from "../../../../components/form-button/FormButton"
import { postNewJob } from "../../../../helpers/job"
import { RootState } from "../../../../store/store"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter() // Initializing the router instance for navigation

	// Retrieve user's token from Redux store
	const token = useSelector((state: RootState) => state.auth.token)

	// Retrieve new job details from Redux store
	const newJobDetails = useSelector((state: RootState) => state.addJob)

	// Memoized function to handle post new job success
	const handleSuccess = useCallback(
		(data: any): void => {
			console.log(data)

			// Show success toast message
			showToastable({
				message: "Job posted successfully!",
				status: "success"
			})

			router.navigate("/user/add-job/payment-card-details") // Navigating to the payment method selection page
		},
		[router, showToastable]
	)

	// Memoized function to handle post new job error
	const handleError = useCallback(
		(error: any): void => {
			console.log(error)

			// Show error toast message
			showToastable({
				message:
					error?.response?.data?.errors?.messages[0] ||
					"Something went wrong!",
				status: "danger"
			})
		},
		[showToastable]
	)

	// Mutation hook to handle post new job
	const { mutate, isPending } = useMutation({
		mutationFn: postNewJob,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Memoized function to handle form submission
	const handleEditJobNeeds = useCallback((): void => {
		router.navigate("/user/add-job") // Navigating to the job needs page
	}, [router])

	// Memoized function to handle form submission
	const handleEditJobDetails = useCallback((): void => {
		router.navigate("/user/add-job/details") // Navigating to the job details page
	}, [router])

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		// Create a new FormData instance to send data to the server
		const formData = new FormData()

		// Append new job details to the form data
		formData.append("job_title", newJobDetails.jobTitle || "")
		formData.append("job_description", newJobDetails.jobDescription || "")
		formData.append("service_id", `${newJobDetails.jobType?.id || ""}`)
		formData.append("budget", `${newJobDetails.budget || ""}`)
		formData.append("address", newJobDetails.address || "")
		formData.append("location[latitude]", `${newJobDetails.latitude || ""}`)
		formData.append(
			"location[longitude]",
			`${newJobDetails.longitude || ""}`
		)
		formData.append("scheduled_time", newJobDetails.dateTime || "")

		// Append images if they exist
		if (
			newJobDetails.images &&
			newJobDetails.images.assets &&
			newJobDetails.images.assets.length > 0
		) {
			// Process all assets
			for (const asset of newJobDetails.images.assets) {
				// Fetch the blob from the asset's URI
				try {
					// Get the file name and type from the asset
					const fileUri = asset.uri
					const fileName =
						fileUri.split("/").pop() || "profile_image.jpg"
					const fileType = asset.mimeType || "image/jpeg"

					// Append the image to the form data
					formData.append("images[]", {
						uri: fileUri,
						name: fileName,
						type: fileType
					} as any)
				} catch (error) {
					console.error("Error fetching asset:", error)
				}
			}
		}

		// Mutate the updateProfile function with the form data and access token
		mutate({ body: formData, accessToken: token })
	}, [mutate, newJobDetails, token])

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
							{newJobDetails.jobTitle}
						</Text>
						{/* Edit icon for the job detail */}
						<TouchableOpacity onPress={handleEditJobNeeds}>
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
							{newJobDetails.jobType?.name || ""}
						</Text>
						<TouchableOpacity onPress={handleEditJobNeeds}>
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
							{newJobDetails.jobDescription}
						</Text>
						<TouchableOpacity onPress={handleEditJobNeeds}>
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
							${newJobDetails.budget}
						</Text>
						<TouchableOpacity onPress={handleEditJobDetails}>
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
							{newJobDetails.address}
						</Text>
						<TouchableOpacity onPress={handleEditJobDetails}>
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
							{newJobDetails.dateTime}
						</Text>
						<TouchableOpacity onPress={handleEditJobDetails}>
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
					isLoading={isPending}
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
