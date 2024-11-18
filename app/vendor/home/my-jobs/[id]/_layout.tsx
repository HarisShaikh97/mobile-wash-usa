import { ScrollView, View, StyleSheet } from "react-native"
import { Slot, useLocalSearchParams, useRouter } from "expo-router"
import BackButton from "../../../../../components/back-button/BackButton"
import DeleteButton from "../../../../../components/delete-button/DeleteButton"
import JobActionPopup from "../../../../../components/job-action-popup/JobActionPopup"
import { theme } from "../../../../../utils/constants"

export default function Layout(): React.ReactElement | null {
	const { id } = useLocalSearchParams()
	const router = useRouter()

	return (
		<View style={styles.wrapper}>
			<JobActionPopup
				title="Mark As Completed"
				onPress={() => {
					router.navigate("/vendor/job-completion-verification")
				}}
			/>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<BackButton
							color={theme.colors.secondary}
							backgroundColor="transparent"
							borderColor="#F5F5F5"
						/>
						<DeleteButton />
					</View>
					<Slot />
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "white",
		position: "relative"
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 25
	},
	container: {
		flexDirection: "column",
		paddingBottom: 200
	},
	headerContainer: {
		width: "100%",
		paddingVertical: 35,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	}
})
