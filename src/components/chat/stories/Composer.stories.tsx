import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChatComposer } from "@/components/chat/composer";
import { CHAT_COMPOSER_COPY, CHAT_HELPER_COPY_BY_ROLE } from "@/constants/chat";

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

const defaultArgs = {
  input: "",
  canSend: false,
  isLoading: false,
  isProviderReady: true,
  onInputChange: () => {},
  onSubmitAction: () => {},
  onStopAction: () => {},
};

export const Default: Story = {
  args: defaultArgs,
};

export const WithText: Story = {
  args: {
    ...defaultArgs,
    input: "Ask about your balance or request time off",
    canSend: true,
  },
};

export const Loading: Story = {
  args: {
    ...defaultArgs,
    isLoading: true,
  },
};

export const ProviderNotReady: Story = {
  args: {
    ...defaultArgs,
    isProviderReady: false,
    inputTooltip: CHAT_COMPOSER_COPY.submitHint,
  },
};

export const WithError: Story = {
  args: {
    ...defaultArgs,
    input: "Some message",
    canSend: true,
    errorMessage: CHAT_COMPOSER_COPY.verifyProviderTooltip,
  },
};

export const WithHelperText: Story = {
  args: {
    ...defaultArgs,
    helperText: CHAT_HELPER_COPY_BY_ROLE.user,
  },
};
