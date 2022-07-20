declare module "*.svg" {
  const content: any;
  export default content;
}

interface Window {
  overflowController: {
    [key in string]: HTMLElement | boolean | undefined;
  };
}
