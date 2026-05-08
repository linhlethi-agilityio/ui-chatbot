import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ChatComposer } from "@/components/chat/composer";

const defaultProps = {
  input: "",
  canSend: false,
  isLoading: false,
  isProviderReady: true,
  onInputChange: jest.fn(),
  onSubmitAction: jest.fn(),
  onStopAction: jest.fn(),
};

describe("ChatComposer", () => {
  it("renders textarea and send button", () => {
    render(<ChatComposer {...defaultProps} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("calls onInputChange when typing", () => {
    const onInputChange = jest.fn();
    render(<ChatComposer {...defaultProps} onInputChange={onInputChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
    expect(onInputChange).toHaveBeenCalledWith("hello");
  });

  it("disables textarea when provider is not ready", () => {
    render(<ChatComposer {...defaultProps} isProviderReady={false} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("send button is disabled when canSend is false", () => {
    render(<ChatComposer {...defaultProps} canSend={false} isLoading={false} />);
    expect(screen.getByRole("button", { name: /send/i })).toBeDisabled();
  });

  it("send button is enabled when canSend is true", () => {
    render(<ChatComposer {...defaultProps} canSend={true} />);
    expect(screen.getByRole("button", { name: /send/i })).not.toBeDisabled();
  });

  it("shows stop button when loading", () => {
    render(<ChatComposer {...defaultProps} isLoading={true} />);
    expect(screen.getByRole("button", { name: /stop/i })).toBeInTheDocument();
  });

  it("calls onStopAction when stop button is clicked", async () => {
    const onStopAction = jest.fn();
    render(<ChatComposer {...defaultProps} isLoading={true} onStopAction={onStopAction} />);
    fireEvent.click(screen.getByRole("button", { name: /stop/i }));
    await waitFor(() => expect(onStopAction).toHaveBeenCalledTimes(1));
  });

  it("calls onSubmitAction when form is submitted", async () => {
    const onSubmitAction = jest.fn((e) => e.preventDefault());
    render(<ChatComposer {...defaultProps} canSend={true} onSubmitAction={onSubmitAction} />);
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => expect(onSubmitAction).toHaveBeenCalledTimes(1));
  });

  it("submits on Enter key", async () => {
    const onSubmitAction = jest.fn((e) => e.preventDefault());
    render(<ChatComposer {...defaultProps} canSend={true} onSubmitAction={onSubmitAction} />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter", shiftKey: false });
    await waitFor(() => expect(onSubmitAction).toHaveBeenCalledTimes(1));
  });

  it("does not submit on Shift+Enter", async () => {
    const onSubmitAction = jest.fn((e) => e.preventDefault());
    render(<ChatComposer {...defaultProps} canSend={true} onSubmitAction={onSubmitAction} />);
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter", shiftKey: true });
    await waitFor(() => expect(onSubmitAction).not.toHaveBeenCalled());
  });

  it("shows error message when errorMessage is provided", () => {
    render(<ChatComposer {...defaultProps} errorMessage="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("shows helper text when provided", () => {
    render(<ChatComposer {...defaultProps} helperText="Custom helper text" />);
    expect(screen.getByText("Custom helper text")).toBeInTheDocument();
  });
});
