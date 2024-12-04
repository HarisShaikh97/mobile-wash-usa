import { useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image, ImageBackground } from "expo-image"
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
		<ImageBackground
			source={require("../../../assets/images/sign-up-bg-web.png")}
			style={styles.container}
			contentFit="fill"
		>
			<Image
				source={require("../../../assets/images/sign-up-bg-web2.png")}
				style={styles.bgImage}
				contentFit="fill"
			/>
			<BackButton
				size="large"
				color="#000000"
				backgroundColor="#ffffff"
				borderColor="transparent"
			/>
			<View style={styles.bodyContainer}>
				<View style={styles.cardContainer}>
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
				</View>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#F3F8FE",
		position: "relative",
		padding: 35
	},
	bgImage: {
		height: "100%",
		width: 875,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 0
	},
	bodyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 10
	},
	cardContainer: {
		width: 550,
		borderRadius: 25,
		backgroundColor: "white",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 50
	},
	titleText: {
		fontFamily: "Montserrat-Bold",
		fontSize: 42.5,
		color: theme.colors.secondary,
		textAlign: "center"
	},
	descriptionText: {
		fontFamily: "Roboto-Regular",
		fontSize: 22.5,
		color: theme.colors.secondary,
		textAlign: "center",
		paddingTop: 5,
		lineHeight: 20
	},
	userRolesOptionsWrapper: {
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		marginTop: 50
	},
	userRoleOption: {
		height: 115,
		width: 285,
		borderRadius: 12.5,
		borderWidth: 2,
		borderColor: "#F5F5F5",
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center"
	},
	userRoleOptionText: {
		fontSize: 18.5,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary
	}
})
