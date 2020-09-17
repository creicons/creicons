const fs = require('fs');
const path = require('path');

function createReactBaseComponent(componentsDir) {
    const content = `import React, { CSSProperties, FunctionComponent } from 'react';

export type PreserveAspectRatio = 'nonzero' | 'evenodd' | 'inherit';

export interface IconPorps {
    width?: number;
    height?: number;
    color?: string;
    preserveAspectRatio?: string;
    fillRule?: PreserveAspectRatio;
    style?: CSSProperties;
}

interface BaseIconPorps extends IconPorps {
    viewBox: string;
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
    const { name, width, height, viewBox, fillRule, d } = iconInfo;
    const componentName = name.trim().split(' ').map(
        (str) => str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
    ).join('');
    const content = `import React, { FunctionComponent } from 'react';
import BaseIcon, { IconPorps } from './BaseIcon';

const viewBox = '${viewBox}';
const d = '${d}';

const ${componentName}Icon: FunctionComponent<IconPorps> = ({
    width = ${width},
    height = ${height},
    color,
    preserveAspectRatio,
    fillRule = '${fillRule}',
    style,
}) => {
    return <BaseIcon 
        width={width}
        height={height}
        color={color}
        preserveAspectRatio={preserveAspectRatio}
        fillRule={fillRule}
        style={style}
        viewBox={viewBox}
        d={d}
    />;
};

export default ${componentName}Icon;
`;
    const componentFile = path.join(componentsDir, `${componentName}Icon.tsx`);
    fs.writeFileSync(componentFile, content);
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
