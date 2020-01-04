import { Component, OnInit, HostBinding } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';

@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.scss']
})
export class WorkScheduleComponent implements OnInit {

  public locales = [ruLocale];
  public calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  public calendarWeekends = true;

  constructor() { }

  ngOnInit() {
  }

}
