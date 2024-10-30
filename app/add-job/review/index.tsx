import { useCallback } from "react"
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { useRouter } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"
import FormButton from "../../../components/form-button/FormButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Medium": require("../../../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	const handleSubmit = useCallback(() => {
		// router.navigate("/add-job/details")
	}, [])

	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				<View style={styles.headerBackgroundImage}>
					<View style={styles.headerContainer}>
						<BackButton
							color="#000000"
							backgroundColor="transparent"
							borderColor="#F5F5F5"
						/>
						{fontsLoaded && (
							<Text style={styles.titleText}>
								Review Your Job Posting
							</Text>
						)}
					</View>
				</View>
				<View style={styles.bodyContainer}>
					<View style={styles.jobDetailsWrapper}>
						<View style={styles.jobDetailContainer}>
							{fontsLoaded && (
								<Text style={styles.jobDetailText}>
									Car Wash At Home
								</Text>
							)}
							<TouchableOpacity
								onPress={() => {
									router.navigate("/add-job")
								}}
							>
								<Image
									source={require("../../../assets/icons/edit.svg")}
									style={styles.editIcon}
									contentFit="contain"
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.jobDetailContainer}>
							{fontsLoaded && (
								<Text style={styles.jobDetailText}>
									Vehicle
								</Text>
							)}
							<TouchableOpacity
								onPress={() => {
									router.navigate("/add-job")
								}}
							>
								<Image
									source={require("../../../assets/icons/edit.svg")}
									style={styles.editIcon}
									contentFit="contain"
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.jobDetailContainer}>
							{fontsLoaded && (
								<Text style={styles.jobDetailText}>
									Looking for a thorough exterior and interior
									car wash for my SUV.
								</Text>
							)}
							<TouchableOpacity
								onPress={() => {
									router.navigate("/add-job")
								}}
							>
								<Image
									source={require("../../../assets/icons/edit.svg")}
									style={styles.editIcon}
									contentFit="contain"
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.jobDetailContainer}>
							{fontsLoaded && (
								<Text style={styles.jobDetailText}>$500</Text>
							)}
							<TouchableOpacity
								onPress={() => {
									router.navigate("/add-job/details")
								}}
							>
								<Image
									source={require("../../../assets/icons/edit.svg")}
									style={styles.editIcon}
									contentFit="contain"
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.jobDetailContainer}>
							{fontsLoaded && (
								<Text style={styles.jobDetailText}>
									2972 Westheimer Rd. Santa Ana, Illinois
									85486
								</Text>
							)}
							<TouchableOpacity
								onPress={() => {
									router.navigate("/add-job/details")
								}}
							>
								<Image
									source={require("../../../assets/icons/edit.svg")}
									style={styles.editIcon}
									contentFit="contain"
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.jobDetailContainer}>
							{fontsLoaded && (
								<Text style={styles.jobDetailText}>
									October 5, 2024 at 2:00 PM
								</Text>
							)}
							<TouchableOpacity
								onPress={() => {
									router.navigate("/add-job/details")
								}}
							>
								<Image
									source={require("../../../assets/icons/edit.svg")}
									style={styles.editIcon}
									contentFit="contain"
								/>
							</TouchableOpacity>
						</View>
					</View>
					<FormButton title="Next" onPress={handleSubmit} />
				</View>
			</View>
		</ScrollView>
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
		color: theme.colors.secondary,
		width: 215
	},
	bodyContainer: {
		flexDirection: "column",
		alignItems: "center",
		paddingHorizontal: 25,
		paddingBottom: 25,
		gap: 25
	},
	jobDetailsWrapper: {
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		gap: 15
	},
	jobDetailContainer: {
		width: "100%",
		padding: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(173, 173, 173, 0.2)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	jobDetailText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		maxWidth: "85%"
	},
	editIcon: {
		height: 20,
		width: 20
	}
})
