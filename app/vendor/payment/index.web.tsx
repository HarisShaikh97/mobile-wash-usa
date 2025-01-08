import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import FormButton from "../../../components/form-button/FormButton"
import { theme } from "../../../utils/constants"
import { PaymentOptions } from "../../../utils/types"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [selectedOption, setSelectedOption] = useState<PaymentOptions>("card")

	const handleSubmit = useCallback(() => {
		if (selectedOption === "card") {
			router.navigate("/vendor/payment/card-details")
		} else if (selectedOption === "paypal") {
			router.navigate("/vendor/payment/paypal-account")
		}
	}, [router, selectedOption])

	return (
		<View style={styles.container}>
			<View style={styles.titleWrapper}>
				<Text style={styles.titleText}>Select Your Payment Method</Text>
				<Text style={styles.descriptionText}>
					To receive payments for your services, please select your
					preferred payment method.
				</Text>
			</View>
			<View style={styles.formContainer}>
				<Text style={styles.headingText}>Options</Text>
				<View style={styles.paymentOptionsWrapper}>
					<TouchableOpacity
						style={styles.paymentOptionContainer}
						onPress={() => {
							setSelectedOption("card")
						}}
					>
						<View style={styles.paymentOptionTitleWrapper}>
							<Image
								source={require("../../../assets/icons/card.svg")}
								style={styles.paymentOptionIcon}
								contentFit="contain"
							/>
							<Text style={styles.paymentOptionTitleText}>
								Credit Card/Debit Card
							</Text>
						</View>
						<View
							style={[
								styles.checkBox,
								selectedOption === "card"
									? styles.checkboxChecked
									: styles.checkboxUnChecked
							]}
						>
							{selectedOption === "card" && (
								<View style={styles.checkboxInnerCircle} />
							)}
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.paymentOptionContainer}
						onPress={() => {
							setSelectedOption("paypal")
						}}
					>
						<View style={styles.paymentOptionTitleWrapper}>
							<Image
								source={require("../../../assets/icons/paypal.svg")}
								style={styles.paymentOptionIcon}
								contentFit="contain"
							/>
							<Text style={styles.paymentOptionTitleText}>
								Paypal
							</Text>
						</View>
						<View
							style={[
								styles.checkBox,
								selectedOption === "paypal"
									? styles.checkboxChecked
									: styles.checkboxUnChecked
							]}
						>
							{selectedOption === "paypal" && (
								<View style={styles.checkboxInnerCircle} />
							)}
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.formButtonWrapper}>
				<FormButton
					length="full"
					theme="dark"
					title="Next"
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
		gap: 25,
		paddingTop: 15
	},
	titleWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 10
	},
	titleText: {
		fontSize: 37.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		width: 350,
		textAlign: "center",
		lineHeight: 35
	},
	descriptionText: {
		fontSize: 16.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		width: 350,
		textAlign: "center"
	},
	headingText: {
		fontSize: 17.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	paymentOptionsWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 10
	},
	paymentOptionContainer: {
		height: 65,
		width: "100%",
		borderRadius: 7.5,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20
	},
	paymentOptionTitleWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20
	},
	paymentOptionIcon: {
		height: 20,
		width: 20
	},
	paymentOptionTitleText: {
		fontSize: 15,
		fontFamily: "Montserrat-Medium",
		color: theme.colors.secondary
	},
	checkBox: {
		height: 20,
		width: 20,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		padding: 3
	},
	checkboxChecked: {
		backgroundColor: "rgba(47, 116, 250, 0.25)"
	},
	checkboxUnChecked: {
		borderWidth: 1.5,
		borderColor: "#F5F5F5"
	},
	checkboxInnerCircle: {
		height: "100%",
		width: "100%",
		borderRadius: 10,
		backgroundColor: theme.colors.primary
	},
	formButtonWrapper: {
		width: "75%"
	}
})
