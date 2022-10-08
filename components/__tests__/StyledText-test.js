import * as React from 'react';
import renderer from 'react-test-renderer';

import { ScreenTitle } from '../StyledText';

it(`renders correctly`, () => {
  const tree = renderer.create(<ScreenTitle>Snapshot test!</ScreenTitle>).toJSON();

  expect(tree).toMatchSnapshot();
});
