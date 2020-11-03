const fs = require('fs');
const path = require('path');

function createReactNativeBaseComponent(componentsDir) {
    const content = `import { Group, Shape, Surface } from '@react-native-community/art';
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
`;
    const iconBaseComponentFile = path.join(componentsDir, 'BaseIcon.tsx');
    fs.writeFileSync(iconBaseComponentFile, content);
}

function createReactNativeComponent(componentsDir, iconInfo) {
    const { info = {} } = iconInfo;
    const { componentName, width, height, d } = info;

    const content = `import React, { FunctionComponent } from 'react';
import BaseIcon, { IconPorps } from './BaseIcon';

const d = '${d}';
const defaultWidth = ${width};
const defaultHeight = ${height};

const ${componentName}: FunctionComponent<IconPorps> = ({
    width = defaultWidth,
    height = defaultHeight,
    color,
}) => {
    return (
        <BaseIcon d={d} width={width} height={height} scale={width / defaultWidth} color={color} />
    );
};

export default ${componentName};
`;
    const componentFile = path.join(componentsDir, `${componentName}.tsx`);
    fs.writeFileSync(componentFile, content);
}

function createReactNativeComponents(outputDir, icons) {
    const componentsDir = path.join(outputDir, 'react-native-icons');
    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir);
    }
    createReactNativeBaseComponent(componentsDir);
    icons.map((iconInfo) => createReactNativeComponent(componentsDir, iconInfo));
}

module.exports = createReactNativeComponents;
