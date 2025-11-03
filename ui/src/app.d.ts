declare const __APP_VERSION__: string;

declare module '*.svelte' {
  import { ComponentType } from 'svelte';
  const component: ComponentType;
  export default component;
}
