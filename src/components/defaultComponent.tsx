import React from 'react';
import { View, Text } from 'react-native';
import { color } from '../colors';

export default (props: any) =>
    <View style={{
        ...props.isActive && { backgroundColor: color.OptionSelectedBackground },
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }} >
        <Text style={{ color: props.isActive ? color.OptionSelectedTextColor : 'black' }} >
            {JSON.stringify(props)}
        </Text>
    </View>