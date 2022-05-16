declare module '*.svg' {
  const content: any;
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.woff' {
  const content: any;
  export default content;
}

declare module '*.woff2' {
  const content: any;
  export default content;
}
