import { Tabs } from "expo-router"
import SideNavWeb from "../../../components/side-nav-web/SideNavWeb"

export default function Layout(): React.ReactElement | null {
	return (
		<Tabs
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <SideNavWeb {...props} />}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home"
				}}
			/>
			<Tabs.Screen
				name="my-jobs"
				options={{
					title: "My Jobs"
				}}
			/>
			<Tabs.Screen
				name="messages"
				options={{
					title: "Messages"
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile"
				}}
			/>
		</Tabs>
	)
}
