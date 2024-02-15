import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import modules from 'modules';

type ButtonProps = {
    text: string;
} & ComponentPropsWithoutRef<typeof TouchableOpacity>;

const Button = forwardRef<View | null, ButtonProps>(
    ({ text, ...TouchableOpacityProps }, ref) => {
        return (
            <TouchableOpacity ref={ref} {...TouchableOpacityProps} style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: modules.PRIMARY,
        padding: 15,
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
});

export default Button;