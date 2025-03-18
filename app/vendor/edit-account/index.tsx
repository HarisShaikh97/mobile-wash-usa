import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import { useMutation } from "@tanstack/react-query"
import { showToastable } from "react-native-toastable"
import * as ImagePicker from "expo-image-picker"
import { DocumentPickerResult } from "expo-document-picker"
import Feather from "@expo/vector-icons/Feather"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { updateProfile } from "../../../helpers/profile"
import { RootState } from "../../../store/store"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Define base URL
	const BASE_URL = process.env.EXPO_PUBLIC_API_URL

	// Initializing the router instance for navigation
	const router = useRouter()

	// Retrieve user data from Redux store
	const user = useSelector((state: RootState) => state.auth.user)

	// Retrieve user's token from Redux store
	const token = useSelector((state: RootState) => state.auth.token)

	const [newImage, setNewImage] =
		useState<ImagePicker.ImagePickerResult | null>(null) // State for storing new image
	const [fullName, setFullName] = useState<string>(user?.full_name || "") // State for storing full name
	const [phoneNumber, setPhoneNumber] = useState<string>(
		user?.phone_number || ""
	) // State for storing phone number
	const [email, setEmail] = useState<string>(user?.email || "") // State for storing email
	const [location, setLocation] = useState<string>(user?.address || "") // State for storing location
	const [businessInformation, setBusinessInformation] = useState<string>(
		user?.business_information || ""
	) // State for storing business information
	const [documents, setDocuments] = useState<DocumentPickerResult | null>(
		null
	) // State for storing uploaded documents

	// Memoized function to handle picking an image from the device
	const pickImage = useCallback(async (): Promise<void> => {
		// Requesting permission to access the device's image library
		let result: ImagePicker.ImagePickerResult =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allowing selection of images only
				quality: 1 // Setting image quality to maximum
			})

		// Checking if an image was selected and setting the new image state
		if (!result.canceled) {
			setNewImage(result)
		} else {
			console.log("No image selected or operation canceled!")
		}
	}, [setNewImage, ImagePicker])

	// Memoized function to handle profile update success
	const handleSuccess = useCallback(
		(data: any): void => {
			console.log(data)

			// Show success toast message
			showToastable({
				message: "Verify your email using the OTP sent to your email.",
				status: "success"
			})

			router.navigate("/vendor/email-verification") // Navigating to the email verification page on success
		},
		[router, showToastable]
	)

	// Memoized function to handle profile update error
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

	// Mutation hook to handle profile update
	const { mutate, isPending } = useMutation({
		mutationFn: updateProfile,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Memoized function to handle profile update
	const handleSave = useCallback((): void => {
		// Create a new FormData instance to send data to the server
		const formData = new FormData()

		// Append user's personal information
		formData.append("full_name", fullName)
		formData.append("email", email)
		formData.append("phone_number", phoneNumber)
		formData.append("address", location)
		formData.append("business_information", businessInformation)
		formData.append("_method", "PATCH")

		// Append image if it exists
		if (newImage && newImage.assets && newImage.assets.length > 0) {
			// Get the first asset
			const asset = newImage.assets[0]

			// Fetch the blob from the asset's URI
			try {
				// Get the file name and type from the asset
				const fileUri = asset.uri
				const fileName = fileUri.split("/").pop() || "profile_image.jpg"
				const fileType = asset.mimeType || "image/jpeg"

				// Append the file to the form data
				formData.append("profile_pic", {
					uri: fileUri,
					name: fileName,
					type: fileType
				} as any)
			} catch (error) {
				console.error("Error fetching asset:", error)
			}
		}

		// Append documents if they exist
		if (documents && documents.assets && documents.assets.length > 0) {
			// Fetch each asset and append it to the form data
			documents.assets.forEach((asset, index) => {
				// Get the file name and type from the asset
				const fileUri = asset.uri
				const fileName =
					asset.name ||
					`document_${index}.${
						asset.mimeType?.split("/")[1] || "pdf"
					}`
				const fileType = asset.mimeType || "application/octet-stream"

				// Append the file to the form data
				formData.append("documents[]", {
					uri: fileUri,
					name: fileName,
					type: fileType
				} as any)
			})
		}

		// Mutate the updateProfile function with the form data and access token
		mutate({ data: formData, accessToken: token })
	}, [
		router,
		fullName,
		email,
		phoneNumber,
		location,
		businessInformation,
		newImage,
		documents,
		token,
		mutate
	])

	// Memoized function to handle cancelling the action
	const handleCancel = useCallback((): void => {
		router.back() // Navigating back to the previous page
	}, [router])

	return (
		// Main container for the edit account form
		<View style={styles.container}>
			{/* Profile image section with upload button */}
			<View style={styles.profileImageContainer}>
				<Image
					source={
						newImage?.assets
							? { uri: newImage.assets[0].uri } // Using the selected image URI
							: user &&
							  user.profile_pic &&
							  user.profile_pic.length > 0
							? {
									uri: `${BASE_URL}/storage/${user.profile_pic}`
							  }
							: require("../../../assets/images/profile.png")
					}
					style={styles.profileImage}
					contentFit="cover"
				/>
				{/* Upload button overlay */}
				<TouchableOpacity
					style={styles.uploadButton}
					onPress={pickImage}
				>
					<Feather name="upload" size={12.5} color="white" />
				</TouchableOpacity>
			</View>
			{/* Form container with input fields */}
			<View style={styles.formContainer}>
				{/* Full name input field */}
				<InputField
					length="full"
					type="text"
					value={fullName}
					onChangeText={setFullName}
					title="Full Name"
					placeholder="John Doe"
					secureTextEntry={false}
					multiline={false}
				/>
				{/* Phone number input field */}
				<InputField
					length="full"
					type="text"
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					title="Phone"
					placeholder="+1 333 6656 666"
					secureTextEntry={false}
					multiline={false}
				/>
				{/* Email input field */}
				<InputField
					length="full"
					type="text"
					value={email}
					onChangeText={setEmail}
					title="Email"
					placeholder="johndoe@gmail.com"
					secureTextEntry={false}
					multiline={false}
				/>
				{/* Business information textarea */}
				<InputField
					length="full"
					title="Business Information"
					placeholder="Tell us about your business or the services you provide."
					value={businessInformation}
					onChangeText={setBusinessInformation}
					secureTextEntry={false}
					multiline={true}
					size="small"
					type="text"
				/>
				{/* Document upload section */}
				<View style={styles.documentInputWrapper}>
					<InputField
						length="full"
						title="Upload Documents"
						placeholder="Insurance, Business License, etc."
						files={documents}
						onUploadFile={setDocuments}
						type="file"
					/>
					{/* Document upload description */}
					<View style={styles.documentInputDescriptionTextWrapper}>
						<View style={styles.bulletMarker} />
						<Text style={styles.documentInputDescriptionText}>
							Upload PDF or Image Documents As Proof Of Business
							Verification.
						</Text>
					</View>
				</View>
				{/* Location input field */}
				<InputField
					length="full"
					type="text"
					value={location}
					onChangeText={setLocation}
					title="Location"
					placeholder="California, USA"
					secureTextEntry={false}
					multiline={false}
				/>
			</View>
			{/* Action buttons container */}
			<View style={styles.actionButtonsWrapper}>
				{/* Cancel button */}
				<FormButton
					length="half"
					colorTheme="light"
					isLoading={false}
					title="Cancel"
					onPress={handleCancel}
				/>
				{/* Save button */}
				<FormButton
					length="half"
					colorTheme="dark"
					isLoading={isPending}
					title="Save"
					onPress={handleSave}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 35,
		marginBottom: 25,
		paddingHorizontal: 10
	},
	profileImageContainer: {
		height: 115,
		width: 115,
		alignItems: "center",
		justifyContent: "center",
		position: "relative"
	},
	profileImage: {
		height: "100%",
		width: "100%",
		borderRadius: 13.5,
		overflow: "hidden"
	},
	uploadButton: {
		height: 27.5,
		width: 27.5,
		borderRadius: 3.5,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.tertiary,
		position: "absolute",
		right: -5,
		bottom: -5,
		zIndex: 50
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 15
	},
	documentInputWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 10
	},
	bulletMarker: {
		height: 3.5,
		width: 3.5,
		borderRadius: 2.5,
		backgroundColor: theme.colors.secondary,
		marginTop: 7.5
	},
	documentInputDescriptionTextWrapper: {
		flexDirection: "row",
		gap: 10,
		paddingHorizontal: 25,
		paddingBottom: 5
	},
	documentInputDescriptionText: {
		fontSize: 11.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	actionButtonsWrapper: {
		width: "85%",
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	}
})
