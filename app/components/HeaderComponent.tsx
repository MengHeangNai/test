import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import SafeArea from './SafeArea'
import _styles from '@styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FontGSansSemiBold, NokoraRegular, fontGSans } from 'customs/customFont'
import BottomShadow from './BottomShadow'
import PressableScale from './PressableScale'
import modules from 'modules'
import { Calendar, LocaleConfig } from 'react-native-calendars';

type Props = {}

const date = new Date()
const monthData = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let Month = monthData[date.getMonth()];

const HeaderComponent = (props: Props) => {
    const [selected, setSelected] = useState('');
    return (
        <View
        >
            <StatusBar backgroundColor={modules.LIGHT_BLACK} barStyle="light-content" />
            <SafeArea edges={'safeTop'} style={{ backgroundColor: modules.LIGHT_BLACK }} />
            <BottomShadow>
                <View style={styles.container}>
                    <PressableScale>
                        <Ionicons name="filter" style={styles.menuIcon} />
                    </PressableScale>
                    <PressableScale style={[_styles.rows, _styles.flx1]}>
                        <Text style={styles.month}>{Month}</Text>
                        <Ionicons name={'caret-down-sharp'} style={styles.smallIcon} />
                    </PressableScale>
                    <PressableScale style={{ ..._styles.rows, }}>
                        <Ionicons name="search" style={styles.searchIcon} />

                    </PressableScale>
                    <PressableScale style={styles.circle}>
                    </PressableScale>
                </View>
                <Calendar
                    // disabledByDefault={true}

                    enableSwipeMonths={true}
                    hideArrows={true}
                    hideExtraDays={true}
                    onDayPress={(day: { dateString: React.SetStateAction<string> }) => {
                        setSelected(day.dateString);
                    }}
                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true, }
                    }}
                    style={{
                        paddingHorizontal: modules.BODY_HORIZONTAL_12,
                        backgroundColor: modules.LIGHT_BLACK,
                    }}
                    theme={{
                        backgroundColor: modules.LIGHT_BLACK,
                        calendarBackground: modules.LIGHT_BLACK,
                        textSectionTitleColor: modules.WHITE,
                        textSectionTitleDisabledColor: modules.WHITE,
                        selectedDayBackgroundColor: modules.BLUE,
                        selectedDayTextColor: modules.WHITE,
                        todayTextColor: modules.WHITE,
                        dayTextColor: modules.WHITE,
                        textDisabledColor: modules.WHITE,
                        dotColor: modules.WHITE,
                        selectedDotColor: modules.WHITE,
                        disabledArrowColor: modules.WHITE,
                        monthTextColor: 'purple',
                        indicatorColor: modules.ENGLISH,
                    }}
                />

            </BottomShadow>
        </View>
    )
}

export default HeaderComponent


const styles = StyleSheet.create({

    container: {
        ..._styles.rows,
        backgroundColor: modules.LIGHT_BLACK,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.65,

        elevation: 6,
        paddingVertical: modules.GRID_SPACING,
    },

    circle: {
        height: 35,
        width: 35,
        borderRadius: 100,
        backgroundColor: modules.SPOTIFY_GREEN,
        marginRight: modules.BODY_HORIZONTAL_12
    },

    menuIcon: {
        fontSize: modules.FONT_H3 + 3,
        color: modules.WHITE,
        marginHorizontal: modules.PADDING,
    },

    searchIcon: {
        fontSize: modules.FONT_H2,
        color: modules.WHITE,
        marginHorizontal: modules.PADDING,
    },

    smallIcon: {
        fontSize: modules.FONT_S,
        color: modules.WHITE,
        marginHorizontal: modules.SPACE,
    },

    month: {
        ...fontGSans,
        color: modules.WHITE,
        fontSize: modules.FONT_H3,
    }
})