import { FC, useActionState } from 'react';
import { FormGroup } from '../../components/FormGroup';
import { submitForm } from '../actions/submitForm';
import { SubmitButton } from './SubmitButton';
import { DEFAULT_FORM_STATE, NAME_ID, TEXT_ID } from '../constants';
import { Input } from '../../components/Input';
import { EInputVariant } from '../../enums';

interface IPostFormProps {
  onSubmit: (name: string, text: string) => Promise<void>;
  apiError?: string;
}

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
        <FormGroup label="Your name" id={NAME_ID} error={nameError}>
          <Input type="text" name={NAME_ID} id={NAME_ID} placeholder="Your name" defaultValue={nameValue} />
        </FormGroup>
        <FormGroup label="Your post" id={TEXT_ID} error={textError}>
          <Input
            variant={EInputVariant.TEXTAREA}
            id={TEXT_ID}
            name={TEXT_ID}
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
