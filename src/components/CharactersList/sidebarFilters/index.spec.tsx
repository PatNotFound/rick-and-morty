import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SidebarFilters from '.';
import { FilterPropsType } from '../../../types';

describe('SidebarFilters', () => {
  const getRender = (props: FilterPropsType) =>
    render(<SidebarFilters {...props} />);

  const mockedProps = {
    onFilterChange: jest.fn(),
    searchParams: new URLSearchParams(),
  };

  it('should clear the form when the clear button is pressed', () => {
    const { getByLabelText, getByText } = getRender(mockedProps);

    const nameInput = getByLabelText('Name');
    const statusSelect = getByLabelText('Status');

    fireEvent.change(nameInput, { target: { value: 'Morty' } });
    userEvent.selectOptions(statusSelect, 'dead');

    expect(nameInput).toHaveValue('Morty');
    expect(statusSelect).toHaveValue('dead');

    fireEvent.click(getByText('Clear'));

    expect(nameInput).toHaveValue('');
    expect(statusSelect).toHaveValue('');
  });

  it('should call onFilterChange on submit', () => {
    const { getByLabelText, getByTestId } = getRender(mockedProps);

    const nameInput = getByLabelText('Name');
    const statusSelect = getByLabelText('Status');

    fireEvent.change(nameInput, { target: { value: 'Morty' } });
    userEvent.selectOptions(statusSelect, 'dead');

    expect(nameInput).toHaveValue('Morty');
    expect(statusSelect).toHaveValue('dead');

    fireEvent.submit(getByTestId('search-form'));

    expect(mockedProps.onFilterChange).toHaveBeenCalled();
  });
});
