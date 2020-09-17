import React, { CSSProperties, FunctionComponent } from 'react';

type PreserveAspectRatio = 'nonzero' | 'evenodd' | 'inherit';

export interface IconPorps {
    width?: number;
    height?: number;
    viewBox: string;
    color?: string;
    preserveAspectRatio?: string;
    fillRule?: PreserveAspectRatio;
    style?: CSSProperties;
    d: string;
}

const BaseIcon: FunctionComponent<IconPorps> = ({
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
