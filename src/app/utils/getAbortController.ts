export const getAbortController = () => {
  const controller = new AbortController();
  const { signal } = controller;

  return { controller, signal };
};
