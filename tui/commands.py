from api.g_api import get_calendar_events, get_services, get_tasks


def get_cal(inp, out, *args):
    _, calendar_service = get_services()
    events = get_calendar_events(calendar_service)

    if not events:
        out.text += "No upcoming events\n"
    else:
        out.text += "Upcoming events:\n"
        for event in events:
            start = event["start"].get("dateTime", event["start"].get("date"))
            out.text += f"{start} - {event['summary']}\n"


def get_tas(inp, out, *args):
    tasks_service, _ = get_services()
    tasklists = get_tasks(tasks_service)

    if not tasklists:
        out.text += "No task lists found.\n"
    else:
        out.text += "Task lists:\n"
        for tasklist in tasklists:
            out.text += f"{tasklist['title']} (ID: {tasklist['id']})\n"
            tasks_result = tasks_service.tasks().list(tasklist=tasklist["id"]).execute()
            tasks = tasks_result.get("items", [])
            if not tasks:
                out.text += "No tasks found.\n"
            else:
                out.text += "Tasks:\n"
                for task in tasks:
                    out.text += f"- {task['title']} (Status: {task['status']})\n"


def clear(inp, out, *args):
    out.text = ""


def ping(inp, out, *args):
    out.text += "pong\n"


commands = {
    "calendar": get_cal,
    "cal": get_cal,
    "ping": ping,
    "tasks": get_tas,
    "tas": get_tas,
    "clear": clear,
    "c": clear,
}


def execute_command(command_name, inp, out, *args):
    if command_name in commands:
        commands[command_name](inp, out, *args)
    else:
        out.text += f"Unknown command: {command_name}\n"
