import { useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import HorizontalSeparator from "../../../../components/horizontal-separator/HorizontalSeparator"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const { id } = useLocalSearchParams()
	const router = useRouter()

	const handleSubmit = useCallback((): void => {
		router.navigate(`/user/rating-and-review/${id}`)
	}, [router, id])

	return (
		<View style={styles.container}>
			<View style={styles.checkIconContainer}>
				<FontAwesome6 name="check" size={37.5} color="white" />
			</View>
			<Text style={styles.titleText}>Offer Accepted!</Text>
			<View style={styles.otpBox}>
				<Text style={styles.otpHeadingText}>Generated OTP</Text>
				<Text style={styles.otpValueText}>123456</Text>
				<Text style={styles.descriptionText}>
					Is Your OTP For Job Confirmation
				</Text>
			</View>
			<Text style={[styles.descriptionText, styles.instructionText]}>
				Once the job is completed, please provide the OTP to verify and
				confirm job completion.
			</Text>
			<View style={styles.jobReceiptContainer}>
				<HorizontalSeparator color="#F5F5F5" />
				<View style={styles.horizontalWrapper}>
					<Text style={styles.receiptHeadingText}>
						Payment method
					</Text>
					<View style={styles.cardDetailsWrapper}>
						<Text style={styles.receiptHeadingText}>9949</Text>
						<Image
							source={require("../../../../assets/icons/master-card.svg")}
							style={styles.cardIcon}
							contentFit="contain"
						/>
					</View>
				</View>
				<HorizontalSeparator color="#F5F5F5" />
				<View style={styles.horizontalWrapper}>
					<Text style={styles.receiptHeadingText}>Job Title:</Text>
					<Text
						style={[
							styles.descriptionText,
							styles.receiptDetailsText
						]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						Car Wash At Home
					</Text>
				</View>
				<View style={styles.horizontalWrapper}>
					<Text style={styles.receiptHeadingText}>Date & Time:</Text>
					<Text
						style={[
							styles.descriptionText,
							styles.receiptDetailsText
						]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						October 5, 2024 02:00 PM
					</Text>
				</View>
				<View style={styles.horizontalWrapper}>
					<Text style={styles.receiptHeadingText}>Location:</Text>
					<Text
						style={[
							styles.descriptionText,
							styles.receiptDetailsText
						]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						234 Elm Street, Los Angeles, CA
					</Text>
				</View>
				<HorizontalSeparator color="#F5F5F5" />
				<View style={styles.horizontalWrapper}>
					<Text style={styles.receiptHeadingText}>Vendor Name:</Text>
					<Text
						style={[
							styles.descriptionText,
							styles.receiptDetailsText
						]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						Michael Guzzi
					</Text>
				</View>
				<View style={styles.horizontalWrapper}>
					<Text style={styles.receiptHeadingText}>
						Agreed Budget:
					</Text>
					<Text
						style={[
							styles.descriptionText,
							styles.receiptDetailsText
						]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						$450
					</Text>
				</View>
			</View>
			<View style={styles.formButtonWrapper}>
				<FormButton
					length="full"
					colorTheme="light"
					isLoading={false}
					title="Download Receipt"
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
		gap: 15,
		paddingTop: 50,
		paddingBottom: 35
	},
	checkIconContainer: {
		height: 100,
		width: 100,
		borderRadius: 50,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center"
	},
	titleText: {
		fontSize: 32.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	otpBox: {
		height: 135,
		width: 300,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		marginTop: 10,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 5
	},
	otpHeadingText: {
		fontSize: 15,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	otpValueText: {
		fontSize: 35,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.primary
	},
	descriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	instructionText: {
		width: 325,
		textAlign: "center"
	},
	jobReceiptContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 22.5,
		marginTop: 35,
		marginBottom: 50
	},
	horizontalWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	receiptHeadingText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: "#9FA2AB"
	},
	receiptDetailsText: {
		width: "75%",
		textAlign: "right"
	},
	cardDetailsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5
	},
	cardIcon: {
		height: 25,
		width: 25
	},
	formButtonWrapper: {
		width: "75%"
	}
})
