import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Filters, { FilterPropsType } from '.';

describe('Filters', () => {
  const getRender = (props: FilterPropsType) => render(<Filters {...props} />);

  const mockedProps = {
    onFilterChange: jest.fn(),
    searchParams: new URLSearchParams(),
  };

  it('should clear the form when the clear button is pressed', () => {
    const { getByLabelText, getByText } = getRender(mockedProps);

    const nameInput = getByLabelText('Name');
    const statusSelect = getByLabelText('Choose a Status');

    fireEvent.change(nameInput, { target: { value: 'Morty' } });
    userEvent.selectOptions(statusSelect, 'dead');

    expect(nameInput).toHaveValue('Morty');
    expect(statusSelect).toHaveValue('dead');

    fireEvent.click(getByText('Clear Search'));

    expect(nameInput).toHaveValue('');
    expect(statusSelect).toHaveValue('');
  });

  it('should call onFilterChange on submit', () => {
    const { getByLabelText, getByTestId } = getRender(mockedProps);

    const nameInput = getByLabelText('Name');
    const statusSelect = getByLabelText('Choose a Status');

    fireEvent.change(nameInput, { target: { value: 'Morty' } });
    userEvent.selectOptions(statusSelect, 'dead');

    expect(nameInput).toHaveValue('Morty');
    expect(statusSelect).toHaveValue('dead');

    fireEvent.submit(getByTestId('search-form'));

    expect(mockedProps.onFilterChange).toHaveBeenCalled();
  });
});
