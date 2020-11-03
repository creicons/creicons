import { Group, Shape, Surface } from '@react-native-community/art';
import React, { FunctionComponent } from 'react';

export interface IconPorps {
    width?: number;
    height?: number;
    color?: string;
}

interface BaseIconPorps extends IconPorps {
    d: string;
    scale: number;
}

const BaseIcon: FunctionComponent<BaseIconPorps> = ({ width = 0, height = 0, color, d, scale }) => {
    return (
        <Surface width={width} height={height}>
            <Group scale={scale}>
                <Shape fill={color} d={d} />
            </Group>
        </Surface>
    );
};

export default BaseIcon;
