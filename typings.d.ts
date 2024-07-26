declare module '*.css?inline'

declare module '*.svg?react' {
  const ReactComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}
