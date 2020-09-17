const fs = require('fs');
const path = require('path');

function createReactBaseComponent(componentsDir) {
    const content = `import React, { CSSProperties, FunctionComponent } from 'react';

type PreserveAspectRatio = 'nonzero' | 'evenodd' | 'inherit';

export interface IconPorps {
    width?: number;
    height?: number;
    viewBox: string;
    color?: string;
    preserveAspectRatio?: string;
    fillRule?: PreserveAspectRatio;
    style?: CSSProperties;
}

interface BaseIconPorps extends IconPorps {
    d: string;
}

const BaseIcon: FunctionComponent<BaseIconPorps> = ({
    width,
    height,
    viewBox,
    color,
    preserveAspectRatio = 'none',
    fillRule = 'evenodd' as PreserveAspectRatio,
    style,
    d,
}) => {
    const pathStyle = color
        ? {
              ...style,
              fill: color,
          }
        : style;
    return (
        <svg
            width={width}
            height={height}
            viewBox={viewBox}
            preserveAspectRatio={preserveAspectRatio}
        >
            <path fillRule={fillRule} style={pathStyle} d={d} />
        </svg>
    );
};

export default BaseIcon;\n`;
    const iconBaseComponentFile = path.join(componentsDir, 'BaseIcon.tsx');
    fs.writeFileSync(iconBaseComponentFile, content);
}

function createReactComponent(componentsDir, iconInfo) {
    const { name, width, height, fillRule, d } = iconInfo;
    const componentName = name.trim().split(' ').map(
        (str) => str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
    ).join('');
    const componentFile = path.join(componentsDir, `${componentName}Icon.tsx`);
    fs.writeFileSync(componentFile, 'test');
    console.log('componentDir', componentFile);
}

function createReactComponents(outputDir, icons) {
    const componentsDir = path.join(outputDir, 'react-icons');
    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir);
    }
    createReactBaseComponent(componentsDir);
    icons.map((iconInfo) => createReactComponent(componentsDir, iconInfo));
}

module.exports = createReactComponents;
