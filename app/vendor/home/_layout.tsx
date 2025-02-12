import { Tabs } from "expo-router"
import BottomNav from "../../../components/bottom-nav/BottomNav"

export default function Layout(): React.ReactElement | null {
	return (
		// Main navigation tabs container
		<Tabs
			screenOptions={{ headerShown: false }} // Hide default header
			tabBar={(props) => <BottomNav {...props} />} // Custom bottom navigation component
		>
			{/* Home tab - Main dashboard */}
			<Tabs.Screen
				name="index"
				options={{
					title: "Home"
				}}
			/>
			{/* My Jobs tab - Shows vendor's assigned jobs */}
			<Tabs.Screen
				name="my-jobs"
				options={{
					title: "My Jobs"
				}}
			/>
			{/* Messages tab - Communication center */}
			<Tabs.Screen
				name="messages"
				options={{
					title: "Messages"
				}}
			/>
			{/* Profile tab - User settings and information */}
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile"
				}}
			/>
		</Tabs>
	)
}
