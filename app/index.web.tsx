import { useState, useCallback, useMemo } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { useRouter, useFocusEffect } from "expo-router"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withDelay,
	withSequence,
	runOnJS
} from "react-native-reanimated"
import { BlurView } from "expo-blur"
import { theme, backgroundImages } from "../utils/constants"

export default function Page(): React.ReactElement | null {
	const router = useRouter()

	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
	const [nextImageIndex, setNextImageIndex] = useState<number>(1)

	const opacity = useSharedValue<number>(1)

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

	useFocusEffect(
		useCallback((): (() => void) => {
			const intervalId = setInterval(triggerAnimation, 2500)

			return (): void => {
				clearInterval(intervalId)
				opacity.value = 1
			}
		}, [triggerAnimation])
	)

	const currentImage = useMemo(
		() => backgroundImages[currentImageIndex],
		[currentImageIndex]
	)

	const nextImage = useMemo(
		() => backgroundImages[nextImageIndex],
		[nextImageIndex]
	)

	const handleLogin = useCallback((): void => {
		router.navigate("/auth/login")
	}, [router])

	const handleSignUp = useCallback((): void => {
		router.navigate("/auth/sign-up")
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
				<View style={styles.cardContainer}>
					<Image
						source={require("../assets/logo/logo.png")}
						style={styles.logoImage}
						contentFit="contain"
					/>
					<Text style={styles.salutationText}>Let’s Get Started</Text>
					<Text style={styles.descriptionText} numberOfLines={4}>
						Please Log In Or Sign Up To Find The Best Service
						Providers For All Your Vehicle, Residential, And
						Commercial Wash And Maintenance Needs.
					</Text>
					<View style={styles.buttonsWrapper}>
						<TouchableOpacity
							style={[styles.actionButton, styles.signUpButton]}
							onPress={handleSignUp}
						>
							<Text style={styles.actionButtonText}>Sign Up</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.actionButton, styles.loginButton]}
							onPress={handleLogin}
						>
							<Text style={styles.actionButtonText}>Login</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.descriptionText}>
						Or Via Google And Facebook
					</Text>
					<View style={styles.buttonsWrapper}>
						<TouchableOpacity>
							<BlurView
								intensity={18}
								tint="light"
								style={styles.socialLoginButton}
							>
								<Image
									source={require("../assets/icons/google.svg")}
									alt="google"
									style={styles.socialIcon}
									contentFit="contain"
								/>
							</BlurView>
						</TouchableOpacity>
						<TouchableOpacity>
							<BlurView
								intensity={18}
								tint="light"
								style={styles.socialLoginButton}
							>
								<Image
									source={require("../assets/icons/facebook.svg")}
									alt="google"
									style={styles.socialIcon}
									contentFit="contain"
								/>
							</BlurView>
						</TouchableOpacity>
					</View>
				</View>
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
		alignItems: "center",
		justifyContent: "center"
	},
	cardContainer: {
		width: 675,
		borderRadius: 25,
		backgroundColor: "rgba(26, 61, 124, 0.85)",
		flexDirection: "column",
		alignItems: "center",
		paddingVertical: 25
	},
	logoImage: {
		height: 185,
		width: 185,
		marginVertical: 15
	},
	salutationText: {
		fontSize: 50,
		fontFamily: "Montserrat-Bold",
		color: "white"
	},
	descriptionText: {
		fontSize: 17.5,
		fontFamily: "Roboto-Light",
		color: "white",
		width: 400,
		textAlign: "center",
		lineHeight: 25
	},
	buttonsWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		marginVertical: 20
	},
	actionButton: {
		height: 55,
		width: 150,
		borderRadius: 12.5,
		alignItems: "center",
		justifyContent: "center"
	},
	actionButtonText: {
		fontSize: 16.5,
		color: "white",
		fontFamily: "Roboto-Medium",
		letterSpacing: 0.5
	},
	loginButton: {
		backgroundColor: theme.colors.primary
	},
	signUpButton: {
		borderColor: theme.colors.primary,
		borderWidth: 2
	},
	socialLoginButton: {
		height: 55,
		width: 75,
		borderRadius: 12.5,
		alignItems: "center",
		justifyContent: "center"
	},
	socialIcon: {
		height: 22.5,
		width: 22.5
	}
})
