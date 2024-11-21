import { useCallback, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { useLocalSearchParams, useRouter } from "expo-router"
import JobCard from "../../../../components/job-card/JobCard"
import BudgetInputField from "../../../../components/budget-input-field/BudgetInputField"
import FormButton from "../../../../components/form-button/FormButton"
import BidSubmittedModal from "../../../../components/bid-submitted-modal/BidSubmittedModal"
import AccountErrorModal from "../../../../components/account-error-modal/AccountErrorModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const { id } = useLocalSearchParams()

	const router = useRouter()

	const [bidAmount, setBidAmount] = useState<number>(0)
	const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false)
	const [openErrorModal, setOpenErrorModal] = useState<boolean>(false)
	const [errorType, setErrorType] = useState<
		| "verification-pending"
		| "verification-rejected"
		| "payment-required"
		| null
	>(null)

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Bold": require("../../../../assets/fonts/Roboto/Roboto Bold 700.ttf")
	})

	const handleSubmitBid = useCallback((): void => {
		setErrorType("verification-pending")
		setOpenErrorModal(true)
	}, [setOpenSuccessModal])

	const handleCancel = useCallback((): void => {
		router.back()
	}, [router])

	return (
		<View style={styles.container}>
			<BidSubmittedModal
				openModal={openSuccessModal}
				setOpenModal={setOpenSuccessModal}
			/>
			{errorType && (
				<AccountErrorModal
					openModal={openErrorModal}
					setOpenModal={setOpenErrorModal}
					type={errorType}
				/>
			)}
			{fontsLoaded && <Text style={styles.titleText}>place a bid</Text>}
			<JobCard
				_id={id[0]}
				title="Car Wash Service Needed"
				description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
				date="28, Oct 2024"
				address="California, USA"
				budget={500}
				status="incoming"
				showActionButtons={false}
			/>
			<View style={styles.bidAmountWrapper}>
				{fontsLoaded && (
					<Text style={styles.bidAmountTitleText}>
						Your Bid Amount
					</Text>
				)}
				<BudgetInputField value={bidAmount} setValue={setBidAmount} />
			</View>
			<View style={styles.actionButtonsWrapper}>
				<FormButton
					theme="light"
					title="Cancel"
					onPress={handleCancel}
					length="half"
				/>
				<FormButton
					theme="dark"
					title="Submit Bid"
					onPress={handleSubmitBid}
					length="half"
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 25,
		paddingTop: 65,
		paddingBottom: 35,
		paddingHorizontal: 25
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		textTransform: "capitalize",
		color: theme.colors.secondary
	},
	bidAmountWrapper: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 20
	},
	bidAmountTitleText: {
		fontSize: 20,
		fontFamily: "Roboto-Bold",
		color: theme.colors.secondary
	},
	actionButtonsWrapper: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between"
	}
})
