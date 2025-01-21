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
						To receive payments for your services, please select
						your preferred payment method.
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
			<FormButton
				length="full"
				colorTheme="dark"
				isLoading={false}
				title="Link PayPal"
				onPress={handleSubmit}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 25
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25,
		paddingHorizontal: 15
	},
	titleWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 5
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 30,
		textTransform: "capitalize",
		width: 235
	},
	descriptionText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		width: 285,
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
	}
})
