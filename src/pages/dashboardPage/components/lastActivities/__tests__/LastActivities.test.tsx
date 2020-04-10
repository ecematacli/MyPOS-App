import React from 'react';
import '@testing-library/jest-dom';

import LastActivities from '../LastActivities';
import { render } from '../../../../../testUtils/render';

const lastActivities = [
  {
    id: 10,
    event: 'Sale synced',
    message: 'Sale Synced with id of 58. 17 products out of 19',
    saleId: 58,
    userId: null,
    created: '11 February 2020 - 5:45 PM',
  },
  {
    id: 9,
    event: 'Sale imported',
    message: 'Sale imported with id of 58. Count: 19, Total Quantity: 17',
    saleId: 58,
    userId: 'ecem',
    created: '7 March 2020 - 3:27 PM',
  },
];

describe('[Last Activities component]', () => {
  test('renders Loading component if loading state is true', () => {
    const props = {
      loading: true,
      lastActivities: null,
    };

    const { getByTestId } = render(<LastActivities {...props} />);
    expect(getByTestId('loading')).toBeInTheDocument();
  });

  test('renders no display message when last activities array is empty', () => {
    const props = {
      loading: false,
      lastActivities: undefined,
    };
    const { getByTestId } = render(<LastActivities {...props} />);
    expect(getByTestId('no-display')).toBeInTheDocument();
  });

  test('renders no display message when last activities array is empty', () => {
    const props = {
      loading: false,
      lastActivities,
    };
    const { getByTestId, debug } = render(<LastActivities {...props} />);
    expect(getByTestId('activities-paper')).toBeInTheDocument();
  });

  test('displays last activities data correctly', async () => {
    const props = {
      loading: false,
      lastActivities,
    };
    const { findAllByTestId } = render(<LastActivities {...props} />);

    const events = await findAllByTestId('activity');
    const dateOfEvents = await findAllByTestId('date');

    events.forEach((event, i) => {
      if (i === 0) {
        expect(event.innerHTML).toBe('Sale synced');
      } else {
        expect(event.innerHTML).toBe('Sale imported');
      }
    });

    dateOfEvents.forEach((date, i) => {
      if (i === 0) {
        expect(date.innerHTML).toBe('11 February 2020 - 5:45 PM');
      } else {
        expect(date.innerHTML).toBe('7 March 2020 - 3:27 PM');
      }
    });
  });
});
