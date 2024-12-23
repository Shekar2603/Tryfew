import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect , useState } from 'react'
import { ColorsTheme } from '../utils/ColorsTheme';

export default function Timer() {

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2025-02-12T23:59:59"); // Fixed target end date

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timerInterval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    // Update the timer immediately and then every second
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerInterval);
  }, []);
    
const styles = StyleSheet.create({
    bottomTimerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 40,
        paddingHorizontal: 40,
        paddingVertical: 15,
        position: 'absolute',
        bottom: 10,
        backgroundColor: ColorsTheme.White,
        left: 0,
        right: 0,
        marginLeft: 10,
        marginRight: 10,
        elevation: 15,
        borderRadius: 15
      },
      timeBigText: {
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
        color: ColorsTheme.Black
      },
      smallTextTimer : {
        fontSize: 12,
        fontFamily: 'Manrope-Regular',
        color: ColorsTheme.Primary
      },
})

  return (
        <View style={styles.bottomTimerBar}>
            <View>
            <Text style={styles.timeBigText}>{timeLeft.days  ?timeLeft.days : '40'}</Text>
            <Text style={styles.smallTextTimer}>Days</Text>
            </View>
            <View>
            <Text style={styles.timeBigText}>{timeLeft.hours ? timeLeft.hours : '30'}</Text>
            <Text style={styles.smallTextTimer}>Hours</Text>
            </View>
            <View>
            <Text style={styles.timeBigText}>{timeLeft.minutes ? timeLeft.minutes : '50'}</Text>
            <Text style={styles.smallTextTimer}>Mins</Text>
            </View>
            <View>
            <Text style={styles.timeBigText}>{timeLeft.seconds ? timeLeft.seconds : '59'}</Text>
            <Text style={styles.smallTextTimer}>Secs</Text>
            </View>
        </View>
  )
}
