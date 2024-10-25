from prompt_toolkit import Application
from prompt_toolkit.layout import Layout, HSplit, VSplit, Window
from prompt_toolkit.widgets import Box, Label, TextArea
from prompt_toolkit.styles import Style
from prompt_toolkit.layout.controls import FormattedTextControl
from prompt_toolkit.key_binding import KeyBindings
import asyncio

from tui.render import render_calendar
from utils.time import get_current_time
from api.g import get_upcoming_events

from prompt_toolkit import Application
from prompt_toolkit.layout import Layout, HSplit, VSplit, Window
from prompt_toolkit.widgets import Box, Label, TextArea
from prompt_toolkit.styles import Style
from prompt_toolkit.layout.controls import FormattedTextControl
from prompt_toolkit.key_binding import KeyBindings
import asyncio

from tui.render import render_calendar
from utils.time import get_current_time
from api.g import get_upcoming_events

events = get_upcoming_events()

class LayoutHandler:
    """Manages the entire application layout and handles content swapping."""
    
    def __init__(self):
        self.layouts = {}
        self.create_widgets()  # Initialize widgets
        
        # Initialize the main layout
        self.root_layout = HSplit([
            self.header,
            self.main_content,  # This part will be swapped dynamically
            self.input_area,
            self.footer,
        ])
        self.layout = Layout(self.root_layout)

    def create_widgets(self):
        """Create and store the application widgets."""
        self.input_area = TextArea(height=3, prompt="", multiline=False)
        self.output_area = TextArea(style="class:output-field", focusable=False, wrap_lines=False)

        self.header = Label(text="Lumi", style="class:header")
        self.footer = Label(text=get_current_time(), style="class:footer")

        # Clock widget (right-aligned)
        self.clock_label = FormattedTextControl(text=get_current_time())
        self.clock_window = Window(content=self.clock_label, height=1, align='right')

        # Default placeholder content
        self.placeholder_message = TextArea(
            text="Press 'cal' to open the calendar app.", focusable=False
        )

        # Calendar app content
        self.calendar_content = render_calendar(events)

        # Add layouts to the manager
        self.add_layout(VSplit([self.clock_window, self.placeholder_message]), "main")
        self.add_layout(self.calendar_content, "calendar")

        # Set the initial main content
        self.main_content = self.layouts["main"]

    def swap_content(self, event, layout_name):
        """Swap the content in the center of the layout."""
        new_content = self.layouts.get(layout_name)
        if new_content:
            self.root_layout.children[1] = new_content  # Replace the center content
            event.app.invalidate()  # Force UI refresh

    def add_layout(self, layout_content, name):
        """Add a new layout content to the handler."""
        self.layouts[name] = layout_content