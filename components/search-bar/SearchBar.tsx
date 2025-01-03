import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { Image } from "expo-image"
import AntDesign from "@expo/vector-icons/AntDesign"
import { RgbaColor, HexColor } from "../../utils/types"
import { theme } from "../../utils/constants"

interface SearchBarBaseProps {
	placeholder: string
	color: RgbaColor | HexColor | "transparent"
	backgroundColor: RgbaColor | HexColor | "transparent"
	borderColor: RgbaColor | HexColor | "transparent"
	value: string
	onChangeText: (text: string) => void
	mode: "app" | "web"
}

interface SearchBarFilterEnabledProps extends SearchBarBaseProps {
	filterEnabled: true
	setOpenFilterModal: (value: boolean) => void
}

interface SearchBarFilterDisabledProps extends SearchBarBaseProps {
	filterEnabled: false
}

type SearchBarProps = SearchBarFilterEnabledProps | SearchBarFilterDisabledProps

export default function SearchBar(
	props: SearchBarProps
): React.ReactElement | null {
	return (
		<View
			style={[
				styles.container,
				props.mode === "app"
					? styles.containerApp
					: styles.containerWeb,
				{
					borderColor: props.borderColor,
					backgroundColor: props.backgroundColor
				}
			]}
		>
			<View style={styles.inputFieldWrapper}>
				<AntDesign name="search1" size={15} color="#CACACA" />
				<TextInput
					style={styles.inputField}
					value={props.value}
					onChangeText={props.onChangeText}
					placeholder={props.placeholder}
					placeholderTextColor={"#CACACA"}
				/>
			</View>
			{props.filterEnabled ? (
				<TouchableOpacity
					style={[
						styles.filterButton,
						props.mode === "app"
							? styles.filterButtonApp
							: styles.filterButtonWeb
					]}
					onPress={() => {
						props.setOpenFilterModal(true)
					}}
				>
					<View style={styles.activeMarker} />
					<Image
						source={require("../../assets/icons/filter.svg")}
						style={
							props.mode === "app"
								? styles.filterIconApp
								: styles.filterIconWeb
						}
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
		borderRadius: 10,
		backgroundColor: theme.colors.primary,
		alignItems: "center",
		justifyContent: "center",
		position: "relative"
	},
	filterButtonApp: {
		width: 50
	},
	filterButtonWeb: {
		width: 60
	},
	filterIconApp: {
		height: 30,
		width: 30
	},
	filterIconWeb: {
		height: 37.5,
		width: 37.5
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
