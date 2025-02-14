import {
	View,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	Platform,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import BackButton from "../back-button/BackButton"
import NotificationButton from "../notification-button/NotificationButton"
import { theme } from "../../utils/constants"

// Interface for the props of the component
interface ProfileLayoutProps {
	children: React.ReactNode
	title: string
}

export default function ProfileLayout({
	children,
	title
}: ProfileLayoutProps): React.ReactElement | null {
	return (
		// KeyboardAvoidingView handles keyboard overlap with inputs
		<KeyboardAvoidingView
			style={styles.scrollContainer}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{/* ScrollView enables scrolling through content */}
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Main container for profile layout */}
				<View style={styles.container}>
					{/* Background image for profile header */}
					<Image
						source={require("../../assets/images/profile-bg.png")}
						style={styles.bgImage}
						contentFit="fill"
					/>
					{/* Container for main content */}
					<View style={styles.bodyContainer}>
						{/* Header with navigation and notification buttons */}
						<View style={styles.headerContainer}>
							<BackButton
								size="small"
								color="#ffffff"
								backgroundColor="rgba(255, 255, 255, 0.15)"
								borderColor="#ffffff"
							/>
							<NotificationButton theme="dark" mode="app" />
						</View>
						{/* Profile section title */}
						<Text style={styles.titleText}>{title}</Text>
						{/* Card container for profile settings */}
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
