import {
	View,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	Platform,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import BackButton from "../back-button/BackButton"
import NotificationButton from "../notification-button/NotificationButton"
import { theme } from "../../utils/constants"

interface ProfileLayoutProps {
	children: React.ReactNode
	title: string
}

export default function ProfileLayout({
	children,
	title
}: ProfileLayoutProps): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat SemiBold 600.ttf")
	})

	return (
		<KeyboardAvoidingView
			style={styles.scrollContainer}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<Image
						source={require("../../assets/images/profile-bg.png")}
						style={styles.bgImage}
						contentFit="fill"
					/>
					<View style={styles.bodyContainer}>
						<View style={styles.headerContainer}>
							<BackButton
								color="#ffffff"
								backgroundColor="rgba(255, 255, 255, 0.15)"
								borderColor="#ffffff"
							/>
							<NotificationButton theme="dark" />
						</View>
						{fontsLoaded && (
							<Text style={styles.titleText}>{title}</Text>
						)}
						<View style={styles.accountSettingsCard}>
							{children}
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		width: "100%",
		position: "relative"
	},
	bgImage: {
		height: 300,
		width: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: -10,
		backgroundColor: theme.colors.primary
	},
	bodyContainer: {
		width: "100%",
		zIndex: 10,
		flexDirection: "column"
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 25
	},
	titleText: {
		fontSize: 25,
		fontFamily: "Montserrat-SemiBold",
		color: "white",
		alignSelf: "center"
	},
	accountSettingsCard: {
		width: "100%",
		backgroundColor: "white",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 25,
		paddingTop: 30,
		marginTop: 35
	}
})
