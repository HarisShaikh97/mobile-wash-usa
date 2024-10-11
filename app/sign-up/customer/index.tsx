import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [fullName, setFullName] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [phoneNumber, setPhoneNumber] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [location, setLocation] = useState<string>("")

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Montserrat-Medium": require("../../../assets/fonts/Montserrat/Montserrat Medium 500.ttf"),
		"Roboto-Regular": require("../../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	const handleSubmit = useCallback((): void => {
		// router.navigate("/forgot-password/verification-code")
	}, [router])

	const handleLogin = useCallback((): void => {
		router.navigate("/login")
	}, [router])

	return (
		<View style={styles.bodyContainer}>
			{fontsLoaded && <Text style={styles.titleText}>Sign Up</Text>}
			<View style={styles.formContainer}>
				<InputField
					title="Full Name"
					placeholder="Enter your full name"
					value={fullName}
					onChangeText={setFullName}
					secureTextEntry={false}
				/>
				<InputField
					title="Email"
					placeholder="Enter your email address"
					value={email}
					onChangeText={setEmail}
					secureTextEntry={false}
				/>
				<InputField
					title="Phone Number"
					placeholder="Enter your phone number"
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					secureTextEntry={false}
				/>
				<InputField
					title="Password"
					placeholder="**********"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={false}
				/>
				<InputField
					title="Location"
					placeholder="Enter your location"
					value={location}
					onChangeText={setLocation}
					secureTextEntry={false}
				/>
				<View style={styles.policyAndTermsTextContainer}>
					{fontsLoaded && (
						<Text
							style={[
								styles.policyAndTermsText,
								styles.policyAndTermsTextBlack
							]}
						>
							By signing up, you agree to our
						</Text>
					)}
					<View style={styles.policyAndTermsTextWrapper}>
						<TouchableOpacity>
							{fontsLoaded && (
								<Text
									style={[
										styles.policyAndTermsText,
										styles.policyAndTermsLinkText
									]}
								>
									Terms of Service
								</Text>
							)}
						</TouchableOpacity>
						{fontsLoaded && (
							<Text
								style={[
									styles.policyAndTermsText,
									styles.policyAndTermsTextBlack
								]}
							>
								{" and "}
							</Text>
						)}
						<TouchableOpacity>
							{fontsLoaded && (
								<Text
									style={[
										styles.policyAndTermsText,
										styles.policyAndTermsLinkText
									]}
								>
									Privacy Policy
								</Text>
							)}
						</TouchableOpacity>
						{fontsLoaded && (
							<Text
								style={[
									styles.policyAndTermsText,
									styles.policyAndTermsTextBlack
								]}
							>
								.
							</Text>
						)}
					</View>
				</View>
				<FormButton title="Sign Up" onPress={handleSubmit} />
				<View style={styles.loginTextWrapper}>
					{fontsLoaded && (
						<Text style={[styles.loginText, styles.loginTextBlack]}>
							Already have an account?
						</Text>
					)}
					<TouchableOpacity onPress={handleLogin}>
						{fontsLoaded && (
							<Text
								style={[styles.loginText, styles.loginTextBlue]}
							>
								Login
							</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bodyContainer: {
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 35,
		gap: 10
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 30,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 10,
		paddingTop: 20,
		paddingBottom: 35
	},
	policyAndTermsTextContainer: {
		width: "100%",
		flexDirection: "column",
		paddingBottom: 10,
		paddingHorizontal: 10
	},
	policyAndTermsTextWrapper: {
		flexDirection: "row",
		alignItems: "center"
	},
	policyAndTermsText: {
		fontSize: 13.5
	},
	policyAndTermsTextBlack: {
		color: theme.colors.secondary,
		fontFamily: "Roboto-Regular"
	},
	policyAndTermsLinkText: {
		color: theme.colors.primary,
		fontFamily: "Roboto-Medium"
	},
	loginTextWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		marginTop: 15
	},
	loginText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium"
	},
	loginTextBlack: {
		color: theme.colors.secondary
	},
	loginTextBlue: {
		color: theme.colors.primary
	}
})
