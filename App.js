/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React , {useEffect , useState}from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  BackHandler
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MainNavigation from './Screens/Navigation/MainNavigation';


function Section({children, title}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}




function App() {

  useEffect(() => {
    const backAction = () => {
        // Optionally show an alert or do nothing to disable back button
        // Alert.alert("Hold on!", "You cannot go back from this screen.", [
        //     { text: "OK", onPress: () => null, style: "cancel" }
        // ]);
        return true;  // Returning true prevents the default back action
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove();  // Cleanup on unmount
}, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
        <MainNavigation/>
  );
}

// <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
    //         screen and then come back to see your edits.
    //       </Section>
    //       <Section title="See Your Changes">
    //         <ReloadInstructions />
    //       </Section>
    //       <Section title="Debug">
    //         <DebugInstructions />
    //       </Section>
    //       <Section title="Learn More">
    //         Read the docs to discover what to do next:
    //       </Section>
    //       <LearnMoreLinks />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
