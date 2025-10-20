import type { Meta, StoryObj } from '@storybook/angular';
import { Table } from './table';
import { expect } from 'storybook/test';

const meta: Meta<Table> = {
  component: Table,
  title: 'Table',
};
export default meta;

type Story = StoryObj<Table>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/table/gi)).toBeTruthy();
  },
};
