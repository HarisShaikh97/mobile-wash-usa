import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { Image } from "expo-image"
import AntDesign from "@expo/vector-icons/AntDesign"
import { RgbaColor, HexColor } from "../../utils/types"
import { theme } from "../../utils/constants"

interface SearchBarProps {
	placeholder: string
	color: RgbaColor | HexColor | "transparent"
	backgroundColor: RgbaColor | HexColor | "transparent"
	value: string
	onChangeText: (text: string) => void
	filterEnabled: boolean
	setOpenFilterModal?: (value: boolean) => void
	mode: "app" | "web"
}

export default function SearchBar({
	placeholder,
	color,
	backgroundColor,
	value,
	onChangeText,
	filterEnabled,
	setOpenFilterModal,
	mode
}: SearchBarProps): React.ReactElement | null {
	return (
		<View
			style={[
				styles.container,
				mode === "app" ? styles.containerApp : styles.containerWeb,
				{
					borderColor: mode === "app" ? color : "transparent",
					backgroundColor: backgroundColor
				}
			]}
		>
			<View style={styles.inputFieldWrapper}>
				<AntDesign name="search1" size={15} color="#CACACA" />
				<TextInput
					style={styles.inputField}
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor={"#CACACA"}
				/>
			</View>
			{filterEnabled && setOpenFilterModal ? (
				<TouchableOpacity
					style={styles.filterButton}
					onPress={() => {
						setOpenFilterModal(true)
					}}
				>
					<View style={styles.activeMarker} />
					<Image
						source={require("../../assets/icons/filter.svg")}
						style={styles.filterIcon}
						contentFit="contain"
					/>
				</TouchableOpacity>
			) : (
				<View style={styles.emptyView} />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		width: "100%",
		borderRadius: 10,
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 10
	},
	containerApp: {
		height: 50,
		width: "100%",
		borderRadius: 10,
		borderWidth: 1
	},
	containerWeb: {
		height: 60,
		width: 365,
		borderRadius: 10
	},
	inputFieldWrapper: {
		height: "100%",
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 12.5,
		paddingHorizontal: 15
	},
	inputField: {
		height: "100%",
		flexGrow: 1,
		fontSize: 12.5
	},
	emptyView: {
		width: 15
	},
	filterButton: {
		height: "100%",
		width: 50,
		borderRadius: 10,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center",
		position: "relative"
	},
	filterIcon: {
		height: 30,
		width: 30
	},
	activeMarker: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: "red",
		position: "absolute",
		top: -0.5,
		right: -0.5,
		zIndex: 10
	}
})
