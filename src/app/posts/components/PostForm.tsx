import { FC, useActionState } from 'react';
import { FormGroup } from './FormGroup';
import { DEFAULT_FORM_STATE, submitForm } from '../actions/submitForm';
import { SubmitButton } from './SubmitButton';

interface IPostFormProps {
  onSubmit: (name: string, text: string) => Promise<void>;
  apiError?: string;
}

const FIELD_CLASS_NAME =
  'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500';

export const PostForm: FC<IPostFormProps> = ({ onSubmit, apiError }) => {
  const [state, submitAction] = useActionState<
    { name: string; text: string; errors: { name: string; text: string } },
    FormData
  >(submitForm(onSubmit), { ...DEFAULT_FORM_STATE });

  const {
    errors: { name: nameError, text: textError },
    name: nameValue,
    text: textValue,
  } = state;

  return (
    <form action={submitAction}>
      {apiError && <div className="text-red-500">{apiError}</div>}
      <div>
        <FormGroup label="Your name" id="name" error={nameError}>
          <input
            type="text"
            className={FIELD_CLASS_NAME}
            name="name"
            id="name"
            placeholder="Your name"
            defaultValue={nameValue}
          />
        </FormGroup>
        <FormGroup label="Your post" id="text" error={textError}>
          <textarea
            id="text"
            name="text"
            className={FIELD_CLASS_NAME}
            placeholder="Some post"
            rows={4}
            defaultValue={textValue}
          />
        </FormGroup>
      </div>
      <div className="mt-2">
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  );
};
