import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import { useMutation } from "@tanstack/react-query"
import { showToastable } from "react-native-toastable"
import AddJobWebLayout from "../../../../components/add-job-web-layout/AddJobWebLayout"
import FormButton from "../../../../components/form-button/FormButton"
import { useLocation } from "../../../../hooks/useLocation"
import { postNewJob } from "../../../../helpers/job"
import { RootState } from "../../../../store/store"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Initializing the router instance for navigation
	const router = useRouter()

	// Hook to get the location
	const location = useLocation()

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
	const handleSubmit = useCallback(async (): Promise<void> => {
		// Create a new FormData instance to send data to the server
		const formData = new FormData()

		// Append new job details to the form data
		formData.append("job_title", newJobDetails.jobTitle || "")
		formData.append("job_description", newJobDetails.jobDescription || "")
		formData.append("service_id", `${newJobDetails.jobType?.id || ""}`)
		formData.append("budget", `${newJobDetails.budget || ""}`)
		formData.append("address", newJobDetails.address || "")
		formData.append(
			"location[latitude]",
			`${location?.coords.latitude || ""}`
		)
		formData.append(
			"location[longitude]",
			`${location?.coords.longitude || ""}`
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
					const response = await fetch(asset.uri)
					const blob = await response.blob()

					// Create a new File object with the blob and asset's name
					const file = new File(
						[blob],
						asset.fileName || "document",
						{
							type: asset.mimeType || "application/octet-stream",
							lastModified: Date.now()
						}
					)

					// Append the image to the form data
					formData.append("images[]", file, file.name)
				} catch (error) {
					console.error("Error fetching asset:", error)
				}
			}
		}

		// Mutate the updateProfile function with the form data and access token
		mutate({ body: formData, accessToken: token })
	}, [mutate, newJobDetails, token, location])

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
							{newJobDetails.jobTitle}
						</Text>
						{/* Edit icon for the job title */}
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
					{/* FormButton for submitting the form */}
					<View style={styles.formButtonWrapper}>
						<FormButton
							length="full"
							colorTheme="dark"
							isLoading={isPending}
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
