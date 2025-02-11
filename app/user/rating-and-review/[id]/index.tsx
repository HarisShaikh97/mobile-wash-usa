import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useLocalSearchParams } from "expo-router"
import RatingsInput from "../../../../components/ratings-input/RatingsInput"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import FeedbackConfirmationModal from "../../../../components/feedback-confirmation-modal/FeedbackConfirmationModal"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	// Get job ID from URL params
	const { id } = useLocalSearchParams()

	const [ratings, setRatings] = useState<number>(0) // State for managing ratings
	const [review, setReview] = useState<string>("") // State for managing review text
	const [openModal, setOpenModal] = useState<boolean>(false) // State for managing modal visibility

	// Memoized function to handle form submission
	const handleSubmit = useCallback((): void => {
		setOpenModal(true) // Open the confirmation modal
	}, [setOpenModal])

	return (
		<View style={styles.container}>
			{/* Confirmation modal shown after submitting feedback */}
			<FeedbackConfirmationModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				mode="app"
			/>
			{/* Success checkmark icon */}
			<Image
				source={require("../../../../assets/icons/successful.svg")}
				style={styles.checkIcon}
				contentFit="contain"
			/>
			{/* Main completion message */}
			<Text style={styles.titleText}>Your Job Has Been Completed!</Text>
			{/* Job details card */}
			<View style={styles.jobCardContainer}>
				<Text
					style={styles.jobTitleText}
					numberOfLines={2}
					ellipsizeMode="tail"
				>
					Car Wash Service Needed
				</Text>
				<Text style={styles.budgetText}>$500</Text>
			</View>
			{/* Feedback section header */}
			<Text style={styles.experienceTitleText}>
				How was your experience?
			</Text>
			<Text style={styles.descriptionText}>
				Your feedback helps us ensure quality service. Rate and review
				below.
			</Text>
			{/* Star rating input component */}
			<RatingsInput size={35} ratings={ratings} setRatings={setRatings} />
			{/* Review text input section */}
			<View style={styles.reviewBoxWrapper}>
				<InputField
					length="full"
					type="text"
					value={review}
					onChangeText={setReview}
					title="Write Your Review"
					multiline={true}
					secureTextEntry={false}
					placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
					size="large"
				/>
			</View>
			{/* Submit button */}
			<FormButton
				length="full"
				colorTheme="dark"
				isLoading={false}
				title="Submit"
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
		gap: 15,
		paddingTop: 65,
		paddingBottom: 35
	},
	checkIcon: {
		height: 115,
		width: 115
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.primary,
		textAlign: "center",
		textTransform: "capitalize"
	},
	jobCardContainer: {
		width: "100%",
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "#F5F5F5",
		backgroundColor: "white",
		padding: 20,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between"
	},
	jobTitleText: {
		fontSize: 17.5,
		fontFamily: "Montserrat-Bold",
		width: 165,
		color: theme.colors.secondary,
		textTransform: "capitalize"
	},
	budgetText: {
		fontSize: 22.5,
		fontFamily: "Roboto-Bold",
		color: theme.colors.primary
	},
	experienceTitleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-SemiBold",
		width: 215,
		color: theme.colors.secondary,
		textAlign: "center",
		textTransform: "capitalize"
	},
	descriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		width: 275,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	reviewBoxWrapper: {
		width: "100%",
		marginVertical: 25
	}
})
