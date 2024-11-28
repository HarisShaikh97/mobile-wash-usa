import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import Feather from "@expo/vector-icons/Feather"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [cardNumber, setCardNumber] = useState<string>("")
	const [expiryDate, setExpiryDate] = useState<string>("")
	const [CVC, setCVC] = useState<string>("")
	const [cardHolderName, setCardHolderName] = useState<string>("")

	const handleSubmit = useCallback(() => {
		router.navigate("/vendor/home")
	}, [router])

	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<Text style={styles.titleText}>Enter your card details</Text>
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
					<View style={styles.cardContainer}>
						<View style={styles.cardTextWrapper}>
							<Text style={styles.cardTitleText}>
								Credit or Debit card
							</Text>
							<Text style={styles.cardDescriptionText}>
								Online payment
							</Text>
						</View>
						<Image
							source={require("../../../../assets/icons/master-card.svg")}
							style={styles.cardIcon}
							contentFit="contain"
						/>
					</View>
				</View>
				<InputField
					length="full"
					type="text"
					title="Card Number"
					placeholder="0000 0000 0000 0000"
					value={cardNumber}
					onChangeText={setCardNumber}
					secureTextEntry={false}
					multiline={false}
				/>
				<View style={styles.inputFieldsWrapper}>
					<InputField
						length="half"
						type="text"
						title="Expiry Date"
						placeholder="MM/YY"
						value={expiryDate}
						onChangeText={setExpiryDate}
						secureTextEntry={false}
						multiline={false}
					/>
					<InputField
						length="half"
						type="text"
						title="CVC"
						placeholder="000"
						value={CVC}
						onChangeText={setCVC}
						secureTextEntry={false}
						multiline={false}
					/>
				</View>
				<InputField
					length="full"
					type="text"
					title="Card Holder Name"
					placeholder="Full name"
					value={cardHolderName}
					onChangeText={setCardHolderName}
					secureTextEntry={false}
					multiline={false}
				/>
			</View>
			<FormButton
				length="full"
				theme="dark"
				title="Confirm Payment"
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
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 30,
		textTransform: "capitalize",
		width: 235
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
	cardContainer: {
		height: 75,
		width: "100%",
		borderRadius: 10,
		backgroundColor: theme.colors.secondary,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	cardIcon: {
		height: 25,
		width: 25
	},
	cardTextWrapper: {
		flexDirection: "column"
	},
	cardTitleText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium",
		color: "white"
	},
	cardDescriptionText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Light",
		color: "white"
	},
	inputFieldsWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	}
})
