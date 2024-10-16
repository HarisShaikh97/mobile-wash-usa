import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { Image } from "expo-image"
import { useFonts } from "expo-font"
import ServiceCard from "../../components/service-card/ServiceCard"
import { services } from "../../utils/constants"
import { Service } from "../../utils/types"

export default function Tab(): React.ReactElement | null {
	const [fontsLoaded] = useFonts({
		"Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat Bold 700.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto/Roboto 400.ttf")
	})

	return (
		<ScrollView
			style={styles.scrollContainer}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				<Image
					source={require("../../assets/images/home-screen-bg.png")}
					style={styles.bgImage}
					contentFit="fill"
				/>
				<View style={styles.bodyContainer}>
					<View style={styles.headerContainer}>
						<TouchableOpacity style={styles.profileButtonContainer}>
							<Image
								source={require("../../assets/images/profile.png")}
								style={styles.profileImage}
								contentFit="cover"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.notificationButtonContainer}
						>
							<Image
								source={require("../../assets/icons/notification.svg")}
								style={styles.notificationIcon}
								contentFit="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.welcomeTextWrapper}>
						{fontsLoaded && (
							<Text style={styles.welcomeHeadingText}>
								Welcome, John
							</Text>
						)}
						{fontsLoaded && (
							<Text style={styles.welcomeDescriptionText}>
								Find top-rated service providers for your
								vehicle, home, and business
							</Text>
						)}
					</View>
					<ScrollView
						style={styles.servicesCardsScrollView}
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View style={styles.servicesCardsScrollContainer}>
							{services.map(
								(
									service: Service,
									index: number
								): React.ReactElement | null => {
									return (
										<ServiceCard
											title={service.title}
											image={service.image}
											key={index}
										/>
									)
								}
							)}
						</View>
					</ScrollView>
				</View>
			</View>
		</ScrollView>
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
		zIndex: -10
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
	profileButtonContainer: {
		height: 55,
		width: 55,
		borderRadius: 13.5,
		borderWidth: 1,
		borderColor: "white",
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center"
	},
	profileImage: {
		height: 60,
		width: 60
	},
	notificationButtonContainer: {
		height: 32.5,
		width: 32.5,
		borderRadius: 5,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		alignItems: "center",
		justifyContent: "center"
	},
	notificationIcon: {
		height: 17.5,
		width: 17.5
	},
	welcomeTextWrapper: {
		width: "100%",
		flexDirection: "column",
		paddingHorizontal: 25
	},
	welcomeHeadingText: {
		fontSize: 30,
		fontFamily: "Montserrat-Bold",
		color: "white"
	},
	welcomeDescriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: "white",
		width: 275
	},
	servicesCardsScrollView: {
		width: "100%",
		marginVertical: 30
	},
	servicesCardsScrollContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingHorizontal: 25
	}
})
