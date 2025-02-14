import { useState, useCallback } from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { ImageBackground, Image } from "expo-image"
import { useSharedValue } from "react-native-reanimated"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import InputField from "../input-field/InputField"
import RangeInput from "../range-input/RangeInput"
import FormButton from "../form-button/FormButton"
import { theme, services } from "../../utils/constants"
import { SelectOption } from "../../utils/types"

// Budget range limit
const LIMIT = 700

// Thumb size for the range slider
const THUMB_SIZE = 20

// Track bar length for the range slider
const TRACK_BAR_LENGTH = 300

// Interface for the props of the component
interface JobsFilterModalProps {
	openModal: boolean
	setOpenModal: (value: boolean) => void
	mode: "app" | "web"
}

export default function JobsFilterModal({
	openModal,
	setOpenModal,
	mode
}: JobsFilterModalProps): React.ReactElement | null {
	// Shared value for the minimum position of the range slider
	const minPosition = useSharedValue(0)

	// Shared value for the maximum position of the range slider
	const maxPosition = useSharedValue(280)

	const [jobType, setJobType] = useState<SelectOption | null>(null) // State for storing the job type
	const [sortType, setSortType] = useState<SelectOption | null>(null) // State for storing the sort type
	const [minValue, setMinValue] = useState<number>(0) // State for storing the minimum value of the range slider
	const [maxValue, setMaxValue] = useState<number>(LIMIT) // State for storing the maximum value of the range slider
	const [location, setLocation] = useState<string>("") // State for storing the location

	// Array of sort options
	const sortOptions: SelectOption[] = [
		{
			title: "Most Popular"
		},
		{
			title: "Near By"
		}
	]

	// Memoized callback for applying the filter
	const handleApplyFilter = useCallback((): void => {
		// Set the minimum value of the range slider according to the position of the thumb
		setMinValue(Math.floor((minPosition.value * LIMIT) / TRACK_BAR_LENGTH))
		// Set the maximum value of the range slider according to the position of the thumb
		setMaxValue(
			Math.ceil(
				(maxPosition.value * LIMIT) / (TRACK_BAR_LENGTH - THUMB_SIZE)
			)
		)
		// Close the modal
		setOpenModal(false)
	}, [
		setMinValue,
		setMaxValue,
		minPosition,
		maxPosition,
		setOpenModal,
		LIMIT,
		TRACK_BAR_LENGTH,
		THUMB_SIZE
	])

	const handleResetFilter = useCallback((): void => {
		setMinValue(0)
		setMaxValue(LIMIT)
		minPosition.value = 0
		maxPosition.value = 280
		setLocation("")
		setJobType(null)
		setSortType(null)
	}, [
		setMinValue,
		setMaxValue,
		minPosition,
		maxPosition,
		setLocation,
		setJobType,
		setSortType
	])

	return (
		// Modal component for displaying filter options
		<Modal
			animationType={mode === "app" ? "slide" : "fade"}
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			{/* Root view for gesture handling */}
			<GestureHandlerRootView
				style={[
					styles.modalWrapper,
					mode === "app"
						? styles.modalWrapperApp
						: styles.modalWrapperWeb
				]}
			>
				{/* Background container with image */}
				<ImageBackground
					source={require("../../assets/images/modal-background.png")}
					style={[
						styles.modalContainer,
						mode === "app"
							? styles.modalContainerApp
							: styles.modalContainerWeb
					]}
					contentFit="fill"
				>
					{/* Header section with title and reset button */}
					<View style={styles.modalHeaderContainer}>
						<Text style={styles.titleText}>Filter</Text>
						<TouchableOpacity
							style={styles.filterButtonContainer}
							onPress={handleResetFilter}
						>
							<Text style={styles.filterButtonContainerText}>
								Reset
							</Text>
						</TouchableOpacity>
					</View>
					{/* Form container with filter inputs */}
					<View style={styles.formContainer}>
						{/* Job Type dropdown */}
						<InputField
							length="full"
							type="select"
							data={services}
							value={jobType}
							onChangeValue={setJobType}
							title="Job Type"
							placeholder="Select Job Type"
							zIndex={2}
						/>
						{/* Sort By dropdown */}
						<InputField
							length="full"
							type="select"
							data={sortOptions}
							value={sortType}
							onChangeValue={setSortType}
							title="Sort By"
							placeholder="Sort By"
							zIndex={1}
						/>
						{/* Budget range slider */}
						<RangeInput
							title="Budget Range"
							limit={LIMIT}
							thumbSize={THUMB_SIZE}
							trackBarLength={TRACK_BAR_LENGTH}
							minPosition={minPosition}
							maxPosition={maxPosition}
							mode={mode}
						/>
						{/* Location input field */}
						<InputField
							length="full"
							title="Location"
							placeholder="Search your location"
							value={location}
							onChangeText={setLocation}
							secureTextEntry={false}
							multiline={false}
							type="text"
						/>
						{/* Map preview */}
						<Image
							source={require("../../assets/images/map.png")}
							style={styles.mapView}
							contentFit="cover"
						/>
					</View>
					{/* Apply filter button */}
					<FormButton
						title="Apply Filter"
						onPress={handleApplyFilter}
						isLoading={false}
						colorTheme="dark"
						length="full"
					/>
				</ImageBackground>
			</GestureHandlerRootView>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.65)"
	},
	modalWrapperApp: {
		justifyContent: "flex-end"
	},
	modalWrapperWeb: {
		justifyContent: "center",
		alignItems: "center"
	},
	modalContainer: {
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center"
	},
	modalContainerApp: {
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35,
		padding: 25
	},
	modalContainerWeb: {
		borderRadius: 35,
		width: 425,
		padding: 35
	},
	modalHeaderContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	titleText: {
		fontSize: 15,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	},
	filterButtonContainer: {
		height: 30,
		width: 75,
		borderRadius: 8.5,
		borderWidth: 1,
		borderColor: "#ADADAD",
		alignItems: "center",
		justifyContent: "center"
	},
	filterButtonContainerText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: "#ADADAD"
	},
	formContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 10,
		paddingTop: 20,
		paddingBottom: 35
	},
	mapView: {
		height: 100,
		width: "100%",
		borderRadius: 10,
		overflow: "hidden"
	}
})
