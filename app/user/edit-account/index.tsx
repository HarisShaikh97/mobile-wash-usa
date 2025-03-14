import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import * as ImagePicker from "expo-image-picker"
import Feather from "@expo/vector-icons/Feather"
import InputField from "../../../components/input-field/InputField"
import { RootState } from "../../../store/store"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Define base URL
	const BASE_URL = process.env.EXPO_PUBLIC_API_URL

	// Initializing the router instance for navigation
	const router = useRouter()

	// Retrieve user data from Redux store
	const user = useSelector((state: RootState) => state.auth.user)

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

	// Memoized function to handle save action
	const handleSave = useCallback(() => {
		router.navigate("/user/email-verification") // Navigating to the email verification page on save
	}, [router])

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
				<TouchableOpacity
					style={[
						styles.actionButtonContainer,
						styles.cancelButtonContainer
					]}
					onPress={handleCancel}
				>
					<Text
						style={[
							styles.actionButtonText,
							styles.cancelButtonText
						]}
					>
						Cancel
					</Text>
				</TouchableOpacity>
				{/* Save button */}
				<TouchableOpacity
					style={[
						styles.actionButtonContainer,
						styles.saveButtonContainer
					]}
					onPress={handleSave}
				>
					<Text
						style={[styles.actionButtonText, styles.saveButtonText]}
					>
						Save
					</Text>
				</TouchableOpacity>
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
		flexDirection: "row",
		alignItems: "center",
		gap: 15
	},
	actionButtonContainer: {
		height: 50,
		width: 125,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	actionButtonText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium"
	},
	cancelButtonContainer: {
		borderWidth: 1,
		borderColor: theme.colors.primary
	},
	cancelButtonText: {
		color: theme.colors.primary
	},
	saveButtonContainer: {
		backgroundColor: theme.colors.primary
	},
	saveButtonText: {
		color: "white"
	}
})
