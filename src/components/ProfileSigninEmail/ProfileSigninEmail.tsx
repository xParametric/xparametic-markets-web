import { useCallback, useState } from 'react';

import cn from 'classnames';
import { Divider } from 'ui';

import { Button } from 'components/Button';
import type { ButtonProps } from 'components/Button';

import profileSigninEmailClasses from './ProfileSigninEmail.module.scss';

export default function ProfileSigninEmail({
  className,
  ...props
}: Pick<ButtonProps, 'onClick' | 'name' | 'children' | 'className'>) {
  const [email, setEmail] = useState('');
  const handleEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(event.target.value),
    []
  );

  return (
    <>
      <Divider enableGutters />
      <form>
        <label htmlFor="email" className="pm-c-input__group">
          <input
            className="pm-c-input--default"
            id="email"
            value={email}
            placeholder="Write your email here"
            onChange={handleEmail}
          />
        </label>
        <Button
          type="submit"
          className={cn(profileSigninEmailClasses.email, className)}
          color="default"
          size="sm"
          disabled={!email}
          data-email={email}
          {...props}
        />
      </form>
    </>
  );
}
