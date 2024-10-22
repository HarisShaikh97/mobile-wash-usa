import { View, StyleSheet } from "react-native"

export default function HorizontalSeparator(): React.ReactElement | null {
	return <View style={styles.horizontalLine} />
}

const styles = StyleSheet.create({
	horizontalLine: {
		height: 1,
		width: "100%",
		backgroundColor: "#DBDBDB"
	}
})
