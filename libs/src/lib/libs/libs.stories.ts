import type { Meta, StoryObj } from '@storybook/angular';
import { Libs } from './libs';
import { expect } from 'storybook/test';

const meta: Meta<Libs> = {
  component: Libs,
  title: 'Libs',
};
export default meta;

type Story = StoryObj<Libs>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/libs/gi)).toBeTruthy();
  },
};
