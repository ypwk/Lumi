from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import os
import pickle
import datetime

# Define the scopes for both Google Tasks and Google Calendar
SCOPES = [
    "https://www.googleapis.com/auth/tasks",
    "https://www.googleapis.com/auth/calendar.readonly",
]


def authenticate_google_services():
    creds = None
    # Check if token.pickle already exists (it contains the access and refresh tokens)
    if os.path.exists("token.pickle"):
        with open("token.pickle", "rb") as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(
                port=8080,
                open_browser=True,
                authorization_prompt_message="Please visit this URL: {url}",
                success_message="Authentication complete. You may close this tab.",
                no_browser=False,
                enable_local_termination=False,
            )
        # Save the credentials for the next run
        with open("token.pickle", "wb") as token:
            pickle.dump(creds, token)

    return creds


def get_services():
    creds = authenticate_google_services()

    # Create service for Google Tasks
    tasks_service = build("tasks", "v1", credentials=creds)

    # Create service for Google Calendar
    calendar_service = build("calendar", "v3", credentials=creds)

    return tasks_service, calendar_service


def get_calendar_events(calendar_service):
    # Get the current time in ISO format
    now = datetime.datetime.utcnow().isoformat() + "Z"  # 'Z' indicates UTC time

    # Retrieve events from the primary calendar
    events_result = (
        calendar_service.events()
        .list(
            calendarId="primary",
            timeMin=now,
            maxResults=10,
            singleEvents=True,
            orderBy="startTime",
        )
        .execute()
    )

    events = events_result.get("items", [])

    return events


def get_tasks(tasks_service):
    # Get all the task lists available in your account
    tasklists_result = tasks_service.tasklists().list().execute()
    return tasklists_result.get("items", [])


if __name__ == "__main__":
    # Get both services using the authenticated credentials
    tasks_service, calendar_service = get_services()

    # Get calendar events
    events = get_calendar_events(calendar_service)

    # Get tasks
    tasks = get_tasks(tasks_service)
