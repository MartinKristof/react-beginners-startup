export const DEFAULT_FORM_STATE = { name: '', text: '', errors: { name: '', text: '' } };

const validateForm = (name: string, text: string) => {
  const errors = { ...DEFAULT_FORM_STATE.errors };

  if (!name.trim().length) {
    errors.name = 'Name is required';
  } else if (name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters long';
  }

  if (!text.trim().length) {
    errors.text = 'Text is required';
  } else if (text.trim().length < 3) {
    errors.text = 'Text must be at least 3 characters long';
  }

  return errors;
};

export const submitForm =
  (onSubmit: (name: string, text: string) => void) =>
  (_: { name: string; text: string; errors: { name: string; text: string } }, payload: FormData) => {
    const text = payload.get('text') as string;
    const name = payload.get('name') as string;

    const errors = validateForm(name, text);

    if (errors.name || errors.text) {
      return { text, name, errors };
    }

    onSubmit(name, text);

    return { ...DEFAULT_FORM_STATE };
  };
