from prompt_toolkit.layout import HSplit, VSplit, Window
from prompt_toolkit.widgets import TextArea, Label


def render_calendar(events):
    if not events:
        return Label(text="No upcoming events.")

    # Parse events by day
    days = {}
    for event in events.get('items', []):
        start = event.get('start', {}).get('dateTime', event.get('start', {}).get('date'))
        event_date = start[:10]  # Extract 'YYYY-MM-DD'
        days.setdefault(event_date, []).append(event)

    sorted_days = sorted(days.keys())[:4]  # Show the next 4 days
    columns = [[] for _ in sorted_days]

    # Populate event columns with time-based positioning
    for day_index, day in enumerate(sorted_days):
        for event in days[day]:
            summary = event.get('summary', 'No Title')
            start = event.get('start', {}).get('dateTime', event.get('start', {}).get('date'))
            start_time = start[11:16] if 'T' in start else "All Day"
            end = event.get('end', {}).get('dateTime', event.get('end', {}).get('date'))
            end_time = end[11:16] if 'T' in end else "All Day"

            # Calculate event vertical position based on time
            if 'T' in start:
                hour = int(start[11:13])
                minute = int(start[14:16])
                position = (hour - 6) * 2 + (1 if minute >= 30 else 0)
                columns[day_index].append((position, f"{start_time} - {end_time} : {summary}"))
            else:
                columns[day_index].append((0, f"All Day : {summary}"))

    # Build the day columns with TextArea widgets
    column_widgets = []
    for day_index, day in enumerate(sorted_days):
        events = columns[day_index]
        content = [f"=== {day} ==="]
        last_position = 0

        for position, text in events:
            # Add empty lines for alignment
            content.extend([""] * (position - last_position))
            content.append(f"___\n{text}\n___")
            last_position = position + 1

        day_column = TextArea(text="\n".join(content), focusable=False, wrap_lines=True)
        column_widgets.append(day_column)

    # Build the time column (6 AM to 11 PM)
    time_slots = [f"{hour:02d}:00" for hour in range(6, 24)]
    time_column = TextArea(text="\n".join(time_slots), focusable=False, wrap_lines=True, width=10)

    # Use VSplit to organize the time column and day columns
    calendar_layout = VSplit([time_column] + column_widgets, padding=2)

    return calendar_layout