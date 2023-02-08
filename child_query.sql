select activity_name, child_name from activities
join schedules on activities.id=activity_id
join schedules_children on schedules.id=schedule_id
join children on child_id=children.id
where child_id=1;