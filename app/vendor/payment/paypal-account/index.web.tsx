import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import Feather from "@expo/vector-icons/Feather"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [email, setEmail] = useState<string>("")
	const [confirmEmail, setConfirmEmail] = useState<string>("")

	const handleSubmit = useCallback(() => {
		router.navigate("/vendor/payment/paypal-account/verify")
	}, [router])

	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<View style={styles.titleWrapper}>
					<Text style={styles.titleText}>
						Link your PayPal account
					</Text>
					<Text style={styles.descriptionText}>
						Enter your PayPal email address to receive payments
						directly to your PayPal account.
					</Text>
				</View>
				<View style={styles.formHeaderContainer}>
					<View style={styles.paymentMethodWrapper}>
						<Text
							style={[
								styles.paymentMethodText,
								styles.paymentMethodTextBlack
							]}
						>
							Method of payment
						</Text>
						<TouchableOpacity
							style={styles.changeButtonContainer}
							onPress={() => {
								router.back()
							}}
						>
							<Feather
								name="edit"
								size={15}
								color={theme.colors.primary}
							/>
							<Text
								style={[
									styles.paymentMethodText,
									styles.paymentMethodTextBlue
								]}
							>
								Change
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<InputField
					length="full"
					type="text"
					title="Email"
					placeholder="PayPal email"
					value={email}
					onChangeText={setEmail}
					secureTextEntry={false}
					multiline={false}
				/>
				<InputField
					length="full"
					type="text"
					title="Confirm Email"
					placeholder="PayPal email"
					value={confirmEmail}
					onChangeText={setConfirmEmail}
					secureTextEntry={false}
					multiline={false}
				/>
			</View>
			<View style={styles.formButtonWrapper}>
				<FormButton
					length="full"
					colorTheme="dark"
					isLoading={false}
					title="Link PayPal"
					onPress={handleSubmit}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "center",
		gap: 25
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25
	},
	titleWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 5
	},
	titleText: {
		fontSize: 37.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 35,
		textTransform: "capitalize",
		width: 350
	},
	descriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		width: 400,
		textAlign: "center"
	},
	formHeaderContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 15
	},
	paymentMethodWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	paymentMethodText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium"
	},
	paymentMethodTextBlack: {
		color: theme.colors.secondary
	},
	paymentMethodTextBlue: {
		color: theme.colors.primary
	},
	changeButtonContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 7.5
	},
	formButtonWrapper: {
		width: "75%"
	}
})
