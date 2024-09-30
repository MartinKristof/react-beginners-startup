import { DEFAULT_FORM_STATE, NAME_ID, TEXT_ID } from '../constants';

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
  (onSubmit: (name: string, text: string) => Promise<void>) =>
  async (_: { name: string; text: string; errors: { name: string; text: string } }, payload: FormData) => {
    const text = payload.get(TEXT_ID) as string;
    const name = payload.get(NAME_ID) as string;

    const errors = validateForm(name, text);

    if (errors.name || errors.text) {
      return { text, name, errors };
    }

    try {
      await onSubmit(name, text);
    } catch (error) {
      return { name, text, errors };
    }

    return { ...DEFAULT_FORM_STATE };
  };
