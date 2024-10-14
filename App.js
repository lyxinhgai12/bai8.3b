import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const slides = [
  {
    key: 'one',
    title: 'Welcome to Our App',
    text: 'Your journey begins here!',
    image: require('./assets/meow.jpg'),
  },
  {
    key: 'two',
    title: 'Scan QR Codes',
    text: 'Quick and easy scanning.',
    image: require('./assets/meow1.jpg'),
  },
  {
    key: 'three',
    title: 'Enjoy the Features',
    text: 'Explore all functionalities.',
    image: require('./assets/OIP.jpg'),
  },
];

// Màn hình Home
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Scan')}
      >
        <Text style={styles.buttonText}>Go to Scan Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

// Màn hình Scan
function ScanScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Screen</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// Slider giới thiệu
function IntroSlider({ onDone }) {
  const renderSlide = ({ item }) => (
    <ImageBackground source={item.image} style={styles.slide} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </ImageBackground>
  );

  const renderNextButton = () => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  );

  const renderDoneButton = () => (
    <TouchableOpacity style={styles.button} onPress={onDone}>
      <Text style={styles.buttonText}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <AppIntroSlider
      renderItem={renderSlide}
      data={slides}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      onDone={onDone}
    />
  );
}

// Điều hướng chính (Tab)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'Home' ? 'home' : 'qr-code-scanner';
return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
    </Tab.Navigator>
  );
}

// App chính
export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <Stack.Screen name="IntroSlider">
            {(props) => <IntroSlider {...props} onDone={() => setIsFirstLaunch(false)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  text: { fontSize: 16, textAlign: 'center', color: '#fff', marginHorizontal: 20 },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  dot: { backgroundColor: 'gray', width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  activeDot: { backgroundColor: 'black', width: 10, height: 10, borderRadius: 5 },
});