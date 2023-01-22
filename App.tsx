import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, {
	useAnimatedProps,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import SVG, { Circle } from "react-native-svg";
const BACKGROUND_COLOR = "#444B6F";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA";

const { width, height } = Dimensions.get("window");

const App = () => {
	const CIRCLE_LENGTH = 1000;
	const R = CIRCLE_LENGTH / (2 * Math.PI);
	const AnimatedCircle = Animated.createAnimatedComponent(Circle);

	const progress = useSharedValue(0);

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
	}));

	const progressText = useDerivedValue(() => {
		return `${Math.floor(progress.value * 100)}`;
	});
	return (
		<View style={styles.container}>
			<ReText style={styles.progressText} text={progressText} />
			<SVG style={{ position: "absolute" }}>
				<Circle
					cx={width / 2}
					cy={height / 2}
					r={R}
					stroke={BACKGROUND_STROKE_COLOR}
					strokeWidth={30}
				/>

				<AnimatedCircle
					cx={width / 2}
					cy={height / 2}
					r={R}
					stroke={STROKE_COLOR}
					strokeWidth={15}
					strokeDasharray={CIRCLE_LENGTH}
					animatedProps={animatedProps}
					strokeLinecap={"round"}
				/>
			</SVG>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					progress.value = withTiming(progress.value > 0 ? 0 : 1, {
						duration: 3000,
					});
				}}
			>
				<Text style={styles.buttonText}>Run</Text>
			</TouchableOpacity>
		</View>
	);
};
export default App;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: BACKGROUND_COLOR,
		alignItems: "center",
		justifyContent: "center",
	},
	progressText: {
		paddingHorizontal: 50,
		fontSize: 70,
		color: "rgba(256,256,256,.8)",
		fontWeight: "100",
		letterSpacing: 2,
	},
	button: {
		bottom: 80,
		backgroundColor: BACKGROUND_STROKE_COLOR,
		width: width * 0.7,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		borderRadius: 30,
		height: 60,
	},
	buttonText: {
		fontSize: 30,
		color: "rgba(256,256,256,.8)",
		letterSpacing: 0.5,
	},
});
