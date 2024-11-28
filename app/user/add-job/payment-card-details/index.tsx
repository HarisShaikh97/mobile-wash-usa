import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
import Feather from "@expo/vector-icons/Feather"
import BackButton from "../../../../components/back-button/BackButton"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import JobPostSuccessfulModal from "../../../../components/job-post-successful-modal/JobPostSuccessfulModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [cardNumber, setCardNumber] = useState<string>("")
	const [expiryDate, setExpiryDate] = useState<string>("")
	const [CVC, setCVC] = useState<string>("")
	const [cardHolderName, setCardHolderName] = useState<string>("")
	const [openModal, setOpenModal] = useState<boolean>(false)

	const handleSubmit = useCallback(() => {
		setOpenModal(true)
	}, [setOpenModal])

	return (
		<ImageBackground
			source={require("../../../../assets/images/screen-bg.png")}
			style={styles.container}
			contentFit="fill"
		>
			<JobPostSuccessfulModal
				openModal={openModal}
				setOpenModal={setOpenModal}
			/>
			<View style={styles.headerContainer}>
				<BackButton
					color="#000000"
					backgroundColor="transparent"
					borderColor="#F5F5F5"
				/>
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.formContainer}>
					<Text style={styles.titleText}>Payment</Text>
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
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		paddingHorizontal: 25
	},
	headerContainer: {
		paddingVertical: 35
	},
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 25
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 25
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary,
		textAlign: "center",
		lineHeight: 30
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
