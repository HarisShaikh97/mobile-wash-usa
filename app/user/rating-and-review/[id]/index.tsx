import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import { useLocalSearchParams } from "expo-router"
import RatingsInput from "../../../../components/ratings-input/RatingsInput"
import InputField from "../../../../components/input-field/InputField"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const { id } = useLocalSearchParams()

	const [ratings, setRatings] = useState<number>(0)
	const [review, setReview] = useState<string>("")

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Montserrat-SemiBold": require("../../../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf"),
		"Roboto-Bold": require("../../../../assets/fonts/Roboto/Roboto Bold 700.ttf"),
		"Roboto-Regular": require("../../../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	return (
		<View style={styles.container}>
			<Image
				source={require("../../../../assets/icons/successful.svg")}
				style={styles.checkIcon}
				contentFit="contain"
			/>
			{fontsLoaded && (
				<Text style={styles.titleText}>
					Your Job Has Been Completed!
				</Text>
			)}
			<View style={styles.jobCardContainer}>
				{fontsLoaded && (
					<Text
						style={styles.jobTitleText}
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						Car Wash Service Needed
					</Text>
				)}
				{fontsLoaded && <Text style={styles.budgetText}>$500</Text>}
			</View>
			{fontsLoaded && (
				<Text style={styles.experienceTitleText}>
					How was your experience?
				</Text>
			)}
			{fontsLoaded && (
				<Text style={styles.descriptionText}>
					Your feedback helps us ensure quality service. Rate and
					review below.
				</Text>
			)}
			<RatingsInput size={35} ratings={ratings} setRatings={setRatings} />
			<View style={styles.reviewBoxWrapper}>
				<InputField
					length="full"
					type="text"
					value={review}
					onChangeText={setReview}
					title="Write Your Review"
					multiline={true}
					secureTextEntry={false}
					placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
					size="large"
				/>
			</View>
			<FormButton
				length="full"
				theme="dark"
				title="Submit"
				onPress={() => {}}
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
