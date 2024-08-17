import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ModalProps = {
  toggleVisibility: () => void;
  data: { label: string; value: string | number }[];
  title: string;
  image: string;
};

const Modal = ({
  toggleVisibility,
  title,
  image,
  data,
}: Readonly<ModalProps>): JSX.Element | null => {
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleVisibility();
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  const modal: JSX.Element = (
    <>
      <div
        className="fixed inset-0 bg-gray-400 bg-opacity-60"
        onClick={toggleVisibility}
        aria-label={`${title} modal`}
      />
      <div
        className="fixed left-2/4 top-2/4 flex w-auto min-w-[500px] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-xl bg-white p-6"
        aria-modal
        aria-label="Modal Details"
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-6 appearance-none self-baseline text-xl outline-none"
          aria-label="Close Modal"
          onClick={toggleVisibility}
          type="button"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="flex flex-row">
          <div className="mr-6 flex min-w-[150px] flex-col items-center justify-center">
            <img
              src={image}
              alt={title}
              className="mb-4 h-24 rounded-full border border-gray-50 shadow-xl"
            />
            <header className="flex text-center text-xl font-bold text-green-500">
              {title}
            </header>
          </div>
          <ul className="flex w-full flex-col divide-y">
            {data.map(({ label, value }) => (
              <li className="mt-2 flex flex-col" key={label}>
                <label className="mr-1 text-lg font-medium">{label}</label>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
};

export default Modal;
