import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import AddJobWebLayout from "../../../../components/add-job-web-layout/AddJobWebLayout"
import BackButton from "../../../../components/back-button/BackButton"
import FormButton from "../../../../components/form-button/FormButton"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const handleSubmit = useCallback(() => {
		router.navigate("/user/add-job/select-payment-method")
	}, [router])

	return (
		<AddJobWebLayout>
			<View style={styles.container}>
				<Text style={styles.titleText}>Review Your Job Posting</Text>
				<View style={styles.jobDetailsWrapper}>
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							Car Wash At Home
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							Vehicle
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							Looking for a thorough exterior and interior car
							wash for my SUV.
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							$500
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job/details")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							2972 Westheimer Rd. Santa Ana, Illinois 85486
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job/details")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.jobDetailContainer}>
						<Text
							style={styles.jobDetailText}
							numberOfLines={2}
							ellipsizeMode="tail"
						>
							October 5, 2024 at 2:00 PM
						</Text>
						<TouchableOpacity
							onPress={() => {
								router.navigate("/user/add-job/details")
							}}
						>
							<Image
								source={require("../../../../assets/icons/edit.svg")}
								style={styles.editIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.formButtonWrapper}>
						<FormButton
							length="full"
							theme="dark"
							title="Next"
							onPress={handleSubmit}
						/>
					</View>
				</View>
			</View>
		</AddJobWebLayout>
	)
}

const styles = StyleSheet.create({
	titleText: {
		fontSize: 35,
		fontFamily: "Montserrat-Bold",
		color: theme.colors.secondary
	},
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 35
	},
	jobDetailsWrapper: {
		width: "85%",
		flexDirection: "column",
		alignItems: "center",
		gap: 17.5
	},
	jobDetailContainer: {
		width: "100%",
		paddingHorizontal: 15,
		paddingVertical: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(173, 173, 173, 0.2)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	jobDetailText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary,
		maxWidth: "85%"
	},
	editIcon: {
		height: 20,
		width: 20
	},
	formButtonWrapper: {
		width: "75%"
	}
})
