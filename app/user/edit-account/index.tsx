import { useState, useCallback } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import { useMutation } from "@tanstack/react-query"
import { showToastable } from "react-native-toastable"
import * as ImagePicker from "expo-image-picker"
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
		useState<ImagePicker.ImagePickerResult | null>(null) // State for managing the new image selected by the user
	const [fullName, setFullName] = useState<string>(user?.full_name || "") // State for managing the user's full name
	const [phoneNumber, setPhoneNumber] = useState<string>(
		user?.phone_number || ""
	) // State for managing the user's phone number
	const [email, setEmail] = useState<string>(user?.email || "") // State for managing the user's email
	const [location, setLocation] = useState<string>(user?.address || "") // State for managing the user's location

	// Memoized function to handle image selection
	const pickImage = useCallback(async (): Promise<void> => {
		// Launching the image library to select an image
		let result: ImagePicker.ImagePickerResult =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allowing selection of images only
				quality: 1 // Setting image quality to maximum
			})

		// Checking if an image was selected and not canceled
		if (!result.canceled) {
			setNewImage(result) // Setting the new image URI to the state
		} else {
			console.log("No image selected or operation canceled!") // Logging a message if no image is selected or the operation is canceled
		}
	}, [setNewImage])

	// Memoized function to handle profile update success
	const handleSuccess = useCallback(
		(data: any) => {
			console.log(data)

			// Show success toast message
			showToastable({
				message: "Verify your email using the OTP sent to your email.",
				status: "success"
			})

			router.navigate("/user/email-verification") // Navigating to the email verification page on success
		},
		[router]
	)

	// Memoized function to handle profile update error
	const handleError = useCallback((error: any) => {
		console.log(error)

		// Show error toast message
		showToastable({
			message:
				error?.response?.data?.errors?.messages[0] ||
				"Something went wrong!",
			status: "danger"
		})
	}, [])

	// Mutation hook to handle profile update
	const { mutate, isPending } = useMutation({
		mutationFn: updateProfile,
		onSuccess: handleSuccess,
		onError: handleError
	})

	// Memoized function to handle profile update
	const handleSave = useCallback(() => {
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

		// Mutate the updateProfile function with the form data and access token
		mutate({ data: formData, accessToken: token })
	}, [router, fullName, email, phoneNumber, location, newImage, token])

	// Memoized function to handle cancel action
	const handleCancel = useCallback(() => {
		router.back() // Navigating back to the previous page on cancel
	}, [router])

	return (
		<View style={styles.container}>
			{/* Container for the profile image */}
			<View style={styles.profileImageContainer}>
				{/* Displaying the selected image or a default profile image */}
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
				{/* Upload button for selecting a new image */}
				<TouchableOpacity
					style={styles.uploadButton}
					onPress={pickImage}
				>
					<Feather name="upload" size={12.5} color="white" />
				</TouchableOpacity>
			</View>
			{/* Container for the form fields */}
			<View style={styles.formContainer}>
				{/* Input field for full name */}
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
				{/* Input field for phone number */}
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
				{/* Input field for email */}
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
				{/* Input field for location */}
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
			{/* Container for action buttons */}
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
	actionButtonsWrapper: {
		width: "85%",
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	}
})
