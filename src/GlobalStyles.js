import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,       
        paddingTop: Platform.OS === 'android' ? 0 : 0
    },
});