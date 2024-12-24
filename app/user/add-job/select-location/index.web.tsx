import { useState } from "react"
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { ImageBackground, Image } from "expo-image"
import AntDesign from "@expo/vector-icons/AntDesign"
import BackButton from "../../../../components/back-button/BackButton"
import HorizontalSeparator from "../../../../components/horizontal-separator/HorizontalSeparator"
import { theme } from "../../../../utils/constants"

export default function Page(): React.ReactElement | null {
	const [location, setLocation] = useState<string>("")

	return (
		<ImageBackground
			source={require("../../../../assets/images/map-lg-web.png")}
			style={styles.container}
			contentFit="cover"
		>
			<View style={styles.headerContainer}>
				<BackButton
					size="large"
					color="#000000"
					backgroundColor="#ffffff"
					borderColor="transparent"
				/>
				<View style={styles.searchBarContainer}>
					<View style={styles.horizontalWrapper}>
						<Image
							source={require("../../../../assets/icons/location3.svg")}
							style={styles.locationIcon}
							contentFit="contain"
						/>
						<TextInput
							value={location}
							onChangeText={setLocation}
							placeholder="California, USA"
							placeholderTextColor="gray"
							style={styles.textField}
						/>
					</View>
					{location.length > 0 && (
						<View style={styles.searchResultsList}>
							<HorizontalSeparator color="#DDDDDD" />
							<TouchableOpacity style={styles.horizontalWrapper}>
								<Image
									source={require("../../../../assets/icons/location3.svg")}
									style={styles.locationIcon}
									contentFit="contain"
								/>
								<Text style={styles.textField}>
									Current Location
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.horizontalWrapper}>
								<Image
									source={require("../../../../assets/icons/location.svg")}
									style={styles.locationIcon}
									contentFit="contain"
								/>
								<Text style={styles.textField}>
									California, USA
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.horizontalWrapper}>
								<Image
									source={require("../../../../assets/icons/location.svg")}
									style={styles.locationIcon}
									contentFit="contain"
								/>
								<Text style={styles.textField}>
									California, USA
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.horizontalWrapper}>
								<Image
									source={require("../../../../assets/icons/location.svg")}
									style={styles.locationIcon}
									contentFit="contain"
								/>
								<Text style={styles.textField}>
									California, USA
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
			<View style={styles.zoomButtonsWrapper}>
				<TouchableOpacity
					style={[styles.zoomButtonContainer, styles.zoomInButton]}
				>
					<AntDesign name="plus" size={22.5} color="black" />
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.zoomButtonContainer, styles.zoomOutButton]}
				>
					<AntDesign name="minus" size={22.5} color="black" />
				</TouchableOpacity>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		padding: 35
	},
	headerContainer: {
		flexDirection: "row",
		gap: 10
	},
	searchBarContainer: {
		width: 365,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#DDDDDD",
		backgroundColor: "white",
		flexDirection: "column"
	},
	horizontalWrapper: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		padding: 10
	},
	locationIcon: {
		height: 20,
		width: 20
	},
	textField: {
		flex: 1,
		fontSize: 15,
		fontFamily: "Montserrat-Medium",
		color: theme.colors.secondary
	},
	searchResultsList: {
		width: "100%",
		flexDirection: "column"
	},
	zoomButtonsWrapper: {
		flexDirection: "column",
		alignItems: "center",
		alignSelf: "flex-end"
	},
	zoomButtonContainer: {
		height: 50,
		width: 55,
		backgroundColor: "white",
		borderColor: "#F5F5F5",
		alignItems: "center",
		justifyContent: "center"
	},
	zoomInButton: {
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 0.5,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10
	},
	zoomOutButton: {
		borderTopWidth: 0.5,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10
	}
})
