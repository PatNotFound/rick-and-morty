import { render, fireEvent } from '@testing-library/react';

import { ModalProps } from '../../../../types';
import Modal from '.';

describe('Modal', () => {
  const getRender = (props: ModalProps) => render(<Modal {...props} />);

  const mockedProps = {
    data: [
      { label: 'Status', value: 'Alive' },
      { label: 'Species', value: 'Human' },
      { label: 'Gender', value: 'Male' },
      { label: 'Location', value: 'Citadel of Ricks' },
      { label: 'Origin', value: 'unknown' },
      { label: 'Number of appearances', value: 2 },
    ],
    image: 'srcmock',
    title: 'Morty',
    toggleVisibility: jest.fn(),
  };

  it('should render the component', () => {
    const { container } = getRender(mockedProps);

    expect(container).toMatchSnapshot();
  });

  it('should call toggleVisibility when esc is pressed', () => {
    const { getByLabelText } = getRender(mockedProps);

    const modal = getByLabelText(`${mockedProps.title}-modal`);

    fireEvent.keyDown(modal, { key: 'Escape' });

    expect(mockedProps.toggleVisibility).toHaveBeenCalled();
  });

  it("should call toggleVisibility when there's a click on the backdrop", () => {
    const { getByLabelText } = getRender(mockedProps);

    const modal = getByLabelText(`${mockedProps.title}-modal`);

    fireEvent.click(modal);

    expect(mockedProps.toggleVisibility).toHaveBeenCalled();
  });
});
