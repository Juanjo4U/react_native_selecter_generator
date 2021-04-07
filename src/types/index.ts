import React, { ComponentType } from 'react';

type AnyFunction = (...args: any[]) => any;

export interface AnyObject {
    [x: string]: any,
    [x: number]: any
}

export interface SelectorPropTypes {
    component: ComponentType<any>,
    options?: Array<AnyObject>,
    initialSelections?: Array<string | number>,
    valueKey?: string,
    nameKey?: string,
    onChange?: AnyFunction,
    formatText?: AnyFunction,
    multiSelect?: boolean,
    minSelections?: number,
    returnJustSelected?: boolean,
    disabled?: boolean,
    isRequired?: boolean,
    style?: AnyObject,
    [x: string]: any,
    [x: number]: any
}