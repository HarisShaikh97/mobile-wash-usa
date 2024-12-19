import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import Feather from "@expo/vector-icons/Feather"
import HorizontalSeparator from "../horizontal-separator/HorizontalSeparator"
import { theme } from "../../utils/constants"

export default function SecurityFeaturesCardWeb(): React.ReactElement | null {
	const router = useRouter()

	return (
		<View style={styles.container}>
			<Text style={styles.cardTitleText}>Security Features</Text>
			<HorizontalSeparator color="#DBDBDB" />
			<View style={styles.settingOptionContainer}>
				<View style={styles.settingOption}>
					<Text style={styles.settingOptionText}>Password Reset</Text>
					<TouchableOpacity
						onPress={() => {
							router.navigate("/user/security/reset-password")
						}}
					>
						<Feather
							name="chevron-right"
							size={17.5}
							color={theme.colors.secondary}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.settingOption}>
					<Text style={styles.settingOptionText}>Report Abuse</Text>
					<TouchableOpacity>
						<Feather
							name="chevron-right"
							size={17.5}
							color={theme.colors.secondary}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 365,
		flexShrink: 1,
		alignSelf: "flex-start",
		flexDirection: "column",
		gap: 17.5,
		borderRadius: 17.5,
		backgroundColor: "white",
		padding: 25
	},
	cardTitleText: {
		fontSize: 15,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	settingOptionContainer: {
		width: "100%",
		flexDirection: "column",
		gap: 25,
		paddingVertical: 10
	},
	settingOption: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	settingOptionText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	}
})
