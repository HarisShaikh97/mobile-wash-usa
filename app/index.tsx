import { useState, useEffect, useCallback, useMemo } from "react"
import {
	View,
	Text,
	TouchableOpacity,
	ImageSourcePropType,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useFonts } from "expo-font"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withDelay,
	withSequence,
	runOnJS
} from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient"
import { theme } from "../utils/constants"

const backgroundImages: ImageSourcePropType[] = [
	require("../assets/images/background1.png"),
	require("../assets/images/background2.png"),
	require("../assets/images/background3.png"),
	require("../assets/images/background4.png")
]

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
	const [nextImageIndex, setNextImageIndex] = useState<number>(1)

	const opacity = useSharedValue<number>(1)

	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Regular": require("../assets/fonts/Roboto/Roboto 400.ttf"),
		"Roboto-Medium": require("../assets/fonts/Roboto/Roboto Medium 500.ttf")
	})

	const updateCurrentImageIndex = useCallback((): void => {
		setCurrentImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImages.length
		)
	}, [])

	const updateNextImageIndex = useCallback((): void => {
		setNextImageIndex(
			(prevIndex) => (prevIndex + 1) % backgroundImages.length
		)
	}, [])

	const triggerAnimation = useCallback((): void => {
		opacity.value = withSequence(
			withTiming(0, { duration: 500 }, (finished) => {
				if (finished) {
					runOnJS(updateCurrentImageIndex)()
				}
			}),
			withDelay(
				100,
				withTiming(1, { duration: 50 }, (finished) => {
					if (finished) {
						runOnJS(updateNextImageIndex)()
					}
				})
			)
		)
	}, [opacity, updateCurrentImageIndex, updateNextImageIndex])

	const bgImage = useAnimatedStyle(
		() => ({
			opacity: opacity.value
		}),
		[opacity]
	)

	useEffect(() => {
		const intervalId = setInterval(triggerAnimation, 2500)
		return () => clearInterval(intervalId)
	}, [triggerAnimation])

	const currentImage = useMemo(
		() => backgroundImages[currentImageIndex],
		[currentImageIndex]
	)

	const nextImage = useMemo(
		() => backgroundImages[nextImageIndex],
		[nextImageIndex]
	)

	const handleLogin = useCallback((): void => {
		router.navigate("/login")
	}, [router])

	return (
		<View style={styles.container}>
			<Animated.Image
				source={currentImage}
				style={[
					styles.background,
					styles.currentBackgroundImage,
					bgImage
				]}
				resizeMode="cover"
			/>
			<Animated.Image
				source={nextImage}
				style={[styles.background, styles.nextBackgroundImage]}
				resizeMode="cover"
			/>
			<View style={[styles.background, styles.overlay]}>
				<LinearGradient
					colors={["transparent", "black"]}
					start={{ x: 0, y: 0.25 }}
					end={{ x: 0, y: 0.75 }}
					style={styles.backgroundGradient}
				>
					{fontsLoaded && (
						<Text style={styles.salutationText}>
							Let’s Get Started
						</Text>
					)}
					{fontsLoaded && (
						<Text style={styles.descriptionText} numberOfLines={4}>
							Please Log In Or Sign Up To Find The Best Service
							Providers For All Your Vehicle, Residential, And
							Commercial Wash And Maintenance Needs.
						</Text>
					)}
					<View style={styles.actionButtonsWrapper}>
						<TouchableOpacity
							style={[styles.actionButton, styles.loginButton]}
							onPress={handleLogin}
						>
							{fontsLoaded && (
								<Text style={styles.actionButtonText}>
									Login
								</Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.actionButton, styles.signUpButton]}
						>
							{fontsLoaded && (
								<Text style={styles.actionButtonText}>
									Sign Up
								</Text>
							)}
						</TouchableOpacity>
					</View>
					{fontsLoaded && (
						<Text style={styles.socialLoginText}>
							Or Via Google And Facebook
						</Text>
					)}
					<View style={styles.socialLoginButtonsWrapper}>
						<TouchableOpacity style={styles.socialLoginButton}>
							<Image
								source={require("../assets/icons/google.svg")}
								alt="google"
								style={styles.socialIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.socialLoginButton}>
							<Image
								source={require("../assets/icons/facebook.svg")}
								alt="google"
								style={styles.socialIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
				</LinearGradient>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative"
	},
	background: {
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		width: "100%"
	},
	currentBackgroundImage: {
		zIndex: 10
	},
	nextBackgroundImage: {
		zIndex: -10
	},
	overlay: {
		zIndex: 100,
		justifyContent: "flex-end",
		backgroundColor: "rgba(26, 61, 124, 0.25)"
	},
	backgroundGradient: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-end",
		gap: 7.5,
		paddingBottom: 15
	},
	salutationText: {
		fontSize: 30,
		fontFamily: "Montserrat-Bold",
		color: "white"
	},
	descriptionText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		color: "white",
		width: 275,
		textAlign: "center"
	},
	actionButtonsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		marginVertical: 20
	},
	actionButton: {
		height: 50,
		width: 115,
		borderRadius: 10,
		borderWidth: 1.5,
		alignItems: "center",
		justifyContent: "center"
	},
	actionButtonText: {
		fontSize: 15,
		color: "white",
		fontFamily: "Roboto-Medium"
	},
	loginButton: {
		backgroundColor: theme.colors.primary
	},
	signUpButton: {
		borderColor: theme.colors.primary
	},
	socialLoginText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: "white",
		marginTop: 15
	},
	socialLoginButtonsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		marginVertical: 10
	},
	socialLoginButton: {
		height: 50,
		width: 70,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#1C1C1C"
	},
	socialIcon: {
		height: 20,
		width: 20
	}
})
