def add_time(start, duration, day_of_week=None):
    # Split start time into components
    time_part, meridian = start.split()
    start_hour, start_minute = map(int, time_part.split(":"))
    duration_hour, duration_minute = map(int, duration.split(":"))

    # Convert start hour to 24-hour format
    if meridian == "PM":
        start_hour += 12 if start_hour != 12 else 0
    elif start_hour == 12:  # Midnight case (12 AM → 0)
        start_hour = 0  

    # Add duration
    total_minutes = start_minute + duration_minute
    extra_hours = total_minutes // 60
    total_minutes %= 60

    total_hours = start_hour + duration_hour + extra_hours
    days_later = total_hours // 24
    new_hour_24 = total_hours % 24

    # Convert back to 12-hour format
    if new_hour_24 == 0:
        final_hour = 12
        meridian = "AM"
    elif new_hour_24 == 12:
        final_hour = 12
        meridian = "PM"
    elif new_hour_24 > 12:
        final_hour = new_hour_24 - 12
        meridian = "PM"
    else:
        final_hour = new_hour_24
        meridian = "AM"

    # Format minutes with two digits
    final_minute = f"{total_minutes:02d}"

    # Compute new day of the week if provided
    if day_of_week:
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        current_day_index = days.index(day_of_week.capitalize())
        new_day_of_week = days[(current_day_index + days_later) % 7]
        day_part = f", {new_day_of_week}"
    else:
        day_part = ""

    # Determine "(next day)" or "(x days later)" notation
    if days_later == 1:
        day_msg = " (next day)"
    elif days_later > 1:
        day_msg = f" ({days_later} days later)"
    else:
        day_msg = ""

    # Return final formatted time
    return f"{final_hour}:{final_minute} {meridian}{day_part}{day_msg}".strip()
