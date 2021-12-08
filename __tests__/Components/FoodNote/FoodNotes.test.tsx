import React from 'react';
import {render} from '@testing-library/react-native';
import {FoodNotes} from '../../../app/Components';

beforeAll(() => {
  jest.clearAllMocks();
});

describe('FoodNote', () => {
  test('show a list of Food note', () => {
    const foodNotes = [
      {
        id: 1,
        avatar: 'first avatar',
      },
      {
        id: 2,
        avatar: 'second avatar',
      },
    ];
    const wrapper = render(<FoodNotes list={foodNotes} />);

    const allFoodNotes = wrapper.getAllByTestId('foodNoteItem');
    expect(allFoodNotes.length).toBe(2);
    wrapper.unmount();
  });
});
