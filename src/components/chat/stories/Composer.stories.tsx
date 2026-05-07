import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChatComposer } from "@/components/chat/composer";

const meta: Meta<typeof ChatComposer> = {
  title: "Chat/Composer",
  component: ChatComposer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    input: { control: "text" },
    canSend: { control: "boolean" },
    isLoading: { control: "boolean" },
    isProviderReady: { control: "boolean" },
    inputTooltip: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ChatComposer>;

export const Default: Story = {
  args: {
    input: "",
    canSend: false,
    isLoading: false,
    isProviderReady: true,
    onInputChange: () => {},
    onSubmitAction: () => {},
    onStopAction: () => {},
  },
};

export const WithText: Story = {
  args: {
    input: "Ask about your balance or request time off",
    canSend: true,
    isLoading: false,
    isProviderReady: true,
    onInputChange: () => {},
    onSubmitAction: () => {},
    onStopAction: () => {},
  },
};

export const Loading: Story = {
  args: {
    input: "",
    canSend: false,
    isLoading: true,
    isProviderReady: true,
    onInputChange: () => {},
    onSubmitAction: () => {},
    onStopAction: () => {},
  },
};

export const ProviderNotReady: Story = {
  args: {
    input: "",
    canSend: false,
    isLoading: false,
    isProviderReady: false,
    inputTooltip: "Please verify your API key first",
    onInputChange: () => {},
    onSubmitAction: () => {},
    onStopAction: () => {},
  },
};

export const WithError: Story = {
  args: {
    input: "Some message",
    canSend: true,
    isLoading: false,
    isProviderReady: true,
    errorMessage: "Something went wrong. Please try again.",
    onInputChange: () => {},
    onSubmitAction: () => {},
    onStopAction: () => {},
  },
};

export const WithHelperText: Story = {
  args: {
    input: "",
    canSend: false,
    isLoading: false,
    isProviderReady: true,
    helperText: "Review your balance or requests first; leave changes now require a quick UI confirmation.",
    onInputChange: () => {},
    onSubmitAction: () => {},
    onStopAction: () => {},
  },
};
