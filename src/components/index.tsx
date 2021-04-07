import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native'
import { SelectorPropTypes, AnyObject } from '../types';
import { constants } from '../utils/constants';
import defaultOption from "./defaultComponent";

const onChangeDefault = () => { };

type Id = string | number;

export const GenerateSelector = ({
    component: Option = defaultOption,
    options = [], initialSelections: savedSelections = [],
    valueKey = 'id', nameKey = 'name',
    onChange = onChangeDefault, formatText = txt => txt,
    multiSelect = false, minSelections = 1, returnJustSelected = false, disabled = false, isRequired = false,
    style = {},
    ...props
}: SelectorPropTypes) => {

    const length = options.length;

    const [selections, setSelections] = useState({});

    const formatSingleSelect = (choises: AnyObject = {}, id: Id) => {
        const localResult = { ...choises };
        let formatedResult = [];
        Object.keys(localResult).forEach(key => {
            localResult[key] = { ...localResult[key], isActive: key == id ? (isRequired ? true : !localResult[key].isActive) : false }
            if (key == id) formatedResult = [localResult[key]];
        });
        return [localResult, formatedResult];
    }

    const formatMultiSelect = (choises: AnyObject = {}, id: Id) => {
        let nSelected = 0;
        for (let key in choises) {
            if (nSelected > minSelections) break;
            if (choises[key].isActive) nSelected++;
        }
        const localResult = {
            ...choises,
            [id]: {
                ...choises[id],
                isActive: isRequired ? (nSelected <= minSelections ? true : !choises[id].isActive) : !choises[id].isActive
            }
        }
        const formatedResult = Object.values(localResult).filter(val => val.isActive);
        return [localResult, formatedResult]
    }

    const getSelection = multiSelect ? formatMultiSelect : formatSingleSelect;

    const onOptionPressed = (id: Id) => {
        const [localResult, formatedResult] = getSelection(selections, id);
        setSelections(localResult);
        onChange(returnJustSelected ? formatedResult : localResult);
    }

    useEffect(() => {
        const initialValues = {};
        options.forEach(option => initialValues[option[valueKey]] = option);
        savedSelections.forEach(id => initialValues[id] = { ...initialValues[id], isActive: true })
        setSelections(initialValues);
    }, [])

    return (
        <View
            style={style}
        >
            {options.map((option, index) =>
                <TouchableOpacity key={index} onPress={() => disabled ? null : onOptionPressed(option[valueKey])} activeOpacity={constants.activeOpacity}>
                    <Option {...props}
                        {...selections[option[valueKey]]}
                        isFirstChild={index === 0}
                        isLastChild={index === length - 1}
                        label={formatText(option[nameKey], option)}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}