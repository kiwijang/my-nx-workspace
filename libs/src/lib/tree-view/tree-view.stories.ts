import type { Meta, StoryObj } from '@storybook/angular';
import { TreeView } from './tree-view';
import { expect } from 'storybook/test';

const meta: Meta<TreeView> = {
  component: TreeView,
  title: 'TreeView',
};
export default meta;

type Story = StoryObj<TreeView>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/tree-view/gi)).toBeTruthy();
  },
};
