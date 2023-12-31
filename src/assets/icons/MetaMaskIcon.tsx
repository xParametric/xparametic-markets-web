import React from 'react';

type Props = React.ComponentPropsWithoutRef<'svg'> & { size?: string | number };

function MetaMaskIcon({ size = 16, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      style={{
        verticalAlign: 'middle',
        fill: 'currentColor'
      }}
      {...props}
    >
      <path
        fill="#CD6116"
        d="M75.5,221.7l4.8-40.6L49,182L75.5,221.7z M175.7,181.1l4.8,40.6L207,182L175.7,181.1z M199.5,136.4l-56.2,2.5
	l5.2,28.9l8.3-17.4l20,9.1L199.5,136.4z M79.3,159.5l20-9.1l8.2,17.4l5.3-28.9l-56.3-2.5L79.3,159.5z"
      />
      <path
        fill="#D7C1B3"
        d="M180.5,221.7l-33.9-16.5l2.7,22.1l-0.3,9.3L180.5,221.7z M75.5,221.7l31.5,14.9l-0.2-9.3l2.5-22.1L75.5,221.7z
	 M149,236.6l0.3-9.3l-2.5-2.2h-37.7l-2.3,2.2l0.2,9.3l-31.5-14.9l11,9l22.3,15.5h38.3l22.4-15.5l11-9L149,236.6z"
      />
      <path
        fill="#763D16"
        d="M247,88.5l8.5-40.8L242.8,9.8l-96.2,71.4l37,31.3l52.3,15.3l11.6-13.5l-5-3.6l8-7.3l-6.2-4.8l8-6.1L247,88.5z
	 M0.5,47.7L9,88.5l-5.4,4l8,6.1l-6.1,4.8l8,7.3l-5,3.6L20,127.8l52.3-15.3l37-31.3L13.1,9.8L0.5,47.7z"
      />
      <path
        fill="#E4751F"
        d="M56.5,136.4l23.6,46l-0.8-22.9L56.5,136.4z M176.8,159.5l-1,22.9l23.7-46L176.8,159.5z M112.8,138.9l-5.3,28.9
	l6.6,34.1l1.5-44.9L112.8,138.9z M143.3,138.9l-2.7,18l1.2,45l6.7-34.1L143.3,138.9z"
      />
      <path
        fill="#233447"
        d="M107.5,167.8l-28.2-8.3l19.9-9.1L107.5,167.8z M148.4,167.8l8.3-17.4l20,9.1L148.4,167.8z M146.6,205.2
	l-4.8-3.3h-27.7l-4.8,3.3l-2.5,22.1l2.3-2.2h37.7l2.5,2.2L146.6,205.2z"
      />
      <path
        fill="#E2761B"
        d="M242.8,9.8l-99.5,73.9l18.4-43.6L242.8,9.8z M13.1,9.8l98.7,74.6L94.3,40.1L13.1,9.8z M207,181.1l-26.5,40.6
	l56.7,15.6l16.3-55.3L207,181.1z M2.6,182l16.2,55.3l56.7-15.6L49,181.1L2.6,182z M72.3,112.5l-15.8,23.9l56.3,2.5l-2-60.5
	L72.3,112.5z M183.6,112.5l-39-34.8l-1.3,61.2l56.2-2.5L183.6,112.5z M75.5,221.7l33.8-16.5l-29.2-22.8L75.5,221.7z M146.6,205.2
	l33.9,16.5l-4.7-39.3L146.6,205.2z"
      />
      <path
        fill="#F6851B"
        d="M148.5,167.8l-6.7,34.1l4.8,3.3l29.2-22.8l1-22.9L148.5,167.8z M79.3,159.5l0.8,22.9l29.2,22.8l4.8-3.3
	l-6.6-34.1L79.3,159.5z M235.9,127.8l-52.3-15.3l15.9,23.9l-23.7,46L207,182h46.5L235.9,127.8z M72.3,112.5L20,127.8L2.6,182H49
	l31.1,0.4l-23.6-46L72.3,112.5z M143.3,138.9l3.3-57.7l15.2-41.1H94.3l15,41.1l3.5,57.7l1.2,18.2l0.1,44.8h27.7l0.2-44.8
	L143.3,138.9z"
      />
    </svg>
  );
}

export default React.memo(MetaMaskIcon);
