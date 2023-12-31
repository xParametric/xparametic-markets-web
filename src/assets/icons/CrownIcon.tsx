import { ComponentPropsWithoutRef, memo } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  size?: string | number;
};

function CrownIcon({ size = 16, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{
        verticalAlign: 'middle'
      }}
      {...props}
    >
      <path
        fill="#ffb743"
        d="M23.056 9.077a.67.67 0 01-.018.2l-1.48 5.922a.673.673 0 01-.65.51l-8.882.044H3.14a.673.673 0 01-.653-.51l-1.48-5.944a.672.672 0 01-.018-.205A1.415 1.415 0 010 7.746c0-.78.634-1.413 1.413-1.413a1.415 1.415 0 01.897 2.504l1.854 1.867a2.529 2.529 0 001.783.743c.786 0 1.536-.374 2.008-1l3.046-4.035A1.415 1.415 0 0112 4a1.414 1.414 0 011.021 2.388l.002.003 3.024 4.047a2.524 2.524 0 002.013 1.009 2.5 2.5 0 001.777-.736l1.865-1.865a1.41 1.41 0 01.885-2.513c.78 0 1.413.634 1.413 1.413 0 .614-.395 1.137-.944 1.331zm-1.643 8.785a.673.673 0 00-.673-.673H3.335a.673.673 0 00-.673.673v1.615c0 .371.301.672.673.672H20.74a.673.673 0 00.673-.672v-1.615z"
      />
    </svg>
  );
}

export default memo(CrownIcon);
