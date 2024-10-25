from datetime import datetime as dt
import asyncio

def get_current_time():
    return dt.now().strftime("%Y-%m-%d %H:%M:%S")
