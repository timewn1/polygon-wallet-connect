declare namespace JSX {
    interface IntrinsicElements {
        'gecko-coin-price-chart-widget': {
            locale?: string;
            outlined?: string;
            'initial-currency'?: string;
            width?: string;
            height?: string;
        };
        'gecko-coin-price-marquee-widget': {
            locale?: string;
            outlined?: string;
            'initial-currency'?: string;
            width?: string;
            height?: string;
        };
    }
}

declare module '@canvasjs/react-charts' {
    const CanvasJSChart: any;
    export { CanvasJSChart };
  }