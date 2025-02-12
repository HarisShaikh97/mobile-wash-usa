import { useCallback, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import JobCard from "../../../../components/job-card/JobCard"
import BudgetInput from "../../../../components/budget-input/BudgetInput"
import FormButton from "../../../../components/form-button/FormButton"
import BidSubmittedModal from "../../../../components/bid-submitted-modal/BidSubmittedModal"
import AccountErrorModal from "../../../../components/account-error-modal/AccountErrorModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Get job ID from URL params
	const { id } = useLocalSearchParams()

	// Initializing the router instance for navigation
	const router = useRouter()

	const [bidAmount, setBidAmount] = useState<number>(0) // State for storing bid amount
	const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false) // State for managing success modal visibility
	const [openErrorModal, setOpenErrorModal] = useState<boolean>(false) // State for managing error modal visibility
	const [errorType, setErrorType] = useState<
		| "verification-pending"
		| "verification-rejected"
		| "payment-required"
		| null
	>(null) // State for managing error modal visibility

	// Memoized callback for handling bid submission
	const handleSubmitBid = useCallback((): void => {
		// setErrorType("verification-pending")
		// setOpenErrorModal(true)
		setOpenSuccessModal(true) // Show success modal
	}, [setOpenSuccessModal, setOpenErrorModal, setErrorType])

	// Memoized callback for handling cancel action
	const handleCancel = useCallback((): void => {
		router.back() // Navigate back
	}, [router])

	return (
		<View style={styles.container}>
			{/* Modal for displaying successful bid submission */}
			<BidSubmittedModal
				openModal={openSuccessModal}
				setOpenModal={setOpenSuccessModal}
				mode="web"
			/>
			{/* Conditional render of error modal based on error type */}
			{errorType && (
				<AccountErrorModal
					openModal={openErrorModal}
					setOpenModal={setOpenErrorModal}
					type={errorType}
					mode="web"
				/>
			)}
			{/* Page title */}
			<Text style={styles.titleText}>place a bid</Text>
			{/* Job details card component */}
			<JobCard
				id={+id[0]}
				job_title="Car Wash Service Needed"
				job_description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
				created_at="28, Oct 2024"
				address="California, USA"
				budget={500}
				status="open"
				showActionButtons={false}
				mode="app"
			/>
			{/* Bid amount input section */}
			<View style={styles.bidAmountWrapper}>
				<Text style={styles.bidAmountTitleText}>Your Bid Amount</Text>
				<BudgetInput
					value={bidAmount}
					setValue={setBidAmount}
					mode="web"
				/>
			</View>
			{/* Action buttons container */}
			<View style={styles.actionButtonsWrapper}>
				{/* Cancel button */}
				<FormButton
					colorTheme="light"
					title="Cancel"
					isLoading={false}
					onPress={handleCancel}
					length="half"
				/>
				{/* Submit bid button */}
				<FormButton
					colorTheme="dark"
					title="Submit Bid"
					isLoading={false}
					onPress={handleSubmitBid}
					length="half"
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 50
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
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between"
	}
})
