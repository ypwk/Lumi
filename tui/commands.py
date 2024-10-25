from tui.render import render_calendar
from api.g import get_calendar_events, get_tasks, get_upcoming_events


def get_cal(inp, out, *args):
    events = get_calendar_events

    if not events:
        out.text += "No upcoming events\n"
    else:
        out.text += "Upcoming events:\n"
        for event in events:
            start = event["start"].get("dateTime", event["start"].get("date"))
            out.text += f"{start} - {event['summary']}\n"


def get_tas(inp, out, *args):
    tasklists = get_tasks()

    # if not tasklists:
    #     out.text += "No task lists found.\n"
    # else:
    #     out.text += "Task lists:\n"
    #     for tasklist in tasklists:
    #         out.text += f"{tasklist['title']} (ID: {tasklist['id']})\n"
    #         tasks_result = tasks_service.tasks().list(tasklist=tasklist["id"]).execute()
    #         tasks = tasks_result.get("items", [])
    #         if not tasks:
    #             out.text += "No tasks found.\n"
    #         else:
    #             out.text += "Tasks:\n"
    #             for task in tasks:
    #                 out.text += f"- {task['title']} (Status: {task['status']})\n"
                    
def quit(inp, out, *args):
    out.text += "Quitting application...\n"
    raise SystemExit


def get_upcoming_command(inp, out, *args):
    events = get_upcoming_events()
    
def clear(inp, out, *args):
    out.text = ""

def ping(inp, out, *args):
    out.text += "pong\n"


commands = {
    "calendar": get_upcoming_command,
    "cal": get_upcoming_command,
    "ping": ping,
    "tasks": get_tas,
    "tas": get_tas,
    "clear": clear,
    "c": clear,
    "quit": quit,
    "q": quit
}


def execute_command(command_name, inp, out, *args):
    if command_name in commands:
        commands[command_name](inp, out, *args)
