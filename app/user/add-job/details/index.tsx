import { useState, useCallback } from "react"
import {
	ScrollView,
	KeyboardAvoidingView,
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet
} from "react-native"
import { ImageBackground } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import BackButton from "../../../../components/back-button/BackButton"
import BudgetInput from "../../../../components/budget-input/BudgetInput"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Medium": require("../../../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	const [dateTime, setDateTime] = useState<Date | null>(null)
	const [budget, setBudget] = useState<number>(0)
	const [isDatePickerVisible, setDatePickerVisibility] =
		useState<boolean>(false)

	const showDatePicker = useCallback(() => {
		setDatePickerVisibility(true)
	}, [setDatePickerVisibility])

	const hideDatePicker = useCallback(() => {
		setDatePickerVisibility(false)
	}, [setDatePickerVisibility])

	const handleConfirm = useCallback(
		(date: Date) => {
			setDateTime(date)
			hideDatePicker()
		},
		[setDateTime, hideDatePicker]
	)

	const handleSelectLocation = useCallback(() => {
		router.navigate("/user/add-job/select-location")
	}, [router])

	const handleSubmit = useCallback(() => {
		router.navigate("/user/add-job/review")
	}, [router])

	return (
		<KeyboardAvoidingView
			style={styles.scrollView}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="datetime"
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
					<ImageBackground
						source={require("../../../../assets/images/add-job-header.png")}
						style={styles.headerBackgroundImage}
						contentFit="fill"
					>
						<View style={styles.headerContainer}>
							<BackButton
								color="#000000"
								backgroundColor="#F5F5F5"
								borderColor="transparent"
							/>
							{fontsLoaded && (
								<Text style={styles.titleText}>
									Set Job Details
								</Text>
							)}
						</View>
					</ImageBackground>
					<View style={styles.bodyContainer}>
						<View style={styles.inputFieldWrapper}>
							{fontsLoaded && (
								<Text style={styles.inputFieldTitleText}>
									Budget
								</Text>
							)}
							<BudgetInput value={budget} setValue={setBudget} />
						</View>
						<View style={styles.inputFieldWrapper}>
							{fontsLoaded && (
								<Text style={styles.inputFieldTitleText}>
									Location
								</Text>
							)}
							<TouchableOpacity
								style={styles.inputFieldContainer}
								onPress={handleSelectLocation}
							>
								<Text style={styles.inputFieldText}>
									Select Your Location
								</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.inputFieldWrapper}>
							{fontsLoaded && (
								<Text style={styles.inputFieldTitleText}>
									Date & Time
								</Text>
							)}
							<TouchableOpacity
								style={styles.inputFieldContainer}
								onPress={showDatePicker}
							>
								<Text style={styles.inputFieldText}>
									{dateTime
										? dateTime.toLocaleString()
										: "DD/MM/YYYY TT"}
								</Text>
							</TouchableOpacity>
						</View>
						<FormButton
							length="full"
							theme="dark"
							title="Next"
							onPress={handleSubmit}
						/>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		flexDirection: "column"
	},
	headerBackgroundImage: {
		width: "100%"
	},
	headerContainer: {
		padding: 25,
		flexDirection: "column",
		gap: 25,
		backgroundColor: "rgba(255, 255, 255, 0.75)"
	},
	titleText: {
		fontSize: 27.5,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	bodyContainer: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: 25,
		paddingHorizontal: 25,
		paddingBottom: 25,
		gap: 15
	},
	inputFieldWrapper: {
		width: "100%",
		flexDirection: "column",
		gap: 7.5,
		zIndex: 50
	},
	inputFieldTitleText: {
		fontFamily: "Roboto-Medium",
		fontSize: 12.5,
		color: theme.colors.secondary,
		marginLeft: 7.5
	},
	inputFieldContainer: {
		height: 50,
		width: "100%",
		borderWidth: 0.75,
		borderColor: "rgba(173, 173, 173, 0.5)",
		borderRadius: 12.5,
		justifyContent: "center",
		paddingHorizontal: 15
	},
	inputFieldText: {
		fontSize: 12.5,
		color: "rgba(173, 173, 173, 0.94)"
	}
})
