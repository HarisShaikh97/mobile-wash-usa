import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import { useMutation } from "@tanstack/react-query"
import { showToastable } from "react-native-toastable"
import * as ImagePicker from "expo-image-picker"
import Feather from "@expo/vector-icons/Feather"
import InputField from "../input-field/InputField"
import FormButton from "../form-button/FormButton"
import { updateProfile } from "../../helpers/profile"
import { RootState } from "../../store/store"
import { theme } from "../../utils/constants"

export default function CustomerEditProfileCardWeb(): React.ReactElement | null {
	// Define base URL
	const BASE_URL = process.env.EXPO_PUBLIC_API_URL

	// Initialize the router instance for navigation
	const router = useRouter()

	// Retrieve user data from Redux store
	const user = useSelector((state: RootState) => state.auth.user)

	// Retrieve user's token from Redux store
	const token = useSelector((state: RootState) => state.auth.token)

	const [newImage, setNewImage] =
		useState<ImagePicker.ImagePickerResult | null>(null) // State to store the selected image URI
	const [fullName, setFullName] = useState<string>(user?.full_name || "") // State to store the full name
	const [phoneNumber, setPhoneNumber] = useState<string>(
		user?.phone_number || ""
	) // State to store the phone number
	const [email, setEmail] = useState<string>(user?.email || "") // State to store the email
	const [location, setLocation] = useState<string>(user?.address || "") // State to store the location

	// Callback function to pick an image from the device's gallery
	const pickImage = useCallback(async (): Promise<void> => {
		// Requesting permission to access the library
		let result: ImagePicker.ImagePickerResult =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allowing selection of images only
				quality: 1 // Setting image quality to maximum
			})

		// If the user picked an image, set the newImage state with the URI of the picked image else log a message
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

			router.navigate("/user/email-verification") // Navigating to the email verification page on success
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
	const handleSave = useCallback(async (): Promise<void> => {
		// Create a new FormData instance to send data to the server
		const formData = new FormData()

		// Append user's personal information
		formData.append("full_name", fullName)
		formData.append("email", email)
		formData.append("phone_number", phoneNumber)
		formData.append("address", location)
		formData.append("_method", "PATCH")

		// Append image if it exists
		if (newImage && newImage.assets && newImage.assets.length > 0) {
			// Get the first asset
			const asset = newImage.assets[0]

			// Fetch the blob from the asset's URI
			try {
				const response = await fetch(asset.uri)
				const blob = await response.blob()

				// Create a new File object with the blob and asset's name
				const file = new File([blob], asset.fileName || "document", {
					type: asset.mimeType || "application/octet-stream",
					lastModified: Date.now()
				})

				// Append the file to the form data
				formData.append("profile_pic", file, file.name)
			} catch (error) {
				console.error("Error fetching asset:", error)
			}
		}

		// Mutate the updateProfile function with the form data and access token
		mutate({ data: formData, accessToken: token })
	}, [
		router,
		fullName,
		email,
		phoneNumber,
		location,
		newImage,
		token,
		mutate
	])

	// Callback function to handle the cancel action
	const handleCancel = useCallback((): void => {
		router.back() // Navigate back
	}, [router])
	return (
		// Main container for the edit profile card
		<View style={styles.container}>
			{/* Profile image section with upload button */}
			<View style={styles.profileImageContainer}>
				{/* Display either the newly selected image or default profile image */}
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
							: require("../../assets/images/profile.png")
					}
					style={styles.profileImage}
					contentFit="cover"
				/>
				{/* Upload button overlay */}
				<TouchableOpacity
					style={styles.uploadButton}
					onPress={pickImage}
				>
					<Feather name="upload" size={13.5} color="white" />
				</TouchableOpacity>
			</View>
			{/* Form container for user information */}
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 675,
		flexShrink: 1,
		alignSelf: "flex-start",
		flexDirection: "row",
		gap: 25,
		borderRadius: 17.5,
		backgroundColor: "white",
		padding: 25
	},
	profileImageContainer: {
		height: 165,
		width: 165,
		alignItems: "center",
		justifyContent: "center",
		position: "relative"
	},
	profileImage: {
		height: "100%",
		width: "100%",
		borderRadius: 12.5,
		overflow: "hidden"
	},
	uploadButton: {
		height: 30,
		width: 30,
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
		flex: 1,
		flexDirection: "column",
		gap: 15,
		padding: 10
	},
	actionButtonsWrapper: {
		width: "75%",
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
		paddingTop: 25,
		marginBottom: 10
	}
})
