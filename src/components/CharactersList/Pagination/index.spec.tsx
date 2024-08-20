import { render, fireEvent } from '@testing-library/react';
import Pagination, { PaginationType } from '.';

describe('Pagination', () => {
  const getRender = (props: PaginationType) =>
    render(<Pagination {...props} />);

  const mockedProps = {
    onPageChange: jest.fn(),
    totalPages: 15,
    searchParams: new URLSearchParams(),
  };

  it('should render the pagination on the default page (first)', () => {
    const { getByText } = getRender(mockedProps);

    expect(
      getByText(`Page 1 of ${mockedProps.totalPages}`)
    ).toBeInTheDocument();
  });

  it('should render the pagination on the received page from the searchParams', () => {
    const receivedPage = '5';
    const { getByText } = getRender({
      ...mockedProps,
      searchParams: new URLSearchParams({ page: receivedPage }),
    });

    expect(
      getByText(`Page ${receivedPage} of ${mockedProps.totalPages}`)
    ).toBeInTheDocument();
  });

  it('should change to the next page on click', () => {
    const { getByText, getByLabelText } = getRender(mockedProps);

    expect(
      getByText(`Page 1 of ${mockedProps.totalPages}`)
    ).toBeInTheDocument();

    fireEvent.click(getByLabelText('Go to next page'));

    expect(
      getByText(`Page 2 of ${mockedProps.totalPages}`)
    ).toBeInTheDocument();
  });

  it('should change to the previous page on click', () => {
    const { getByText, getByLabelText } = getRender({
      ...mockedProps,
      searchParams: new URLSearchParams({ page: '2' }),
    });

    expect(
      getByText(`Page 2 of ${mockedProps.totalPages}`)
    ).toBeInTheDocument();

    fireEvent.click(getByLabelText('Go to previous page'));

    expect(
      getByText(`Page 1 of ${mockedProps.totalPages}`)
    ).toBeInTheDocument();
  });
});
