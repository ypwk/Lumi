from prompt_toolkit import Application
from prompt_toolkit.layout import Layout, HSplit, VSplit, Window

from prompt_toolkit.widgets import Box, Label, TextArea
from prompt_toolkit.styles import Style
from prompt_toolkit.layout.controls import FormattedTextControl
from prompt_toolkit.eventloop import run_in_executor_with_context
from prompt_toolkit.layout.controls import FormattedTextControl
import asyncio

from tui.render import render_calendar
from tui.bindings import bind
from tui.layout import LayoutHandler
from utils.time import get_current_time
from api.g import get_upcoming_events

lh = LayoutHandler()

style = Style.from_dict(
    {
        "header": "bg:#ffb86c #282a36 bold",
        "footer": "bg:#6272a4 #f8f8f2",
    }
)

kb = bind(lh)
app = Application(layout=lh.layout, full_screen=True, key_bindings=kb, style=style)

async def update_clock():
    """Asynchronous task to update the clock every second."""
    while True:
        # Update the text in the clock label
        lh.footer.text = get_current_time()
        # Refresh the application to reflect the update
        await asyncio.sleep(1)
        app.invalidate()

async def run():
    await asyncio.gather(app.run_async(), update_clock())
    