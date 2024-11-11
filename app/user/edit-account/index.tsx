import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import * as ImagePicker from "expo-image-picker"
import Feather from "@expo/vector-icons/Feather"
import InputField from "../../../components/input-field/InputField"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [newImage, setNewImage] = useState<string | null>(null)
	const [fullName, setFullName] = useState<string>("")
	const [phoneNumber, setPhoneNumber] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [location, setLocation] = useState<string>("")

	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	const pickImage = useCallback(async (): Promise<void> => {
		let result: ImagePicker.ImagePickerResult =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				quality: 1
			})

		if (!result.canceled && result.assets && result.assets.length > 0) {
			setNewImage(result.assets[0].uri)
		} else {
			console.log("No image selected or operation canceled!")
		}
	}, [setNewImage])

	const handleSave = useCallback(() => {
		router.back()
	}, [router])

	const handleCancel = useCallback(() => {
		router.back()
	}, [router])

	return (
		<View style={styles.container}>
			<View style={styles.profileImageContainer}>
				<Image
					source={
						newImage
							? { uri: newImage }
							: require("../../../assets/images/profile.png")
					}
					style={styles.profileImage}
					contentFit="cover"
				/>
				<TouchableOpacity
					style={styles.uploadButton}
					onPress={pickImage}
				>
					<Feather name="upload" size={12.5} color="white" />
				</TouchableOpacity>
			</View>
			<View style={styles.formContainer}>
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
			<View style={styles.actionButtonsWrapper}>
				<TouchableOpacity
					style={[
						styles.actionButtonContainer,
						styles.cancelButtonContainer
					]}
					onPress={handleCancel}
				>
					{fontsLoaded && (
						<Text
							style={[
								styles.actionButtonText,
								styles.cancelButtonText
							]}
						>
							Cancel
						</Text>
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.actionButtonContainer,
						styles.saveButtonContainer
					]}
					onPress={handleSave}
				>
					{fontsLoaded && (
						<Text
							style={[
								styles.actionButtonText,
								styles.saveButtonText
							]}
						>
							Save
						</Text>
					)}
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
