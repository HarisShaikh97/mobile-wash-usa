import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import BackButton from "../../../components/back-button/BackButton"
import { theme } from "../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const handleSelectCustomer = useCallback((): void => {
		router.navigate("/auth/sign-up/customer")
	}, [router])

	const handleSelectVendor = useCallback((): void => {
		router.navigate("/auth/sign-up/vendor")
	}, [router])

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<BackButton
					color="#000000"
					backgroundColor="transparent"
					borderColor="#F5F5F5"
				/>
			</View>
			<View style={styles.bodyContainer}>
				<Text style={styles.titleText}>Welcome</Text>
				<Text style={styles.descriptionText}>
					Are you a Customer or a Vendor?
				</Text>
				<View style={styles.userRolesOptionsWrapper}>
					<TouchableOpacity
						style={styles.userRoleOption}
						onPress={handleSelectCustomer}
					>
						<Text style={styles.userRoleOptionText}>
							I am a Customer
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.userRoleOption}
						onPress={handleSelectVendor}
					>
						<Text style={styles.userRoleOptionText}>
							I am a Vendor
						</Text>
					</TouchableOpacity>
				</View>
				<Image
					source={require("../../../assets/images/sign-up-bg.png")}
					alt="sign-up"
					style={styles.bgImage}
					contentFit="fill"
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white"
	},
	headerContainer: {
		paddingHorizontal: 20,
		paddingVertical: 35
	},
	bodyContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		position: "relative",
		paddingTop: 35
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 35,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 20,
		color: theme.colors.secondary,
		textAlign: "center",
		width: 185,
		paddingTop: 5,
		lineHeight: 20
	},
	bgImage: {
		width: "100%",
		height: 300,
		position: "absolute",
		left: 0,
		bottom: 0,
		zIndex: 0
	},
	userRolesOptionsWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		marginTop: 50,
		zIndex: 10
	},
	userRoleOption: {
		height: 100,
		width: 265,
		borderRadius: 12.5,
		borderWidth: 2,
		borderColor: "#F5F5F5",
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	},
	userRoleOptionText: {
		fontSize: 16.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	}
})
