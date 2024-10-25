from prompt_toolkit.key_binding import KeyBindings
from prompt_toolkit.key_binding.bindings.page_navigation import scroll_half_page_up, scroll_half_page_down
from tui.commands import execute_command

def bind(layoutHandler):
    # Key bindings for the application
    kb = KeyBindings()

    @kb.add("c-q")
    @kb.add("f3")
    def _(event):
        """Press F3 or Ctrl-Q to exit the application."""
        event.app.exit()


    @kb.add("enter")
    def _(event):
        """Handle Enter key press to accept user input."""
        user_input = layoutHandler.input_area.text
        if user_input:
            # Treat as a command if it starts with a forward slash
            parts = user_input.split(" ")
            command_name = parts[0]
            command_args = parts[1:]
            execute_command(
                command_name,
                layoutHandler.input_area,
                layoutHandler.output_area,
                *command_args,
            )
            layoutHandler.input_area.buffer.reset()
            

    @kb.add("up")
    def _(event):
        w = event.app.layout.current_window
        event.app.layout.focus(layoutHandler.output_area.window)
        scroll_half_page_up(event)
        event.app.layout.focus(w)

    @kb.add("down")
    def _(event):
        w = event.app.layout.current_window
        event.app.layout.focus(layoutHandler.output_area.window)
        scroll_half_page_down(event)
        event.app.layout.focus(w)
        
    @kb.add("escape")  # Press 'Esc' to return to the main layout
    def close_calendar(event):
        event.app.layout = layoutHandler.swap_content(event, "main")
        event.app.invalidate()

    return kb