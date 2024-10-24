from prompt_toolkit import Application
from prompt_toolkit.layout import Layout, HSplit, VSplit, Window
from prompt_toolkit.widgets import Box, Button, Label, TextArea, Frame
from prompt_toolkit.key_binding import KeyBindings
from prompt_toolkit.styles import Style
from prompt_toolkit.layout.controls import FormattedTextControl
from tui.commands import execute_command

# Define the text area for user input and output
input_area = TextArea(height=3, prompt="Input: ", multiline=False)
output_area = TextArea(style="class:output-field", focusable=False, wrap_lines=True)

# Define the header and footer
header = Label(text=" My Full Screen TUI with prompt_toolkit ", style="class:header")
footer = Label(text=" [F3] Quit ", style="class:footer")

# Define a container for the main content
content = HSplit(
    [
        header,
        Box(body=output_area, padding=1, style="class:output-box"),
        input_area,
        footer,
    ]
)

# Define the layout
layout = Layout(content)

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
    user_input = input_area.text
    if user_input:
        # Treat as a command if it starts with a forward slash
        parts = user_input.split(" ")
        command_name = parts[0]
        command_args = parts[1:]
        execute_command(
            command_name,
            input_area,
            output_area,
            *command_args,
        )
        input_area.buffer.reset()


# Style for the application
style = Style.from_dict(
    {
        "header": "bg:#ffb86c #282a36 bold",
        "footer": "bg:#6272a4 #f8f8f2",
        "output-box": "bg:#44475a #f8f8f2",
        "output-field": "#f8f8f2",
    }
)


# Add example commands to the command dictionary


# Create the application
app = Application(layout=layout, key_bindings=kb, full_screen=True, style=style)
