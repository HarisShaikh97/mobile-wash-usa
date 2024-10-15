import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	StyleSheet
} from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import AntDesign from "@expo/vector-icons/AntDesign"
import { theme } from "../../utils/constants"

export default function BottomNav({
	state,
	descriptors,
	navigation
}: BottomTabBarProps): React.ReactElement | null {
	return (
		<ImageBackground
			source={require("../../assets/images/bottom-nav.png")}
			style={styles.bottomNavigationContainer}
			resizeMode="stretch"
		>
			<TouchableOpacity style={styles.addButtonContainer}>
				<AntDesign name="plus" size={27.5} color="white" />
			</TouchableOpacity>
			<View style={styles.navItemsWrapper}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key]
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name

					const isFocused = state.index === index

					const onPress = () => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true
						})

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name, route.params)
						}
					}

					const onLongPress = () => {
						navigation.emit({
							type: "tabLongPress",
							target: route.key
						})
					}

					return (
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityState={
								isFocused ? { selected: true } : {}
							}
							accessibilityLabel={
								options.tabBarAccessibilityLabel
							}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={styles.navItemContainer}
							key={route.name}
						>
							<Text
								style={{
									color: isFocused ? "#673ab7" : "#222"
								}}
							>
								{typeof label === "string" ? label : ""}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	bottomNavigationContainer: {
		height: 100,
		width: "100%",
		zIndex: 50,
		position: "relative"
	},
	addButtonContainer: {
		height: 55,
		width: 55,
		borderRadius: 30,
		backgroundColor: theme.colors.primary,
		position: "absolute",
		top: -12.5,
		left: "50%",
		transform: [{ translateX: -27.5 }],
		alignItems: "center",
		justifyContent: "center"
	},
	navItemsWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between"
	},
	navItemContainer: {
		flexDirection: "column",
		gap: 5
	}
})
