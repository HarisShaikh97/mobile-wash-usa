import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import HorizontalSeparator from "../horizontal-separator/HorizontalSeparator"
import { theme } from "../../utils/constants"

interface AccountStatusCardProps {
	setType: (type: "delete" | "deactivate") => void
	setOpenModal: (open: boolean) => void
}

export default function AccountStatusCardWeb({
	setType,
	setOpenModal
}: AccountStatusCardProps): React.ReactElement | null {
	const router = useRouter()

	const handleDeleteAccount = useCallback(() => {
		setType("delete")
		setOpenModal(true)
	}, [setType, setOpenModal])

	const handleDeactivateAccount = useCallback(() => {
		setType("deactivate")
		setOpenModal(true)
	}, [setType, setOpenModal])

	return (
		<View style={styles.container}>
			<View style={styles.titleWrapper}>
				<Text style={styles.titleText}>Manage your account status</Text>
				<Text style={styles.descriptionText}>
					You can choose to deactivate your account temporarily or
					delete it permanently. Please select an option below.
				</Text>
			</View>
			<View style={styles.accountActionsCard}>
				<View style={styles.accountActionSection}>
					<Text style={styles.cardTitleText}>Deactivate Account</Text>
					<Text style={styles.cardDescriptionText}>
						Temporarily deactivate your account. You won’t be able
						to access it, but all your data will remain saved. You
						can reactivate at any time by logging in again.
					</Text>
					<TouchableOpacity
						style={styles.accountActionButton}
						onPress={handleDeactivateAccount}
					>
						<Text style={styles.accountActionButtonText}>
							Deactivate Account
						</Text>
					</TouchableOpacity>
				</View>
				<HorizontalSeparator color="#DBDBDB" />
				<View style={styles.accountActionSection}>
					<Text style={styles.cardTitleText}>Delete Account</Text>
					<Text style={styles.cardDescriptionText}>
						Permanently delete your account. All your data will be
						erased, and this action cannot be undone.
					</Text>
					<TouchableOpacity
						style={styles.accountActionButton}
						onPress={handleDeleteAccount}
					>
						<Text style={styles.accountActionButtonText}>
							Delete Account
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 775,
		flexShrink: 1,
		alignSelf: "flex-start",
		flexDirection: "row",
		gap: 25,
		borderRadius: 17.5,
		backgroundColor: "white",
		padding: 25
	},
	accountActionsCard: {
		flex: 1,
		flexDirection: "column",
		gap: 25,
		paddingHorizontal: 17.5,
		paddingVertical: 22.5,
		borderRadius: 15,
		backgroundColor: "#F4F6F9"
	},
	accountActionSection: {
		width: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		gap: 5
	},
	accountActionButton: {
		height: 40,
		borderRadius: 7.5,
		borderWidth: 1,
		borderColor: "#DBDBDB",
		paddingHorizontal: 20,
		justifyContent: "center",
		marginTop: 15
	},
	accountActionButtonText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Regular",
		lineHeight: 17.5,
		color: theme.colors.secondary
	},
	cardTitleText: {
		fontSize: 13.5,
		fontFamily: "Roboto-Medium",
		color: theme.colors.secondary
	},
	cardDescriptionText: {
		fontSize: 12.5,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary
	},
	titleWrapper: {
		flex: 1,
		flexDirection: "column",
		gap: 10
	},
	titleText: {
		fontSize: 25,
		fontFamily: "Montserrat-SemiBold",
		color: theme.colors.secondary,
		textTransform: "capitalize",
		width: 200
	},
	descriptionText: {
		fontSize: 15,
		fontFamily: "Roboto-Regular",
		color: theme.colors.secondary,
		width: 300
	}
})
