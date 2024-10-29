import { useState, useCallback } from "react"
import { View, Text, StyleSheet } from "react-native"
import { ImageBackground } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"
import BudgetInputField from "../../../components/budget-input-field/BudgetInputField"
import InputField from "../../../components/input-field/InputField"
import FormButton from "../../../components/form-button/FormButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf")
	})

	const [location, setLocation] = useState<string>("")
	const [dateAndTime, setDateAndTime] = useState<string>("")
	const [budget, setBudget] = useState<number>(0)

	const handleSubmit = useCallback(() => {
		router.back()
	}, [router])

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../../assets/images/add-job-header.png")}
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
						<Text style={styles.titleText}>Set Job Details</Text>
					)}
				</View>
			</ImageBackground>
			<View style={styles.bodyContainer}>
				<BudgetInputField value={budget} setValue={setBudget} />
				<InputField
					type="text"
					value={location}
					onChangeText={setLocation}
					title="Location"
					multiline={false}
					secureTextEntry={false}
					placeholder="Set Your Location"
				/>
				<InputField
					type="text"
					value={dateAndTime}
					onChangeText={setDateAndTime}
					title="Date & Time"
					multiline={false}
					secureTextEntry={false}
					placeholder="DD/MM/YYYY TT"
				/>
				<FormButton title="Next" onPress={handleSubmit} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
	}
})
