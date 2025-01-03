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

const LIMIT = 700
const THUMB_SIZE = 20
const TRACK_BAR_LENGTH = 300

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
	const minPosition = useSharedValue(0)
	const maxPosition = useSharedValue(280)

	const [jobType, setJobType] = useState<SelectOption | null>(null)
	const [sortType, setSortType] = useState<SelectOption | null>(null)
	const [minValue, setMinValue] = useState<number>(0)
	const [maxValue, setMaxValue] = useState<number>(LIMIT)
	const [location, setLocation] = useState<string>("")

	const sortOptions: SelectOption[] = [
		{
			title: "Most Popular"
		},
		{
			title: "Near By"
		}
	]

	const handleApplyFilter = useCallback((): void => {
		setMinValue(Math.floor((minPosition.value * LIMIT) / TRACK_BAR_LENGTH))
		setMaxValue(
			Math.ceil(
				(maxPosition.value * LIMIT) / (TRACK_BAR_LENGTH - THUMB_SIZE)
			)
		)
		setOpenModal(false)
	}, [openModal])

	return (
		<Modal
			animationType={mode === "app" ? "slide" : "fade"}
			transparent
			visible={openModal}
			onRequestClose={() => {
				setOpenModal(false)
			}}
		>
			<GestureHandlerRootView
				style={[
					styles.modalWrapper,
					mode === "app"
						? styles.modalWrapperApp
						: styles.modalWrapperWeb
				]}
			>
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
					<View style={styles.modalHeaderContainer}>
						<Text style={styles.titleText}>Filter</Text>
						<TouchableOpacity
							style={styles.filterButtonContainer}
							onPress={() => {
								setOpenModal(false)
							}}
						>
							<Text style={styles.filterButtonContainerText}>
								Reset
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.formContainer}>
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
						<RangeInput
							title="Budget Range"
							limit={LIMIT}
							thumbSize={THUMB_SIZE}
							trackBarLength={TRACK_BAR_LENGTH}
							minPosition={minPosition}
							maxPosition={maxPosition}
							mode={mode}
						/>
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
						<Image
							source={require("../../assets/images/map.png")}
							style={styles.mapView}
							contentFit="cover"
						/>
					</View>
					<FormButton
						title="Apply Filter"
						onPress={handleApplyFilter}
						theme="dark"
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
