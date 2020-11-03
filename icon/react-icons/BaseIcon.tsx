import React, { CSSProperties, FunctionComponent } from 'react';

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

export default BaseIcon;
