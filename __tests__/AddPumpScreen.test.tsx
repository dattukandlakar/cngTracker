import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { AddPumpScreen } from '../app/screens/AddPumpScreen';

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

test('renders correctly', () => {
  const component = ReactTestRenderer.create(
    <AddPumpScreen navigation={mockNavigation} route={{} as any} />
  );
  
  expect(component).toBeTruthy();
});